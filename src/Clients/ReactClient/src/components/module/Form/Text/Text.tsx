import React from 'react'
import { FieldProps } from "formik";

import { IGenericInputField, InputWrapper } from '.././VPForm'

interface ITextbasedInput extends IGenericInputField {
    type?: 'text' | 'number' | 'password'
}

export const TextInput = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    alignment,
    title,
    type,
    ...props
}: FieldProps<any> & ITextbasedInput) => (
        <InputWrapper
            alignment={alignment}
            name={field.name}
            title={title}
            errors={touched[field.name] && errors[field.name] ? errors[field.name] : undefined}
        >
            <input className="form-control" type={type === undefined ? 'text' : type} {...field} {...props} />
        </InputWrapper>
    );

export const TextArea = ({
    field,
    form: { touched, errors },
    alignment,
    title,
    type,
    ...props
}: FieldProps<any> & ITextbasedInput) => (
        <InputWrapper
            alignment={alignment}
            name={field.name}
            title={title}
            errors={touched[field.name] && errors[field.name] ? errors[field.name] : undefined}
        >
            <textarea className="form-control" value={field.value} {...field} {...props} />
        </InputWrapper>
    );