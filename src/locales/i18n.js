import locales from './Locales';

let _language = 'fr';
let _translations = locales.fr;

const translate = (_locales, key) => {
    return _locales
        ? _locales[key]
        : '';
};

const i18n = {

    /**
     * Change the current language. Load the locales of the new language
     *
     * @param {string} language New language to load
     * @returns
     */
    setLanguage: function(language) {
        if (!language || !(typeof language === 'string') || !locales.hasOwnProperty(language) || !locales[language]) {
            return false;
        }

        _language = language;

        _translations = locales[language];
        return true;
    },

    getCurrentLanguage: function() {
        return _language;
    },

    getCurrentTranslations: function() {
        return _translations;
    },

    i18n: function(key, translateObj) {
        if (arguments.length < 1) {
            console.log('missing arguments');
            return '';
        }

        try {
            let sentence = translate(_translations, key);
            if (translateObj) {
                for (let key in translateObj) {
                    sentence = sentence.split('{' + key + '}').join(translateObj[key]);
                }
            }
            return sentence;
        } catch (e) {
            console.log('Cannot get translation for "' + key + '" in ' + _language);
        }
    }
};

export default i18n;
