import * as React from 'react';
import { connect } from 'react-redux';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    withTheme,
    Text,
    Divider,
    TextInput,
    FAB,
    Snackbar
} from 'react-native-paper';
import LoginImage from './loginImageComponent';
import translate from '../../locales/i18n';
import Flag from 'react-native-flags';
import BottomNavBar from '../NavBar/bottomNavBar';
import { connectUser } from '../../actions';
import languages from '../../locales/LanguageList';

class Login extends React.Component {

    state = {
        userName: '',
        password: '',
        languages: languages,
        currentLanguage: 'fr',
    }

    handleConnection = () => {
        const { connectUser } = this.props;
        const { userName, password } = this.state;

        connectUser(userName, password);
    }

    handleUserName = value => {
        this.setState({
            userName: value
        });
    }

    handlePassword = value => {
        this.setState({
            password: value
        });
    }

    handleLanguage = flag => {
        translate.setLanguage(flag);
        this.setState({
            currentLanguage: flag
        });
    }

    renderTitle() {
        return (
            <View style={styles.titleContainer}>
                <View style={styles.centered}>
                    <Text style={styles.loginText}>
                        {translate.i18n('LOGIN')}
                    </Text>
                </View>
                <View style={styles.centered}>
                    <Text style={styles.titleText}>
                        FIR PAPER
                        </Text>
                </View>
            </View>
        );
    }

    renderInput() {
        const { userName, password } = this.state;

        return (
            <View style={styles.inputContainer}>
                <View style={styles.centered}>
                    <TextInput
                        label={translate.i18n('USERNAME') + ' / ' + translate.i18n('EMAIL')}
                        placeholder={translate.i18n('NAME') + '@gmail.com'}
                        mode='flat'
                        value={userName}
                        onChangeText={this.handleUserName}
                        style={styles.input}
                    />
                </View>
                <View style={styles.centered}>
                    <TextInput
                        label={translate.i18n('PASSWORD')}
                        placeholder='******'
                        mode='flat'
                        value={password}
                        secureTextEntry={true}
                        onChangeText={this.handlePassword}
                        style={styles.input}
                    />
                </View>
            </View>
        );
    }

    renderConnection() {
        return (
            <View style={styles.buttonContainer}>
                <View style={styles.centered}>
                    <FAB
                        label={translate.i18n('CONNECT')}
                        icon="input"
                        onPress={this.handleConnection}
                    />
                </View>
            </View>
        )
    }

    renderFlags() {
        const { languages } = this.state;

        return (
            <View>
                {languages.map((flag, key) => {
                    return (
                        <TouchableOpacity
                            key={key}
                            style={{ ...styles.fabFlags, bottom: (5 + (key * 32)) }}
                            onPress={() => this.handleLanguage(flag.translateCode)}>
                            <Flag
                                key={key}
                                code={flag.flagCode}
                                size={32}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        )
    }

    render() {
        const { token, error, theme } = this.props;

        if (!token) {
            return (
                <LoginImage>
                    <View style={styles.container}>
                        {this.renderTitle()}
                        {this.renderInput()}
                        {this.renderConnection()}
                    </View>
                    {this.renderFlags()}
                    <Snackbar
                        visible={error}
                        onDismiss={() => {}}
                        style={{backgroundColor: theme.colors.error}}
                    >
                        {translate.i18n('LOGIN_ERROR')}
                    </Snackbar>
                </LoginImage>
            );
        } else {
            return (
                <BottomNavBar />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        paddingTop: 30,
    },
    titleContainer: {
        display: 'flex',
        width: '100%',
        height: '20%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    centered: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    inputContainer: {
        display: 'flex',
        width: '100%',
        height: '30%',
        marginTop: '20%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    input: {
        display: 'flex',
        width: '80%',
    },
    buttonContainer: {
        display: 'flex',
        width: '100%',
        height: '10%',
        marginTop: '20%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    fabFlags: {
        position: 'absolute',
        bottom: 5,
        left: 5,
    },
});

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        error: state.user.error
    };
};

export default connect(mapStateToProps, {
    connectUser
})(withTheme(Login));