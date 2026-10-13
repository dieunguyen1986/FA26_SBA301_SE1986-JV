package fu.talenthub.modules.job.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public interface JobSummaryView {
    UUID getId();

    String getDepartmentName();

    Long getRecruiterId();

    String getTitle();

    String getDescription();

    String getLocation();

    BigDecimal getSalaryMin();

    BigDecimal getSalaryMax();

    String getStatus();

    String getUtmSource();

    String getUtmMedium();

    OffsetDateTime getDeadline();

    OffsetDateTime getPublishedAt();

    OffsetDateTime getCreatedAt();

    OffsetDateTime getUpdatedAt();

    String getCreatedBy();

    String getUpdatedBy();
}
