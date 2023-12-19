export interface ICustomFieldWithValueType {
    boolValue: boolean | null,
    customFieldEntityId: string,
    customFieldEntityName: string,
    customFieldId: string,
    customFieldValueId: string | null,
    dataType: 'STRING' | 'INT' | 'DECIMAL' | 'DATE' | 'TIME' | 'BOOL' | 'DATETIME' | null,
    dateTimeValue: string | null
    decimalValue: number | null
    fieldType: 'INPUT' | 'CHECKBOX' | 'DROPDOWN' | 'MULTI_DROPDOWN' | 'EMAIL' | 'PHONE' | null,
    intValue: number | null
    optionFieldsJson: string | null,
    optionValuesJson: string | null,
    stringValue: string | null
    tabName: string,
    timeSpanValue: string | null,
    title: string,
}

export interface ICustomFieldIdRelatedData {
    customFieldValueId: string | null,
    dataType: ICustomFieldWithValueType['dataType'],
    fieldType: ICustomFieldWithValueType['fieldType'],
}
