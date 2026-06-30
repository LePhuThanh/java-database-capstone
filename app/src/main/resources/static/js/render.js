// render.js

window.selectRole = function(role) {
  setRole(role);
  const token = localStorage.getItem('token');
  if (role === "admin") {
    if (token) {
      window.location.href = `/pages/adminDashboard.html`;
    }
  } if (role === "patient") {
    window.location.href = "/pages/patientDashboard.html";
  } else if (role === "doctor") {
    if (token) {
      window.location.href = `/pages/doctorDashboard.html`;
    } 
  } else if (role === "loggedPatient") {
      window.location.href = "/pages/loggedPatientDashboard.html";
    }
}


window.renderContent = function() {
  const role = getRole();
  if (!role) {
    window.location.href = "/"; // if no role, send to role selection page
    return;
  }
}
