import React from "react";

import { CustomFieldsRow } from "./Table/rows";

import * as CustomFieldTypes from "helpers/module/customFields/customFieldTypes";
import { getCustomFieldBehavior } from 'helpers/module/customFields/customFieldBehaviors';

export class CompareCustomRowBuilder {
  private leftCustomFields: CustomFieldTypes.ICustomFieldWithValueType[] = [];
  private rightCustomFields: CustomFieldTypes.ICustomFieldWithValueType[] = [];
  private formikBag: any;

  public constructor(
    leftCustomFields: CustomFieldTypes.ICustomFieldWithValueType[],
    rightCustomFields: CustomFieldTypes.ICustomFieldWithValueType[],
    formikBag: any
  ) {
    this.leftCustomFields = leftCustomFields;
    this.rightCustomFields = rightCustomFields;
    this.formikBag = formikBag;
  }

  public buildRows(): any {
    const customFieldRows: any[] = [];

    for (let i = 0; i < this.leftCustomFields.length; i++) {
      const left = this.leftCustomFields[i];
      const right = this.rightCustomFields[i];
      const noValues = left.customFieldValueId === null && right.customFieldValueId === null;
      const leftBehavior = getCustomFieldBehavior(left.fieldType, left.dataType);
      const rightBehavior = getCustomFieldBehavior(right.fieldType, right.dataType);
      const equalValues = leftBehavior.toString(left) === rightBehavior.toString(right);
      if (!(noValues || equalValues)) {
        customFieldRows.push({ left, right });
      }
    }

    return (
      <>
        {customFieldRows.map((customFieldData: any) => (
          <CustomFieldsRow
            key={customFieldData.left.customFieldId}
            leftValue={customFieldData.left}
            rightValue={customFieldData.right}
            formikBag={this.formikBag}
          />
        ))}
      </>
    );
  }
}
