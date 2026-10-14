package fu.talenthub.modules.job.repository;

import fu.talenthub.modules.job.dto.JobResponse;
import fu.talenthub.modules.job.entity.Job;
import fu.talenthub.modules.job.entity.JobStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JobRepository extends JpaRepository<Job, UUID> {

    @Query("""
            SELECT new fu.talenthub.modules.job.dto.JobResponse(
                        j.id,
                        d.departmentName,
                        j.title,
                        j.description,
                        j.location,
                        j.salaryMin,
                        j.salaryMax,
                        j.status,
                        j.utmSource,
                        j.utmMedium,
                        j.deadline,
                        j.publishedAt,
                        j.createdAt,
                        j.updatedAt,
                        j.createdBy,
                        j.updatedBy
                    )
            FROM Job j INNER JOIN j.department d
            WHERE (:keyword IS NULL OR (LOWER(j.title) LIKE LOWER(:keyword)) OR 
                  (:keyword IS NULL OR LOWER(j.description) LIKE LOWER(:keyword))) AND 
                  (:departmentId IS NULL OR (d.id = :departmentId)) AND 
                  ((:month IS NULL OR MONTH(j.publishedAt) = :month) AND (:year IS NULL OR (YEAR(j.publishedAt) = :year))) 
            
            """)
    Page<JobResponse> search(Pageable pageable,
                             @Param("keyword") String keyword,
                             @Param("departmentId") UUID departmentId,
                             @Param("month") Integer month,
                             @Param("year") Integer year);

    Slice<Job> findAllByStatus(JobStatus status, Pageable pageable);
}

