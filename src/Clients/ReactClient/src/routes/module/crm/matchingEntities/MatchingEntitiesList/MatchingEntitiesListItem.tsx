import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';

import apolloClient from 'apolloClient';

import { ConfirmDialog } from 'helpers/module/dialogs';
import { handleGraphQlErrors, handleGraphQlException } from 'helpers/module/crm/errorManagement';

import { BoxItem } from 'components/module/BoxItem';
import BootstrapButton from 'components/module/Buttons/BoostrapButton';

import { MatchType } from './MatchingEntitiesList';

import { DISMISS_MATCH_CONTACT_COMPANY } from 'graphQL/module/crm/mutations/matchingEntities/dismissMatchContactCompany';
import {
    contactCompanyDismissComparison,
    contactCompanyDismissComparisonVariables,
} from 'graphQL/module/crm/generatedTypes/contactCompanyDismissComparison';
import { DISMISS_MATCH_CONTACT_PERSON } from 'graphQL/module/crm/mutations/matchingEntities/dismissMatchContactPerson';
import {
    contactPersonDismissComparison,
    contactPersonDismissComparisonVariables,
} from 'graphQL/module/crm/generatedTypes/contactPersonDismissComparison';

interface MatchingEntitiesListItemProps {
    left: {
        id: string;
        name: string;
    };
    right: {
        id: string;
        name: string;
    };
    pathTo: string;
    className: string;
    type: MatchType;
}

export const MatchingEntitiesListItem: FunctionComponent<MatchingEntitiesListItemProps> = props => {
    const [isVisible, setVisible] = useState(true);

    return isVisible ? (
        <BoxItem className={props.className}>
            <div>
                <Link to={`${props.pathTo}${props.left.id}`}>{props.left.name}</Link>
                {' | '}
                <Link to={`${props.pathTo}${props.right.id}`}>{props.right.name}</Link>
            </div>
            <BootstrapButton
                type="primary"
                isDisabled={false}
                onClick={() =>
                    dismissMatch(props.left.id, props.right.id, props.type, () => setVisible(false))
                }
            >
                Dismiss
            </BootstrapButton>
        </BoxItem>
    ) : null;
};

function dismissMatch(idOne: string, idTwo: string, type: MatchType, onSuccess: () => void) {
    ConfirmDialog('Confirm dismiss match?').then(({ value: confirmed }) => {
        if (!confirmed) {
            return;
        }

        if (type === 'company') {
            apolloClient
                .mutate<contactCompanyDismissComparison, contactCompanyDismissComparisonVariables>({
                    mutation: DISMISS_MATCH_CONTACT_COMPANY,
                    variables: { leftCompanyId: idOne, rightCompanyId: idTwo },
                })
                .then(({ errors }) => {
                    handleGraphQlErrors(errors, onSuccess);
                })
                .catch((error: any) => {
                    handleGraphQlException(error);
                });
        }

        if (type === 'person') {
            apolloClient
                .mutate<contactPersonDismissComparison, contactPersonDismissComparisonVariables>({
                    mutation: DISMISS_MATCH_CONTACT_PERSON,
                    variables: { leftPersonId: idOne, rightPersonId: idTwo },
                })
                .then(({ errors }) => {
                    handleGraphQlErrors(errors, onSuccess);
                })
                .catch((error: any) => {
                    handleGraphQlException(error);
                });
        }
    });
}
