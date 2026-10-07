import CandidateDashboard from "../../modules/candidates/pages/CandidateDashboard";
import CareerSiteJobList from "../../modules/jobs/pages/CareerSiteJobList";
import PublicLayout from "../layouts/PublicLayout";
import ProtectedRouter from "./ProtectedRouter";

export const candidateRoutes = [
  {
    element: <ProtectedRouter allowedRoles={["CANDIDATE"]} />,
    children: [
      {
        path: "/candidate",
        element: <PublicLayout />,
        children: [
          { index: true, element: <CandidateDashboard /> },
          { path: "jobs", element: <CareerSiteJobList /> },
        ],
      },
    ],
  },
];
