import { NavLink } from "react-router-dom";
import { ROUTES } from "router/routeConstants";
import './Header.scss'

function Header() {
  const links = [
    { to: ROUTES.HOME, label: "Home", icon: "🏠" },
    { to: ROUTES.ABOUT, label: "About", icon: "👨‍💻" },
    { to: ROUTES.PROJECTS, label: "Projects", icon: "🚀" },
    { to: ROUTES.CONTACT, label: "Contact", icon: "📧" },
    { to: ROUTES.BLOG, label: "Blog", icon: "📝" },
  ];

  return (
    <header>
      <div className="brand">
        <h1 className="brand-title">
          <span className="brand-icon">⚡</span>
          {' '}
          Dinh's Portfolio
        </h1>
        <span className="brand-subtitle">Front-End Engineer</span>
      </div>
      <nav aria-label="Primary Navigation" className="main-nav">
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-label">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;