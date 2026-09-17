import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByPath } from "../config/products";
import { luckyNumberService } from "../services/api";
import LuckyNumberForm from "../components/LuckyNumberForm";
import SavedNumberCard from "../components/SavedNumberCard";

export default function ProductPage() {
  const { productPath } = useParams();
  const product = getProductByPath(productPath);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);

  const refresh = async () => {
    if (!product) return;
    setLoading(true);
    setError("");
    try {
      const data = await luckyNumberService.list(product.id);
      setItems(data);
    } catch (err) {
      setError("Failed to load Lucky Numbers.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEditing(null);
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleSave = async (payload) => {
    setSaving(true);
    setError("");
    try {
      if (editing) {
        await luckyNumberService.update(editing.id, payload);
        setEditing(null);
      } else {
        await luckyNumberService.create(payload);
      }
      await refresh();
    } catch (err) {
      setError("Failed to save. Check your input.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm("Delete this Lucky Number?")) return;
    try {
      await luckyNumberService.remove(item.id);
      if (editing?.id === item.id) setEditing(null);
      await refresh();
    } catch (err) {
      setError("Failed to delete.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>
        Example: <code>{product.example}</code>
      </p>

      <hr style={{ margin: "1.5rem 0" }} />

      <LuckyNumberForm
        product={product}
        initialValues={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
        saving={saving}
      />

      <h3>Saved Lucky Numbers</h3>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "#dc2626" }}>{error}</p>}

      {!loading && items.length === 0 && (
        <p style={{ color: "#6b7280" }}>
          No saved numbers yet. Add one above.
        </p>
      )}

      {!loading &&
        items.map((item) => (
          <SavedNumberCard
            key={item.id}
            item={item}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))}
    </div>
  );
}


