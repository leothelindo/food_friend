import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";

import { sendCreateUserQuery } from "../APIs/graphQL_queries";

const width = Dimensions.get("window").width * 0.9;

/* renders the main page for the signup screen and links to homepage */

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",

      lastName: "",

      username: "",

      email: "",

      password: "",

      phone: "",

      zipCode: ""
    };
  }

  static navigationOptions = {
    title: "Welcome"
  };

  onSignUpClickHandler() {
    try {
      sendCreateUserQuery(this.state.firstName, this.state.email, this.state.password);

      // if(query){

      //     this.props.navigation.navigate('Homepage')

      // }
    } catch (err) {
      throw new Error(err);
    }
  }

  // renders our sign up sheet as well as the logo
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={StyleSheet.container}>
          <View style={StyleSheet.logoContainer}>
            <Image 
              source={require('./logo.png')}
              style={{alignSelf: "center", width:100, height:100,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84}}
            />
          </View>

          <View style={styles.formContainer}>
            <StatusBar barStyle="light-content" />

            <View flexDirection="row">
              <TextInput
                placeholder=" First Name"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                onSubmitEditing={() => this.lastName.focus()}
                onChangeText={text => this.setState({ firstName: text })}
                autoCorrect={false}
                style={[
                  styles.input,
                  { width: Dimensions.get("window").width * 0.4 }
                ]}
              />

              <TextInput
                placeholder=" Last Name"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                onSubmitEditing={() => this.email.focus()}
                onChangeText={text => this.setState({ lastName: text })}
                autoCorrect={false}
                style={[
                  styles.input,
                  { width: Dimensions.get("window").width * 0.4 }
                ]}
                ref={input => (this.lastName = input)}
              />
            </View>

            <TextInput
              placeholder=" Email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="go"
              onSubmitEditing={() => this.username.focus()}
              onChangeText={text => this.setState({ email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              ref={input => (this.email = input)}
            />

            <TextInput
              placeholder=" Username"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="go"
              onSubmitEditing={() => this.password.focus()}
              onChangeText={text => this.setState({ username: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              ref={input => (this.username = input)}
            />

            <TextInput
              placeholder=" Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="go"
              onSubmitEditing={() => this.phone.focus()}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry
              style={styles.input}
              ref={input => (this.password = input)}
            />

            <View flexDirection="row">
              <TextInput
                placeholder=" Phone Number"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                keyboardType="phone-pad"
                onChangeText={text => this.setState({ phone: text })}
                onSubmitEditing={() => this.zip.focus()}
                autoCorrect={false}
                style={[
                  styles.input,
                  { width: Dimensions.get("window").width * 0.4 }
                ]}
                ref={input => (this.phone = input)}
              />

              <TextInput
                placeholder=" Zip Code"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="done"
                keyboardType="phone-pad"
                onChangeText={text => this.setState({ zipCode: text })}
                onSubmitEditing={() => this.onSignUpClickHandler()}
                autoCorrect={false}
                style={[
                  styles.input,
                  { width: Dimensions.get("window").width * 0.4 }
                ]}
                ref={input => (this.zip = input)}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.onSignUpClickHandler()}
            >
              <Text style={styles.buttonText}>REGISTER</Text>
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

    backgroundColor: "#3498db",

    justifyContent: "center"
  },

  logoContainer: {
    alignItems: "center",

    flexGrow: 1,

    justifyContent: "center",

    elevation:5
  },

  logo: {
    width: 100,

    height: 100
  },

  formContainer: {
    padding: 20
  },

  title: {
    color: "#FFFFFF",

    marginTop: 10,

    width: 14,

    textAlign: "center"
  },

  input: {
    height: 40,

    width: width * 0.95,

    backgroundColor: "rgba(255,255,255,0.2)",

    marginBottom: width * 0.03,

    color: "#FFF",

    marginHorizontal: width * 0.03
  },

  buttonContainer: {
    backgroundColor: "#2980b9",

    paddingVertical: 15,

    marginHorizontal: width * 0.03
  },

  buttonText: {
    textAlign: "center",

    color: "#FFFFFF",

    fontWeight: "700"
  }
});
