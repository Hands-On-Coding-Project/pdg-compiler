import languages from './data/languages.js';

export function createLanguageObject(lang) {
    return {
        filename: languages[lang].filename,
        command: languages[lang].command,
    }
}