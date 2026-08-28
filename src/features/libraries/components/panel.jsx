export default function SysPanel({
  title,
  meta,
  action,
  className = "",
  children,
}) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          {meta ? <p>{meta}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
