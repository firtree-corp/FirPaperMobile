import * as React from 'react';
import { connect } from 'react-redux';
import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {
    withTheme,
    Divider,
    TextInput,
    IconButton,
    Dialog,
    Paragraph,
    Button,
    Portal,
} from 'react-native-paper';
import { categoryChangeSelected, categoryChangeItem, deleteItem, addItem } from '../../actions';
import translate from '../../locales/i18n';

class CharacterSheetCategory extends React.Component {

    state = {
        dialogStatus: false,
        deleteKey: -1,
    }

    handleDialogStatus = (key) => {
        const { dialogStatus } = this.state;
        let newStatus = !dialogStatus;

        this.setState({
            dialogStatus: newStatus,
            deleteKey: key
        });
    }

    handleChangeItem = (index, key, value) => {
        const { categoryChangeItem } = this.props;

        categoryChangeItem(index, key, value);
    }

    handleDeleteItem = () => {
        const { deleteItem } = this.props;
        const { deleteKey } = this.state;

        deleteItem(deleteKey);
        this.handleDialogStatus(-1);
    }

    handleAddItem = () => {
        const { addItem } = this.props;

        addItem();
    }

    renderInput(value, key) {
        const { theme } = this.props;

        return (
            <View key={key} style={styles.textContainer}>
                <TextInput
                    disabled={!value.edit}
                    label={translate.i18n('NAME')}
                    mode='outlined'
                    multiline={true}
                    style={{ ...styles.nameText, color: theme.colors.primary }}
                    value={value.name}
                    onChangeText={(e) => this.handleChangeItem(key, 'name', e)} />
                <TextInput
                    disabled={!value.edit}
                    label={translate.i18n('VALUE')}
                    mode='outlined'
                    multiline={true}
                    style={{ ...styles.nameText, color: theme.colors.primary }}
                    value={value.value}
                    onChangeText={(e) => this.handleChangeItem(key, 'value', e)} />
            </View>
        );
    }

    renderOptions(value, key) {
        return (
            <View style={styles.optionsContainer}>
                <IconButton
                    icon={(value.favorite === true) ? "star" : "star-border"}
                    color="#c0ca33"
                    onPress={() => this.handleChangeItem(key, 'favorite', !value.favorite)}
                />
                <IconButton
                    icon="delete-forever"
                    color="#b71c1c"
                    disabled={!value.delete}
                    onPress={() => this.handleDialogStatus(key)}
                />
            </View>
        );
    }

    renderAddItem() {
        const { theme } = this.props;

        return (
            <View style={styles.addItemContainer}>
                <IconButton
                    icon="add"
                    size={32}
                    color={theme.colors.accent}
                    onPress={this.handleAddItem}
                />
            </View>
        );
    }

    render() {
        const { sheet, selected } = this.props;
        const { dialogStatus, deleteKey } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView scrollEnabled={true}>
                    {sheet[selected].map((value, key) => {
                        return (
                            <View key={key}>
                                <View style={styles.lineContainer} key={key}>
                                    {this.renderInput(value, key)}
                                    {this.renderOptions(value, key)}
                                </View>
                                <Divider style={styles.divider} />
                            </View>
                        );
                    })}
                    {this.renderAddItem()}
                    <Portal>
                        <Dialog
                            visible={dialogStatus}
                            dismissable={false}>
                            <Dialog.Content>
                                <Paragraph>{translate.i18n('SURE_TO_DELETE')} : {(sheet[selected][deleteKey]) ? sheet[selected][deleteKey].name : ''}</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => this.handleDialogStatus(deleteKey)}>No</Button>
                                <Button onPress={this.handleDeleteItem}>Yes</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '90%',
        flexDirection: 'column',
        paddingTop: '10%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    lineContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    textContainer: {
        display: 'flex',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    optionsContainer: {
        display: 'flex',
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    nameText: {
        width: '45%',
        fontSize: 24
    },
    valueText: {
        width: '45%',
        fontSize: 24
    },
    divider: {
        width: '100%',
        marginBottom: 20,
    },
    addItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
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
    deleteItem,
    addItem,
})(withTheme(CharacterSheetCategory));