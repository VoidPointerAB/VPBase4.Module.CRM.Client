import React from "react";

import TransferIcon from "../../TransferIcon";
import { convertDataToComponent } from "helpers/module/customFields/customFieldCreator";
import {
  getCustomFieldBehavior,
  ICustomFieldBehavior
} from "helpers/module/customFields/customFieldBehaviors";

import * as CustomFieldTypes from "helpers/module/customFields/customFieldTypes";

interface ICustomFieldRowProps {
  leftValue: CustomFieldTypes.ICustomFieldWithValueType;
  rightValue: CustomFieldTypes.ICustomFieldWithValueType;
  formikBag: any;
}

class CustomFieldsRow extends React.Component<ICustomFieldRowProps, any> {
  public render() {
    const { formikBag, leftValue, rightValue } = this.props;

    const title = `${leftValue.tabName.replace("/", " / ")} / ${
      leftValue.title
    }`;
    const moddedLeftValue = { ...leftValue, title: "" };

    const leftCell = (
      <td className="text-center cell">
        {convertDataToComponent(moddedLeftValue)}
      </td>
    );

    const { fieldType, dataType } = leftValue;
    const customFieldBehavior = getCustomFieldBehavior(fieldType, dataType);
    const rightCellText = customFieldBehavior.toString(rightValue);
    const rightCell = (
      <td className="text-center cell">
        <div className="d-flex align-items-center">
          {rightCellText ? (
            <>
              <TransferIcon
                handleTransfer={() =>
                  getTransferHandler(
                    formikBag,
                    leftValue,
                    rightValue,
                    customFieldBehavior
                  )
                }
              />
              <span>{rightCellText}</span>
            </>
          ) : (
            <span>{rightCellText}</span>
          )}
        </div>
      </td>
    );

    return (
      <tr className="company-customFields-row">
        <th scope="row">{title}</th>
        {leftCell}
        {rightCell}
      </tr>
    );
  }
}

function getTransferHandler(
  formikBag: any,
  leftValue: CustomFieldTypes.ICustomFieldWithValueType,
  rightValue: CustomFieldTypes.ICustomFieldWithValueType,
  customFieldBehavior: ICustomFieldBehavior
) {
  const value = customFieldBehavior.getValue(rightValue);

  formikBag.setFieldValue(leftValue.customFieldId, value);
  formikBag.setFieldTouched(leftValue.customFieldId);
}

export default CustomFieldsRow;
