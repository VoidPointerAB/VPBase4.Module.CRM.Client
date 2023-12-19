import React from 'react'
import { FieldProps } from "formik";
import moment from 'moment';
import DatePicker from 'react-datepicker';

import { IGenericInputField, InputWrapper } from '../VPForm'
import { IDatePickerProps } from "./DateTimeTypes";

import { getLocale } from 'helpers/module/localeHelper';
import { getDateFormat, getDateRegex } from 'helpers/module/dateTimeHelper';

export const DateInput = ({
    field,
    form: { touched, errors, setFieldValue, setFieldTouched, setFieldError },
    alignment,
    title,
    dateFormat,
}: FieldProps<any> & IGenericInputField & IDatePickerProps) => {
    const locale = getLocale();

    if (dateFormat === undefined) {
        dateFormat = getDateFormat(locale);
    }

    return (
        <InputWrapper
            alignment={alignment}
            name={field.name}
            title={title}
            errors={touched[field.name] && errors[field.name] ? errors[field.name] : undefined}
        >
            <DatePicker
                selected={field.value}
                locale={locale}
                dateFormat={dateFormat}
                placeholderText={dateFormat}
                className="form-control"
                onBlur={() => setFieldTouched(field.name)}
                onChange={(date: moment.Moment) => setFieldValue(field.name, date)}
                onChangeRaw={(event: any) => {
                    const currentValue = event.currentTarget.value;
                    const attemptedNewValue = moment(currentValue, dateFormat);
                    const correctFormat = getDateRegex(locale).test(currentValue);
                    if (attemptedNewValue.isValid() && correctFormat) {
                        setFieldValue(field.name, attemptedNewValue, true);
                    }
                    else if (!correctFormat) {
                        setFieldError(field.name, `Required format ${dateFormat}`)
                    }
                    else if (correctFormat && !attemptedNewValue.isValid()) {
                        event.currentTarget.value = attemptedNewValue;
                        setFieldValue(field.name, null, true);
                    }
                }}
            />
        </InputWrapper>
    )
}