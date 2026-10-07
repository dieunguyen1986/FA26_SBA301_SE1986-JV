package fu.talenthub.modules.job.service;

import fu.talenthub.modules.job.dto.JobCreationRequest;
import fu.talenthub.modules.job.dto.JobResponse;
import fu.talenthub.modules.job.entity.Department;
import fu.talenthub.modules.job.entity.Job;
import fu.talenthub.modules.job.entity.JobStatus;
import fu.talenthub.modules.job.repository.DepartmentRepository;
import fu.talenthub.modules.job.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public JobResponse createJob(JobCreationRequest request) {
        // Validate


        // Map to Entity
        // Call Repo & map to response
        Job jobEntity = toEntity(request);
        if (request.getDepartmentId() != null) {
            Department department = departmentRepository.findById(request.getDepartmentId()).orElse(null);
            if (department != null) {
                jobEntity.setDepartment(department);
            }
        }
        Job result = jobRepository.save(jobEntity);

        log.info("Result {}", result.getTitle());
        return toDto(result);
    }

    @Override
    public Page<JobResponse> findAll(Integer index, Integer size) {
        Pageable pageRequest = PageRequest.of(index, size);
        return jobRepository.findAll(pageRequest).map((job) -> {
            return toDto(job);
        });
    }

    private Job toEntity(JobCreationRequest request) {
        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .location(request.getLocation())
                .salaryMin(request.getSalaryMin())
                .salaryMax(request.getSalaryMax()).status(JobStatus.DRAFT)
                .utmSource(request.getUtmSource())
                .utmMedium(request.getUtmMedium()).deadline(request.getDeadline())
                .createdAt(OffsetDateTime.now())
                .isDeleted(false)
                .build();

        return job;
    }

    private JobResponse toDto(Job job) {
        JobResponse response = new JobResponse();
        response.setTitle(job.getTitle());
        response.setDescription(job.getDescription());
        response.setLocation(job.getLocation());
        response.setSalaryMin(job.getSalaryMin());
        response.setSalaryMax(job.getSalaryMax());
        response.setStatus(job.getStatus() != null ? job.getStatus().name() : null);
        response.setUtmSource(job.getUtmSource());
        response.setUtmMedium(job.getUtmMedium());
        response.setDeadline(job.getDeadline());
        response.setPublishedAt(job.getPublishedAt());
        response.setCreatedAt(job.getCreatedAt());
        response.setUpdatedAt(job.getUpdatedAt());
        response.setCreatedBy(job.getCreatedBy());
        response.setUpdatedBy(job.getUpdatedBy());
        response.setDepartmentName(job.getDepartment().getDepartmentName());
        return response;
    }
}
