import * as React from 'react';
import posed from 'react-native-pose';

const BoxDrift = posed.View({
    visible: {
        opacity: 1,
        x: 0,
    },
    hidden: {
        opacity: 0,
        x: 100,
    }
});

export default BoxDrift;