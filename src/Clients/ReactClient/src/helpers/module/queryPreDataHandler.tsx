import React, { ReactNode } from 'react';
import i18next from 'i18next';
import { ApolloError } from 'apollo-client';

import { SpinnerBounce } from 'components/module/Spinners/Spinner';
import NoData from 'components/module/NoData/NoData';

interface queryPreDataHandlerProps {
    loading: boolean;
    error: ApolloError | undefined;
    data: any;
    mainEntityKey?: string;
    loadingHandler?(): ReactNode | void;
    errorHandler?(error: ApolloError): ReactNode | void;
    noDataHandler?(): ReactNode | void;
}

export function queryPreDataHandler({
    loading,
    error,
    data,
    mainEntityKey,
    loadingHandler,
    errorHandler,
    noDataHandler,
}: queryPreDataHandlerProps): any {
    if (loading && loadingHandler) {
        return loadingHandler();
    } else if (loading) {
        return <SpinnerBounce className="d-flex justify-content-center" />;
    }

    if (error && errorHandler) {
        return errorHandler(error);
    } else if (error) {
        return <p>{i18next.t('errors.failedToLoad')}</p>;
    }

    if (data && mainEntityKey && !data[mainEntityKey]) {
        return noDataHandler ? noDataHandler() : <NoData message={i18next.t('noData.entityNotFound')} />;
    }

    let hasNoData = true;
    if (data) {
        for (const key in data) {
            if (data[key]) {
                hasNoData = false;
            }
        }
    }

    if (hasNoData && noDataHandler) {
        console.warn('No data was returned from the server');
        return noDataHandler();
    } else if (hasNoData) {
        console.warn('No data was returned from the server');
        return <NoData />;
    }
}

// Handlers BEGIN

export function noDataWithMessage(message: string) {
    return () => <NoData message={message} />;
}

// Handlers END
