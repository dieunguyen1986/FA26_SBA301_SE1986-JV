import ApplicantList from "../../modules/candidates/pages/ApplicantList";
import JobList from "../../modules/jobs/pages/JobList";
import AdminDashdoard from "../../shared/components/AdminDashdoard";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRouter from "./ProtectedRouter";
export const adminRoutes = [
  // Routes
  {
    element: <ProtectedRouter allowedRoles={["ADMIN"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          // Route
          { index: true, element: <AdminDashdoard /> }, // Children Roue
          { path: "candidates", element: <ApplicantList /> },
          { path: "jobs", element: <>Job List/Management</> },
        ],
      },

    ],
  },

  {
    element: <ProtectedRouter allowedRoles={["ADMIN"]} />,
    children: [
      {path: "/recruiter", element: <AdminLayout />, children: [
        { index: true, element: <AdminDashdoard /> },
        {path: "jobs", element: <JobList />},
      ]},
    ]
  }
];
