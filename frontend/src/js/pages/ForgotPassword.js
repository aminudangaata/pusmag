import { api } from '../utils/api.js'
import { router } from '../utils/router.js'

window.handleResetSuccessClose = () => {
    const modal = document.getElementById('success-modal');
    modal.classList.add('hidden');
    router.navigate('/login');
}

window.handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const messageEl = document.getElementById('reset-message');
    const submitBtn = form.querySelector('button[type="submit"]');
    const modal = document.getElementById('success-modal');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="inner">Sending...</span>';
    messageEl.classList.add('hidden');

    try {
        const res = await api.resetPassword(email);

        // Show success modal instead of inline message
        modal.classList.remove('hidden');
        form.reset();

    } catch (error) {
        messageEl.textContent = "An error occurred. Please try again later.";
        messageEl.className = "p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6";
        messageEl.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="inner">Send Reset Link</span>';
    }
}

export async function ForgotPasswordPage() {
    return `
        <div class="min-h-screen pt-32 flex items-center justify-center section-padding">
            <div class="w-full max-w-md">
                <div class="glass rounded-2xl p-8 animate-on-scroll">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold mb-2">Reset Password</h1>
                        <p class="text-neutral-400">Enter your email address to receive reset instructions</p>
                    </div>

                    <div id="reset-message" class="hidden"></div>

                    <form onsubmit="window.handleForgotPasswordSubmit(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Email Address</label>
                            <input type="email" name="email" required placeholder="name@email.com" 
                                class="w-full text-sm px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        </div>
                        
                        <button type="submit" class="btn-custom w-full">
                            <span class="inner">Send Reset Link</span>
                        </button>
                    </form>

                    <p class="mt-8 text-center text-sm text-neutral-500">
                        Remember your password? 
                        <a href="/login" class="text-primary-500 hover:text-primary-400 font-medium">Back to Login</a>
                    </p>
                </div>
            </div>

            <!-- Success Modal -->
            <div id="success-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="window.handleResetSuccessClose()"></div>
                
                <!-- Modal Content -->
                <div class="relative glass rounded-2xl p-8 w-full max-w-sm mx-4 transform transition-all animate-on-scroll animate">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Check Your Email</h3>
                        <p class="text-neutral-400 mb-6">
                            If an account exists for this email, you will receive password reset instructions shortly.
                        </p>
                        <button onclick="window.handleResetSuccessClose()" class="btn-custom w-full">
                            <span class="inner">Back to Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}
