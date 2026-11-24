const UnitToggle = ({ unit, onChange }) => (
  <div className="unit-toggle" aria-label="Ubah satuan suhu">
    <button className={unit === 'metric' ? 'active' : ''} onClick={() => onChange('metric')} aria-pressed={unit === 'metric'}>°C</button>
    <button className={unit === 'imperial' ? 'active' : ''} onClick={() => onChange('imperial')} aria-pressed={unit === 'imperial'}>°F</button>
  </div>
);

export default UnitToggle;
