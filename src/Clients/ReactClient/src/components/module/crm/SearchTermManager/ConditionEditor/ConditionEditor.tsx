import React, { useState, useContext } from 'react';
import { Formik, FormikProps } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { TemplateManagerContext } from '../TemplateManager/templateManagerContext';
import { ICondition, ISearchTerm } from '../TemplateManager/TemplateManager';

import styles from './ConditionEditor.module.css';

export interface IAddedSearchTerm {
    searchTerm: ISearchTerm;
    onClick(): void;
}

interface IConditionEditorProps {
    givenCondition: ICondition | undefined;
    availableConditions: ICondition[];
    addedSearchTerms: IAddedSearchTerm[];
    addSearchTerm(searchTerm: ISearchTerm): void;
}

export const ConditionEditor = (props: IConditionEditorProps) => {
    let counter = 0;
    const addedSearchTerms = props.addedSearchTerms.map(addedSearchTerm => {
        const { term, has } = addedSearchTerm.searchTerm;
        return (
            <div key={counter++} className={styles.addedSearchTerm}>
                <span
                    className={`${styles.conditionModifier} ${has ? styles.has : styles.hasNot}`}
                />
                <span>{term}</span>
                <span className={styles.removeIcon} onClick={addedSearchTerm.onClick}>
                    <FontAwesomeIcon icon="times" size="1x" />
                </span>
            </div>
        );
    });

    const [has, setHas] = useState(true);

    const {
        isShowingTemplateDetails,
        templateHasContent,
        canManageTemplate,
        isWaitingForServerResponse,
        loadData,
        saveTemplate,
        removeTemplate,
        openNewTemplateModal,
    } = useContext(TemplateManagerContext);

    return (
        <div>
            <label className="control-label font-bold">Search condition</label>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    currentSearchTerm: props.givenCondition
                        ? props.givenCondition.searchDefinition
                        : '',
                }}
                onSubmit={(values: any, { resetForm }) => {
                    toast.dismiss();

                    if (!values.currentSearchTerm) {
                        return;
                    }

                    if (
                        _.find(
                            props.addedSearchTerms,
                            ({ searchTerm }) => searchTerm.term === values.currentSearchTerm
                        )
                    ) {
                        toast.error('This search term has already been added');
                        return;
                    }

                    if (!validSearchTermStructure(values.currentSearchTerm)) {
                        toast.error(
                            'Invalid search term structure, use format "[definition]=[term]"'
                        );
                        return;
                    }

                    const searchDefinition = getSearchDefinition(values.currentSearchTerm);
                    const entityType = getEntityFromSearchTerm(
                        props.availableConditions,
                        searchDefinition
                    );

                    if (!entityType) {
                        toast.error(`Unknown search definition "${searchDefinition}"`);
                        return;
                    }

                    props.addSearchTerm({
                        term: values.currentSearchTerm,
                        has: has,
                        entityType: entityType,
                    });

                    resetForm({ currentSearchTerm: '' });
                }}
            >
                {(formikProps: FormikProps<any>) => {
                    const { values, handleChange, handleSubmit } = formikProps;
                    return (
                        <form onSubmit={handleSubmit} className="d-flex form-horizontal">
                            <div className="input-group">
                                <div className={`${styles.prepend} input-group-prepend`}>
                                    <button
                                        className={`btn btn-outline-secondary ${
                                            has ? styles.greenOutline : ''
                                        }`}
                                        type="button"
                                        onClick={() => setHas(true)}
                                    >
                                        Has
                                    </button>
                                    <button
                                        className={`btn btn-outline-secondary ${
                                            has ? '' : styles.redOutline
                                        }`}
                                        type="button"
                                        onClick={() => setHas(false)}
                                    >
                                        Has not
                                    </button>
                                </div>
                                <input
                                    name="currentSearchTerm"
                                    className="form-control flex-grow-1"
                                    type="text"
                                    value={values.currentSearchTerm}
                                    onChange={handleChange}
                                />
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-primary">
                                        <FontAwesomeIcon icon="plus" size="1x" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
            <div className="mt-3 mb-3 d-flex flex-wrap justify-content-start">
                {addedSearchTerms}
            </div>
            <div className={styles.buttonContainer}>
                {isShowingTemplateDetails && templateHasContent && (
                    <div>
                        <button className="btn btn-primary" onClick={loadData}>
                            Load
                        </button>
                    </div>
                )}
                {canManageTemplate && (
                    <div>
                        <button className="btn btn-danger" disabled={isWaitingForServerResponse} onClick={removeTemplate}>
                            Delete
                        </button>
                        <button className="btn btn-success ml-2" disabled={isWaitingForServerResponse} onClick={saveTemplate}>
                            Save
                        </button>
                    </div>
                )}
                <div>
                    <button className="btn btn-primary" disabled={isWaitingForServerResponse} onClick={openNewTemplateModal}>
                        {canManageTemplate ? 'Create as new' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    );
};

function validSearchTermStructure(searchTerm: string): boolean {
    return searchTerm.split('=').length === 2;
}

function getSearchDefinition(searchTerm: string): string {
    return searchTerm.split('=')[0];
}

function getEntityFromSearchTerm(availableConditions: ICondition[], searchDefinition: string) {
    const condition = _.find(availableConditions, { searchDefinition: searchDefinition });

    return condition ? condition.entityType : undefined;
}
