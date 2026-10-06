package fu.talenthub.modules.job.controller;

import fu.talenthub.modules.job.dto.JobCreationRequest;
import fu.talenthub.modules.job.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class SecuredJobController {
    private final JobService jobService;

    @PostMapping
    public ResponseEntity<?> createJob(@Valid @RequestBody JobCreationRequest request) {
        return ResponseEntity.ok(jobService.createJob(request));
    }

    @GetMapping
    public ResponseEntity<?> getJob(@RequestParam(name = "index", defaultValue = "0", required = false) Integer index,
                                    @RequestParam(name = "size", defaultValue = "10", required = false) Integer size

    ) {
        return ResponseEntity.ok(jobService.findAll(index, size));
    }
}
