package fu.talenthub.modules.job.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class JobSearchCriteria {
    private String title;
    private UUID departmentId;
    @Min(1)
    @Max(12)
    private Integer recruitmentMonth; // Month from 1 to 12
    private Integer recruitmentYear; // Four digit year
}
