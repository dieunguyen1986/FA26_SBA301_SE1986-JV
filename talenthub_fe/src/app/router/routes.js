import { createBrowserRouter } from "react-router";
import { adminRoutes } from "./admin.routes";
import { candidateRoutes } from "./candidate.routes";
import { publicRoutes } from "./public.routes";

export const routes = createBrowserRouter([
  ...adminRoutes,
  ...candidateRoutes,
  ...publicRoutes,
]);
