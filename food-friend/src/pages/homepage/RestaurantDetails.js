  
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { formatAdress, formatCategories } from "../../../Yelp"


const SCREEN_WIDTH = Dimensions.get('window').width;

/* displays the restaurant details when you click on the restaurant */
export default class EventDetail extends React.Component {
    // This allows the restaurant data to be recieved when clicked
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('restaurantName', 'Your Event'),
        };
    };

    render() {
        const { navigation } = this.props;
        // business is a JSON of data from the restaurant that was clicked in the previous screen
        const business = navigation.getParam("business")

        return (
            <ScrollView style={styles.container} overScrollMode= 'never' alwaysBounceVertical= {false}>
                {/* Image at top of screen */}
                <Image style={styles.image} source={{uri: business.image_url}} blurRadius= {15}/>

                {/* Text and View are the text on image at top of screen */}
                <Text style={styles.name} numberOfLines= {1}>{business.name}</Text>
                <View style={styles.body}>
                    <Text style={styles.info} numberOfLines= {1}>{formatAdress(business)}</Text>
                    <View flexDirection= 'row'>
                        <Text style={styles.info}>{business.rating}★ • </Text>
                        <Text style={styles.info}>{business.categories[0].title}</Text>
                    </View>
                </View>

            </ScrollView>
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
        marginLeft: 30,
        marginRight: 30,
    },
    image: {
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        position: 'relative',
        opacity: 300,
        marginBottom: -SCREEN_WIDTH*.25,
    },
    name: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: SCREEN_WIDTH*.1,
        color: 'black',
        fontWeight:  '500',
    },
    info: {
        fontSize: SCREEN_WIDTH*.05,
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