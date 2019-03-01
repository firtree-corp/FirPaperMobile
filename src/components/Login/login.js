import * as React from 'react';
import { connect } from 'react-redux';
import {
    View,
    ScrollView,
    StyleSheet,
    TextInput,
} from 'react-native';
import {
    withTheme,
    Text,
    Divider,
} from 'react-native-paper';

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
        display: 'flex',
        width: '100%',
    },
});

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, {
})(withTheme(CharacterSheetCategory));