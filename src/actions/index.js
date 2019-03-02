import TYPES from './types';
import UserService from '../services/userService';
import translate from '../locales/i18n';

export const dicesThrew = (dices) => {
    return {
        type: TYPES.THROW_DICES,
        payload: dices
    };
};

export const dicesChangeType = (type) => {
    return {
        type: TYPES.CHANGE_DICES_TYPE,
        payload: type
    };
};

export const hourglassLauched = () => {
    return {
        type: TYPES.RUN_HOURGLASS
    };
};

export const categoryChangeSelected = (key) => {
    return {
        type: TYPES.CHANGE_CATEGORY_SELECTED,
        payload: key
    };
};

export const categoryChangeItem = (index, key, value) => {
    return {
        type: TYPES.CHANGE_CATEGORY_ITEM,
        payload: {
            index: index,
            key: key,
            value: value,
        }
    };
};

export const changeLanguage = (mode) => {
    translate.setLanguage(mode);
    return {
        type: TYPES.CHANGE_LANGUAGE,
        payload: mode
    };
}

export const deleteItem = (index) => {
    return {
        type: TYPES.DELETE_ITEM,
        payload: index
    }
}

export const addItem = () => {
    return {
        type: TYPES.ADD_ITEM,
    }
}

export const connectUser = (user, password) => {
    return (dispatch) => {
        dispatch({ type: TYPES.CONNECT });
        UserService.logIn({user: user, password: password})
        .then(data => connectUserSuccess(dispatch, data.token))
        .catch(() => {
            setTimeout(() => {
                disableError(dispatch);
            }, 4000);
            connectUserFailure(dispatch);
        });
    };
};

const connectUserFailure = (dispatch) => {
    dispatch({
        type: TYPES.CONNECT_FAILURE
    });
}

const connectUserSuccess = (dispatch, token) => {
    dispatch({
        type: TYPES.CONNECT_SUCCESS,
        payload: token
    });
}