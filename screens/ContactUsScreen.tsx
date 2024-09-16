import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NavigationButton } from '../UI';
import { useFocusEffect } from '@react-navigation/native';
import { getDBConnection, insertEnquiry } from '../database/db-service';

const ContactUsScreen = ({ navigation }: any) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [enquiry, setEnquiry] = useState('');
    const [errors, setErrors] = useState({});

    const sendEnquiry = async (name, email, enquiry) => {
        await insertEnquiry(await getDBConnection(), name, email, enquiry);
    }

    // Validate submitted form
    const validateForm = (name: String, email: String, enquiry: String) => {

        let validationErrors = {};

        // Validate name field
        if (!name) {
            validationErrors.name = 'Name is required.';
        } else if (name.trim().length === 0) {
            validationErrors.name = 'Name cannot be empty.';
        }

        // Validate email field
        if (!email) {
            validationErrors.email = 'Email is required.';
        } else if (email.trim().length === 0) {
            validationErrors.email = 'Email cannot be empty.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = 'Email is invalid.';
        }

        // Validate enquiry field
        if (!enquiry || enquiry.trim().length === 0) {
            validationErrors.enquiry = 'Enquiry cannot be empty.';
        }

        setErrors(validationErrors);
        return (Object.keys(validationErrors).length === 0);
    }

    // Reset state variables when leaving the screen
    const clearAllStates = () => {
        setName('');
        setEmail('');
        setEnquiry('');
    }

    const _submit = () => {
        if (validateForm(name, email, enquiry)) {
            sendEnquiry(name, email, enquiry);
            Alert.alert('Thank you for contacting us.\n We will get back to you soon.');
            navigation.navigate('Home');
        } else {
            Alert.alert(
                'Form Errors',
                `${errors.name ? errors.name + '\n' : ''}` +
                `${errors.email ? errors.email + '\n' : ''}` +
                `${errors.enquiry ? errors.enquiry + '\n' : ''}`
            );
        }
    }

    useEffect(() => {
        validateForm(name, email, enquiry);
    }, [name, email, enquiry]);

    useFocusEffect(
        useCallback(() => {
            clearAllStates();
        }, [navigation])
    )

    return (
        <View style={{ padding: 10, }}>
            {/* Name Field */}
            <Text style={styles.label}>Name: </Text>
            <TextInput
                style={styles.input}
                multiline={true}
                placeholder='Enter your name'
                value={name}
                onChangeText={(input) => {
                    setName(input);
                }}
            />

            {/* Email Field */}
            <Text style={styles.label}>Email: </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your email address'
                value={email}
                onChangeText={(input) => {
                    setEmail(input);
                }}
            />

            {/* Enquiry Field */}
            <Text style={styles.label}>Enquiry: </Text>
            <TextInput
                style={styles.input}
                multiline={true}
                placeholder='Enter your enquiry here'
                numberOfLines={5}
                value={enquiry}
                onChangeText={(input) => {
                    setEnquiry(input);
                }}
            />
            <NavigationButton title='Submit' onPress={_submit} />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    input: {
        color: 'black',
        fontSize: 24,
        margin: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        flexWrap: 'wrap',
        textAlignVertical: 'top',
        maxHeight: 150,
        textAlign: 'justify',
    },
});

export default ContactUsScreen;