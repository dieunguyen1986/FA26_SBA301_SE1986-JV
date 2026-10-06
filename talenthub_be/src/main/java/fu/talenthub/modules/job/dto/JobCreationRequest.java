package fu.talenthub.modules.job.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class JobCreationRequest {
    private UUID departmentId;
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
    private String createdBy;
}
