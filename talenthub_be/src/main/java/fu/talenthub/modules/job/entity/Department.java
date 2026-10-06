package fu.talenthub.modules.job.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "departments",
        uniqueConstraints = {@UniqueConstraint(name = "UNX_NAME", columnNames = {"department_name"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Department extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "department_name", nullable = false, length = 100)
    private String departmentName;

    private String description;

    @OneToMany(mappedBy = "department")
    private List<Job> jobs = new ArrayList<>();
}
