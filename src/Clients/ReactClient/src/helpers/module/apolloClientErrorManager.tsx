export function handleErrors(graphQLErrors: any, networkError: any, response: any) {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }: any) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);

    // Potential future use (not strictly needed now that fix has been found for errors in Query-components)
    // if (networkError) {
    //     genericErrorToast(
    //         networkError.message === 'Failed to fetch'
    //             ? translateErrorCode('FailedToFetch')
    //             : networkError.message
    //     );
    // } else if (graphQLErrors) {
    //     for (const error of graphQLErrors) {
    //         if (error.extensions && error.extensions.code) {
    //             genericErrorToast(translateErrorCode(error.extensions.code));
    //         } else {
    //             genericErrorToast(error.message);
    //         }
    //     }
    // }
}
