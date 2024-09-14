import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Input with label or placeholder or both
export const AppInput = (props: any) => {
    const orientationDirection = props.orientation === 'horizontal' ? 'row' : 'column';

    return (
        <View style={[inputStyles.container, { flexDirection: orientationDirection }]}>
            {props.label ? <Text style={inputStyles.label}>{props.label}</Text> : null}
            <TextInput
                style={[inputStyles.input, props.style]}
                {...props} // Spread any other props
            />
        </View>
    );
};

// NavigationButton
export const NavigationButton = (props: any) => {
    
    const navigation = useNavigation();

    return (
        <TouchableNativeFeedback onPress={props.onPress} {... props}>
            <View style={[buttonStyles.button, props.style]}>
                <Text style={buttonStyles.buttonText}>{props.title}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const buttonStyles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#286090',
    },
    buttonText: {
        padding: 15,
        fontSize: 20,
        color: 'white',
    },
});

const inputStyles = StyleSheet.create({
    container: {
        height: 100,
    },
    label: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 3,
        textAlignVertical: 'center',
    },
    input: {
        flex: 3,
        fontSize: 20,
    },
});