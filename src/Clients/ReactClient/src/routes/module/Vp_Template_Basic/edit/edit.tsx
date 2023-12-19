import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik, FormikActions, FormikProps, Field } from 'formik';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { FormWrapper } from 'components/module/Form/VPForm';
import IBox from 'components/module/inspinia/IBox/templates/IBox-template-basic';
import { ConfirmDialog } from 'helpers/module/dialogs';
import { TextInput } from 'components/module/Form/Text/Text';

import { GET_VP_TEMPLATE_BASIC } from 'graphQL/module/queries/Vp_Template_Basic/getTemplate';
import { UPDATE_VP_TEMPLATE_BASIC } from 'graphQL/module/mutations/Vp_Template_Basic/update';
import { vp_Template_Basic, vp_Template_BasicVariables } from 'graphQL/module/generatedTypes/vp_Template_Basic';
import { updateVp_Template_Basic, updateVp_Template_BasicVariables } from 'graphQL/module/generatedTypes/updateVp_Template_Basic';

import {
    formikHandleGraphQlErrors,
    formikHandleGraphQlException,
    formikToastErrorMessages,
} from 'helpers/module/errorManagement';
import * as customFieldManager from 'helpers/module/customFields/customFieldManager';
import { TabbedFormBuilder } from 'helpers/module/tabbedFormBuilder';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';

import 'react-tabs/style/react-tabs.css';

interface IWithRouterProps {
    history: any;
    location: any;
    match: any;
}

class Edit extends React.Component<IWithRouterProps> {
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
                .catch(() =>
                    toast.error(() => (
                        <>
                            <FontAwesomeIcon
                                icon="exclamation-circle"
                                size="1x"
                                className="ml-2 mr-3"
                            />{' '}
                            Server error!
                        </>
                    ))
                );
        }
    };
    public render() {
        const id = this.props.match.params.vp_template_basicId;
        return (
            <Query<vp_Template_Basic, vp_Template_BasicVariables> 
                query={GET_VP_TEMPLATE_BASIC} 
                variables={{ id }}
            >
                {({ loading, error, data }) => {
                    const queryPreData = queryPreDataHandler({ loading, error, data, mainEntityKey: 'vp_Template_Basic' });
                    if (queryPreData) {
                        return queryPreData;
                    }

                    if (!data || !data.vp_Template_Basic) {
                        return null;
                    }

                    const entityData = data.vp_Template_Basic;
                    const customFieldValues = entityData.customFieldsWithValue;

                    const staticForm = <Field title="Title" name="title" component={TextInput} />;

                    const tabBuilder = new TabbedFormBuilder();
                    tabBuilder.addTab(TabbedFormBuilder.DefaultInitialTabName, [
                        { content: staticForm },
                    ]);

                    const customFieldValuesTyped = customFieldManager.getAsCustomFieldValues(customFieldValues)
                    customFieldManager.addCustomFieldsToTabbedForm(tabBuilder, customFieldValuesTyped);

                    const customFieldInitialValues = customFieldManager.getInitialValues(
                        customFieldValuesTyped
                    );

                    const formContent = tabBuilder.buildForm();

                    return (
                        <Mutation<updateVp_Template_Basic, updateVp_Template_BasicVariables> mutation={UPDATE_VP_TEMPLATE_BASIC}>
                            {updateVp_Template_Basic => (
                                <div className="row m-0">
                                    <IBox className="mb-0 col-lg-12">
                                        <Formik
                                            initialValues={{
                                                vP_Template_BasicId: id,
                                                title: entityData.title ? entityData.title : '',
                                                ...customFieldInitialValues,
                                            }}
                                            onSubmit={(
                                                values: any,
                                                formikActions: FormikActions<any>
                                            ) => {
                                                updateVp_Template_Basic({
                                                    variables: {
                                                        vP_Template_BasicId:
                                                            values.vP_Template_BasicId,
                                                        title: values.title,
                                                        values: customFieldManager.getCustomFieldValuesFromForm(
                                                            values,
                                                            customFieldValuesTyped
                                                        ),
                                                    },
                                                })
                                                    .then(({ data, errors }: any) => {
                                                        formikHandleGraphQlErrors(
                                                            errors,
                                                            formikActions,
                                                            () => {
                                                                toast.success(
                                                                    'Vp_Template_Basic has been updated'
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

export default withRouter<IWithRouterProps>(Edit);
