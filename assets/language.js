const languagePicker = document.getElementById('siteLanguage');
const languages = Array.from(languagePicker.options, option => option.value);
let translation;

function loadTranslation() {
  if (!translation) {
    window.gtranslateSettings = {
      default_language: 'it',
      languages,
      wrapper_selector: '.gtranslate_wrapper',
      switcher_horizontal_position: 'inline'
    };

    translation = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
      script.onload = resolve;
      script.onerror = () => {
        translation = undefined;
        script.remove();
        reject(new Error('Traduzione non disponibile'));
      };
      document.body.append(script);
    });
  }
  return translation;
}

let currentLanguage = 'it';
try {
  const saved = JSON.parse(localStorage.getItem('__GT_TRANSLATE_LANGS'))?.tgtLang;
  if (languages.includes(saved)) currentLanguage = saved;
} catch {
  // Mantieni l’italiano se lo storage non è disponibile.
}

if (currentLanguage !== 'it') {
  languagePicker.value = currentLanguage;
  loadTranslation().catch(() => {
    currentLanguage = 'it';
    languagePicker.value = currentLanguage;
  });
}

languagePicker.addEventListener('change', async () => {
  languagePicker.setCustomValidity('');
  const next = languagePicker.value;
  languagePicker.disabled = true;
  try {
    await loadTranslation();
    window.doGTranslate(`it|${next}`);
    currentLanguage = next;
  } catch {
    languagePicker.value = currentLanguage;
    languagePicker.setCustomValidity('Traduzione non disponibile. Riprova.');
  } finally {
    languagePicker.disabled = false;
    languagePicker.reportValidity();
  }
});
