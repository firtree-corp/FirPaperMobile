import TYPES from './types';

export const themeChange = (key, value) => {
    return {
        type: TYPES.CHANGE_THEME,
        payload: {
            key: key,
            value: value,
        }
    };
};

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