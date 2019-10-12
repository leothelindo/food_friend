import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

/* renders the Home screen with search bar for the login screen */
export default class Homepage extends Component {

    
    /* constructs the data that we put in our restaurant list */
    constructor(props) {
        super (props);

        this.data = [];

        for (i = 0; i < 100; i += 1) {
            this.data.push({
              type: 'NORMAL',
              item: {
                id: 1,
                restaurantName: "McDonalds",
              },
            });
          }
          addEvent = (event) => {
            i++;
            this.data.push({
              type: 'NORMAL',
              item: {
                id: 1,
                restaurantName: "McDonalds",
              },
            })
            
          }
          this.state = {
            list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(this.data),
          };
      
          this.layoutProvider = new LayoutProvider((i) => {
            return this.state.list.getDataForIndex(i).type;
          }, (type, dim) => {
            switch (type) {
              case 'NORMAL':
                dim.width = SCREEN_WIDTH;
                dim.height = SCREEN_HEIGHT/3;
                break;
              default:
                dim.width = 0;
                dim.height = 0;
                break;
            };
          })
    }

    /* renders the rows. This is where the styling of the rows will go*/
    rowRenderer = (type, data) => {
        const { eventImg, eventName, organizer, location, time } = data.item;
        return (
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            "Restaurants")
          }>
            <View style={styles.listItem}>
              <Image style={styles.image} source=
              {{uri: 'https://i.huffpost.com/gen/1612634/images/o-MCDONALDS-MEAL-facebook.jpg'}} />
              <View style={styles.body}>
                <Text style={styles.name}>{eventName}</Text>
                <Text style={styles.info}>Organized by:</Text>
                <Text style={styles.info}>Where? : </Text>
                <Text style={styles.info}>When? : {time}</Text>
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
          <View style={styles.container}>
            <RecyclerListView
              rowRenderer={this.rowRenderer}
              dataProvider={this.state.list}
              layoutProvider={this.layoutProvider}
            />
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#3498db',
        justifyContent: 'center',
    },
    body: {
        marginLeft: 10,
        marginRight: 10,
        maxWidth: SCREEN_WIDTH - (80 + 10 + 20),
    },
    image: {
        height: 100,
        width: 100,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 14,
        opacity: 0.5,
    },
    listItem: {
        flexDirection: 'row',
        margin: 10,
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