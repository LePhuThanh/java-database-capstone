// index.js — role-based login services for Admin and Doctor

import { openModal } from "../components/modals.js";
import { API_BASE_URL } from "../config/config.js";
import { patientLogin } from "./patientServices.js";

// API Endpoints
const ADMIN_API = `${API_BASE_URL}/api/admin/login`;
const DOCTOR_API = `${API_BASE_URL}/api/doctor/login`;

// Setup button click listeners once DOM is ready
window.onload = () => {
  const adminLoginBtn = document.getElementById("adminLoginBtn");
  const doctorLoginBtn = document.getElementById("doctorLoginBtn");
  const patientLoginBtn = document.getElementById("patientLoginBtn");

  if (adminLoginBtn) {
    adminLoginBtn.addEventListener("click", () => openModal("adminLogin"));
  }

  if (doctorLoginBtn) {
    doctorLoginBtn.addEventListener("click", () => openModal("doctorLogin"));
  }

  if (patientLoginBtn) {
    patientLoginBtn.addEventListener("click", () => openModal("patientLogin"));
  }
};

// === Admin Login Handler ===
window.adminLoginHandler = async function () {
  const username = document.getElementById("adminUsername")?.value;
  const password = document.getElementById("adminPassword")?.value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  const admin = { username, password };

  try {
    const response = await fetch(ADMIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(admin)
    });

    if (!response.ok) {
      alert("Invalid admin credentials.");
      return;
    }

    const token = await response.text();
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", "admin");

    selectRole("admin");
  } catch (error) {
    console.error("Admin login failed:", error);
    alert("An error occurred. Please try again later.");
  }
};

// === Doctor Login Handler ===
window.doctorLoginHandler = async function () {
  const email = document.getElementById("doctorEmail")?.value;
  const password = document.getElementById("doctorPassword")?.value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  const doctor = { email, password };

  try {
    const response = await fetch(DOCTOR_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(doctor)
    });

    if (!response.ok) {
      alert("Invalid doctor credentials.");
      return;
    }

    const token = await response.text();
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", "doctor");

    selectRole("doctor");
  } catch (error) {
    console.error("Doctor login failed:", error);
    alert("An error occurred. Please try again later.");
  }
};

// === Patient Login Handler ===
window.loginPatient = async function () {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      email,
      password
    }
    console.log("loginPatient :: ", data)
    const response = await patientLogin(data);
    console.log("Status Code:", response.status);
    console.log("Response OK:", response.ok);
    if (response.ok) {
      const token = await response.text();
      console.log(token);
      selectRole('loggedPatient');
      localStorage.setItem('token', token)
      window.location.href = '/pages/loggedPatientDashboard.html';
    } else {
      alert('❌ Invalid credentials!');
    }
  }
  catch (error) {
    alert("❌ Failed to Login : ", error);
    console.log("Error :: loginPatient :: ", error)
  }
}
