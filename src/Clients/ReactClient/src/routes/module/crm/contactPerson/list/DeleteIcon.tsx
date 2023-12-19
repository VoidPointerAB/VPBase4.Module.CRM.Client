import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { Translation } from 'react-i18next';
import i18next from 'i18next';

import apolloClient from 'apolloClient';
import { ConfirmDialog } from 'helpers/module/dialogs';
import { handleGraphQlErrors, handleGraphQlException } from 'helpers/module/crm/errorManagement';
import { DELETE_CONTACT_PERSON } from 'graphQL/module/crm/mutations/contactPerson/delete';
import { deleteContactPerson, deleteContactPersonVariables } from 'graphQL/module/crm/generatedTypes/deleteContactPerson';

interface IProps {
    name: string,
    id: string,
}

const DeleteIcon = (props: IProps) => {
    const handleDelete = () => {
        ConfirmDialog(i18next.t('messages.deletePerson')).then((result: any) => {
            if (result.value !== true) {
				return;
            }
            apolloClient.mutate<deleteContactPerson, deleteContactPersonVariables>({
                mutation: DELETE_CONTACT_PERSON,
                variables: { id: props.id },
            })
            .then(({errors}: any) => {
                handleGraphQlErrors(errors, () => {
                    toast.info(() => <><FontAwesomeIcon icon="check-circle" size="1x" className="ml-2 mr-3" /> {props.name} {i18next.t('messages.isDeletedPerson')}</>)
                })
            }).catch((errors) => handleGraphQlException(errors))
        })
    }

    return (
        <Translation>
            {(t) =>
                <span className="ibox-trash" onClick={handleDelete}>
                    <FontAwesomeIcon icon="trash" className="mr-1" /> {t('button.delete')}
                </span>
            }
        </Translation>
    )
}

export default DeleteIcon
