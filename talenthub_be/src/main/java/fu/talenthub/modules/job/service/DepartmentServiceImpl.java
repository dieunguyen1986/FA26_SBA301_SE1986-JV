package fu.talenthub.modules.job.service;

import fu.talenthub.modules.job.dto.DepartmentResponse;
import fu.talenthub.modules.job.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentRepository departmentRepository;

    @Override
    @Transactional
    public List<DepartmentResponse> findAll() {
        return departmentRepository.findAll().stream().map((department) -> {
            return DepartmentResponse.builder()
                    .id(department.getId())
                    .departmentName(department.getDepartmentName())
                    .description(department.getDescription())
                    .build();

        }).toList();
    }
}
