import { graphql } from 'react-apollo';
import i18next from 'i18next';

import { ActionDialog } from 'helpers/module/dialogs';

import { GET_CONTACTPERSONS_SHORT}  from 'graphQL/module/crm/queries/contactPerson/compare/getPersons';
import { DELETED_PERSONS_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactPerson/subscribeToDeletedPersons';
import { GET_PERSON_COMPARE_LEFT_RIGHT  } from 'graphQL/module/crm/queries/contactPerson/compare/getPersonComparison';
import { DELETED_PERSON_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactPerson/subscribeToDeletedPerson';
import { getPersonData } from 'graphQL/module/crm/generatedTypes/getPersonData';
import { contactPersonCompare } from 'graphQL/module/crm/generatedTypes/contactPersonCompare';

export const personsQuery = graphql(GET_CONTACTPERSONS_SHORT, {
    props: ({ data }: any) => ({
        errorPersons: data.error,
        loadingPersons: data.loading,
        persons: data.contactPersons,
        subscribe: data.subscribeToMore({
            document: DELETED_PERSONS_SUBSCRIPTION,
            variables: {},
            updateQuery: (prev: getPersonData, { subscriptionData }: any) => {
                let deletedPerson = subscriptionData.data.contactPersonDeletedEvent;
                let remainingListOfPersons = prev
                    ? prev.contactPersons && prev.contactPersons.filter(
                        (person: any) => person.contactpersonId !== deletedPerson.contactPersonId
                    )
                    : [];
                return  {
                    contactPersons: remainingListOfPersons,
                };
            },
        }),
    }),
});

export const personComparisonQuery = (personIdLeft: string, personIdRight: string, history: any) => graphql(GET_PERSON_COMPARE_LEFT_RIGHT, {
    options: { variables: { id: personIdLeft, id2: personIdRight } },
    props: ({ data }: any) => ({
        errorComparison: data.error,
        loadingPerson: data.loading,
        leftPerson: data.left,
        rightPerson: data.right,
        countries: data.countries,
        subscribe: data.subscribeToMore({
            document: DELETED_PERSON_SUBSCRIPTION,
            variables: { id: personIdLeft, id2: personIdRight },
            updateQuery: (prev: contactPersonCompare, { subscriptionData }: any) => {
                let deletedPerson = subscriptionData.data.contactPersonDeletedEvent;
                let oldPersonLeft = prev ? prev.left : null;
                let oldPersonRight = prev ? prev.right : null;
                let updatedResult: any = null;
                if (deletedPerson && oldPersonLeft && oldPersonRight) {
                    if (
                        deletedPerson.contactPersonId !== oldPersonLeft.contactPersonId &&
                        deletedPerson.contactPersonId !== oldPersonRight.contactPersonId
                    ) {
                        return prev;
                    }
                    updatedResult = Object.assign({}, prev, {
                        left: deletedPerson,
                        right: deletedPerson,
                        countries: prev.countries,
                        fieldValues: prev.fieldValues,
                    });
                }

                if (updatedResult && deletedPerson && oldPersonLeft && oldPersonRight) {
                    const deletedPersonName =
                        deletedPerson.contactPersonId === oldPersonLeft.contactPersonId
                            ? `${oldPersonLeft.firstName} ${oldPersonLeft.lastName}`
                            : `${oldPersonRight.firstName} ${oldPersonRight.lastName}`;
                    ActionDialog(
                        i18next.t('messages.deleted'),
                        i18next.t('messages.noExistingPersonsCompare', {
                            personName: deletedPersonName,
                        }),
                        () => history.push('/matchingentities/list')
                    );
                }
                return;
            },
        }),
    }),
});
