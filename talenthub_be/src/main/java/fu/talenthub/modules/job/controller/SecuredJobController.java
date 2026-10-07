package fu.talenthub.modules.job.controller;

import fu.talenthub.modules.job.dto.JobCreationRequest;
import fu.talenthub.modules.job.dto.JobSearchCriteria;
import fu.talenthub.modules.job.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173"})
@Slf4j
public class SecuredJobController {
    private final JobService jobService;

    @PostMapping
    public ResponseEntity<?> createJob(@Valid @RequestBody JobCreationRequest request) {
        return ResponseEntity.ok(jobService.createJob(request));
    }

    @GetMapping
    public ResponseEntity<?> getJob(@RequestParam(name = "index", defaultValue = "0", required = false) Integer index,
                                    @RequestParam(name = "size", defaultValue = "10", required = false) Integer size
                                    , JobSearchCriteria criteria
    ) {
        log.info("index:{},size:{}", index, size);
        return ResponseEntity.ok(jobService.findAll(index, size));
    }
}
