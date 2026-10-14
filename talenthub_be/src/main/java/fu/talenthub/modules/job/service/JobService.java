package fu.talenthub.modules.job.service;


import fu.talenthub.modules.job.dto.JobCreationRequest;
import fu.talenthub.modules.job.dto.JobResponse;
import fu.talenthub.modules.job.dto.JobSearchCriteria;
import fu.talenthub.modules.job.entity.JobStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface JobService {
    JobResponse createJob(JobCreationRequest request);

    Page<JobResponse> findAll(Integer index, Integer size);

    Page<JobResponse> searchJob(JobSearchCriteria criteria, Integer index, Integer size);

    Slice<JobResponse> findAllByStatus(Integer page, Integer size);
}
