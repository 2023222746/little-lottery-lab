import "./SavedNumberCard.css";

export default function SavedNumberCard({ item, onEdit, onDelete }) {
  return (
    <div className="saved-card">
      <div className="saved-card-top">
        <div className="saved-numbers">
          {item.numbers.map((n, i) => (
            <span key={i} className="number-chip">
              {n}
            </span>
          ))}
        </div>
        <div className="saved-actions">
          <button className="icon-btn" onClick={() => onEdit(item)}>
            Edit
          </button>
          <button
            className="icon-btn icon-btn-danger"
            onClick={() => onDelete(item)}
          >
            Delete
          </button>
        </div>
      </div>

      {item.note && <p className="saved-note">“{item.note}”</p>}

      <small className="saved-date">
        Saved {new Date(item.created_at).toLocaleDateString()}
      </small>
    </div>
  );
}

