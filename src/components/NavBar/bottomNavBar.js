import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import translate from '../../locales/i18n';
import CharacterSheet from '../CharacterSheet/characterSheet';
import Dice from '../Dices/dice';

class BottomNavBar extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'characterSheet', title: translate.i18n('CHARACTER'), icon: 'assignment-ind' },
            { key: 'dice', title: translate.i18n('DICES'), icon: { uri: 'https://flaticons.net/gd/makefg.php?i=icons/Sports/Dice.png&r=255&g=255&b=255' } },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        dice: Dice,
        characterSheet: CharacterSheet,
    });

    render() {
        return (
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={this._handleIndexChange}
                renderScene={this._renderScene}
            />
        );
    }
}


const mapStateToProps = (state) => {
    return {
        language: state.language.language
    };
};

export default connect(mapStateToProps, {
})(BottomNavBar);