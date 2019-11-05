import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

/* renders the main page for the login screen */
export default class Logo extends Component { 
    static navigationOptions = {
        title: 'Welcome',
      };
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={StyleSheet.container} >
                    <TouchableOpacity onPress= {() => this.props.navigation.navigate('Signups')}>
                        <Text>logo</Text>
                    </TouchableOpacity>
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
    
});