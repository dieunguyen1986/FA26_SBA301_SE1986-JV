package fu.talenthub.modules.job.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobApiResponse {
    private List<JobResponse> content;
    private Boolean nextPage;
    private Integer currentPage;
}
