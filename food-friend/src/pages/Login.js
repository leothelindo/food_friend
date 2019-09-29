import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm'

/* renders the main page for the login screen */
export default class Login extends Component { 
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={StyleSheet.container} >
                    <View style={StyleSheet.logoContainer}>
                        {/* TODO: Put logo here */}
                        <Text style={StyleSheet.title} >
                            Welcome to Food Buddy!
                        </Text>
                    </View>
                    <View style={StyleSheet.formContainer}>
                        <LoginForm /> 
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        justifyContent: 'center'
    },

    logoContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },

    logo: {
        width: 100,
        height: 100
    },
    
    title: {
        color:'#FFFFFF',
        marginTop: 10,
        width: 14,
        textAlign: 'center'
    }
    
});