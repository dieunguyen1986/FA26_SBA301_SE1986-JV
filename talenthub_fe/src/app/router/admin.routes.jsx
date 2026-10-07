import ApplicantList from "../../modules/candidates/pages/ApplicantList";
import JobList from "../../modules/jobs/pages/JobList";
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
          { path: "jobs", element: <JobList /> },
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
          { path: "jobs", element: <JobList /> },
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
