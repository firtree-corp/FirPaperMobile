import * as React from 'react';
import { connect } from 'react-redux';
import CharacterSheetCategory from './characterSheetCategory';
import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {
    withTheme,
    FAB,
    Surface,
    Text,
    Divider,
    ProgressBar
} from 'react-native-paper';
import { categoryChangeSelected } from '../actions';

let { height } = Dimensions.get('window');

class CharacterSheet extends React.Component {

    state = {
        ProgressBarValue: 0.,
        ProgressBarKey: -1,
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    progressBarTick = () => {
        const { ProgressBarValue } = this.state;
        let newValue = ProgressBarValue;
        let shift = (Math.random() * (0.2 - 0.001)) + 0.001

        newValue = (newValue + shift > 1.) ? 0 : newValue + shift;
        this.setState({
            ProgressBarValue: newValue
        }, () => {
            clearInterval(this.interval);
            this.interval = setInterval(() => this.progressBarTick(), 50);
        });
    }

    handleCategoryPressed = key => {
        const { categoryChangeSelected } = this.props;
        //clearInterval(this.interval);
        categoryChangeSelected(key);
        // this.setState({
        //     ProgressBarKey: key,
        // }, () => {
        //     this.interval = setInterval(() => this.progressBarTick(), 50);
        // });
    }

    renderCategories() {
        const { sheet } = this.props;
        const { ProgressBarKey, ProgressBarValue } = this.state;

        return (
            <ScrollView contentContainerStyle={styles.containerContent}>
                {Object.keys(sheet).map((value, key) => {
                    return (
                        <TouchableOpacity
                            key={key}
                            style={[styles.OpacityCard, ((ProgressBarKey !== -1 && ProgressBarKey !== key) ? {opacity: 0.3} : 0)]}
                            disabled={(ProgressBarKey === -1 || ProgressBarKey === key) ? false : true}
                            onPress={() => this.handleCategoryPressed(key)}>
                            <Surface key={key} style={styles.card}>
                                <View key={key} style={styles.cardTitleContainer}>
                                    <Text>
                                        {value}
                                    </Text>
                                </View>
                                <Divider />
                                {sheet[value].map((valueI, keyI) => {
                                    return (
                                        <View key={keyI} style={styles.item}>
                                            <Text key={keyI} style={styles.itemName}>
                                                {valueI.dimin + (valueI.value ? ": " + valueI.value : '')}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </Surface>
                            {(ProgressBarKey == key) ? <ProgressBar style={styles.progressBar} progress={ProgressBarValue} /> : <Text></Text>}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        );
    }

    render() {
        const { selected } = this.props;

        return (
            <View style={styles.container}>
                {(selected === -1) ? this.renderCategories() : <CharacterSheetCategory />}
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
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 30,
    },
    menuButton: {
        position: 'absolute',
        bottom: 10,
        marginLeft: 10,
    },
    OpacityCard: {
        display: 'flex',
        width: '45%',
        height: height / 2.5,
        marginBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
    },
    card: {
        display: 'flex',
        width: '100%',
        height: '100%',
        elevation: 4,
    },
    cardTitleContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 3,
        paddingBottom: 3,
    },
    item: {
        marginTop: 5,
    },
    itemName: {
        fontSize: 20,
        color: '#757575',
    },
    progressBar: {
        bottom: 10,
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
})(withTheme(CharacterSheet));