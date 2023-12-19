// #MoveToVPBase.Modules

import React from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormikProps, FormikActions } from 'formik';

import { translateServerError, getDefaultError } from 'helpers/module/errorTranslator';

export function genericErrorToast() {
    toast.error(() => GenericErrorMessage);
}

export const GenericErrorMessage = (
    <>
        <FontAwesomeIcon icon="exclamation-circle" size="1x" className="ml-2 mr-3" />{' '}
        {getDefaultError()}
    </>
);

export function formikToastErrorMessages(formikProps: FormikProps<any>) {
    if (formikProps.isSubmitting && !formikProps.isValidating) {
        toastErrorMessages(formikProps.errors);
    }
}

export function toastErrorMessages(errors: { [key: string]: any } | string[]) {
    toast.dismiss();
    let errorList: any = errors;

    if (!Array.isArray(errors)) {
        errorList = [];
        for (const key in errors) {
            errorList.push(errors[key]);
        }
    }

    for (const error of errorList) {
        let finalError = error;
        if (Array.isArray(error)) {
            for (const tempError of error) {
                if (!tempError) {
                    continue;
                }

                if (tempError.label) {
                    finalError = tempError.label;
                } else if (tempError.value) {
                    finalError = tempError.value;
                }
            }
        }

        toast.error(finalError, {
            autoClose: 6000,
            toastId: finalError,
        });
    }
}

export function formikHandleGraphQlErrors(
    errors: any,
    formikActions: FormikActions<any>,
    successCallback?: () => any
) {
    if (errors) {
        formikActions.setSubmitting(false);
    }

    handleGraphQlErrors(errors, successCallback);
}

export function handleGraphQlErrors(errors: any, successCallback?: () => any) {
    if (errors) {
        const defaultError = getDefaultError();
        let hasRenderedDefaultError = false;

        errors.forEach((error: any) => {
            console.log('error',error);
            const errorMessage = translateServerError(error);

            console.log('messages',errorMessage)
            // Used ugly solution since toast.isActive(id) didn't seem to work
            if (!hasRenderedDefaultError) {
                toast.error(errorMessage);
            }

            if (errorMessage === defaultError) {
                hasRenderedDefaultError = true;
            }
        });
    } else if (successCallback) {
        successCallback();
    }
}

export function formikHandleGraphQlException(exception: any, formikActions: FormikActions<any>) {
    formikActions.setSubmitting(false);
    handleGraphQlException(exception);
}

export function handleGraphQlException(exception: any) {
    toast.dismiss();
    console.log(exception);
    genericErrorToast();
}
