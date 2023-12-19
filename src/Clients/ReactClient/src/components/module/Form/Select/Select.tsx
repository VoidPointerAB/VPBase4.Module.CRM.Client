import React from 'react';
import { FieldProps } from 'formik';
import { OptionProps } from 'react-select/lib/components/Option';
import ReactSelect from 'react-select';
import ReactCreatableSelect from 'react-select/lib/Creatable';

import { IGenericInputField, InputWrapper } from '.././VPForm';

interface IReactSelect extends IGenericInputField {
    isClearable?: boolean;
    placeholder?: any;
    onChangeCallback?(): void;
}

interface IReactCreateSelect extends IReactSelect {
    mask: any;
}

export const reactSelectDefaultStyles = {
    clearIndicator: (base: any, state: any) => ({
        ...base,
        cursor: 'pointer',
    }),
    control: (base: any, state: any) => ({
        ...base,
        borderColor: state.isFocused ? '#1ab394' : '#e5e6e7',
        ':hover': { borderColor: state.isFocused ? '#1ab394' : '#e5e6e7' },
        borderRadius: '0px',
        boxShadow: 'none',
        color: 'white',
    }),
    dropdownIndicator: (base: any, state: any) => ({
        ...base,
        cursor: 'pointer',
    }),
    menu: (base: any, state: any) => ({
        ...base,
        zIndex: 1000,
    }),
};

export const Select = ({
    placeholder,
    alignment,
    title,
    options,
    isClearable,
    field,
    form: { touched, errors, setFieldValue },
    ...props
}: FieldProps<any> & OptionProps<any> & IReactSelect) => {
    return (
        <InputWrapper
            alignment={alignment}
            name={field.name}
            title={title}
            errors={touched[field.name] && errors[field.name] ? errors[field.name] : undefined}
        >
            <ReactSelect
                styles={reactSelectDefaultStyles}
                options={options}
                name={field.name}
                placeholder={placeholder}
                backspaceRemovesValue={true}
                value={options.filter(option => option.value === field.value)}
                isSearchable={true}
                isClearable={isClearable}
                onChange={(option: any) => {
                    const setsFieldValuesAsync = async () => {
                        setFieldValue(field.name, option ? option.value : null);
                        await Promise.resolve();
                        if (props.onChangeCallback) {
                            props.onChangeCallback();
                        }
                    };
                    setsFieldValuesAsync().then(res => console.log('res', res));
                }}
                onBlur={field.onBlur}
                {...props}
            />
        </InputWrapper>
    );
};

function memoizedValueSelectAreEqual(prevProps: any, nextProps: any) {
    return prevProps.field.value === nextProps.field.value;
}

export const MemoizedValueSelect = React.memo(Select, memoizedValueSelectAreEqual);

export const MultiSelect = ({
    placeholder,
    alignment,
    title,
    options,
    field,
    form: { touched, errors, setFieldValue },
    ...props
}: FieldProps<any> & OptionProps<any> & IReactSelect) => {
    return (
        <InputWrapper
            alignment={alignment}
            name={field.name}
            title={title}
            errors={touched[field.name] && errors[field.name] ? errors[field.name] : undefined}
        >
            <ReactSelect
                isMulti={true}
                styles={reactSelectDefaultStyles}
                options={options}
                name={field.name}
                placeholder={placeholder}
                backspaceRemovesValue={true}
                value={options.filter(option => field.value.indexOf(option.value) !== -1)}
                isSearchable={true}
                onChange={(values: any) => {
                    setFieldValue(field.name, values.map((option: any) => option.value));
                }}
                onBlur={field.onBlur}
                {...props}
            />
        </InputWrapper>
    );
};

function memoizedValueMultiSelectAreEqual(prevProps: any, nextProps: any) {
    const [prevValues, nextValues] = [prevProps.field.value, nextProps.field.value];
    if (prevValues.length === 0 && nextValues.length === 0) {
        return true;
    }

    if (prevValues.length !== nextValues.length) {
        return false;
    }

    for (const value of nextValues) {
        if (prevValues.indexOf(value) === -1) {
            return false;
        }
    }

    return true;
}

export const MemoizedValueMultiSelect = React.memo(MultiSelect, memoizedValueMultiSelectAreEqual);

export const MultiCreateSelect = ({
    mask,
    placeholder,
    alignment,
    title,
    options,
    field,
    form: { touched, errors, setFieldValue },
    ...props
}: FieldProps<any> & OptionProps<any> & IReactCreateSelect) => {
    const tempErrors: any = errors[field.name];
    let finalError = tempErrors;
    if (Array.isArray(tempErrors)) {
        for (const tempError of tempErrors) {
            if (!tempError) {
                continue;
            }

            if (tempError.label) {
                finalError = tempError.label;
            } else if (tempError.value) {
                finalError = tempError.value;
            }
        }
    }

    return (
        <InputWrapper
            alignment={alignment}
            name={field.name}
            title={title}
            errors={touched[field.name] && tempErrors ? finalError : undefined}
        >
            <ReactCreatableSelect
                isMulti={true}
                styles={reactSelectDefaultStyles}
                options={options}
                name={field.name}
                placeholder={placeholder}
                backspaceRemovesValue={true}
                value={field.value}
                isSearchable={true}
                onChange={(values: any) => {
                    const formikValues = values.map((option: any) => {
                        const isNew = option.value === option.label;
                        const maskedLabel = option.label.replace(mask, '');

                        return {
                            value: isNew ? maskedLabel : option.value,
                            label: maskedLabel,
                            isNew: isNew,
                        };
                    });
                    setFieldValue(field.name, formikValues);
                }}
                onBlur={field.onBlur}
                {...props}
            />
        </InputWrapper>
    );
};

export const MemoizedValueMultiCreateSelect = React.memo(
    MultiCreateSelect,
    memoizedValueMultiSelectAreEqual
);
