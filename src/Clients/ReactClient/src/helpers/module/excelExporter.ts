import axios from 'axios';
import { saveAs } from 'file-saver';

import { getAuthData, AuthData, getLoggedInUserId } from 'authManager';

import environmentVariables from 'config/environmentVariables';

import { genericErrorToast } from 'helpers/module/errorManagement';

interface exportToExcelProps {
    type: 'template' | 'entityType';
    fileName: string;
    templateId?: string;
    entityIds?: string[];
    entityType?: string;
    propertyIds?: string[];
}

export function exportToExcel({
    type,
    fileName,
    templateId,
    entityIds,
    entityType,
    propertyIds,
}: exportToExcelProps): void {
    const authData = getAuthData();
    if (!authData) {
        return;
    }

    const url = `${environmentVariables.serverAddress}/Admin/ExportTemplate/ExportTemplate`;
    const params: any = {
        userId: getLoggedInUserId(),
    };

    if (type === 'template') {
        if (templateId === undefined || entityIds === undefined) {
            alert('Invalid parameters for Excel-export');
            console.error('type:', type, 'templateId:', templateId, 'entityIds:', entityIds);
            return;
        }

        params.templateId = templateId;
        params.entityIds = entityIds;

        downloadFile(authData, fileName, { url, data: params });
    } else {
        throw new Error('Not implemented');
    }
}

function downloadFile(authData: AuthData, fileName: string, axiosOptions: any) {
    axios({
        ...axiosOptions,
        method: 'POST',
        responseType: 'arraybuffer',
        withCredentials: true,
        headers: {
            TenantId: authData.activeTenant,
            Authorization: `Bearer ${authData.jwt}`,
        },
    })
        .then(function(response) {
            if (
                response.headers &&
                response.headers['content-type'] === 'application/octet-stream'
            ) {
                saveAs(new Blob([response.data]), `${fileName}.xlsx`);
            } else {
                genericErrorToast('Could not retrieve Excel-file from the server');
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
