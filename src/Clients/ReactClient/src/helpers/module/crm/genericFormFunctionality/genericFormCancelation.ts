import i18next from 'i18next';
import { ConfirmDialog } from 'helpers/module/dialogs';
import { genericErrorToast } from "helpers/module/crm/errorManagement";

export function onCancel(formikBag: any, history: any) {
    const touched = Object.keys(formikBag.touched).length;
    if (touched <= 0) {
        history.goBack();
    } else {
        ConfirmDialog(i18next.t('messages.areYouSure'), i18next.t('messages.savesNothing'))
        .then((result) => {
            if (result.value) { history.goBack(); }
        }).catch(genericErrorToast)
    }
}