package fu.talenthub.modules.job.service;


import fu.talenthub.modules.job.dto.JobCreationRequest;
import fu.talenthub.modules.job.dto.JobResponse;
import fu.talenthub.modules.job.dto.JobSearchCriteria;
import org.springframework.data.domain.Page;

public interface JobService {
    JobResponse createJob(JobCreationRequest request);

    Page<JobResponse> findAll(Integer index, Integer size);

    Page<JobResponse> searchJob(JobSearchCriteria criteria, Integer index, Integer size);
}
