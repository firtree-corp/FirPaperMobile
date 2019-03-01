import { combineReducers } from 'redux';
import DicesReducer from './DicesReducer';
import CharacterReducer from './CharacterReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    user: UserReducer,
    dices: DicesReducer,
    character: CharacterReducer,
});