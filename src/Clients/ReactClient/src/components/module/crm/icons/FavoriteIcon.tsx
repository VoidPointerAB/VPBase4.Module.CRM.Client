import React, { useState } from 'react';
import i18next from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import apolloClient from 'apolloClient';

import { ADD_USER_FAVORITE } from 'graphQL/module/crm/mutations/userFavorite/addUserFavorite';
import { DELETE_USER_FAVORITE } from 'graphQL/module/crm/mutations/userFavorite/deleteUserFavorite';
import { addUserFavoriteVariables, addUserFavorite } from 'graphQL/module/crm/generatedTypes/addUserFavorite';
import { UserFavoriteEntityTypeEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

import { handleGraphQlErrors, handleGraphQlException } from 'helpers/module/crm/errorManagement';
interface IProps {
    name?: string,
    isFavorite: boolean | null,
    id: string,
    type: UserFavoriteEntityTypeEnum.COMPANY | UserFavoriteEntityTypeEnum.PERSON
}

const FavoriteIcon = (props: IProps) => {
    const [isFavorite, setIsFavorite] = useState(props.isFavorite);

    const handleFavorite = () => {
        setFavoriteInDatabase(props.id, !isFavorite, props.type, () => {
            setIsFavorite(isFavorite);
        })

        setIsFavorite(!isFavorite)

        toast.info(() => {
            let message;
            if (isFavorite) {
                message = props.name 
                    ? `${props.name}, ${i18next.t('messages.notFavorized')}!`
                    : 'Favorite removed'
            }
            else {
                message = props.name 
                    ? `${props.name}, ${i18next.t('messages.isFavorized')}!`
                    : 'Favorite added'
            }

            return <><FontAwesomeIcon icon="star" size="1x" className="ml-2 mr-3" /> {message}</>
        })
    }
    return (
        <span className="ibox-star icon-p mr-2" style={{ color: isFavorite ? '#f8ac59' : 'lightgray' }} onClick={handleFavorite}>
            <FontAwesomeIcon icon="star" />
        </span>
    )
}

const setFavoriteInDatabase = (id: string, isFavorite: boolean, entityType: UserFavoriteEntityTypeEnum, onError?: () => void) => {
    apolloClient
        .mutate<addUserFavorite, addUserFavoriteVariables>({
            mutation: isFavorite ? ADD_USER_FAVORITE : DELETE_USER_FAVORITE,
            variables: { id, entityType },
        })
        .then(({ errors }: any) => {
            handleGraphQlErrors(errors);

            if (errors && errors.length > 0 && onError) {
                onError();
            }
        })
        .catch((error: any) => {
            handleGraphQlException(error);

            if (onError) {
                onError();
            }
        });
};

export default FavoriteIcon
