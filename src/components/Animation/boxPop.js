import * as React from 'react';
import posed from 'react-native-pose';

const BoxPop = posed.View({
    visible: {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        transition: { ease: 'easeOut', duration: 300 }
    },
    hidden: {
        opacity: 0,
        scaleX: 0,
        scaleY: 0,
    }
});

export default BoxPop;