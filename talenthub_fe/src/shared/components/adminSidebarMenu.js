import { Briefcase, Grid1x2, PersonVcard, People } from "react-bootstrap-icons";

export const menuGroupsByRole = {
  ADMIN: [
    {
      label: "TỔNG QUAN",
      items: [{ label: "Dashboard", to: "/admin", icon: Grid1x2, end: true }],
    },
    {
      label: "QUẢN LÝ",
      items: [
        { label: "Ứng viên", to: "/admin/candidates", icon: PersonVcard },
        { label: "Tin tuyển dụng", to: "/admin/jobs", icon: Briefcase },
      ],
    },
  ],
  RECRUITER: [
    {
      label: "TỔNG QUAN",
      items: [{ label: "Dashboard", to: "/recruiter", icon: Grid1x2, end: true }],
    },
    {
      label: "TUYỂN DỤNG",
      items: [
        { label: "Tin tuyển dụng", to: "/recruiter/jobs", icon: Briefcase },
        { label: "Ứng viên", to: "/recruiter/candidates", icon: People },
      ],
    },
  ],
};
