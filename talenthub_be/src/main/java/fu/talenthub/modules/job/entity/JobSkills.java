package fu.talenthub.modules.job.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "job_skills")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobSkills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private Job job;

    @ManyToOne
    @JoinColumn(name = "skill_id", referencedColumnName = "id")
    private Skill skill;
}
