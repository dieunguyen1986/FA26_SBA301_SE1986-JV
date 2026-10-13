package fu.talenthub.modules.job.dto;

import fu.talenthub.modules.job.entity.JobStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
public class JobResponse {
    private UUID id;
    private String departmentName;
    private Long recruiterId;
    private String title;
    private String description;
    private String location;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String status;
    private String utmSource;
    private String utmMedium;
    private OffsetDateTime deadline;
    private OffsetDateTime publishedAt;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private String createdBy;
    private String updatedBy;

    public JobResponse(UUID id,
                       String departmentName,
                       String title,
                       String description,
                       String location,
                       BigDecimal salaryMin,
                       BigDecimal salaryMax,
                       JobStatus status,
                       String utmSource,
                       String utmMedium,
                       OffsetDateTime deadline,
                       OffsetDateTime publishedAt,
                       OffsetDateTime createdAt,
                       OffsetDateTime updatedAt,
                       String createdBy,
                       String updatedBy) {
        this.id = id;
        this.departmentName = departmentName;
        this.title = title;
        this.description = description;
        this.location = location;
        this.salaryMin = salaryMin;
        this.salaryMax = salaryMax;
        this.status = status == null ? null : status.name();
        this.utmSource = utmSource;
        this.utmMedium = utmMedium;
        this.deadline = deadline;
        this.publishedAt = publishedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
    }
}
