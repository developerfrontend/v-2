import _ from 'lodash';

// dictionary
import {
    NonTranslated,
    Translated,
} from 'dictionary';

// constants
import { Constants } from 'domains/system';

function languageAvailable (language) {
    const {
        AvailableLanguages,
    } = Constants;

    return _.some(
        Object.keys(AvailableLanguages),
        (key) => AvailableLanguages[key] === language
    );
}

function getTranslatedLabel (label, currentLanguage) {

    if (!currentLanguage) {
        throw new Error(`No language was passsed. ${currentLanguage}`);
    }

    if (!languageAvailable(currentLanguage)) {
        throw new Error(`This language is not supported. ${currentLanguage}`);
    }

    const currentDictionary = Translated[currentLanguage];

    if (!currentDictionary) {
        throw new Error(`Dictionary for this language not found. ${currentLanguage}`);
    }

    let translatedLabel = currentDictionary[label];

    if (translatedLabel) {
        return translatedLabel;
    }

    translatedLabel = NonTranslated[label];

    if (translatedLabel) {
        return `### ${translatedLabel} ###`;
    }

    throw new Error('Incorrent label. Please add label to dictionary.');
}

export function translate (label, currentLanguage) {
    return getTranslatedLabel(label, currentLanguage);
}

export function translateFormattedLabel (label, currentLanguage) {
    let translatedLabel = getTranslatedLabel(label.alias, currentLanguage);

    _.forEach(label.subs, (sub) => {
        translatedLabel = translatedLabel.replace(`$\{${sub.key}}`, sub.value);
    });

    return translatedLabel;
}
