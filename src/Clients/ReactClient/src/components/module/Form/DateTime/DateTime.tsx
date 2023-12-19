import React from 'react'
import { FieldProps } from "formik";
import moment from 'moment';
import DatePicker from 'react-datepicker';

import { IGenericInputField, InputWrapper } from '../VPForm'
import { IDateTimePickerProps } from "./DateTimeTypes";

import { getLocale } from 'helpers/module/localeHelper';
import { getDateTimeFormat, getDateTimeRegex } from 'helpers/module/dateTimeHelper';


export const DateTimeInput = ({
    field,
    form: { touched, errors, setFieldValue, setFieldTouched, setFieldError },
    alignment,
    title,
    dateTimeFormat,
}: FieldProps<any> & IGenericInputField & IDateTimePickerProps) => {
    const locale = getLocale();

    if (dateTimeFormat === undefined) {
        dateTimeFormat = getDateTimeFormat(locale);
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
                showTimeSelect
                locale={locale}
                dateFormat={dateTimeFormat}
                timeFormat={'HH:mm'}
                placeholderText={dateTimeFormat}
                timeCaption="time"
                timeIntervals={15}
                className="form-control"
                onBlur={() => setFieldTouched(field.name)}
                onChange={(date: moment.Moment) => setFieldValue(field.name, date)}
                onChangeRaw={(event: any) => {
                    const currentValue = event.currentTarget.value;
                    const attemptedNewValue = moment(currentValue, dateTimeFormat);
                    const correctFormat = getDateTimeRegex(locale).test(currentValue);

                    if (attemptedNewValue.isValid() && correctFormat) {
                        setFieldValue(field.name, attemptedNewValue, true);
                    }
                    else if (!correctFormat) {
                        setFieldError(field.name, `Required format ${dateTimeFormat}`)
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