import React from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';

import { FormWrapper, TextInput, Checkbox } from 'components/module/Form';
import Modal from 'components/module/crm/Modal/VPModal';

interface INewTemlateModalProps {
    isOpen: boolean;
    onCreate(name: string, isPrivate: boolean): void;
    onDismiss(): void;
}

export const NewTemplateModal = (props: INewTemlateModalProps) => {
    return (
        <Modal isOpen={props.isOpen} onRequestClose={props.onDismiss} shouldCloseOnEsc={true}>
            <Formik
                initialValues={{
                    name: '',
                    isPrivate: false,
                }}
                onSubmit={(values: any) => {
                    props.onCreate(values.name, values.isPrivate)
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Name is required'),
                })}
                render={() => (
                    <FormWrapper alignment="horizontal">
                        <Form>
                            <div className="modal-content" style={{ minWidth: '500px' }}>
                                <div className="modal-body">
                                    <Field
                                        name="name"
                                        title="Name"
                                        component={TextInput}
                                    />
                                    <Field
                                        name="isPrivate"
                                        title="Private"
                                        component={Checkbox}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-default"
                                        onClick={props.onDismiss}
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </FormWrapper>
                )}
            />
        </Modal>
    );
};
