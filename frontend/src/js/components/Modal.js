
export class Modal {
    static init() {
        if (document.getElementById('custom-modal-container')) return;

        const container = document.createElement('div');
        container.id = 'custom-modal-container';
        container.className = 'fixed inset-0 z-[100] hidden items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-300';
        container.innerHTML = `
            <div class="glass w-full max-w-md rounded-2xl overflow-hidden transform scale-95 opacity-0 transition-all duration-300" id="custom-modal-content">
                <div class="p-8 text-center space-y-6">
                    <div class="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto" id="custom-modal-icon">
                        <svg class="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold mb-2" id="custom-modal-title">Notification</h3>
                        <p class="text-neutral-400 text-sm" id="custom-modal-message">Message body goes here.</p>
                    </div>
                    <div class="flex flex-col gap-3" id="custom-modal-actions">
                        <button onclick="Modal.close()" class="btn-custom w-full">
                            <span class="inner">Okay</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(container);

        // Close on backdrop click
        container.addEventListener('click', (e) => {
            if (e.target === container) Modal.close();
        });
    }

    static show({ title, message, type = 'info', onConfirm = null, confirmText = 'Okay', cancelText = null }) {
        this.init();

        const container = document.getElementById('custom-modal-container');
        const content = document.getElementById('custom-modal-content');
        const titleEl = document.getElementById('custom-modal-title');
        const msgEl = document.getElementById('custom-modal-message');
        const iconEl = document.getElementById('custom-modal-icon');
        const actionsEl = document.getElementById('custom-modal-actions');

        titleEl.textContent = title;
        msgEl.textContent = message;

        // Icon and Color Styling
        let iconSvg = '';
        let colorClass = 'text-primary-500';
        let bgClass = 'bg-primary-500/10';

        if (type === 'error') {
            colorClass = 'text-red-500';
            bgClass = 'bg-red-500/10';
            iconSvg = '<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        } else if (type === 'success') {
            colorClass = 'text-emerald-500';
            bgClass = 'bg-emerald-500/10';
            iconSvg = '<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        } else {
            iconSvg = '<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        }

        iconEl.innerHTML = iconSvg;
        iconEl.className = `w-20 h-20 rounded-full flex items-center justify-center mx-auto ${bgClass}`;
        iconEl.firstElementChild.classList.add(colorClass);

        // Actions
        actionsEl.innerHTML = '';

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'btn-custom w-full';
        confirmBtn.innerHTML = `<span class="inner">${confirmText}</span>`;
        confirmBtn.onclick = () => {
            if (onConfirm) onConfirm();
            Modal.close();
        };
        actionsEl.appendChild(confirmBtn);

        if (cancelText) {
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'px-6 py-3 text-neutral-400 hover:text-neutral-300 transition-colors text-sm font-medium';
            cancelBtn.textContent = cancelText;
            cancelBtn.onclick = () => Modal.close();
            actionsEl.appendChild(cancelBtn);
        }

        // Show
        container.classList.remove('hidden');
        container.classList.add('flex');

        // Animate in
        requestAnimationFrame(() => {
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
        });
    }

    static close() {
        const container = document.getElementById('custom-modal-container');
        const content = document.getElementById('custom-modal-content');
        if (!container || !content) return;

        // Animate out
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            container.classList.add('hidden');
            container.classList.remove('flex');
        }, 300);
    }

    static alert(title, message) {
        this.show({ title, message, type: 'error' });
    }

    static success(title, message) {
        this.show({ title, message, type: 'success' });
    }
}

// Expose globally
window.Modal = Modal;
