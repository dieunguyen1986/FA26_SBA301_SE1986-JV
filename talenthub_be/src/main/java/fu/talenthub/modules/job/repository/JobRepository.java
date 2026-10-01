package fu.talenthub.modules.job.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

public interface JobRepository extends Repository<String, String> {
}
