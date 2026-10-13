package fu.talenthub.modules.job.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.UUID;

@Data
@ToString
@Builder
public class DepartmentResponse {

    private UUID id;

    private String departmentName;

    private String description;

}

