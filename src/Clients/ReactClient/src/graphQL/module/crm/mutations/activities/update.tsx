import gql from 'graphql-tag';

export const UPDATE_ACTIVITY =  gql`
mutation updateActivity(
        $id: String!, 
        $description: String!,
        $date: Date,
        $contactPersonIds: [String],
        $contactCompanyIds: [String],
        $type: ActivityEnum!,
        $time: String,
) {
    updateActivity(input: {
        activityId: $id, 
        description: $description,
        date: $date,
        time: $time,
        contactPersonIds: $contactPersonIds,
        contactCompanyIds: $contactCompanyIds,
        type: $type
    })
}
`;