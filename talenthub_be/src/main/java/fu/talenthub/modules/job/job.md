# Job Module API Specification

## 1. Scope

Base URL: `/api/v1`

The module supports two roles:

- `ROLE_RECRUITER`: manages jobs owned by the authenticated recruiter.
- `ROLE_CANDIDATE`: views and searches public jobs.

The API exposes 7 endpoints. Candidate pagination and search are combined into one endpoint to keep the module small and consistent.

## 2. Job Status

The status is controlled by the server and must not be accepted from create/update requests.

```text
DRAFT -> PUBLISHED -> CLOSED
```

| Status | Meaning |
|---|---|
| `DRAFT` | Job is being prepared and is not visible to candidates. |
| `PUBLISHED` | Job is visible and searchable by candidates. |
| `CLOSED` | Job is no longer visible to candidates and cannot receive new applications. |

Rules:

- A job is created as `DRAFT`.
- Only the owner can preview, update, publish, close, or delete the job.
- Only `DRAFT` jobs can be deleted.
- Only `DRAFT` jobs can be published.
- Only `PUBLISHED` jobs can be closed.
- Candidate endpoints return `PUBLISHED` jobs only.
- Status transitions are one-way; reopening a closed job is not supported by this API.

## 3. Endpoint Overview

| # | Method | Endpoint | Role | Purpose |
|---:|---|---|---|---|
| 1 | `POST` | `/recruiter/jobs` | Recruiter | Create a draft job |
| 2 | `GET` | `/recruiter/jobs/{jobId}/preview` | Recruiter | Preview an owned job |
| 3 | `PUT` | `/recruiter/jobs/{jobId}` | Recruiter | Update an owned draft job |
| 4 | `DELETE` | `/recruiter/jobs/{jobId}` | Recruiter | Delete an owned draft job |
| 5 | `POST` | `/recruiter/jobs/{jobId}/publish` | Recruiter | Publish a draft job |
| 6 | `POST` | `/recruiter/jobs/{jobId}/close` | Recruiter | Close a published job |
| 7 | `GET` | `/jobs` | Candidate | View paginated published jobs and search |

All `{jobId}` values are UUIDs. Authentication is required for every endpoint.

## 4. Common Models

### 4.1 Job fields

| Field | Type | Required | Description |
|---|---|---:|---|
| `id` | `UUID` | Response only | Unique job identifier |
| `title` | `string` | Yes | Job title, 1–150 characters |
| `description` | `string` | Yes | Full job description |
| `requirements` | `string` | Yes | Candidate requirements |
| `benefits` | `string` | No | Benefits and perks |
| `location` | `string` | Yes | Work location |
| `workplaceType` | `string` | Yes | `ONSITE`, `HYBRID`, or `REMOTE` |
| `employmentType` | `string` | Yes | `FULL_TIME`, `PART_TIME`, `CONTRACT`, or `INTERNSHIP` |
| `experienceLevel` | `string` | No | Experience requirement |
| `salaryMin` | `number` | No | Minimum salary |
| `salaryMax` | `number` | No | Maximum salary |
| `currency` | `string` | No | ISO 4217 currency code, default `VND` |
| `skills` | `string[]` | No | Required or preferred skills |
| `applicationDeadline` | `string` | Yes | ISO-8601 date-time in UTC |
| `status` | `JobStatus` | Response only | Current job status |
| `publishedAt` | `string` | Response only | Publish time in UTC |
| `closedAt` | `string` | Response only | Close time in UTC |
| `createdAt` | `string` | Response only | Creation time in UTC |
| `updatedAt` | `string` | Response only | Last update time in UTC |

`recruiterId`, audit fields, and ownership are derived from the authenticated user and must not be accepted from the client.

### 4.2 Create/update request

`POST /recruiter/jobs` and `PUT /recruiter/jobs/{jobId}` use the same body. The `PUT` request is a full replacement of editable fields.

```json
{
  "title": "Java Backend Developer",
  "description": "Build and maintain backend services.",
  "requirements": "At least 2 years of Java and Spring experience.",
  "benefits": "Health insurance and annual bonus.",
  "location": "Ho Chi Minh City",
  "workplaceType": "HYBRID",
  "employmentType": "FULL_TIME",
  "experienceLevel": "MID_LEVEL",
  "salaryMin": 20000000,
  "salaryMax": 35000000,
  "currency": "VND",
  "skills": ["Java", "Spring Boot", "SQL Server"],
  "applicationDeadline": "2026-12-31T23:59:59Z"
}
```

Validation rules:

- `salaryMin` and `salaryMax` must be non-negative; when both exist, `salaryMin <= salaryMax`.
- `applicationDeadline` must be in the future when the job is published.
- `currency` must be a valid ISO 4217 code.
- A job must contain all required fields before it can be published.

### 4.3 Job response

```json
{
  "id": "0f8fad5b-d9cb-469f-a165-70867728950e",
  "title": "Java Backend Developer",
  "location": "Ho Chi Minh City",
  "workplaceType": "HYBRID",
  "employmentType": "FULL_TIME",
  "experienceLevel": "MID_LEVEL",
  "salaryMin": 20000000,
  "salaryMax": 35000000,
  "currency": "VND",
  "skills": ["Java", "Spring Boot", "SQL Server"],
  "applicationDeadline": "2026-12-31T23:59:59Z",
  "status": "PUBLISHED",
  "publishedAt": "2026-10-01T08:00:00Z",
  "closedAt": null,
  "createdAt": "2026-09-30T10:00:00Z",
  "updatedAt": "2026-10-01T08:00:00Z"
}
```

