  
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, FlatList } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { formatAdress, formatCategories } from "../../../Yelp"


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

order = [
    {
        name: 'Uber Eats',
        image: require('./uber.png'),
        price: '3.00',
        description: 'Estimated delivery cost based on service fees and delivery charges',
        id: 1
    },
    {
        name: 'Postmates',
        image: require('./postmates.png'),
        price: 'Unavailable',
        description: 'Estimated delivery cost based on service fees and delivery charges',
        id: 2
    },
    {
        name: 'Grubhub',
        image: require('./grubhub.png'),
        price: '5.50',
        description: 'Estimated delivery cost based on service fees and delivery charges',
        id: 3
    },
    {
        name: 'Door Dash',
        image: require('./doordash.png'),
        price: '7.50',
        description: 'Estimated delivery cost based on service fees and delivery charges',
        id: 1
    }
]

/* displays the restaurant details when you click on the restaurant */
export default class EventDetail extends React.Component {

    constructor(props){
        super(props)
    }
    // This allows the restaurant data to be recieved when clicked
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('restaurantName', 'Your Event'),
        };
    };

            

    
    // This creates the view for the list of order on the home page 
    // renders the image of delivery service with name and price
    rowRenderer = (data) => {
        return (
          <TouchableOpacity style= {styles.listContainer}>
            <Image 
                source={data.image}
                style={{alignSelf: "center", width:75, height:75, resizeMode: 'contain'}} />
            <View style= {styles.orderBody}>
                <View flexDirection= 'row' justifyContent= 'space-between'>
                    <Text style={styles.orderName}>{data.name}</Text>
                    <Text style={styles.orderName}>${data.price}</Text>
                </View>
                    <Text style={styles.orderInfo}>{data.description}</Text>
            </View>
          </TouchableOpacity>
        )
      }


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
                <FlatList
                style= {{flex: 1}}
                data= {order}
                renderItem= {({ item }) => this.rowRenderer(item)}
                keyExtractor= {(data) => data.name}
                />
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
    listContainer: {
        marginLeft: 30,
        marginRight: 30,
        height: SCREEN_HEIGHT*.1,
        justifyContent: 'center',
        borderColor: 'black',
        borderRadius: SCREEN_WIDTH*.05,
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
        flexDirection: 'row'
      },
    orderName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 15
    },
    orderBody: {
        alignSelf: 'flex-start',
        margin: SCREEN_WIDTH*.05,
        flex: 1
    },
    image: {
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        position: 'relative',
        opacity: 300,
        marginBottom: -SCREEN_WIDTH*.25,
    },
    orderName: {
        fontSize: SCREEN_WIDTH*.05,
        color: 'black',
        fontWeight:  '500',
    },
    name: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: SCREEN_WIDTH*.1,
        color: 'black',
        fontWeight:  '500',
    },
    orderInfo: {
        fontSize: 14,
        opacity: 0.5,
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