function Icon({ children, filled = false, className = "", ...rest }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function IconHome(props) {
  return (
    <Icon {...props}>
      <path d="M3.5 10.5 12 3.2l8.5 7.3" />
      <path d="M5.2 9.4V20.2a.8.8 0 0 0 .8.8h4.3v-5.6h3.4V21h4.3a.8.8 0 0 0 .8-.8V9.4" />
    </Icon>
  );
}

export function IconGrid(props) {
  return (
    <Icon {...props}>
      <rect x="3.3" y="3.3" width="7" height="7" rx="1.6" />
      <rect x="13.7" y="3.3" width="7" height="7" rx="1.6" />
      <rect x="3.3" y="13.7" width="7" height="7" rx="1.6" />
      <rect x="13.7" y="13.7" width="7" height="7" rx="1.6" />
    </Icon>
  );
}

export function IconCard(props) {
  return (
    <Icon {...props}>
      <rect x="2.8" y="5.3" width="18.4" height="13.4" rx="2" />
      <line x1="2.8" y1="9.6" x2="21.2" y2="9.6" />
      <line x1="6.4" y1="14.6" x2="12.4" y2="14.6" />
    </Icon>
  );
}

export function IconUsers(props) {
  return (
    <Icon {...props}>
      <circle cx="9.2" cy="8.2" r="3.4" />
      <path d="M2.8 20.2c0-3.4 2.9-6 6.4-6s6.4 2.6 6.4 6" />
      <path d="M15.6 3.6a3.4 3.4 0 0 1 0 6.6" />
      <path d="M18.6 14.6c2.3.5 4 2.7 4 5.6" />
    </Icon>
  );
}

export function IconBarChart(props) {
  return (
    <Icon {...props}>
      <line x1="5" y1="20" x2="5" y2="13.5" />
      <line x1="12" y1="20" x2="12" y2="5" />
      <line x1="19" y1="20" x2="19" y2="10" />
    </Icon>
  );
}

export function IconCircleOutline(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
    </Icon>
  );
}

export function IconBell(props) {
  return (
    <Icon {...props}>
      <path d="M18.2 8.6a6.2 6.2 0 0 0-12.4 0c0 7.1-2.8 9.2-2.8 9.2h18s-2.8-2.1-2.8-9.2Z" />
      <path d="M13.9 20.8a2.1 2.1 0 0 1-3.8 0" />
    </Icon>
  );
}

export function IconDots(props) {
  return (
    <Icon filled {...props}>
      <circle cx="12" cy="5.2" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="18.8" r="1.6" />
    </Icon>
  );
}

export function IconEye(props) {
  return (
    <Icon {...props}>
      <path d="M1.3 12S5 5.3 12 5.3 22.7 12 22.7 12 19 18.7 12 18.7 1.3 12 1.3 12Z" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  );
}

export function IconSearch(props) {
  return (
    <Icon {...props}>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <line x1="20.5" y1="20.5" x2="15.8" y2="15.8" />
    </Icon>
  );
}

export function IconPlus(props) {
  return (
    <Icon {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  );
}

export function IconGoogle(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" {...props}>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.44H12v4.62h6.46a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.56-5.17 3.56-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.88-3c-1.08.72-2.46 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.26a12 12 0 0 0 0 10.74l4.01-3.1Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.63l4.01 3.1c.95-2.85 3.6-4.96 6.73-4.96Z" />
    </svg>
  );
}

export function IconLinkedin(props) {
  return (
    <Icon filled {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#0A66C2" stroke="none" />
      <path fill="#fff" stroke="none" d="M7.8 9.9h2.6v8.2H7.8zm1.3-4.1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm3.4 4.1h2.5v1.1h.03c.35-.63 1.2-1.3 2.47-1.3 2.64 0 3.13 1.7 3.13 3.9v4.5h-2.6v-4c0-.95-.02-2.17-1.32-2.17-1.33 0-1.53 1.02-1.53 2.1v4.07h-2.6z" />
    </Icon>
  );
}
