package fu.talenthub.modules.job.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Job extends  BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Nationalized // Tự động map sang NVARCHAR(500)
    @Column(name = "title", length = 500)
    private String title;

    @Nationalized // Tự động map sang NVARCHAR(MAX)
    @Column(name = "description", columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Nationalized // Tự động map sang NVARCHAR(500)
    @Column(name = "location", length = 500)
    private String location;

    @Column(name = "salary_min", precision = 15, scale = 2)
    private BigDecimal salaryMin;

    @Column(name = "salary_max", precision = 15, scale = 2)
    private BigDecimal salaryMax;

    @Column(name = "status", length = 50)
    @Enumerated(EnumType.STRING)
    private JobStatus status;

    @Column(name = "utm_source", length = 150)
    private String utmSource;

    @Column(name = "utm_medium", length = 150)
    private String utmMedium;

    @Column(name = "deadline")
    private OffsetDateTime deadline;

    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;

    @OneToMany(mappedBy = "job")
    private List<JobSkills> jobSkills = new ArrayList<>();
}
