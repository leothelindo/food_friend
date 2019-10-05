import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';

/* renders the Home screen with search bar for the login screen */
export default class Homepage extends Component {
    static navigationOptions = {
        title: 'HomePage',
      };
    render() {
        return (
            <View style={styles.container}>
                <Text>Homepage</Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        justifyContent: 'center'
    }
});