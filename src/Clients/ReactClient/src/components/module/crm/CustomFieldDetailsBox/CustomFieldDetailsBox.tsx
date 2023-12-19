import React from 'react';
import i18next from 'i18next';

import { getCustomFieldBehavior } from 'helpers/module/customFields/customFieldBehaviors';
import * as customFieldManager from 'helpers/module/customFields/customFieldManager';
import * as CustomFieldTypes from 'helpers/module/customFields/customFieldTypes';

import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic-collapsible';

import styles from './CustomFieldDetailsBox.module.css';

interface ICustomFieldDetailsBoxProps {
    customFields: CustomFieldTypes.ICustomFieldWithValueType[] | null;
}

export const CustomFieldDetailsBox = (props: ICustomFieldDetailsBoxProps) => {
    const { customFields } = props;
    const customFieldsTransform = customFieldManager.getAsCustomFieldValues(customFields);
    const groupedCustomFields = customFieldManager.getTabSortedCustomFields(customFieldsTransform);

    const mainCategories = [];
    const mainCategoryNames = Object.keys(groupedCustomFields).sort();
    for (const mainCategoryName of mainCategoryNames) {
        const subCategories = [];
        const subCategoryNames = Object.keys(groupedCustomFields[mainCategoryName]).sort();

        for (const subCategoryName of subCategoryNames) {
            const fields = [];
            groupedCustomFields[mainCategoryName][subCategoryName].sort(titleSort);

            for (const customField of groupedCustomFields[mainCategoryName][subCategoryName]) {
                // Booleans are special, and should only been seen if they are true
                if (customField.dataType === 'BOOL' && customField.boolValue !== true) {
                    continue;
                }

                const behavior = getCustomFieldBehavior(
                    customField.fieldType,
                    customField.dataType
                );

                if (!behavior.isEmpty(customField)) {
                    const content =
                        customField.dataType === 'BOOL' ? (
                            <strong>{customField.title}</strong>
                        ) : (
                            <>
                                <strong>{customField.title}:</strong>
                                {behavior.toString(customField)}
                            </>
                        );

                    fields.push(
                        <div key={customField.customFieldId} className={styles.field}>
                            {content}
                        </div>
                    );
                }
            }

            if (fields.length > 0) {
                const categoryTitle =
                    subCategoryName === customFieldManager.undefinedCategoryKey ? null : (
                        <label className={styles.title}>{subCategoryName}</label>
                    );
                subCategories.push(
                    <div key={subCategoryName} className={styles.subSection}>
                        {categoryTitle}
                        {fields}
                    </div>
                );
            }
        }

        if (subCategories.length > 0) {
            mainCategories.push(
                <div key={mainCategoryName} className={styles.mainSection}>
                    <label className={styles.title}>{mainCategoryName}</label>
                    {subCategories}
                </div>
            );
        }
    }

    if (mainCategories.length === 0) {
        return null;
    }

    return <IBox title={i18next.t('customIBox.additionalInformation')}>{mainCategories}</IBox>;
};

function titleSort(a: any, b: any) {
    var nameA = a.title.toUpperCase();
    var nameB = b.title.toUpperCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    return 0;
}
