/* tslint:disable:no-console */ 

export function GetErrorKeysArray(res: any) {
    const errors = res.graphQLErrors.map((error: any) => error.extensions.code);
    return errors;
}