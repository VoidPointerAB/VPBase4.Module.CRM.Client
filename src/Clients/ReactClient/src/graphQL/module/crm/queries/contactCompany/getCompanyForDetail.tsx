import gql from 'graphql-tag';

export const GET_COMPANY_FOR_DETAIL = gql`
  query getContactCompanyDetails($id: String!) {
    contactCompany(id: $id) {
      contactCompanyId
      name
      email
      phone
      website
      createdByUserId
      isUserFavorite
      addresses {
        street
        city
        postCode
        addressType
        addressId
        countryId
        countryName
      }
      note
      segment
      tags
      organizationNumber
      contactPersons {
        contactPersonId
        firstName
        lastName
      }
      customFieldsWithValue {
        customFieldEntityId
        customFieldEntityName
        customFieldId
        dataType
        fieldType
        optionFieldsJson
        optionValuesJson
        tabName
        title
        customFieldValueId
        stringValue
        intValue
        decimalValue
        boolValue
        timeSpanValue
        dateTimeValue
      }
      activities {
        activityId
        contactPersons {
          id
          name
        }
        contactCompanies {
          id
          name
        }
        description
        date
        time
        type
        createdUtc
      }
    }
  }
`;
