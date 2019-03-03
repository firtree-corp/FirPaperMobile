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
import BoxPop from '../Animation/boxPop';

let { height } = Dimensions.get('window');

class CharacterSheet extends React.Component {

    getSheetLength = () => {
        const { sheet } = this.props;
        let i = 0;

        for (; i < Object.keys(sheet).length; i += 1);
        return (i);
    }

    state = {
        ProgressBarValue: 0.,
        ProgressBarKey: -1,
        isVisibleTab: Array(this.getSheetLength()).fill(false)
    }

    setItemVisible = (key) => {
        const { isVisibleTab } = this.state;
        let tmp = [...isVisibleTab];

        if (key == this.getSheetLength())
            return;
        tmp[key] = true;
        this.setState({
            isVisibleTab: tmp
        }, () => {
            setTimeout(() => {
                this.setItemVisible(key + 1);
            }, 50);
        });
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setItemVisible(0);
        }, 50);
    };

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
        const { ProgressBarKey, ProgressBarValue, isVisibleTab } = this.state;

        return (
            <ScrollView contentContainerStyle={styles.containerContent}>
                {Object.keys(sheet).map((value, key) => {
                    return (
                        <TouchableOpacity
                            key={key}
                            style={[styles.OpacityCard, ((ProgressBarKey !== -1 && ProgressBarKey !== key) ? { opacity: 0.3 } : 0)]}
                            disabled={(ProgressBarKey === -1 || ProgressBarKey === key) ? false : true}
                            onPress={() => this.handleCategoryPressed(value)}>
                            <BoxPop pose={isVisibleTab[key] ? "visible" : "hidden"}>
                                <Surface key={key} style={styles.card}>
                                    <View key={key} style={styles.cardTitleContainer}>
                                        <Text
                                            numberOfLines={1}
                                            style={{ ...styles.textTitle, color: theme.colors.primary }}>
                                            {value}
                                        </Text>
                                    </View>
                                    <Divider />
                                    <View style={styles.itemContainer}>
                                        <View style={styles.itemNameContainer}>
                                            {sheet[value].map((valueI, keyI) => {
                                                if (valueI.favorite === true) {
                                                    return (
                                                        <View style={styles.center} key={keyI}>
                                                            <Text
                                                                numberOfLines={1}
                                                                key={keyI}
                                                                style={{ ...styles.itemName, color: theme.colors.primary }}>
                                                                {(valueI.dimin ? valueI.dimin : valueI.name)}
                                                            </Text>
                                                        </View>
                                                    );
                                                }
                                            })}
                                        </View>
                                        <View style={styles.itemValueContainer}>
                                            {sheet[value].map((valueI, keyI) => {
                                                if (valueI.favorite === true) {
                                                    return (
                                                        <View style={styles.center} key={keyI}>
                                                            <Text
                                                                key={keyI}
                                                                numberOfLines={1}
                                                                style={{ ...styles.itemName, color: theme.colors.primary }}>
                                                                {valueI.value}
                                                            </Text>
                                                        </View>
                                                    );
                                                }
                                            })}
                                        </View>
                                    </View>
                                </Surface>
                            </BoxPop>
                            {(ProgressBarKey == key) ? <ProgressBar style={styles.progressBar} progress={ProgressBarValue} /> : <Text></Text>}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        );
    }

    renderHomeFooter() {
        return (
            <View style={styles.homeFooter}>
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
            <View style={styles.categoryFooter}>
                <Divider style={styles.footerDivider} />
                <View style={styles.footerSub}>
                    <FAB
                        small
                        icon="menu"
                        onPress={() => console.log('Pressed')}
                    />
                    <Text
                        style={{ ...styles.footerTitle, color: theme.colors.primary }}>
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
    homeFooter: {
        display: 'flex',
        position: 'absolute',
        bottom: 10,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
    },
    categoryFooter: {
        display: 'flex',
        width: '100%',
        height: '10%',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
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
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 2,
    },
    cardTitleContainer: {
        display: 'flex',
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '3%',
    },
    itemContainer: {
        display: 'flex',
        width: '100%',
        height: '90%',
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        overflow: 'hidden',
    },
    itemNameContainer: {
        display: 'flex',
        width: '50%',
        height: '100%',
        flexDirection: 'column',
        borderRightWidth: 1,
        borderRightColor: '#DDDDDD',
        paddingRight: 2
    },
    itemValueContainer: {
        display: 'flex',
        width: '50%',
        height: '100%',
        flexDirection: 'column',
        paddingLeft: 2
    },
    itemName: {
        fontSize: 14,
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
    center: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    }
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