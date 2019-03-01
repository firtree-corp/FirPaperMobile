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
import { categoryChangeSelected } from '../../actions';

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

    handleCategoryPressed = value => {
        const { categoryChangeSelected } = this.props;
        //clearInterval(this.interval);
        categoryChangeSelected(value);
        // this.setState({
        //     ProgressBarKey: key,
        // }, () => {
        //     this.interval = setInterval(() => this.progressBarTick(), 50);
        // });
    }

    renderCategories() {
        const { sheet, theme } = this.props;
        const { ProgressBarKey, ProgressBarValue } = this.state;

        return (
            <ScrollView contentContainerStyle={styles.containerContent}>
                {Object.keys(sheet).map((value, key) => {
                    return (
                        <TouchableOpacity
                            key={key}
                            style={[styles.OpacityCard, ((ProgressBarKey !== -1 && ProgressBarKey !== key) ? { opacity: 0.3 } : 0)]}
                            disabled={(ProgressBarKey === -1 || ProgressBarKey === key) ? false : true}
                            onPress={() => this.handleCategoryPressed(value)}>
                            <Surface key={key} style={styles.card}>
                                <View key={key} style={styles.cardTitleContainer}>
                                    <Text style={{ ...styles.textTitle, color: theme.colors.primary }}>
                                        {value}
                                    </Text>
                                </View>
                                <Divider />
                                {sheet[value].map((valueI, keyI) => {
                                    return (
                                        <View key={keyI} style={styles.item}>
                                            <Text key={keyI} style={{ ...styles.itemName, color: theme.colors.primary }}>
                                                {(valueI.dimin ? valueI.dimin : valueI.name) + (valueI.value ? ": " + valueI.value : '')}
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

    renderHomeFooter() {
        return (
            <View style={styles.footer}>
                <View style={styles.footerSub}>
                    <FAB
                        small
                        icon="menu"
                        onPress={() => console.log('Pressed')}
                    />
                </View>
            </View>
        );
    }

    renderCategoryFooter() {
        const { selected, theme } = this.props;

        return (
            <View style={styles.footer}>
                <Divider style={styles.footerDivider}/>
                <View style={styles.footerSub}>
                    <FAB
                        small
                        icon="menu"
                        onPress={() => console.log('Pressed')}
                    />
                    <Text
                    style={{...styles.footerTitle, color: theme.colors.primary}}>
                        {selected}
                    </Text>
                    <FAB
                        small
                        icon="home"
                        onPress={() => this.handleCategoryPressed('')}
                    />
                </View>
            </View>
        );
    }

    render() {
        const { selected } = this.props;

        return (
            <View style={styles.container}>
                {(!selected) ? this.renderCategories() : <CharacterSheetCategory />}
                {(!selected) ? this.renderHomeFooter() : this.renderCategoryFooter()}
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
    footer: {
        display: 'flex',
        position: 'absolute',
        bottom: 10,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
    },
    footerSub: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        width: '100%'
    },
    footerDivider: {
        marginBottom: 5,
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
        fontSize: 18,
    },
    progressBar: {
        bottom: 10,
    },
    textTitle: {
        fontWeight: 'bold'
    },
    footerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
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