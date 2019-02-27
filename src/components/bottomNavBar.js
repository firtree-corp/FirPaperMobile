import * as React from 'react';
import { View, Text } from 'react-native';
import { Provider as PaperProvider, BottomNavigation } from 'react-native-paper';
import { connect } from 'react-redux';
import CharacterSheet from './characterSheet';
import Dice from './dice';
import Atmosphere from './atmosphere';
import Hourglass from './hourglass';
import Theme from './theme';

class BottomNavBar extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'atmosphere', title: 'Ambiance', icon: 'queue-music' },
            { key: 'dice', title: 'Dés', icon: { uri: 'https://flaticons.net/gd/makefg.php?i=icons/Sports/Dice.png&r=255&g=255&b=255' } },
            { key: 'hourglass', title: 'Sablier', icon: 'hourglass-empty' },
            { key: 'characterSheet', title: 'Personnage', icon: 'assignment-ind' },
            { key: 'theme', title: 'Thème', icon: 'invert-colors' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        atmosphere: Atmosphere,
        dice: Dice,
        hourglass: Hourglass,
        characterSheet: CharacterSheet,
        theme: Theme,
    });

    render() {
        const { theme } = this.props;

        return (
            <PaperProvider theme={theme}>
                <BottomNavigation
                    navigationState={this.state}
                    onIndexChange={this._handleIndexChange}
                    renderScene={this._renderScene}
                />
            </PaperProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme,
    };
};

export default connect(mapStateToProps, {
})(BottomNavBar);