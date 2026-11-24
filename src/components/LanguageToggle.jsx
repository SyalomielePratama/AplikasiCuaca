const LanguageToggle = ({ language, onChange }) => {
  const nextLanguage = language === 'id' ? 'en' : 'id';
  const activeLabel = language === 'id' ? '🇮🇩 ID' : '🇬🇧 EN';

  return (
    <button
      type="button"
      className="language-toggle"
      onClick={() => onChange(nextLanguage)}
      aria-label={language === 'id' ? 'Ganti bahasa ke Inggris' : 'Change language to Indonesian'}
      title={language === 'id' ? 'English' : 'Bahasa Indonesia'}
    >
      <span className="language-indicator" aria-hidden="true"></span>
      <strong>{activeLabel}</strong>
    </button>
  );
};

export default LanguageToggle;
