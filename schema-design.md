# Database Design

## MySQL Database Design
### Table: admins

* id: INT, Primary Key, Auto Increment
* username: VARCHAR(50), Not Null, Unique
* password: VARCHAR(255), Not Null
* full_name: VARCHAR(100), Not Null
* email: VARCHAR(100), Unique

### Table: doctors

* id: INT, Primary Key, Auto Increment
* full_name: VARCHAR(100), Not Null
* specialization: VARCHAR(100), Not Null
* email: VARCHAR(100), Unique
* phone: VARCHAR(20)
* availability: VARCHAR(255)

### Table: patients

* id: INT, Primary Key, Auto Increment
* full_name: VARCHAR(100), Not Null
* email: VARCHAR(100), Unique
* phone: VARCHAR(20)
* date_of_birth: DATE

### Table: appointments

* id: INT, Primary Key, Auto Increment
* doctor_id: INT, Foreign Key → doctors(id)
* patient_id: INT, Foreign Key → patients(id)
* appointment_time: DATETIME, Not Null
* status: VARCHAR(20)

### Design Notes

* Patients should not be deleted if they already have appointment history.
* Doctors should not be allowed to have overlapping appointments.
* Appointment history should be retained for future medical reference.
* Email addresses should be validated by the application layer.

## MongoDB Collection Design

### Collection: prescriptions
```json
{
  "_id": "ObjectId('64abc123456')",
  "appointmentId": 1,
  "patientId": 1,
  "doctorId": 1,
  "medications": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "Twice daily",
      "duration": "5 days"
    },
    {
      "name": "Vitamin C",
      "dosage": "1000mg",
      "frequency": "Once daily",
      "duration": "7 days"
    }
  ],
  "doctorNotes": "Drink plenty of water and take medicine after meals.",
  "tags": [
    "fever",
    "flu"
  ],
  "metadata": {
    "createdBy": "Dr. Smith",
    "createdAt": "2026-06-29T10:00:00Z"
  }
}
```
### Design Notes

* Store only patientId and doctorId instead of embedding the full patient or doctor object to avoid duplicated data.
* Arrays are used to store multiple medications in a single prescription.
* Nested metadata allows additional information to be stored without changing the document structure.
* The document schema can evolve easily by adding new optional fields without affecting existing records.


