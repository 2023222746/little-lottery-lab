import { useParams } from "react-router-dom";
import { getProductByPath } from "../config/products";

export default function ProductPage() {
  const { productPath } = useParams();
  const product = getProductByPath(productPath);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>
        Example: <code>{product.example}</code>
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <p style={{ color: "#6b7280" }}>
        Your saved Lucky Numbers will appear here soon.
      </p>
    </div>
  );
}

