import languages from './data/languages.js';

export function createLanguageObject(lang) {

    if (languages[lang] === undefined) {
        return null
    }
    else {
        return {
            filename: languages[lang].filename || "",
            command: languages[lang].command || "",
        }
    }
}