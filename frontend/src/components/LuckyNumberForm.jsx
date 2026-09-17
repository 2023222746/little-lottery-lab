import { useEffect, useState } from "react";
import "./LuckyNumberForm.css";

const emptyFields = (product) =>
  Object.fromEntries(product.fields.map((f) => [f.key, ""]));

export default function LuckyNumberForm({
  product,
  initialValues,
  onSave,
  onCancel,
  saving,
}) {
  const [fields, setFields] = useState(emptyFields(product));
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  // When the user clicks Edit, initialValues is passed in
  useEffect(() => {
    if (initialValues) {
      const mapped = {};
      product.fields.forEach((f, i) => {
        mapped[f.key] = initialValues.numbers[i] || "";
      });
      setFields(mapped);
      setNote(initialValues.note || "");
    } else {
      setFields(emptyFields(product));
      setNote("");
    }
    setError("");
  }, [initialValues, product]);

  const handleChange = (key, value, length) => {
    // Keep only digits and cap length
    const digits = value.replace(/\D/g, "").slice(0, length);
    setFields((prev) => ({ ...prev, [key]: digits }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate all fields
    for (const f of product.fields) {
      const val = fields[f.key];
      if (!val || val.length !== f.length) {
        setError(`${f.label} must be ${f.length} digits.`);
        return;
      }
    }

    // Magnum Life: validate 01-36 for all numbers
    if (product.id === "magnum_life") {
      for (const f of product.fields) {
        const n = parseInt(fields[f.key], 10);
        if (n < 1 || n > 36) {
          setError(`${f.label} must be between 01 and 36.`);
          return;
        }
      }
    }

    const numbers = product.fields.map((f) => fields[f.key]);
    onSave({ product: product.id, numbers, note });
  };

  return (
    <form className="ln-form" onSubmit={handleSubmit}>
      <h3>{initialValues ? "Edit Lucky Number" : "Add Lucky Number"}</h3>

      <div className="ln-fields">
        {product.fields.map((f) => (
          <div key={f.key} className="ln-field">
            <label htmlFor={`${product.id}-${f.key}`}>{f.label}</label>
            <input
              id={`${product.id}-${f.key}`}
              type="text"
              inputMode="numeric"
              maxLength={f.length}
              value={fields[f.key]}
              placeholder={"0".repeat(f.length)}
              onChange={(e) => handleChange(f.key, e.target.value, f.length)}
            />
          </div>
        ))}
      </div>

      <div className="ln-field">
        <label htmlFor={`${product.id}-note`}>Personal Note</label>
        <textarea
          id={`${product.id}-note`}
          value={note}
          maxLength={500}
          rows={2}
          placeholder="My favourite number."
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {error && <p className="ln-error">{error}</p>}

      <div className="ln-actions">
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : initialValues ? "Update" : "Save"}
        </button>
        {initialValues && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={saving}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

