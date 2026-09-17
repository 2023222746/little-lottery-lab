import { NavLink, Outlet } from "react-router-dom";
import { PRODUCTS } from "../config/products";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">Little Lottery Data Laboratory</h1>
        <p className="app-subtitle">Magnum Lucky Number Booklet</p>

        <nav className="app-nav">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          {PRODUCTS.map((p) => (
            <NavLink
              key={p.id}
              to={`/${p.path}`}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " nav-link-active" : "")
              }
            >
              {p.short}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <small>For personal use only — not a prediction tool.</small>
      </footer>
    </div>
  );
}

