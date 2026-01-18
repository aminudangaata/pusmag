import { api } from '../../utils/api.js'

window.approveRegistration = async (name) => {
    if (!confirm(`Are you sure you want to approve this registration? This will create a user account and member record.`)) return;

    try {
        await api.approveRegistration(name);
        alert('Registration approved successfully!');
        renderRegistrations();
    } catch (e) {
        alert('Error: ' + e.message);
    }
}

window.rejectRegistration = async (name) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason === null) return;

    try {
        await api.rejectRegistration(name, reason);
        alert('Registration rejected.');
        renderRegistrations();
    } catch (e) {
        alert('Error: ' + e.message);
    }
}

async function renderRegistrations() {
    const container = document.getElementById('registrations-container');
    if (!container) return;

    container.innerHTML = '<tr><td colspan="5" class="py-20 text-center text-neutral-500 text-lg">Loading registrations...</td></tr>';

    try {
        const regs = await api.getPendingRegistrations();

        if (regs.length === 0) {
            container.innerHTML = '<tr><td colspan="5" class="py-20 text-center text-neutral-500 text-lg">No pending registrations found.</td></tr>';
            return;
        }

        container.innerHTML = regs.map(r => `
            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td class="py-4 px-6 font-medium">${r.first_name} ${r.surname}</td>
                <td class="py-4 px-6 text-neutral-400">${r.email_address}</td>
                <td class="py-4 px-6 text-sm">
                    <div class="font-medium">${r.institution}</div>
                    <div class="text-xs text-neutral-500">${r.designation}</div>
                </td>
                <td class="py-4 px-6 text-xs text-neutral-500">${new Date(r.creation).toLocaleDateString()}</td>
                <td class="py-4 px-6 text-right">
                    <div class="flex justify-end gap-2">
                        <button onclick="window.approveRegistration('${r.name}')" 
                                class="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors" title="Approve">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </button>
                        <button onclick="window.rejectRegistration('${r.name}')" 
                                class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Reject">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

    } catch (e) {
        container.innerHTML = `<tr><td colspan="5" class="py-20 text-center text-red-500">Error: ${e.message}</td></tr>`;
    }
}

export async function RegistrationsPortal() {
    setTimeout(() => renderRegistrations(), 100);

    return `
        <div class="space-y-8 animate-on-scroll">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold">Pending Registrations</h2>
            
            <div class="glass rounded-2xl overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left min-w-[768px]">
                        <thead class="bg-white/5 text-xs uppercase font-bold tracking-widest text-neutral-400">
                            <tr>
                                <th class="py-4 px-6">Name</th>
                                <th class="py-4 px-6">Email</th>
                                <th class="py-4 px-6">Institution</th>
                                <th class="py-4 px-6">Date</th>
                                <th class="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="registrations-container">
                            <!-- Loaded via JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
}
