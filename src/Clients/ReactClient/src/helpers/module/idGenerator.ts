import environmentVariables from 'config/environmentVariables';
import { getAuthData } from 'authManager';

export enum entityType {
    CustomField = 'CustomField',
    CustomFieldValue = 'CustomFieldValue',
    AdvancedSearchTemplate = 'AdvancedSearchTemplate',

    // VP Template Basic Start
    VP_Template_Basic = 'VP_Template_Basic',
    // VP Template Basic End

    // MODULE Start
    ExportTemplate = 'ExportTemplate',
    // MODULE End

    // CUSTOM Start
    ContactCompany = 'ContactCompany',
    ContactPerson = 'ContactPerson',
    Address = 'Address',
    Activity = 'Activity',
    // CUSTOM End
}

export function generateId(entityType: entityType): string {
    const authData = getAuthData();

    if (authData === undefined) {
        throw Error('Missing auth data');
    }

    const tenantIdPrefix = authData.activeTenant.substr(0, authData.activeTenant.indexOf('_'));
    const moduleName = environmentVariables.applicationScope;

    const identifier =
        Math.random()
            .toString(36)
            .substring(2, 10) +
        Math.random()
            .toString(36)
            .substring(2, 10);

    return `${tenantIdPrefix}_${moduleName}_${entityType}_${identifier}`;
}
