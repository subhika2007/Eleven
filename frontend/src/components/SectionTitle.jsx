export default function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="section-title text-center">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      <div className="ornament"><span /></div>
      {children && <p className="text-muted mb-0">{children}</p>}
    </div>
  );
}
