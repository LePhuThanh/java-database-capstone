package com.project.back_end.repo;

import com.project.back_end.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // 1. Find doctor by exact email
    Doctor findByEmail(String email);

    // 2. Find doctors whose name matches a LIKE pattern (case-sensitive)
    List<Doctor> findByNameLike(String name);

    // 3. Find doctors by name (contains, ignore case) and specialty (exact match, ignore case)
    List<Doctor> findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(String name, String specialty);

    // 4. Find doctors by specialty (case-insensitive)
    List<Doctor> findBySpecialtyIgnoreCase(String specialty);

    @Query("SELECT d FROM Doctor d LEFT JOIN FETCH d.availableTimes")
    List<Doctor> findAll();

    // /////////////////////
    // /**
    //  * Find a doctor by email.
    //  *
    //  * @param email doctor's email
    //  * @return matching Doctor or null if not found
    //  */
    // Doctor findByEmail(String email);

    // /**
    //  * Find doctors whose name contains the given keyword.
    //  *
    //  * Example:
    //  * keyword = "john"
    //  *
    //  * Matches:
    //  * John Smith
    //  * Johnny Walker
    //  */
    // @Query("""
    //         SELECT d
    //         FROM Doctor d
    //         WHERE d.name LIKE CONCAT('%', :name, '%')
    //         """)
    // List<Doctor> findByNameLike(String name);

    // /**
    //  * Find doctors by partial name and exact specialty
    //  * (case-insensitive).
    //  */
    // @Query("""
    //         SELECT d
    //         FROM Doctor d
    //         WHERE LOWER(d.name)
    //                 LIKE LOWER(CONCAT('%', :name, '%'))
    //           AND LOWER(d.specialty)
    //                 = LOWER(:specialty)
    //         """)
    // List<Doctor> findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(
    //         String name,
    //         String specialty
    // );

    // /**
    //  * Find doctors by specialty (case-insensitive).
    //  *
    //  * Example:
    //  * "Cardiologist"
    //  * "cardiologist"
    //  * "CARDIOLOGIST"
    //  *
    //  * All return the same result.
    //  */
    // List<Doctor> findBySpecialtyIgnoreCase(String specialty);
}
