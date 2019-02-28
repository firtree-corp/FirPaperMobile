import * as React from 'react';
import { connect } from 'react-redux';
import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {
    withTheme,
    Text,
} from 'react-native-paper';
import { categoryChangeSelected } from '../actions';

class CharacterSheetCategory extends React.Component {

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStateToProps = (state) => {
    return {
        sheet: state.character.sheet,
        selected: state.character.selected,
    };
};

export default connect(mapStateToProps, {
    categoryChangeSelected
})(withTheme(CharacterSheetCategory));