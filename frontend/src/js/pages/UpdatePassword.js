import { api } from '../utils/api.js'
import { router } from '../utils/router.js'

window.handleUpdatePasswordSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const newPassword = form.new_password.value;
    const confirmPassword = form.confirm_password.value;
    const messageEl = document.getElementById('update-message');
    const submitBtn = form.querySelector('button[type="submit"]');
    const modal = document.getElementById('success-modal');

    // Clear previous messages
    messageEl.classList.add('hidden');

    // Validate passwords match
    if (newPassword !== confirmPassword) {
        messageEl.textContent = "Passwords do not match.";
        messageEl.className = "p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6";
        messageEl.classList.remove('hidden');
        return;
    }

    // Validate password length
    if (newPassword.length < 8) {
        messageEl.textContent = "Password must be at least 8 characters long.";
        messageEl.className = "p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6";
        messageEl.classList.remove('hidden');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="inner">Updating...</span>';

    try {
        // Extract key from URL
        const urlParams = new URLSearchParams(window.location.search);
        const key = urlParams.get('key');

        if (!key) {
            throw new Error("Invalid or missing reset key.");
        }

        // Call Frappe's update password API
        const response = await fetch('/api/method/frappe.core.doctype.user.user.update_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Frappe-CSRF-Token': api.getCSRFToken() || ''
            },
            body: JSON.stringify({
                new_password: newPassword,
                key: key
            })
        });

        const data = await response.json();

        if (response.ok && data.message) {
            // Show success modal
            modal.classList.remove('hidden');
            form.reset();
        } else {
            throw new Error(data.exception || data._server_messages || "Failed to update password.");
        }

    } catch (error) {
        console.error('Password update error:', error);
        messageEl.textContent = error.message || "An error occurred. The reset link may have expired.";
        messageEl.className = "p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500 mb-6";
        messageEl.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="inner">Update Password</span>';
    }
}

window.handleSuccessClose = () => {
    const modal = document.getElementById('success-modal');
    modal.classList.add('hidden');
    router.navigate('/login');
}

window.togglePasswordVisibility = (inputId) => {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;

    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
            </svg>
        `;
    } else {
        input.type = 'password';
        icon.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
        `;
    }
}

export async function UpdatePasswordPage() {
    return `
        <div class="min-h-screen pt-32 flex items-center justify-center section-padding">
            <div class="w-full max-w-md">
                <div class="glass rounded-2xl p-8 animate-on-scroll">
                    <div class="text-center mb-8">
                        <h1 class="text-3xl font-bold mb-2">Create New Password</h1>
                        <p class="text-neutral-400">Enter your new password below</p>
                    </div>

                    <div id="update-message" class="hidden"></div>

                    <form onsubmit="window.handleUpdatePasswordSubmit(event)" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">New Password</label>
                            <div class="relative">
                                <input type="password" id="new_password" name="new_password" required 
                                    placeholder="Enter new password" 
                                    class="w-full text-sm px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                                <button type="button" onclick="window.togglePasswordVisibility('new_password')"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </button>
                            </div>
                            <p class="mt-1 text-xs text-neutral-500">At least 8 characters</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Confirm Password</label>
                            <div class="relative">
                                <input type="password" id="confirm_password" name="confirm_password" required 
                                    placeholder="Confirm new password" 
                                    class="w-full text-sm px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                                <button type="button" onclick="window.togglePasswordVisibility('confirm_password')"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn-custom w-full">
                            <span class="inner">Update Password</span>
                        </button>
                    </form>
                </div>
            </div>

            <!-- Success Modal -->
            <div id="success-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="window.handleSuccessClose()"></div>
                
                <!-- Modal Content -->
                <div class="relative glass rounded-2xl p-8 w-full max-w-sm mx-4 transform transition-all animate-on-scroll animate">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Password Updated</h3>
                        <p class="text-neutral-400 mb-6">
                            Your password has been successfully updated. You can now log in with your new password.
                        </p>
                        <button onclick="window.handleSuccessClose()" class="btn-custom w-full">
                            <span class="inner">Go to Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}
