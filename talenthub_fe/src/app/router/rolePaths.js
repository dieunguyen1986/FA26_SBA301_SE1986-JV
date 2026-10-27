export const ROLE_PATHS = {
  ADMIN: "/admin",
  RECRUITER: "/recruiter",
  CANDIDATE: "/candidate",
};

export const normalizeRoles = (roles) =>
  Array.isArray(roles)
    ? roles
        .filter((role) => typeof role === "string")
        .map((role) => role.trim().toUpperCase().replace(/^ROLE_/, ""))
    : [];

export const getRoleHomePath = (roles = []) => {
  const normalizedRoles = normalizeRoles(roles);

  if (normalizedRoles.includes("ADMIN")) return ROLE_PATHS.ADMIN;
  if (normalizedRoles.includes("RECRUITER")) {
    console.log("User has RECRUITER role, redirecting to recruiter home path.");
    return ROLE_PATHS.RECRUITER;
  }
  if (normalizedRoles.includes("CANDIDATE")) return ROLE_PATHS.CANDIDATE;

  return null;
};
