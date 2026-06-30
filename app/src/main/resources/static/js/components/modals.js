// modals.js
export function openModal(type) {
  let modalContent = '';
  if (type === 'addDoctor') {
    modalContent = `
         <h2>Add Doctor</h2>
         <input type="text" id="docName" placeholder="Doctor Name" class="input-field">
         <select id="docSpecialty" class="input-field select-dropdown">
             <option value="">Specialization</option>
                        <option value="cardiologist">Cardiologist</option>
                        <option value="dermatologist">Dermatologist</option>
                        <option value="neurologist">Neurologist</option>
                        <option value="pediatrician">Pediatrician</option>
                        <option value="orthopedic">Orthopedic</option>
                        <option value="gynecologist">Gynecologist</option>
                        <option value="psychiatrist">Psychiatrist</option>
                        <option value="dentist">Dentist</option>
                        <option value="ophthalmologist">Ophthalmologist</option>
                        <option value="ent">ENT Specialist</option>
                        <option value="urologist">Urologist</option>
                        <option value="oncologist">Oncologist</option>
                        <option value="gastroenterologist">Gastroenterologist</option>
                        <option value="general">General Physician</option>

        </select>
        <input type="email" id="docEmail" placeholder="Email" class="input-field">
        <input type="password" id="docPassword" placeholder="Password" class="input-field">
        <input type="text" id="docPhone" placeholder="Mobile No." class="input-field">
        <input type="text" id="docAvailableTimes" placeholder="Available Times (e.g. 09:00, 10:00)" class="input-field">
        <button class="dashboard-btn" id="saveDoctorBtn">Save</button>
      `;
  } else if (type === 'patientLogin') {
    modalContent = `
        <h2>Patient Login</h2>
        <input type="text" id="email" placeholder="Email" class="input-field">
        <input type="password" id="password" placeholder="Password" class="input-field">
        <button class="dashboard-btn" id="loginBtn">Login</button>
      `;
  }
  else if (type === "patientSignup") {
    modalContent = `
      <h2>Patient Signup</h2>
      <input type="text" id="name" placeholder="Name" class="input-field">
      <input type="email" id="email" placeholder="Email" class="input-field">
      <input type="password" id="password" placeholder="Password" class="input-field">
      <input type="text" id="phone" placeholder="Phone" class="input-field">
      <input type="text" id="address" placeholder="Address" class="input-field">
      <button class="dashboard-btn" id="signupBtn">Signup</button>
    `;

  } else if (type === 'adminLogin') {
    modalContent = `
        <h2>Admin Login</h2>
        <input type="text" id="adminUsername" name="username" placeholder="Username" class="input-field">
        <input type="password" id="adminPassword" name="password" placeholder="Password" class="input-field">
        <button class="dashboard-btn" id="adminLoginSubmitBtn" >Login</button>
      `;
  } else if (type === 'doctorLogin') {
    modalContent = `
        <h2>Doctor Login</h2>
        <input type="text" id="doctorEmail" placeholder="Email" class="input-field">
        <input type="password" id="doctorPassword" placeholder="Password" class="input-field">
        <button class="dashboard-btn" id="doctorLoginSubmitBtn" >Login</button>
      `;
  }

  const modalBody = document.getElementById('modal-body');
  if (modalBody) {
    modalBody.innerHTML = modalContent;
    document.getElementById('modal-overlay').classList.remove('hidden');
    document.getElementById('modal-overlay').style.display = 'block';

    document.getElementById('modal-close').onclick = () => {
      document.getElementById('modal-overlay').classList.add('hidden');
      document.getElementById('modal-overlay').style.display = 'none';
    };
  } else {
    console.error("Modal body element not found");
    return;
  }

  if (type === "patientSignup") {
    document.getElementById("signupBtn").addEventListener("click", window.signupPatient);
  }

  if (type === "patientLogin") {
    document.getElementById("loginBtn").addEventListener("click", window.loginPatient);
  }

  if (type === 'addDoctor') {
    document.getElementById('saveDoctorBtn').addEventListener('click', window.adminAddDoctor);
  }

  if (type === 'adminLogin') {
    document.getElementById('adminLoginSubmitBtn').addEventListener('click', window.adminLoginHandler);
  }

  if (type === 'doctorLogin') {
    document.getElementById('doctorLoginSubmitBtn').addEventListener('click', window.doctorLoginHandler);
  }
}

export function closeModal(type) {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById('modal-overlay').style.display = 'none';
}
