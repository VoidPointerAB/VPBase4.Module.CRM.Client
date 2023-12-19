import gql from 'graphql-tag';

export const ADD_ACTIVITY = gql`
    mutation addActivity(
            $activityId: String!,
            $description: String!,
            $date: Date,
            $time: String,
            $contactPersonIds: [String],
            $contactCompanyIds: [String],
            $type: ActivityEnum!,
        ) {
        addActivity(input: {
            activityId : $activityId,
            description: $description,
            date: $date,
            time: $time,
            contactPersonIds: $contactPersonIds,
            contactCompanyIds: $contactCompanyIds,
            type: $type
        })
    }
`;