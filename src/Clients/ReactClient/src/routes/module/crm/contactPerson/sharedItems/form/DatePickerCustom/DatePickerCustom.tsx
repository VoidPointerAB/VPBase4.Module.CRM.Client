import React from 'react'
import { FieldProps } from "formik";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import MaskedInput from 'react-text-mask'

import { IGenericInputField, InputWrapper } from 'components/module/Form/VPForm'
import { DateFormat, DateFormatRegex } from 'config/configurationVariables';

export const DatePickerCustom = ({
    field,
    form: { touched, errors, setFieldValue, setFieldTouched, setFieldError },
    alignment,
    title,
    ...props
}: FieldProps<any> & IGenericInputField & any) => (
        <InputWrapper
            alignment={alignment}
            name={field.name}
            title={title}
            errors={touched[field.name] && errors[field.name] ? errors[field.name] : undefined}
        >
            <DatePicker
                selected={field.value}
                dateFormat={DateFormat}
                placeholderText={DateFormat}
                className="form-control"
                popperPlacement="top-start"
                filterDate={props.filterDate}
                customInput={
                    <MaskedInput
                      type="text"
                      mask={props.mask}
                    />
                  }
                onBlur={() => setFieldTouched(field.name)}
                onChange={(date: moment.Moment) => setFieldValue(field.name, date)}
                onChangeRaw={(event: any) => {
                    const currentValue = event.currentTarget.value;
                    const attemptedNewValue = moment(currentValue, DateFormat);
                    const noFutureDate = moment() > currentValue
                    const correctFormat = DateFormatRegex.test(currentValue);
                    if (attemptedNewValue.isValid() && correctFormat && noFutureDate) {
                        setFieldValue(field.name, attemptedNewValue, true);
                    }
                    else if (!correctFormat) {
                        setFieldError(field.name, `Required format ${DateFormat}`)
                    }
                    else if (correctFormat && !attemptedNewValue.isValid()) {
                        event.currentTarget.value = attemptedNewValue;
                        setFieldValue(field.name, null, true);
                    }
                }}
            />
        </InputWrapper>
    )