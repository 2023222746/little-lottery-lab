import { Link } from "react-router-dom";
import { PRODUCTS } from "../config/products";

import "./Home.css";  

export default function Home() {
  return (
    <div>
      <h2>Welcome</h2>
      <p>
        Pick a Magnum product below to view and manage your personal Lucky
        Numbers.
      </p>

      <div className="product-grid">
        {PRODUCTS.map((p) => (
          <Link key={p.id} to={`/${p.path}`} className="product-card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <code>{p.example}</code>
          </Link>
        ))}
      </div>
    </div>
  );
}

