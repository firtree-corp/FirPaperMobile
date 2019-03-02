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
import { categoryChangeSelected, categoryChangeItem } from '../../actions';

class CharacterSheetCategory extends React.Component {

    handleText = (index, key, value) => {
        const { categoryChangeItem } = this.props;

        categoryChangeItem(index, key, value);
    }

    renderInput(value, key) {
        const { theme } = this.props;

        return (
            <View key={key} style={styles.textContainer}>
                <TextInput
                    multiline={true}
                    style={{ ...styles.nameText, color: theme.colors.primary }}
                    value={value.name}
                    onChangeText={(e) => this.handleText(key, 'name', e)} />
                {(value.value) ? <Text style={{ ...styles.valueText, color: theme.colors.primary }}>
                    {' : '}
                </Text> : <Text></Text>}
                {(value.value) ?
                    <TextInput
                        multiline={true}
                        style={{ ...styles.nameText, color: theme.colors.primary }}
                        value={value.value}
                        onChangeText={(e) => this.handleText(key, 'value', e)} />
                    : <Text></Text>}
            </View>
        );
    }

    renderText(value, key) {
        const { theme } = this.props;

        return (
            <View key={key} style={styles.textContainer}>
                <Text
                    style={{ ...styles.nameText, color: theme.colors.primary }}>
                    {value.name}
                </Text>
                {(value.value) ? <Text style={{ ...styles.valueText, color: theme.colors.primary }}>
                    {' : '}
                </Text> : <Text></Text>}
                {(value.value) ?
                    <Text
                        style={{ ...styles.nameText, color: theme.colors.primary }}>
                        {value.value}
                    </Text>
                    : <Text></Text>}
            </View>
        );
    }

    render() {
        const { sheet, selected, theme } = this.props;

        return (
            <ScrollView contentContainerStyle={styles.container}>
                {sheet[selected].map((value, key) => {
                    return (
                        <View key={key}>
                            {value.edit === true ? this.renderInput(value, key) : this.renderText(value, key)}
                            <Divider style={styles.divider} />
                        </View>
                    );
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        paddingTop: '10%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    textContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginBottom: 20,
    },
    nameText: {
        fontSize: 24,
    },
    valueText: {
        fontSize: 24,
    },
    divider: {
        width: '100%',
        marginBottom: 20,
    },
});

const mapStateToProps = (state) => {
    return {
        sheet: state.character.sheet,
        selected: state.character.selected,
    };
};

export default connect(mapStateToProps, {
    categoryChangeSelected,
    categoryChangeItem,
})(withTheme(CharacterSheetCategory));