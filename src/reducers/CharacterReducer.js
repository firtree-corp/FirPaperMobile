import TYPES from '../actions/types';

const INITIAL_STATE = {
    sheet: {
        Lore: [
            {name: 'Nom', value: 'Sigismund', edit: false, delete: false, type: 'text', dimin: 'Nom'},
            {name: 'Âge', value: '34 ans', edit: false, delete: false, type: 'number', dimin: 'Âge'}
        ],
        Traits: [
            {name: 'Chimiocastré', value: '', edit: false, delete: false, type: 'text', dimin: 'Chimiocastré'},
            {name: 'Odeur chimique', value: '', edit: false, delete: false, type: 'text', dimin: 'Odeur chimique'},
        ],
        Statistiques: [
            {name: 'Force', value: '32', edit: false, delete: false, type: 'number', dimin: 'F'},
            {name: 'Intelligence', value: '28', edit: false, delete: false, type: 'number', dimin: 'Int'}
        ],
        Équipements: [
            {name: 'Balles 9mm', value: '58', edit: true, delete: true, type: 'number', dimin: 'Balles 9mm'},
            {name: 'Bâton', value: '', edit: true, delete: true, type: 'text', dimin: 'Bâton'}
        ],
    },
    selected: -1,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.CHANGE_CATEGORY_SELECTED:
            return { ...state, selected: action.payload };
        default:
            return state;
    }
};