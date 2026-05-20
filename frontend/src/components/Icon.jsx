export default function Icon({ name, className = '', filled = false, style }) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'icon-fill' : ''} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
