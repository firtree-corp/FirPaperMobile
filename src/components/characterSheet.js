import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withTheme, FAB } from 'react-native-paper';
import { connect } from 'react-redux';

class CharacterSheet extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerContent}>
                    <Text>
                        CharacterSheet
                    </Text>
                </View>
                <FAB
                    style={styles.menuButton}
                    small
                    icon="menu"
                    onPress={() => console.log('Pressed')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        position: 'absolute',
        bottom: 20,
        marginLeft: 10,
    },
});

const mapStateToProps = (state) => {
    return {
        informations: state.character.informations,
    };
};

export default connect(mapStateToProps, {
})(withTheme(CharacterSheet));