import i18next from 'i18next';

export function translateServerError(serverError: any): string {
    if (!serverError.extensions) {
        return getDefaultError();
    }

    const errorCode: string = serverError.extensions.code;
    return translateErrorCode(errorCode);
}

export function translateErrorCode(errorCode: string): string {
    const key = `errors.${errorCode}`;
    const error = i18next.t(key);
    if (error === key) {
        return `${i18next.t('errors.defaultError')} (${errorCode})`;
    }

    return error;
}

export function getDefaultError(): string {
    return i18next.t('errors.defaultError');
}
