package fu.example.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter@Setter
@NoArgsConstructor@AllArgsConstructor
@Builder
public class StudentRequest {
    private  String fullName;
    private String email;
    private String phoneNumber;
    private String dateOfBirth;
    private MultipartFile studentFile;
}
