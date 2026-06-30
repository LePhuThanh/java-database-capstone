// doctorServices.js — API logic for Doctor entity

import { API_BASE_URL } from "../config/config.js";

// Base endpoint
const DOCTOR_API = `${API_BASE_URL}/api/doctor`;

// === Get All Doctors ===
export async function getDoctors() {
  try {
    const response = await fetch(`${DOCTOR_API}/all`);
    const data = await response.json();
    return data.doctors || [];
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

// === Delete Doctor by ID (Admin) ===
export async function deleteDoctor(doctorId, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/delete/${token}/${doctorId}`, {
      method: "DELETE"
    });

    const data = await response.text();
    return {
      success: response.ok,
      message: data
    };
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return {
      success: false,
      message: "An unexpected error occurred."
    };
  }
}

// === Save New Doctor ===
export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/register/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(doctor)
    });

    const data = await response.text();
    return {
      success: response.ok,
      message: data
    };
  } catch (error) {
    console.error("Error saving doctor:", error);
    return {
      success: false,
      message: "Unable to save doctor. Please try again."
    };
  }
}

// === Filter Doctors by Name, Time, and Specialty ===
export async function filterDoctors(name = "", time = "", specialty = "") {
  try {
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (time) params.append("time", time);
    if (specialty) params.append("speciality", specialty);

    const response = await fetch(`${DOCTOR_API}/filter?${params.toString()}`);

    if (!response.ok) {
      console.error("Filter request failed");
      return { doctors: [] };
    }

    const data = await response.json();
    return data || { doctors: [] };
  } catch (error) {
    console.error("Error filtering doctors:", error);
    alert("Something went wrong while filtering doctors.");
    return { doctors: [] };
  }
}
