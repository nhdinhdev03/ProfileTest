import { NavLink } from "react-router-dom";
import { ROUTES } from "router/routeConstants";

function Header() {
  const links = [
    { to: ROUTES.HOME, label: "Home" },
    { to: ROUTES.ABOUT, label: "About" },
    { to: ROUTES.PROJECTS, label: "Projects" },
    { to: ROUTES.CONTACT, label: "Contact" },
    { to: ROUTES.BLOG, label: "Blog" },
  ];

  return (
    <header>
      <h1 className="brand-title">My Portfolio</h1>
      <nav aria-label="Primary">
        <ul>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;