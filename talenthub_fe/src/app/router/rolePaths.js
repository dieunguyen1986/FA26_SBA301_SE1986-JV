export const ROLE_PATHS = {
  ADMIN: "/admin",
  RECRUITER: "/recruiter",
  CANDIDATE: "/candidate",
};

export const getRoleHomePath = (roles = []) => {
  const normalizedRoles = Array.isArray(roles)
    ? roles.map((role) => role.toUpperCase())
    : [];

  if (normalizedRoles.includes("ADMIN")) return ROLE_PATHS.ADMIN;
  if (normalizedRoles.includes("RECRUITER")) return ROLE_PATHS.RECRUITER;
  if (normalizedRoles.includes("CANDIDATE")) return ROLE_PATHS.CANDIDATE;

  return null;
};
