import { useMemo, useState } from "react";
import { useUser } from "../contexts/UserContext";

export default function AccountDetails({
  initialUser,
  onSave, 
  onLogout,
}) {
  const { user } = useUser();

  const base = initialUser || user || {};
  const initial = {
    fullName: `${base.firstName || ""} ${base.lastName || ""}`.trim() || "",
    email: base.email || "",
    phone: base.phoneNumber || "",
    password: "",
    confirmPassword: "",
    newsletter: false,
  };

  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const disabled = useMemo(
    () =>
      !form.fullName ||
      !form.email ||
      (form.password && form.password !== form.confirmPassword),
    [form]
  );

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phone,
      password: form.password || undefined,
      newsletter: form.newsletter,
    };

    try {
      if (onSave) {
        await onSave(payload);
      } else {
        // no API wired yet—just log for now
        console.info("[AccountDetails] save payload", payload);
      }
      setSaved(true);
    } catch (err) {
      console.error("[AccountDetails] save error", err);
      setSaved(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h3>Account Details</h3>

      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            className="form-control"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            className="form-control"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Password Confirmation</label>
          <input
            type="password"
            className="form-control"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </div>

        <div className="form-check my-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="newsletterCheck"
            checked={form.newsletter}
            onChange={(e) => setForm({ ...form, newsletter: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="newsletterCheck">
            Subscribe to GlowNest's newsletter for product updates and
            promotions.
          </label>
        </div>

        <div className="profile-btns">
          <button type="submit" disabled={disabled || saving}>
            {saving ? "Saving…" : saved ? "Saved" : "Save Changes"}
          </button>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </form>
    </>
  );
}
