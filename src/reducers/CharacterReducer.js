import TYPES from '../actions/types';

const INITIAL_STATE = {
    sheet: {
        Lore: [
            { name: 'Nom', value: 'Sigismund', edit: false, delete: false, type: 'text', dimin: '', favorite: true },
            { name: 'Âge', value: '34 ans', edit: false, delete: false, type: 'number', dimin: '', favorite: false }
        ],
        Traits: [
            { name: 'Chimiocastré', value: '', edit: false, delete: false, type: 'text', dimin: '', favorite: true },
            { name: 'Odeur chimique', value: '', edit: false, delete: false, type: 'text', dimin: '', favorite: true },
        ],
        Statistiques: [
            { name: 'Force', value: '32', edit: false, delete: false, type: 'number', dimin: 'F', favorite: true },
            { name: 'Intelligence', value: '28', edit: false, delete: false, type: 'number', dimin: 'Int', favorite: true },
        ],
        Équipements: [
            { name: 'Balles 9mm', value: '3', edit: true, delete: true, type: 'number', dimin: '', favorite: true },
            { name: 'Bâton', value: '', edit: true, delete: true, type: 'text', dimin: '', favorite: false }
        ],
    },
    selected: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES.CHANGE_CATEGORY_SELECTED:
            return { ...state, selected: action.payload };
        case TYPES.CHANGE_CATEGORY_ITEM:
            let tmpChange = { ...state.sheet };
            tmpChange[state.selected][action.payload.index][action.payload.key] = action.payload.value;
            return { ...state, sheet: tmpChange };
        case TYPES.DELETE_ITEM:
            let tmpDelete = { ...state.sheet };
            tmpDelete[state.selected].splice(action.payload, 1);
            return { ...state, sheet: tmpDelete };
        case TYPES.ADD_ITEM:
            let tmpAdd = { ...state.sheet };
            tmpAdd[state.selected].push({ name: '', value: '', edit: true, delete: true, type: 'text', dimin: '', favorite: false });
            return { ...state, sheet: tmpAdd };
        default:
            return state;
    }
};