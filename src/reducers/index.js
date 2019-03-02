import { combineReducers } from 'redux';
import DicesReducer from './DicesReducer';
import CharacterReducer from './CharacterReducer';
import UserReducer from './UserReducer';
import LanguageReducer from './LanguageReducer';

export default combineReducers({
    user: UserReducer,
    dices: DicesReducer,
    character: CharacterReducer,
    language: LanguageReducer
});