import CareerSiteJobList from "../../modules/jobs/pages/CareerSiteJobList";
import PublicLayout from "../layouts/PublicLayout";
import Login from "../../modules/auths/pages/Login";
import Register from "../../modules/auths/pages/Register";

export const publicRoutes = [
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "/", element: <PublicLayout />, children: [
        {index: true, element: <>Home Page</>},
        {path: "jobs", element: <CareerSiteJobList />}
    ]}
];