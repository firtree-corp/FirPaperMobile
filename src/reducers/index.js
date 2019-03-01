import { combineReducers } from 'redux';
import DicesReducer from './DicesReducer';
import CharacterReducer from './CharacterReducer';

export default combineReducers({
    dices: DicesReducer,
    character: CharacterReducer,
});