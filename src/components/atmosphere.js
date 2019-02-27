import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';

class Atmosphere extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Atmosphere
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Atmosphere;