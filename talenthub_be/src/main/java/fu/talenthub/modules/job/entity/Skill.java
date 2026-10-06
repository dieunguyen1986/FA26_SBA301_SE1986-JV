package fu.talenthub.modules.job.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "skills")
@Getter@Setter
@NoArgsConstructor@AllArgsConstructor
@SuperBuilder
public class Skill extends  BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "skill_name")
    private String skillName;

    private String category;

    @OneToMany(mappedBy = "skill")
    private List<JobSkills> jobSkills= new ArrayList<>();
}
