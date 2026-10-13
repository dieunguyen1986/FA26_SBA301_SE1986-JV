import ApplicantList from "../../modules/candidates/pages/ApplicantList";
import RecruitmentJobList from "../../modules/jobs/pages/RecruitmentJobList";
import RecruitmentJobDetail from "../../modules/jobs/pages/RecruitmentJobDetail";
import RecruitmentJobCreate from "../../modules/jobs/pages/RecruitmentJobCreate";
import AdminDashdoard from "../../shared/components/AdminDashdoard";
import AdminFeaturePage from "../../shared/components/AdminFeaturePage";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRouter from "./ProtectedRouter";

export const adminRoutes = [
  {
    element: <ProtectedRouter allowedRoles={["ADMIN"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashdoard /> },
          { path: "candidates", element: <ApplicantList /> },
          { path: "jobs", element: <RecruitmentJobList /> },
          { path: "jobs/new", element: <RecruitmentJobCreate /> },
          { path: "jobs/:jobId", element: <RecruitmentJobDetail /> },
          {
            path: "settings",
            element: (
              <AdminFeaturePage
                title="Cài đặt hệ thống"
                description="Quản lý cấu hình chung của TalentHub."
              />
            ),
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRouter allowedRoles={["RECRUITER"]} />,
    children: [
      {
        path: "/recruiter",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashdoard /> },
          { path: "jobs", element: <RecruitmentJobList /> },
          { path: "jobs/new", element: <RecruitmentJobCreate /> },
          { path: "jobs/:jobId", element: <RecruitmentJobDetail /> },
          { path: "candidates", element: <ApplicantList /> },
          {
            path: "settings",
            element: (
              <AdminFeaturePage
                title="Cài đặt tài khoản"
                description="Quản lý thông tin và tùy chọn tài khoản tuyển dụng."
                backPath="/recruiter"
              />
            ),
          },
        ],
      },
    ],
  },
];
