

export default function Field({ label, error, children, hint }) {
  return (
    <label className="entity-field">
      <span>{label}</span>
      {children}
      {hint ? <small>{hint}</small> : null}
      {error ? <em role="alert">{error.message}</em> : null}
    </label>
  );
}
