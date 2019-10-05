import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, StatusBar } from 'react-native';

/* renders the main page for the login screen */
export default class Login extends Component { 
    static navigationOptions = {
        title: 'Welcome',
      };
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
                    <View style={styles.formContainer}>
                        <StatusBar
                        barStyle="light-content"
                        />
                        <TextInput 
                            placeholder="username or email"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            returnKeyType="go"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}  
                            />
                        <TextInput 
                            placeholder="password"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            returnKeyType="go"
                            secureTextEntry
                            style={styles.input} 
                            ref={(input) => this.passwordInput = input}
                            />
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => this.props.navigation.navigate('Homepage')}>
                                <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
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
    formContainer: {
        padding: 20
    },
    title: {
        color:'#FFFFFF',
        marginTop: 10,
        width: 14,
        textAlign: 'center'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color:'#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor:'#2980b9',
        paddingVertical:15
    },
    buttonText:{
        textAlign: 'center',
        color:'#FFFFFF',
        fontWeight:'700'
    }
    
});