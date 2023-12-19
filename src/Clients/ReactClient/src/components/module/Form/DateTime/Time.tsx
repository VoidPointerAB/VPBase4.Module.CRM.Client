import React from 'react'

import { FieldProps } from "formik";
import MaskedInput from 'react-text-mask'

import { IGenericInputField, InputWrapper } from '../VPForm'

function timeMask(value: any) {
    const chars = value.split('');
    const hours: any[] = [/[0-2]/, chars[0] === '2' ? /[0-3]/ : /[0-9]/];
    const minutes: any[] = [/[0-5]/, /[0-9]/];
    return hours.concat(':').concat(minutes);
}

export const Time = ({
    field,
    form: { touched, errors },
    alignment,
    title,
    ...props
}: FieldProps<any> & IGenericInputField) => (
        <InputWrapper
            alignment={alignment}
            name={field.name}
            title={title}
            errors={touched[field.name] && errors[field.name] ? errors[field.name] : undefined}
        >
            <MaskedInput
                mask={timeMask}
                id={field.name}
                guide={false}
                className='form-control'
                placeholder='hh:mm'
                {...field}
                {...props} />
        </InputWrapper>
    );
