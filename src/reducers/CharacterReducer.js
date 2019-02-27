import TYPES from '../actions/types';

const INITIAL_STATE = {
    informations: {
        lore: {
            name: 'Sigismund',
            age: '34 ans'
        },
        Caracteristiques: {
            trait_1: 'Chimiocastré',
            trait_2: 'Odeur chimique'
        }
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};