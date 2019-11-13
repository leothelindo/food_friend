  
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, FlatList } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { formatAdress, formatCategories } from "../../../Yelp"


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

order = [
    {
        name: 'Hamburger',
        price: '5.00',
        description: '100% all beef patty, sesame bun, tomatoes, lettuce',
        id: 1
    },
    {
        name: 'Cheesburger',
        price: '5.50',
        description: '100% all beef patty, cheese, sesame bun, tomatoes, lettuce',
        id: 2
    },
    {
        name: 'Chicken Fingers',
        price: '10.50',
        description: '100% white meat chicken, fries',
        id: 3
    },
    {
        name: 'Double Double',
        price: '7.50',
        description: '2 100% all beef patties, sesame bun, tomatoes, lettuce',
        id: 1
    },
    {
        name: '5X5 Monster',
        price: '20.00',
        description: ' 5 100% all beef patties, 5 thick slices of american cheese, 10 sesame buns, tomatoes, lettuce',
        id: 2
    },
    {
        name: 'Chicken Sandwhich',
        price: '4.50',
        description: '100% white meat chicken, tomatoes, lettuce',
        id: 3
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
    rowRenderer = (data) => {
        //const { eventImg, eventName, organizer, location, time } = data.item;
        return (
          <TouchableOpacity style= {styles.listContainer}>
              <View style= {{height: SCREEN_WIDTH*.15, width: SCREEN_WIDTH*.15, backgroundColor: 'grey'}} >
                  <Text style= {{fontSize: 20, alignSelf: 'center'}}> Insert Image</Text>
              </View>
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