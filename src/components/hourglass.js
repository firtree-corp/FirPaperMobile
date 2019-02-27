import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import {
    hourglassLauched,
} from '../actions';

class Hourglass extends React.Component {

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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});

const mapStateToProps = (state) => {
    return {
        running: state.hourglass.running,
    };
};

export default connect(mapStateToProps, {
    hourglassLauched,
})(Hourglass);