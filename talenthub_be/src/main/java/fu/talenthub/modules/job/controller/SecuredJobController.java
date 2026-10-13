package fu.talenthub.modules.job.controller;

import fu.talenthub.modules.job.dto.JobCreationRequest;
import fu.talenthub.modules.job.dto.JobResponse;
import fu.talenthub.modules.job.dto.JobSearchCriteria;
import fu.talenthub.modules.job.service.JobService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
//@CrossOrigin(origins = {"http://localhost:5173"})
@Slf4j
public class SecuredJobController {
    private final JobService jobService;

    @PostMapping
    public ResponseEntity<?> createJob(@Valid @RequestBody JobCreationRequest request) {
        return ResponseEntity.ok(jobService.createJob(request));
    }

    @GetMapping
    public ResponseEntity<Page<JobResponse>> getJobs(
            @RequestParam(name = "index", defaultValue = "0") @Min(0) Integer index,
            @RequestParam(name = "size", defaultValue = "10") @Min(1) @Max(50) Integer size,
            @Valid @ModelAttribute JobSearchCriteria criteria
    ) {
        log.info("index:{},size:{}, criteria: {}", index, size, criteria);
        return ResponseEntity.ok(jobService.searchJob(criteria, index, size));
    }
}
