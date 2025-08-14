import { useState, useMemo } from "react";

const BASE = import.meta.env.VITE_SERVER_URL;
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
});

const emptyForm = {
  label: "Home",
  fullName: "",
  phone: "",
  company: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postCode: "",
  country: "",
  isDefault: false,
};

export default function AddressForm({
  title = "Add Address",
  initial = emptyForm,
  addressId = null,
  onCancel,
  onSaved,
}) {
  const [form, setForm] = useState({ ...emptyForm, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const requiredOk = useMemo(() => {
    const f = form;
    return (
      f.fullName.trim() &&
      f.phone.trim() &&
      f.line1.trim() &&
      f.city.trim() &&
      (f.postCode?.trim() || f.postCode?.trim()) &&
      f.country.trim()
    );
  }, [form]);

  function update(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!requiredOk || saving) return;

    try {
      setSaving(true);
      setError("");

      const payload = { ...form };

      const url = addressId
        ? `${BASE}/me/addresses/${addressId}`
        : `${BASE}/me/addresses`;
      const method = addressId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.message;
        throw new Error(msg || `Save failed (${res.status})`);
      }

      // backend returns full updated list of addresses
      const json = await res.json();
      onSaved?.(json);
    } catch (err) {
      setError(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="address-form-card">
      {error && <div className="alert error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="field-row">
            <div className="field">
              <label>Label</label>
              <input
                value={form.label}
                onChange={(e) => update("label", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Full name *</label>
              <input
                required
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Phone *</label>
              <input
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Company</label>
              <input
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Address line 1 *</label>
              <input
                required
                value={form.line1}
                onChange={(e) => update("line1", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Address line 2</label>
              <input
                value={form.line2}
                onChange={(e) => update("line2", e.target.value)}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>City *</label>
              <input
                required
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>
            <div className="field">
              <label>State/Region</label>
              <input
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Post code *</label>
              <input
                required
                value={form.postCode}
                onChange={(e) => update("postCode", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Country *</label>
              <input
                required
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={!!form.isDefault}
                onChange={(e) => update("isDefault", e.target.checked)}
              />
              Set as default
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" disabled={!requiredOk || saving}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
