import TYPES from './types';

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