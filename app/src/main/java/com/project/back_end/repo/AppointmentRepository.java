package com.project.back_end.repo;

import com.project.back_end.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // 1. Find appointments by doctor and time range
    List<Appointment> findByDoctorIdAndAppointmentTimeBetween(Long doctorId, LocalDateTime start, LocalDateTime end);

    // 2. Find appointments by doctor, patient name (case-insensitive), and time range
    List<Appointment> findByDoctorIdAndPatient_NameContainingIgnoreCaseAndAppointmentTimeBetween(
            Long doctorId,
            String patientName,
            LocalDateTime start,
            LocalDateTime end
    );

    // 3. Delete all appointments by doctor ID
    @Modifying
    @Transactional
    void deleteAllByDoctorId(Long doctorId);

    // 4. Get all appointments for a patient
    List<Appointment> findByPatientId(Long patientId);

    // 5. Get appointments for patient with specific status, ordered by time
    List<Appointment> findByPatient_IdAndStatusOrderByAppointmentTimeAsc(Long patientId, int status);

    // 6. Filter appointments by doctor name and patient ID (LIKE doctor name)
    @Query("SELECT a FROM Appointment a WHERE LOWER(a.doctor.name) LIKE LOWER(CONCAT('%', :doctorName, '%')) AND a.patient.id = :patientId")
    List<Appointment> filterByDoctorNameAndPatientId(String doctorName, Long patientId);

    // 7. Filter appointments by doctor name, patient ID, and status
    @Query("SELECT a FROM Appointment a WHERE LOWER(a.doctor.name) LIKE LOWER(CONCAT('%', :doctorName, '%')) AND a.patient.id = :patientId AND a.status = :status")
    List<Appointment> filterByDoctorNameAndPatientIdAndStatus(String doctorName, Long patientId, int status);

    // 8. Update status of an appointment
    @Modifying
    @Transactional
    @Query("UPDATE Appointment a SET a.status = :status WHERE a.id = :id")
    void updateStatus(int status, long id);


    /////////////
    // /**
    //  * Find appointments of a doctor within a specific time range.
    //  */
    // @Query("""
    //         SELECT DISTINCT a
    //         FROM Appointment a
    //         LEFT JOIN FETCH a.doctor d
    //         LEFT JOIN FETCH d.availableTimes
    //         WHERE d.id = :doctorId
    //           AND a.appointmentTime BETWEEN :start AND :end
    //         ORDER BY a.appointmentTime
    //         """)
    // List<Appointment> findByDoctorIdAndAppointmentTimeBetween(
    //         Long doctorId,
    //         LocalDateTime start,
    //         LocalDateTime end
    // );

    // /**
    //  * Find appointments by doctor, patient name and time range.
    //  */
    // @Query("""
    //         SELECT DISTINCT a
    //         FROM Appointment a
    //         LEFT JOIN FETCH a.doctor d
    //         LEFT JOIN FETCH a.patient p
    //         LEFT JOIN FETCH d.availableTimes
    //         WHERE d.id = :doctorId
    //           AND LOWER(p.name) LIKE LOWER(CONCAT('%', :patientName, '%'))
    //           AND a.appointmentTime BETWEEN :start AND :end
    //         ORDER BY a.appointmentTime
    //         """)
    // List<Appointment> findByDoctorIdAndPatient_NameContainingIgnoreCaseAndAppointmentTimeBetween(
    //         Long doctorId,
    //         String patientName,
    //         LocalDateTime start,
    //         LocalDateTime end
    // );

    // /**
    //  * Delete all appointments of a doctor.
    //  */
    // @Transactional
    // @Modifying
    // void deleteAllByDoctorId(Long doctorId);

    // /**
    //  * Find all appointments of a patient.
    //  */
    // List<Appointment> findByPatientId(Long patientId);

    // /**
    //  * Find appointments by patient and status.
    //  */
    // List<Appointment> findByPatient_IdAndStatusOrderByAppointmentTimeAsc(
    //         Long patientId,
    //         int status
    // );

    // /**
    //  * Filter appointments by doctor name and patient.
    //  */
    // @Query("""
    //         SELECT a
    //         FROM Appointment a
    //         WHERE LOWER(a.doctor.name)
    //                 LIKE LOWER(CONCAT('%', :doctorName, '%'))
    //           AND a.patient.id = :patientId
    //         ORDER BY a.appointmentTime
    //         """)
    // List<Appointment> filterByDoctorNameAndPatientId(
    //         String doctorName,
    //         Long patientId
    // );

    // /**
    //  * Filter appointments by doctor name, patient and status.
    //  */
    // @Query("""
    //         SELECT a
    //         FROM Appointment a
    //         WHERE LOWER(a.doctor.name)
    //                 LIKE LOWER(CONCAT('%', :doctorName, '%'))
    //           AND a.patient.id = :patientId
    //           AND a.status = :status
    //         ORDER BY a.appointmentTime
    //         """)
    // List<Appointment> filterByDoctorNameAndPatientIdAndStatus(
    //         String doctorName,
    //         Long patientId,
    //         int status
    // );
}

