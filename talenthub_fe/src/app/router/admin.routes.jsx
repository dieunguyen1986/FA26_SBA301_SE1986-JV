import ApplicantList from "../../modules/candidates/pages/ApplicantList";
import AdminDashdoard from "../../shared/components/AdminDashdoard";
import AdminLayout  from "../layouts/AdminLayout";
export const adminRoutes = [ // Routes
    {path: "/admin", element:<AdminLayout/>, children: [ // Route
        {index: true, element: <AdminDashdoard />}, // Children Roue
        {path: "candidates", element: <ApplicantList/>},
        {path: "jobs", element: <>Job List/Management</>}

    ] }
];
