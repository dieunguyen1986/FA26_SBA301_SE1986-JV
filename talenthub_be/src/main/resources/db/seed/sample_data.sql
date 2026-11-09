-- TalentHub sample data for local/demo environments only.
-- This file is intentionally outside db/migration, so Flyway will not run it
-- automatically on production databases.
--
-- Sample accounts:
--   admin@talenthub.local     / 12345  (ADMIN)
--   recruiter@talenthub.local / 12345  (RECRUITER)
--   candidate@talenthub.local / 12345  (CANDIDATE)
--
-- Run from the project root with DBeaver or psql after V1__init_schema.sql:
--   psql "$DATABASE_URL" -f src/main/resources/db/seed/sample_data.sql

BEGIN;

-- Stable UUIDs make the script safe to run repeatedly in a demo database.
INSERT INTO departments (
    id, created_at, updated_at, created_by, updated_by, is_deleted,
    department_name, description
)
VALUES
    ('11111111-1111-1111-1111-111111111111', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE, 'Engineering',
     'Software engineering and technology roles'),
    ('22222222-2222-2222-2222-222222222222', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE, 'Business',
     'Business, sales and operations roles'),
    ('33333333-3333-3333-3333-333333333333', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE, 'Design',
     'Product and user experience roles')
ON CONFLICT (department_name) DO NOTHING;

INSERT INTO roles (
    role_name, description, created_at, updated_at, created_by, updated_by, is_deleted
)
VALUES
    ('CANDIDATE', 'Can view and search published jobs', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE),
    ('RECRUITER', 'Can create and manage jobs', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE),
    ('ADMIN', 'Can administer the TalentHub platform', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE)
ON CONFLICT (role_name) DO NOTHING;

INSERT INTO skills (
    id, created_at, updated_at, created_by, updated_by, is_deleted, skill_name, category
)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE, 'Java', 'Backend'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE, 'Spring Boot', 'Backend'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE, 'PostgreSQL', 'Database'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE, 'React', 'Frontend'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE, 'Figma', 'Design')
ON CONFLICT (id) DO NOTHING;

-- BCrypt hash generated for the sample password: 12345.
-- Never use this password or these sample accounts in production.
INSERT INTO users (
    department_id, full_name, email, password_hash, phone, sso_provider_id,
    status, created_at, updated_at, created_by, updated_by, is_deleted
)
VALUES
    ((SELECT id FROM departments WHERE department_name = 'Business'),
     'TalentHub Admin', 'admin@talenthub.local',
     '$2a$10$ETow6k0g8gSMmiJnPFjd5.Ns9/dUYFnGoj1hADWRr8zVSTehTPlIS',
     '0900000001', NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE),
    ((SELECT id FROM departments WHERE department_name = 'Engineering'),
     'TalentHub Recruiter', 'recruiter@talenthub.local',
     '$2a$10$ETow6k0g8gSMmiJnPFjd5.Ns9/dUYFnGoj1hADWRr8zVSTehTPlIS',
     '0900000002', NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE),
    ((SELECT id FROM departments WHERE department_name = 'Engineering'),
     'TalentHub Candidate', 'candidate@talenthub.local',
     '$2a$10$ETow6k0g8gSMmiJnPFjd5.Ns9/dUYFnGoj1hADWRr8zVSTehTPlIS',
     '0900000003', NULL, 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'sample-seed', 'sample-seed', FALSE)
ON CONFLICT (email) DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.role_name = 'ADMIN'
WHERE u.email = 'admin@talenthub.local'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.role_name = 'RECRUITER'
WHERE u.email = 'recruiter@talenthub.local'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.role_name = 'CANDIDATE'
WHERE u.email = 'candidate@talenthub.local'
ON CONFLICT DO NOTHING;

INSERT INTO jobs (
    id, created_at, updated_at, created_by, updated_by, is_deleted,
    title, description, location, salary_min, salary_max, status,
    utm_source, utm_medium, deadline, published_at, department_id
)
VALUES
    ('10101010-1010-1010-1010-101010101010', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'recruiter@talenthub.local', 'recruiter@talenthub.local', FALSE,
     'Junior Java Backend Developer',
     'Build and maintain REST APIs with Java and Spring Boot.',
     'Ho Chi Minh City', 1200.00, 1800.00, 'PUBLISHED',
     'sample', 'seed', CURRENT_TIMESTAMP + INTERVAL '60 days', CURRENT_TIMESTAMP,
     (SELECT id FROM departments WHERE department_name = 'Engineering')),
    ('20202020-2020-2020-2020-202020202020', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'recruiter@talenthub.local', 'recruiter@talenthub.local', FALSE,
     'Frontend Developer Intern',
     'Work with React to create accessible and responsive user interfaces.',
     'Da Nang', 400.00, 700.00, 'PUBLISHED',
     'sample', 'seed', CURRENT_TIMESTAMP + INTERVAL '45 days', CURRENT_TIMESTAMP,
     (SELECT id FROM departments WHERE department_name = 'Engineering')),
    ('30303030-3030-3030-3030-303030303030', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     'recruiter@talenthub.local', 'recruiter@talenthub.local', FALSE,
     'Product Designer',
     'Design user flows, wireframes and product experiences with Figma.',
     'Remote', 1000.00, 1600.00, 'DRAFT',
     'sample', 'seed', CURRENT_TIMESTAMP + INTERVAL '90 days', NULL,
     (SELECT id FROM departments WHERE department_name = 'Design'))
ON CONFLICT (id) DO NOTHING;

INSERT INTO job_skills (job_id, skill_id)
SELECT '10101010-1010-1010-1010-101010101010'::uuid, s.id
FROM skills s
WHERE s.skill_name IN ('Java', 'Spring Boot', 'PostgreSQL')
  AND NOT EXISTS (
      SELECT 1
      FROM job_skills js
      WHERE js.job_id = '10101010-1010-1010-1010-101010101010'::uuid
        AND js.skill_id = s.id
  );

INSERT INTO job_skills (job_id, skill_id)
SELECT '20202020-2020-2020-2020-202020202020'::uuid, s.id
FROM skills s
WHERE s.skill_name IN ('React', 'PostgreSQL')
  AND NOT EXISTS (
      SELECT 1
      FROM job_skills js
      WHERE js.job_id = '20202020-2020-2020-2020-202020202020'::uuid
        AND js.skill_id = s.id
  );

INSERT INTO job_skills (job_id, skill_id)
SELECT '30303030-3030-3030-3030-303030303030'::uuid, s.id
FROM skills s
WHERE s.skill_name = 'Figma'
  AND NOT EXISTS (
      SELECT 1
      FROM job_skills js
      WHERE js.job_id = '30303030-3030-3030-3030-303030303030'::uuid
        AND js.skill_id = s.id
  );

COMMIT;
