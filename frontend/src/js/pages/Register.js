import { api } from '../utils/api.js'

// Expose functions to window for onclick handlers
window.addMembershipRow = () => {
  const container = document.getElementById('memberships-container');
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'membership-row grid grid-cols-12 gap-2 p-2 border-t border-white/5';
  row.innerHTML = `
        <div class="col-span-4">
            <input type="text" placeholder="e.g. Accountant" class="w-full px-3 py-2 bg-black/20 border border-white/10 rounded focus:outline-none focus:border-primary-500 text-sm">
        </div>
        <div class="col-span-4">
            <input type="text" placeholder="e.g. ICA Ghana" class="w-full px-3 py-2 bg-black/20 border border-white/10 rounded focus:outline-none focus:border-primary-500 text-sm">
        </div>
        <div class="col-span-3">
            <input type="text" placeholder="Num" class="w-full px-3 py-2 bg-black/20 border border-white/10 rounded focus:outline-none focus:border-primary-500 text-sm">
        </div>
        <div class="col-span-1 flex justify-center items-center">
            <button type="button" onclick="this.closest('.membership-row').remove()" class="text-red-500 hover:text-red-400 p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
    `;
  container.appendChild(row);
}

window.validateField = (el) => {
  if (el.hasAttribute('required') && !el.value) {
    el.classList.add('border-red-500/50', 'ring-2', 'ring-red-500/20');
    el.classList.remove('border-white/10');
  } else {
    el.classList.remove('border-red-500/50', 'ring-2', 'ring-red-500/20');
    el.classList.add('border-white/10');
  }
}

window.resetRegistrationForm = () => {
  const form = document.getElementById('registration-form');
  if (form) {
    form.reset();
    // Remove validation glows
    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.classList.remove('border-red-500/50', 'ring-2', 'ring-red-500/20');
      el.classList.add('border-white/10');
    });
  }
  const container = document.getElementById('memberships-container');
  if (container) container.innerHTML = '';
  // Clear any messages
  const formMessage = document.getElementById('form-message');
  if (formMessage) {
    formMessage.classList.add('hidden');
    formMessage.textContent = '';
  }
  // Hide remove photo button
  const removeBtn = document.getElementById('remove-photo-btn');
  if (removeBtn) removeBtn.classList.add('hidden');
}

window.handlePhotoChange = (event) => {
  const removeBtn = document.getElementById('remove-photo-btn');
  if (event.target.files.length > 0) {
    removeBtn.classList.remove('hidden');
  } else {
    removeBtn.classList.add('hidden');
  }
}

window.removePhoto = () => {
  const fileInput = document.querySelector('input[name="photo"]');
  if (fileInput) {
    fileInput.value = '';
    const removeBtn = document.getElementById('remove-photo-btn');
    if (removeBtn) removeBtn.classList.add('hidden');
  }
}

