import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { Ionicons } from '@expo/vector-icons';
import EventModel from './models/EventModel';
import { Divider } from 'react-native-elements';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

/* renders the Home screen with search bar for the login screen */
export default class Homepage extends Component {
    static navigationOptions = {
        title: 'HomePage',
      };

      rowRenderer = (type, data) => {
        const { eventImg, eventName, organizer, location, time } = data.item;
        return (
        // this implements opening the restaurant pages which is not ready yet
        //   <TouchableOpacity onPress={() => this.props.navigation.navigate(
        //     "EventDetail", {
        //       eventImg: eventImg,
        //       eventName: eventName,
        //       organizer: organizer,
        //       location: location,
        //       time: time,
        //     })
        //   }>
        //     <View style={styles.listItem}>
        //       <Image style={styles.image} source={{ uri: eventImg }} />
        //       <View style={styles.body}>
        //         <Text style={styles.name}>Restaurant</Text>
        //       </View>
        //     </View>
        //   </TouchableOpacity>
        )
      }


    render() {
        return (
            <View style={styles.container}>
                <Text>Homepage</Text>
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
        backgroundColor: '#3498db',
        justifyContent: 'center'
    }
});