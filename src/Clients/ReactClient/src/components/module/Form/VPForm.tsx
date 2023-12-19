import React from 'react'
import { FormikErrors } from "formik";

import './VPForm.css'

export interface IGenericInputField {
  alignment?: 'horizontal' | 'vertical' | undefined,
  title?: string
}

interface IInputWrapperProps {
  alignment: 'horizontal' | 'vertical' | undefined,
  name: string,
  title: string | undefined,
  errors: string | FormikErrors<any> | undefined,
  children: any
}


export const FormWrapper = (props: { className?: string, alignment?: 'vertical' | 'horizontal', children?: any } ) => {
  let defaultAlignment = 'vertical';
  if (props.alignment === 'vertical') {
    defaultAlignment = 'vertical'
  }
  else if (props.alignment === 'horizontal') {
    defaultAlignment = 'horizontal'
  }

  return (
    <div className={`vp-form ${defaultAlignment}-form ${props.className}`}>
      {props.children}
    </div>
  )
}

export const InputWrapper = (props: IInputWrapperProps ) => {
  const title = props.title === undefined ? null : <label htmlFor={props.name} className="control-label m-r-sm">{props.title}</label>;
  const error = props.errors === undefined ? null : <div className="validation-error">{props.errors}</div>

  return (
    <div className={`form-group ${props.alignment ? props.alignment : ''}`}>
      {title}
      <div>
        {props.children}
        {error}
      </div>
    </div>
  );
}