window.handleRegistrationSubmit = async (event) => {
  event.preventDefault();
  const form = event.target;
  const formMessage = document.getElementById('form-message');

  // Check validity first for custom alert
  if (!form.checkValidity()) {
    formMessage.textContent = 'Please complete all required fields.';
    formMessage.className = 'text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6';
    formMessage.classList.remove('hidden');

    // Glow all empty required fields
    form.querySelectorAll('[required]').forEach(el => {
      if (!el.value) {
        el.classList.add('border-red-500/50', 'ring-2', 'ring-red-500/20');
        el.classList.remove('border-white/10');
      }
    });

    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Add loading state
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span class="inner">Processing...</span>';
  btn.disabled = true;
  formMessage.classList.add('hidden');
  formMessage.textContent = '';

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Handle File to Base64 with Validation
  const fileInput = form.querySelector('input[name="photo"]');
  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];

    // 1. Extension validation
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const extension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      formMessage.textContent = 'Invalid file type. Please upload a JPG, JPEG, or PNG image.';
      formMessage.className = 'text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6';
      formMessage.classList.remove('hidden');
      btn.innerHTML = originalText;
      btn.disabled = false;
      return;
    }

    // 2. Size validation (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      formMessage.textContent = 'File size is too large. Maximum size allowed is 2MB.';
      formMessage.className = 'text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6';
      formMessage.classList.remove('hidden');
      btn.innerHTML = originalText;
      btn.disabled = false;
      return;
    }

    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      data.photo = {
        filename: file.name,
        data: base64.split(',')[1] // send only the data part
      };
    } catch (err) {
      console.error("File read error", err);
    }
  } else {
    delete data.photo;
  }

  // Collect Professional Memberships
  const memberships = [];
  document.querySelectorAll('.membership-row').forEach(row => {
    const inputs = row.querySelectorAll('input');
    if (inputs[0].value) {
      memberships.push({
        profession: inputs[0].value,
        professional_body: inputs[1].value,
        membership_number: inputs[2].value
      });
    }
  });

  if (memberships.length > 0) {
    data.professional_memberships = JSON.stringify(memberships);
  }

  try {
    await api.submitRegistration(data);

    formMessage.textContent = 'Thank you for registering! We will contact you soon.';
    formMessage.className = 'text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 mb-6';
    formMessage.classList.remove('hidden');
    window.resetRegistrationForm();

    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

  } catch (error) {
    console.error(error);
    formMessage.textContent = error.message || 'Sorry, there was an error processing your registration.';
    formMessage.className = 'text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 mb-6';
    formMessage.classList.remove('hidden');
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

export async function RegisterPage() {
  return `
    <div class="pt-32">
      <!-- Page Header -->
      <section class="section-padding bg-gradient-to-br from-primary-500/10 to-accent-500/10">
        <div class="container-custom text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-on-scroll">Become a Member</h1>
          <p class="text-xl text-neutral-400 max-w-3xl mx-auto animate-on-scroll" style="animation-delay: 0.1s">
            Join the Public Services Muslims Association of Ghana today
          </p>
        </div>
      </section>

      <!-- Registration Form -->
      <section class="section-padding">
        <div class="container max-w-4xl mx-auto px-6">
          <div id="form-message" class="hidden"></div>
          
          <form id="registration-form" onsubmit="window.handleRegistrationSubmit(event)" novalidate class="glass rounded-xl p-8 space-y-8 animate-on-scroll">
            
            <style>
              /* Theme aligned select elements */
              select {
                background-color: rgba(0, 0, 0, 0.4);
                color: white;
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 1.25rem;
              }
              
              select option {
                background-color: #1a1a1a;
                color: white;
              }
            </style>

            <!-- Personal Details -->
            <div>
                <h3 class="text-xl font-bold mb-6 text-primary-500 border-b border-white/10 pb-2">Personal Details</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">Title *</label>
                    <select name="title" required onblur="window.validateField(this)" class="w-full px-4 py-3 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        <option value="">Select</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Ing.">Ing.</option>
                        <option value="Prof.">Prof.</option>
                        <option value="Alhaji">Alhaji</option>
                        <option value="Hajia">Hajia</option>
                    </select>
                  </div>
                  <div class="md:col-span-2"></div> <!-- Spacer -->
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">First Name *</label>
                    <input type="text" name="first_name" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Middle Name</label>
                    <input type="text" name="middle_name" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Surname *</label>
                    <input type="text" name="surname" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2">Gender *</label>
                    <select name="gender" required onblur="window.validateField(this)" class="w-full px-4 py-3 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        <option value="">Select Gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                  </div>
                   <div>
                    <label class="block text-sm font-medium mb-2">Date of Birth</label>
                    <input type="date" name="date_of_birth" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all text-white scheme-dark">
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">GhanaCard Number *</label>
                    <input type="text" name="ghanacard_number" required onblur="window.validateField(this)" placeholder="GHA-000000000-0" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                  </div>
                  
                  <!-- Photo Upload -->
                   <div class="md:col-span-3">
                    <label class="block text-sm font-medium mb-2">Passport Photo</label>
                    <div class="flex items-center gap-4">
                        <input type="file" name="photo" id="photo-input" onchange="window.handlePhotoChange(event)" accept=".jpg,.jpeg,.png" class="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500/10 file:text-primary-500 hover:file:bg-primary-500/20">
                        <button type="button" id="remove-photo-btn" onclick="window.removePhoto()" class="hidden px-4 py-3 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors text-sm font-bold uppercase tracking-wider">
                            Remove
                        </button>
                    </div>
                    <p class="text-xs text-neutral-500 mt-2">Maximum size: 2MB. Format: JPG, JPEG, PNG.</p>
                  </div>
                </div>
            </div>

            <!-- Contact Information -->
            <div>
                <h3 class="text-xl font-bold mb-6 text-primary-500 border-b border-white/10 pb-2">Contact Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium mb-2">Mobile Number *</label>
                      <input type="tel" name="mobile" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                     <div>
                      <label class="block text-sm font-medium mb-2">Email Address *</label>
                      <input type="email" name="email" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                </div>
            </div>

            <!-- Professional Information -->
            <div>
                <h3 class="text-xl font-bold mb-6 text-primary-500 border-b border-white/10 pb-2">Professional Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label class="block text-sm font-medium mb-2">Institution (MDA/MMDA) *</label>
                      <input type="text" name="institution" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Designation *</label>
                      <input type="text" name="designation" required onblur="window.validateField(this)" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                    </div>
                     <div>
                      <label class="block text-sm font-medium mb-2">Region *</label>
                      <select name="region" required onblur="window.validateField(this)" class="w-full px-4 py-3 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all">
                        <option value="">Select Region</option>
                        <option value="Greater Accra">Greater Accra</option>
                        <option value="Ashanti">Ashanti</option>
                        <option value="Western">Western</option>
                        <option value="Eastern">Eastern</option>
                        <option value="Central">Central</option>
                        <option value="Northern">Northern</option>
                        <option value="Upper East">Upper East</option>
                        <option value="Upper West">Upper West</option>
                        <option value="Volta">Volta</option>
                        <option value="Bono">Bono</option>
                        <option value="Bono East">Bono East</option>
                        <option value="Ahafo">Ahafo</option>
                        <option value="Savannah">Savannah</option>
                        <option value="North East">North East</option>
                        <option value="Oti">Oti</option>
                        <option value="Western North">Western North</option>
                      </select>
                    </div>
                </div>
                
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">Skills/Expertise</label>
                    <textarea name="skills" rows="3" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-all"></textarea>
                </div>

                <!-- Professional Memberships -->
                <div>
                     <label class="block text-sm font-medium mb-2">Professional Memberships</label>
                     <div class="bg-white/5 rounded-lg border border-white/10 overflow-hidden mb-4">
                        <div class="grid grid-cols-12 gap-2 p-3 bg-white/5 text-xs uppercase font-bold text-neutral-400">
                            <div class="col-span-4">Profession</div>
                            <div class="col-span-4">Professional Body</div>
                            <div class="col-span-3">Membership No.</div>
                            <div class="col-span-1"></div>
                        </div>
                        <div id="memberships-container">
                            <!-- Rows will be added here -->
                        </div>
                     </div>
                     <button type="button" onclick="window.addMembershipRow()" class="text-sm text-primary-500 hover:text-primary-400 font-medium flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        Add Membership
                     </button>
                </div>
            </div>

            <div class="flex gap-4 pt-4">
                <button type="button" onclick="window.resetRegistrationForm()" class="px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white font-medium flex-1">
                    Reset
                </button>
                <button type="submit" class="btn-custom flex-[2]">
                  <span class="inner">Submit Registration</span>
                </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  `
}
