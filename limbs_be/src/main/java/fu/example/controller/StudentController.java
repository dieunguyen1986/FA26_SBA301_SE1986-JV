package fu.example.controller;

import fu.example.dto.StudentRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students")
@Slf4j
@CrossOrigin("http://localhost:5173")
public class StudentController {

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> create(@ModelAttribute StudentRequest studentRequest) {
        log.info("Student request {}", studentRequest.getFullName());
        log.info("StudentController:create {}", studentRequest.getStudentFile().getOriginalFilename());

        return ResponseEntity.ok().build();
    }
}
