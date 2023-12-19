// #MoveToVPBase.Modules

import { getLocale } from 'helpers/module/localeHelper';

// Should maybe be an alternative directly in localeHelper?
function getSimpleLocale(): string {
    let locale = getLocale();

    // Should not need to give two different error messages
    // for 'en' and 'en-gb'
    if (locale.indexOf('en') !== -1) {
        locale = 'en';
    }

    return locale;
}

export function translateServerError(serverError: any): string {
    const locale = getSimpleLocale();

    if (!serverError.extensions) {
        return defaultError[locale];
    }

    const errorCode: string = serverError.extensions.code;
    const error = errors[errorCode];
    if (!error) {
        return defaultError[locale];
    }

    let localizedError = error[locale];

    if (localizedError) {
        return localizedError;
    }

    localizedError = error.en;

    if (localizedError) {
        return localizedError;
    }

    return defaultError[locale];
}

export function getDefaultError(): string {
    return defaultError[getSimpleLocale()];
}

const defaultError: { [key: string]: any } = {
    sv: 'Ett fel uppstod på servern!',
    en: 'An error occured on the server!',
};

const errors: { [key: string]: any } = {
    // Module start

    // CRM Start
    CompanyOrPersonRequired: {
        sv: 'Du måste välja en person och/eller ett företag',
        en: 'You must choose a person and/or a company',
    },
    ContactPersonFirstNameRequired: {
        sv: 'Du måste ange ett förnamn',
        en: 'You must provide a firstname',
    },
    // CRM End

    // Module End

    // Custom Start

    // Custom End
};
