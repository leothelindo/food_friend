import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { longLat, delSearch, formatCategories } from "../APIs/Yelp"
import Icon from 'react-native-vector-icons/Octicons';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

/* renders the Home screen with search bar for the login screen */
export default class Homepage extends Component {
    
    /* constructs the data that we put in our restaurant list */
    constructor(props) {
        super (props);

          this.state = {
            list: null,
            location: null,
            longitude: null,
            latitude: null
          };

          this.layoutProvider = null
    }

    // Gets user location and sets state
    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
  
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location : location, longitude : longLat(location)[0], latitude: longLat(location)[1]});
      this.setState({ list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(await delSearch(this.state.longitude, this.state.latitude)) })
      //console.log(this.state.list._data[19])
    }
  
    componentWillMount() {
      this._getLocationAsync()
      this.layoutProvider = new LayoutProvider((i) => {
        return this.state.list.getDataForIndex(i).rating;
      }, (rating, dim) => {
        switch (rating) {
          case rating >= 1:
            dim.width = SCREEN_WIDTH;
            dim.height = SCREEN_HEIGHT*.4;
            break;
          default:
            dim.width = SCREEN_WIDTH;
            dim.height = SCREEN_HEIGHT*.4;
            break;
        };
      })
    }


    /* renders the rows. This is where the styling of the rows will go*/
    rowRenderer = (_price, data) => {
        //const { eventImg, eventName, organizer, location, time } = data.item;
        return (
          <TouchableOpacity style= {styles.listContainer}
          onPress={() => this.props.navigation.navigate(
            "Restaurants", {business : data})
          }>
            <Image style={styles.image} source=
              {{uri: data.image_url}} />
            <View style= {styles.body}>
              <Text style={styles.name}>{data.name}</Text>
              <View flexDirection= {'row'}>
                <Text style={styles.info}>Free Delivery </Text>
                <Text style={styles.info}> 15-30 mins </Text>
                <Text style={styles.info}> {data.price} </Text>
                <Text style={styles.info}> {formatCategories(data)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      }


    /*removes back button*/
    static navigationOptions = {
        title: 'Restaurants',
        headerLeft: null
      };
    
      render() {
        
        return (
          <SafeAreaView flex={1} forceInset= {{bottom: 'never'}}>
            <View flex= {.05} justifyContent= {"space-between"} alignItems= {'center'} 
            flexDirection= {"row"} style={{borderBottomWidth: StyleSheet.hairlineWidth}}>
              <TouchableOpacity>
                <Icon color= {'black'} size={25} name={"three-bars"} style={{marginLeft: 10}}/>
              </TouchableOpacity>
              <Text style={styles.toolbar}>Hi, Leo</Text>
              <TouchableOpacity>
                <Icon color= {'black'} size={25} name={"search"} style={{marginRight: 10}}/>
              </TouchableOpacity>
            </View>
            <View flex= {.95}>
            {this.state.list != null ? 
            <RecyclerListView
              dataProvider={this.state.list}
              rowRenderer={this.rowRenderer}
              layoutProvider={this.layoutProvider}
              
            /> :
            <Text>Loading</Text>
            }
            </View>
          </SafeAreaView>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    body: {
        alignSelf: 'flex-start',
        margin: SCREEN_WIDTH*.05,
    },
    image: {
      height: (SCREEN_HEIGHT*.4) *.7,
      width: SCREEN_WIDTH*.9,
      resizeMode: 'cover',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 14,
        opacity: 0.5,
    },
    toolbar: {
<<<<<<< HEAD
      fontSize: 25,
      color: "black",
      fontWeight: '600',
=======
      fontSize: 15,
      color: "black",
      fontWeight: "600",
>>>>>>> query added
    },
    listContainer: {
      flex: 1,
      justifyContent: 'center',
      borderColor: 'black',
      borderRadius: SCREEN_WIDTH*.05,
      borderBottomWidth: StyleSheet.hairlineWidth,
      alignItems: 'center',
      flexDirection: 'column'
    },
    addButton: {
        paddingRight: 11,
    },
    addButton: {
        marginRight: 20,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    
    });