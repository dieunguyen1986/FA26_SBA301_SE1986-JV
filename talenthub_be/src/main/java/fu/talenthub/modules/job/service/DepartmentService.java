package fu.talenthub.modules.job.service;

import fu.talenthub.modules.job.dto.DepartmentResponse;

import java.util.List;

public interface DepartmentService {
    List<DepartmentResponse> findAll();
}
