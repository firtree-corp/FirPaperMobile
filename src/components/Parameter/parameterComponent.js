import * as React from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    withTheme,
    Text,
} from 'react-native-paper';
import languages from '../../locales/LanguageList';
import Flag from 'react-native-flags';
import { changeLanguage } from '../../actions';

class Parameter extends React.Component {

    handleLanguage = flag => {
        const { changeLanguage } = this.props;

        changeLanguage(flag);
    }

    render() {
        return (
            <View style={styles.container}>
                {languages.map((flag, key) => {
                    return (
                        <TouchableOpacity
                            key={key}
                            onPress={() => this.handleLanguage(flag.translateCode)}>
                            <Flag
                                key={key}
                                code={flag.flagCode}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, {
    changeLanguage
})(withTheme(Parameter));