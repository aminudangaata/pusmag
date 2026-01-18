import { api } from '../utils/api.js'
import { router } from '../utils/router.js'

const maskEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    if (!domain) return email;

    if (localPart.length <= 2) {
        return `${localPart}***@${domain}`;
    }

    return `${localPart.substring(0, 2)}***${localPart.substring(localPart.length - 2)}@${domain}`;
}

const maskPhoneNumber = (phone) => {
    if (!phone) return '';

    // Remove spaces, dashes, brackets
    const cleaned = phone.replace(/[^\d+]/g, '');

    // Keep country code if present
    let country = '';
    let number = cleaned;

    if (cleaned.startsWith('+')) {
        // Assume country code is first 3 digits (+233, +234, etc.)
        country = cleaned.substring(0, 4);
        number = cleaned.substring(4);
    }

    if (number.length <= 3) {
        return `${country}***${number}`;
    }

    return `${country}${'*'.repeat(number.length - 3)}${number.slice(-3)}`;
};

window.handleLoginSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.usr.value;
    const password = form.pwd.value;
    const messageEl = document.getElementById('login-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="inner">Checking...</span>';
    messageEl.classList.add('hidden');

    try {
        // Step 1: Login
        await api.login(email, password);

        // Step 2: Trigger 2FA
        const res = await api.send2FACode(email);

        // Step 3: Switch to 2FA view
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('2fa-section').classList.remove('hidden');
        // document.getElementById('2fa-email-display').textContent = maskEmail(email);
        const displayEl = document.getElementById('2fa-email-display');

        if (res.method === "SMS") {
            displayEl.textContent = maskPhoneNumber(res.mobile_no);
        } else {
            displayEl.textContent = maskEmail(res.email);
        }

        // Store full email in a data attribute for verification step
        // document.getElementById('2fa-email-display').setAttribute('data-full-email', email);
        displayEl.setAttribute('data-full-email', email);

    } catch (error) {
        messageEl.textContent = error.message || "Login failed. Please check your credentials.";
        messageEl.className = "p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6";
        messageEl.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="inner">Sign In</span>';
    }
}

window.handle2FASubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const code = form.code.value;
    const email = document.getElementById('2fa-email-display').getAttribute('data-full-email');
    const messageEl = document.getElementById('2fa-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="inner">Verifying...</span>';

    try {
        await api.verify2FACode(email, code);

        // Success! Get user info and redirect
        router.user = await api.getUserInfo();
        router.navigate('/portal/dashboard');

    } catch (error) {
        messageEl.textContent = error.message || "Invalid code. Please try again.";
        messageEl.className = "p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6";
        messageEl.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="inner">Verify Code</span>';
    }
}

window.togglePassword = () => {
    const pwdInput = document.querySelector('input[name="pwd"]');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOffIcon = document.getElementById('eye-off-icon');

    if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        eyeIcon.classList.add('hidden');
        eyeOffIcon.classList.remove('hidden');
    } else {
        pwdInput.type = 'password';
        eyeIcon.classList.remove('hidden');
        eyeOffIcon.classList.add('hidden');
    }
}

export async function LoginPage() {
    return `
        <div class="min-h-screen pt-32 flex items-center justify-center section-padding">
            <div class="w-full max-w-md">
                <!-- Login Section -->
                <div id="login-section" class="glass rounded-2xl p-8 animate-on-scroll">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p class="text-neutral-400">Sign in to your PuSMAG account</p>
                    </div>

                    <div id="login-message" class="hidden"></div>

                    <form onsubmit="window.handleLoginSubmit(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Email Address</label>
                            <input type="text" name="usr" required placeholder="name@email.com" 
                                class="w-full text-sm px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Password</label>
                            <div class="relative">
                                <input type="password" name="pwd" required placeholder="••••••••" 
                                    class="w-full text-sm px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                                <button type="button" onclick="window.togglePassword()" class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-200 hover:text-primary-500 transition-all p-1">
                                    <svg id="eye-icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <svg id="eye-off-icon" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn-custom w-full">
                            <span class="inner">Sign In</span>
                        </button>
                    </form>

                    <p class="mt-8 text-center text-sm text-neutral-500">
                        <a href="/forgot-password" class="text-primary-500 hover:text-primary-400 font-medium">Forgot Password?</a>
                    </p>
                </div>

                <!-- 2FA Section -->
                <div id="2fa-section" class="hidden glass rounded-2xl p-8 animate-on-scroll">
                    <div class="text-center mb-8">
                        <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <h1 class="text-3xl font-bold mb-2">Verification</h1>
                        <p class="text-neutral-400">Enter the 6-digit code sent to <br><span id="2fa-email-display" class="text-neutral-300 font-medium"></span></p>
                    </div>

                    <div id="2fa-message" class="hidden"></div>

                    <form onsubmit="window.handle2FASubmit(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium mb-2 text-center">Security Code</label>
                            <input type="text" name="code" required maxlength="6" placeholder="000000" 
                                class="w-full px-4 py-4 text-center text-3xl tracking-[0.5em] font-bold bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        </div>
                        <button type="submit" class="btn-custom w-full">
                            <span class="inner">Verify Code</span>
                        </button>
                    </form>

                    <button onclick="window.handleLoginSubmit(event)" class="mt-8 w-full text-center text-sm text-neutral-500 hover:text-primary-500 transition-colors">
                        Didn't receive a code? Resend
                    </button>
                </div>
            </div>
        </div>
    `
}
