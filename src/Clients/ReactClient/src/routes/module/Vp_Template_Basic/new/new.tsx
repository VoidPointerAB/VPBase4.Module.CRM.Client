import React, { ReactElement } from 'react';

import { Form, Formik, FormikActions, FormikProps, Field } from 'formik';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { FormWrapper } from 'components/module/Form/VPForm';
import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import { ConfirmDialog } from 'helpers/module/dialogs';
import { TextInput } from 'components/module/Form';

import { GET_CUSTOM_FIELDS } from 'graphQL/module/queries/CustomFields/getCustomFields';
import { ADD_VP_TEMPLATE_BASIC } from 'graphQL/module/mutations/Vp_Template_Basic/new';
import { getCustomFieldsForEntity, getCustomFieldsForEntityVariables } from 'graphQL/module/generatedTypes/getCustomFieldsForEntity';
import { addVP_Template_Basic, addVP_Template_BasicVariables } from 'graphQL/module/generatedTypes/addVP_Template_Basic';

import { generateId, entityType } from 'helpers/module/idGenerator';
import {
    formikHandleGraphQlErrors,
    formikHandleGraphQlException,
    formikToastErrorMessages,
} from 'helpers/module/errorManagement';
import * as customFieldManager from 'helpers/module/customFields/customFieldManager';
import { TabbedFormBuilder } from 'helpers/module/tabbedFormBuilder';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';

import 'react-tabs/style/react-tabs.css';

interface IAddEditProps {
    initialQuery: any;
    mutation: ReactElement;
}

interface IWithRouterProps {
    history: any;
    location: any;
    match: any;
}

class New extends React.Component<IAddEditProps & IWithRouterProps> {
    public onCancel = (e: any) => {
        const touched = Object.keys(e).length;
        if (touched <= 0) {
            this.props.history.goBack();
        } else {
            ConfirmDialog({
                text: 'Nothing will be saved!',
                title: 'Are you sure?',
                type: 'warning',
            })
                .then(result => {
                    if (result.value) {
                        this.props.history.goBack();
                    }
                })
                .catch(() => toast.error('Navigation was prevented due to an error'));
        }
    };
    public render() {
        return (
            <Query<getCustomFieldsForEntity, getCustomFieldsForEntityVariables>
                query={GET_CUSTOM_FIELDS}
                variables={{ customFieldEntityId: 'VPBase_Module_CustomFieldDefinition_VP_Template_Basic' }}
            >
                {({ loading, error, data }) => {
                    const queryPreData = queryPreDataHandler({ loading, error, data });
                    if (queryPreData) {
                        return queryPreData;
                    }

                    if (!data) {
                        return null;
                    }

                    const staticForm = <Field title="Title" name="title" component={TextInput} />;

                    const tabBuilder = new TabbedFormBuilder();
                    tabBuilder.addTab(TabbedFormBuilder.DefaultInitialTabName, [
                        { content: staticForm },
                    ]);

                    const customFields = customFieldManager.getAsCustomFieldValues(data.customFields)
                    customFieldManager.addCustomFieldsToTabbedForm(tabBuilder, customFields);

                    const customFieldInitialValues = customFieldManager.getInitialValues(
                        customFields
                    );

                    const formContent = tabBuilder.buildForm();

                    return (
                        <Mutation<addVP_Template_Basic, addVP_Template_BasicVariables> mutation={ADD_VP_TEMPLATE_BASIC}>
                            {addVp_Template_Basic => (
                                <div className="row m-0">
                                    <IBox className="mb-0 col-lg-12">
                                        <Formik
                                            initialValues={{
                                                title: '',
                                                ...customFieldInitialValues,
                                            }}
                                            onSubmit={(
                                                values: any,
                                                formikActions: FormikActions<any>
                                            ) => {
                                                addVp_Template_Basic({
                                                    variables: {
                                                        vP_Template_BasicId: generateId(
                                                            entityType.VP_Template_Basic
                                                        ),
                                                        title: values.title,
                                                        values: customFieldManager.getCustomFieldValuesFromForm(
                                                            values,
                                                            customFields
                                                        ),
                                                    },
                                                })
                                                    .then(({ data, errors }: any) => {
                                                        formikHandleGraphQlErrors(
                                                            errors,
                                                            formikActions,
                                                            () => {
                                                                toast.success(
                                                                    'Vp_Template_Basic has been created'
                                                                );
                                                                this.props.history.push(
                                                                    '/Vp_Template_Basic/List'
                                                                );
                                                            }
                                                        );
                                                    })
                                                    .catch((res: any) => {
                                                        formikHandleGraphQlException(
                                                            res,
                                                            formikActions
                                                        );
                                                    });
                                            }}
                                            validationSchema={Yup.object().shape({})}
                                            render={(formikBag: FormikProps<any>) => {
                                                formikToastErrorMessages(formikBag);

                                                return (
                                                    <FormWrapper className="col-sm-12">
                                                        <Form>
                                                            {formContent}
                                                            <div className="d-flex justify-content-end">
                                                                <button
                                                                    className="btn btn-default mb-2 mt-4 mr-2"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        this.onCancel(
                                                                            formikBag.touched
                                                                        )
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    className="btn btn-primary mb-2 mt-4 ml-2"
                                                                    type="submit"
                                                                >
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </Form>
                                                    </FormWrapper>
                                                );
                                            }}
                                        />
                                    </IBox>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default withRouter<IAddEditProps & IWithRouterProps>(New);
