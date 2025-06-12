import { useState } from "react";
import { createLabel } from "../queries/labels/createLabel";

export function AddLabelForm({ onLabelAdded, onCancel }) {
  const [newLabelName, setNewLabelName] = useState("");
  const [isCreatingLabel, setIsCreatingLabel] = useState(false);

  const handleCreateLabel = async (e) => {
    e.preventDefault();

    if (!newLabelName.trim()) {
      return;
    }

    setIsCreatingLabel(true);

    try {
      const labelData = {
        name: newLabelName.trim(),
      };

      const createdLabel = await createLabel(labelData);

      setNewLabelName("");

      if (onLabelAdded) {
        onLabelAdded(createdLabel);
      }
      setIsCreatingLabel(false);
    } catch (error) {
      console.error("Error creating label:", error);
      alert("Failed to create label. Please try again.");
    }
  };

  return (
    <div className="add-label-form">
      <div className="form-row">
        <input
          type="text"
          value={newLabelName}
          onChange={(e) => setNewLabelName(e.target.value)}
          placeholder="Label name"
          className="form-control label-input"
        />
        <button
          type="button"
          className="btn btn--small btn--secondary"
          onClick={onCancel}
          disabled={isCreatingLabel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn--small btn--primary"
          onClick={handleCreateLabel}
          disabled={isCreatingLabel || !newLabelName.trim()}
        >
          {isCreatingLabel ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
