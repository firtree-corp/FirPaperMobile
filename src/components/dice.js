import * as React from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import {
    dicesThrew,
    dicesChangeType,
} from '../actions';

let { width } = Dimensions.get('window');

class Dice extends React.Component {

    state = {
        animationLeftValue: new Animated.Value(0),
        animationOpacityValue: new Animated.Value(0),
        buttonStatus: false,
        dialogStatus: false,
        dialogButtons: [
            { title: '1d2', value: 2 },
            { title: '1d5', value: 5 },
            { title: '1d10', value: 10 },
            { title: '1d20', value: 20 },
            { title: '1d100', value: 100 }
        ]
    }

    handleThrow = () => {
        const { type, dicesThrew, initialized } = this.props;
        const { animationLeftValue, animationOpacityValue } = this.state;

        if (initialized == false) {
            dicesThrew(Math.floor(Math.random() * type + 1));
            Animated.timing(animationOpacityValue, {
                toValue: 1,
                duration: 1000,
            }).start();
        } else {
            dicesThrew(Math.floor(Math.random() * type + 1));
            this.setState({ buttonStatus: true });
            Animated.timing(animationLeftValue, {
                toValue: width - 300,
                duration: 150,
                asing: Easing.linear,
            }).start(() => {
                dicesThrew(Math.floor(Math.random() * type + 1));
                Animated.timing(animationLeftValue, {
                    toValue: (width - 300) * -1,
                    duration: 150,
                    asing: Easing.linear,
                }).start(() => {
                    this.setState({ buttonStatus: false });
                    dicesThrew(Math.floor(Math.random() * type + 1));
                    Animated.timing(animationLeftValue, {
                        toValue: 0,
                        duration: 150,
                        asing: Easing.linear,
                    }).start();
                });
            });
        }
    };

    handleDialogOpen = () => {
        this.setState({ dialogStatus: true });
    };

    handleDialogClose = () => {
        this.setState({ dialogStatus: false });
    }

    handleDialogButton = value => {
        const { dicesChangeType } = this.props;
        dicesChangeType(value);
    };

    renderDice() {
        const { animationLeftValue, animationOpacityValue } = this.state;
        const { value, theme } = this.props;

        return (
            <Animated.View style={[{...styles.diceContainer, borderColor: theme.colors.accent}, { opacity: animationOpacityValue, left: animationLeftValue }]}>
                <Text style={{...styles.diceValue, color: theme.colors.accent}}>
                    {value}
                </Text>
            </Animated.View>
        );
    }

    renderThrowButton() {
        const { buttonStatus } = this.state;
        const { type } = this.props;

        return (
            <View style={styles.buttonContainer}>
                <Button
                    icon={require('../../assets/throwDices.png')}
                    mode="contained"
                    onPress={this.handleThrow}
                    disabled={buttonStatus}>
                    Lancer !
                </Button>
            </View>
        );
    }

    renderChangeType() {
        const { dialogStatus, dialogButtons } = this.state;
        const { type } = this.props;

        return (
            dialogButtons.map((value, key) => {
                return (
                    <View key={key} style={styles.buttonView}>
                        <Button
                            mode="contained"
                            onPress={() => this.handleDialogButton(value.value)}
                            disabled={(type == value.value)}>
                            {value.value}
                        </Button>
                    </View>
                );
            })
        );
    }

    render() {
        const { initialized } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.diceThrowingContainer}>
                    {initialized == true ? this.renderDice() : <Text></Text>}
                    {this.renderThrowButton()}
                </View>
                <View style={styles.diceChangingTypeContainer}>
                    {this.renderChangeType()}
                </View>
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
    diceContainer: {
        display: 'flex',
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#062F4F',
        borderRadius: 25,
        width: 140,
        height: 140,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    },
    diceValue: {
        fontSize: 50,
        color: '#062F4F',
    },
    buttonView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    diceSelectionP: {
        fontSize: 16,
    },
    diceThrowingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '90%',
    },
    diceChangingTypeContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
});

const mapStateToProps = (state) => {
    return {
        value: state.dices.value,
        initialized: state.dices.initialized,
        type: state.dices.type,
    };
};

export default connect(mapStateToProps, {
    dicesThrew,
    dicesChangeType,
})(withTheme(Dice));