## 5. API Details

### 5.1 Create draft job

`POST /api/v1/recruiter/jobs`

**Role:** `ROLE_RECRUITER`

Creates a new job owned by the authenticated recruiter. The initial status is always `DRAFT`.

- `201 Created`: returns the created job.
- `400 Bad Request`: malformed JSON or invalid field format.
- `422 Unprocessable Entity`: validation failure.

### 5.2 Preview job

`GET /api/v1/recruiter/jobs/{jobId}/preview`

**Role:** `ROLE_RECRUITER`

Returns the complete job content for preview before publishing. The owner can preview a job in any status; candidates cannot use this endpoint.

- `200 OK`: returns the complete job.
- `403 Forbidden`: the job belongs to another recruiter.
- `404 Not Found`: the job does not exist.

### 5.3 Update draft job

`PUT /api/v1/recruiter/jobs/{jobId}`

**Role:** `ROLE_RECRUITER`

Replaces the editable fields of an owned `DRAFT` job. The request cannot change `id`, ownership, `status`, or audit timestamps.

- `200 OK`: returns the updated job.
- `403 Forbidden`: the job belongs to another recruiter.
- `404 Not Found`: the job does not exist.
- `409 Conflict`: the job is not in `DRAFT` status.
- `422 Unprocessable Entity`: validation failure.

### 5.4 Delete draft job

`DELETE /api/v1/recruiter/jobs/{jobId}`

**Role:** `ROLE_RECRUITER`

Permanently deletes an owned draft. Published and closed jobs must be closed or retained for audit purposes and cannot be deleted through this endpoint.

- `204 No Content`: deleted successfully.
- `403 Forbidden`: the job belongs to another recruiter.
- `404 Not Found`: the job does not exist.
- `409 Conflict`: the job is not in `DRAFT` status.

### 5.5 Publish job

`POST /api/v1/recruiter/jobs/{jobId}/publish`

**Role:** `ROLE_RECRUITER`

Validates all publish-required fields and changes the status from `DRAFT` to `PUBLISHED`. The server sets `publishedAt`.

- `200 OK`: returns the published job.
- `403 Forbidden`: the job belongs to another recruiter.
- `404 Not Found`: the job does not exist.
- `409 Conflict`: the job is not in `DRAFT` status.
- `422 Unprocessable Entity`: required data is missing or the deadline is not in the future.

### 5.6 Close job

`POST /api/v1/recruiter/jobs/{jobId}/close`

**Role:** `ROLE_RECRUITER`

Changes the status from `PUBLISHED` to `CLOSED`. The server sets `closedAt`, and the job is removed from candidate search results.

- `200 OK`: returns the closed job.
- `403 Forbidden`: the job belongs to another recruiter.
- `404 Not Found`: the job does not exist.
- `409 Conflict`: the job is not in `PUBLISHED` status.

### 5.7 View and search published jobs

`GET /api/v1/jobs`

**Role:** `ROLE_CANDIDATE`

Returns only `PUBLISHED` jobs. Pagination and search are handled by the same endpoint.

Query parameters:

| Parameter | Type | Default | Description |
|---|---|---:|---|
| `page` | `int` | `0` | Zero-based page index |
| `size` | `int` | `10` | Items per page, maximum `50` |
| `keyword` | `string` | Empty | Searches title, description, and skills |
| `location` | `string` | Empty | Case-insensitive location filter |
| `workplaceType` | `string` | Empty | `ONSITE`, `HYBRID`, or `REMOTE` |
| `employmentType` | `string` | Empty | `FULL_TIME`, `PART_TIME`, `CONTRACT`, or `INTERNSHIP` |
| `sort` | `string` | `publishedAt,desc` | Allowed fields: `publishedAt`, `createdAt`, `applicationDeadline` |

Example:

`GET /api/v1/jobs?page=0&size=10&keyword=java&location=Ho%20Chi%20Minh&workplaceType=HYBRID`

Response:

```json
{
  "content": [
    {
      "id": "0f8fad5b-d9cb-469f-a165-70867728950e",
      "title": "Java Backend Developer",
      "location": "Ho Chi Minh City",
      "workplaceType": "HYBRID",
      "employmentType": "FULL_TIME",
      "experienceLevel": "MID_LEVEL",
      "salaryMin": 20000000,
      "salaryMax": 35000000,
      "currency": "VND",
      "skills": ["Java", "Spring Boot"],
      "applicationDeadline": "2026-12-31T23:59:59Z",
      "status": "PUBLISHED"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 1,
  "totalPages": 1,
  "hasNext": false
}
```

- `200 OK`: returns a page, including an empty `content` array when no job matches.
- `400 Bad Request`: invalid pagination, sort, or filter value.

## 6. Common Error Response

```json
{
  "timestamp": "2026-10-01T08:00:00Z",
  "status": 409,
  "code": "INVALID_JOB_STATUS",
  "message": "Only a DRAFT job can be published.",
  "path": "/api/v1/recruiter/jobs/0f8fad5b-d9cb-469f-a165-70867728950e/publish"
}
```

Authentication failures use `401 Unauthorized`; authorization failures use `403 Forbidden`; missing resources use `404 Not Found`.
