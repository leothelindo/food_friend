  
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

/* displays the restaurant details when you click on the restaurant */
export default class EventDetail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('restaurantName', 'Your Event'),
        };
    };
    render() {
        const { navigation } = this.props;
        const business = navigation.getParam("business")
        return (
            
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: business.image_url}} />
                <View style={styles.body}>
                    <Text style={styles.info}>FOOD</Text>
                    <Text style={styles.info}>Location:</Text>
                    <Text style={styles.info}>{business.rating} Stars</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        minHeight: 1,
        minWidth: 1,
    },
    body: {
        marginLeft: 10,
        marginRight: 10,
        maxWidth: SCREEN_WIDTH - (80 + 10 + 20),
    },
    image: {
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 20,
        opacity: 0.5,
    },
    listItem: {
        flexDirection: 'row',
        margin: 10,
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
});