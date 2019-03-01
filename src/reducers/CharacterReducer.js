import TYPES from '../actions/types';

const INITIAL_STATE = {
    sheet: {
        Lore: [
            {name: 'Nom', value: 'Sigismund', edit: false, delete: false, type: 'text', dimin: ''},
            {name: 'Âge', value: '34 ans', edit: false, delete: false, type: 'number', dimin: ''}
        ],
        Traits: [
            {name: 'Chimiocastré', value: '', edit: false, delete: false, type: 'text', dimin: ''},
            {name: 'Odeur chimique', value: '', edit: false, delete: false, type: 'text', dimin: ''},
        ],
        Statistiques: [
            {name: 'Force', value: '32', edit: false, delete: false, type: 'number', dimin: 'F'},
            {name: 'Intelligence', value: '28', edit: false, delete: false, type: 'number', dimin: 'Int'}
        ],
        Équipements: [
            {name: 'Balles 9mm', value: '58', edit: true, delete: true, type: 'number', dimin: ''},
            {name: 'Bâton', value: '', edit: true, delete: true, type: 'text', dimin: ''}
        ],
    },
    selected: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.CHANGE_CATEGORY_SELECTED:
            return { ...state, selected: action.payload };
        case TYPES.CHANGE_CATEGORY_ITEM:
        let tmp = {...state.sheet};
        tmp[state.selected][action.payload.index][action.payload.key] = action.payload.value;
        return { ...state, sheet: tmp };
        default:
            return state;
    }
};