package fu.talenthub.modules.job.service;


import fu.talenthub.modules.job.dto.JobCreationRequest;
import fu.talenthub.modules.job.dto.JobResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface JobService {
    JobResponse createJob(JobCreationRequest request);

    Page<JobResponse> findAll(Integer index, Integer size);
}
