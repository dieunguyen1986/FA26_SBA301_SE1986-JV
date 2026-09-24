import { Outlet } from "react-router";
import CareerSiteFooter from "../../shared/components/CareerSiteFooter";
import CareerSiteHeader from "../../shared/components/CareerSiteHeader";
import CareerSiteHero from "../../shared/components/CareerSiteHero";

const PublicLayout = () => {
  return (
    <div className="min-vh-100 bg-light">
      <CareerSiteHeader />
      <main>
        <CareerSiteHero />
        <Outlet />
      </main>
      <CareerSiteFooter />
    </div>
  );
};

export default PublicLayout;
