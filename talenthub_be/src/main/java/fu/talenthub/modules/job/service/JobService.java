package fu.talenthub.modules.job.service;


import fu.talenthub.modules.job.dto.JobCreationRequest;
import fu.talenthub.modules.job.dto.JobResponse;

public interface JobService {
    JobResponse createJob(JobCreationRequest request)
}
