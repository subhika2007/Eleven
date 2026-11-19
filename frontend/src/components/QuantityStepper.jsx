export default function QuantityStepper({ value, onChange, min = 1, max = 50, size = '' }) {
  return (
    <div className={`qty-stepper ${size}`} role="group" aria-label="Quantity">
      <button type="button" className="btn" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease quantity">
        <i className="bi bi-dash-lg" />
      </button>
      <span className="qty-value" aria-live="polite">{value}</span>
      <button type="button" className="btn" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase quantity">
        <i className="bi bi-plus-lg" />
      </button>
    </div>
  );
}
