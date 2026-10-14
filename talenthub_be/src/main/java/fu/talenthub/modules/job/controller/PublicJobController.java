package fu.talenthub.modules.job.controller;

import fu.talenthub.modules.job.dto.JobApiResponse;
import fu.talenthub.modules.job.dto.JobResponse;
import fu.talenthub.modules.job.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/public/jobs")
@RequiredArgsConstructor
@Slf4j
public class PublicJobController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<JobApiResponse> getPublishedJob(
            @RequestParam(name = "index", required = false, defaultValue = "0") Integer index,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size

    ) {

        Slice<JobResponse> jobResponses = jobService.findAllByStatus(index, size);

        return ResponseEntity.ok(new JobApiResponse(jobResponses.getContent(), jobResponses.hasNext(), jobResponses.getNumber()));
    }
}
