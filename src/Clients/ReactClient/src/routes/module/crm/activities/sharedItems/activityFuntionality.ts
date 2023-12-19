import * as Yup from 'yup';
import i18next from 'i18next';

import { hh_mm } from 'helpers/module/crm/validationRegexes'

export function formValidation() {
    return Yup.object().shape({
        description: Yup.string().required(i18next.t('validationsMessages.descriptionActivity')),
        date: Yup.mixed().required(i18next.t('validationsMessages.date')),
        type: Yup.string().required(i18next.t('validationsMessages.type')),
        time: Yup.string().matches(hh_mm, i18next.t('validationsMessages.timeFormat'))
    })
}
