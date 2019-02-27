import { combineReducers } from 'redux';
import DicesReducer from './DicesReducer';
import HourglassReducer from './HourglassReducer';
import ThemeReducer from './ThemeReducer';
import CharacterReducer from './CharacterReducer';

export default combineReducers({
    dices: DicesReducer,
    hourglass: HourglassReducer,
    theme: ThemeReducer,
    character: CharacterReducer,
});