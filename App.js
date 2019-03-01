import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { createStore, applyMiddleware, Text } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import BottomNavBar from './src/components/NavBar/bottomNavBar';
import Login from './src/components/Login/login'
import theme from "./styles/theme"

class App extends React.Component {

    state = {
        dark: 0,
    };

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <StoreProvider store={store}>
                <PaperProvider theme={theme}>
                    <Login />
                </PaperProvider>
            </StoreProvider>
        );
    }
}

export default App;