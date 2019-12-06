import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator, } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { SearchBar } from 'react-native-elements';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { longLat, delSearch, formatCategories } from "../../../Yelp"
import Icon from 'react-native-vector-icons/Octicons';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const AddSearchbar = props => {
  
return <Text style={[styles.toolbar, { textAlign: 'center' }]}>Hi {props.name}</Text>
}

/* renders the Home screen with search bar for the login screen */
export default class Homepage extends Component {

  /* constructs the data that we put in our restaurant list */
  constructor(props) {
    super(props);

    this.state = {
      list: null,
      location: null,
      longitude: null,
      latitude: null,
      showGreeting: true,
      showSearch: false,
      search: ''
    };

    this.layoutProvider = null
  }

  updateSearch = async search => {
    this.setState({ search });
    this.setState({ list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(await delSearch(this.state.longitude, this.state.latitude, search)) })
    console.log(this.state.search);
  };

  // Gets user location and uses that to search Yelp API
  _getLocationAsync = async () => {
    // Ask for permission for language
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    // Get and Set location
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location, longitude: longLat(location)[0], latitude: longLat(location)[1] });

    // Search yelp API 
    this.setState({ list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(await delSearch(this.state.longitude, this.state.latitude, "")) })
  }

  componentWillMount() {
    // Runs at the first render and calls the function for location and search
    this._getLocationAsync()
    this.layoutProvider = new LayoutProvider((i) => {
      return this.state.list.getDataForIndex(i).rating;
    }, (rating, dim) => {
      switch (rating) {
        case rating >= 1:
          dim.width = SCREEN_WIDTH;
          dim.height = SCREEN_HEIGHT * .4;
          break;
        default:
          dim.width = SCREEN_WIDTH;
          dim.height = SCREEN_HEIGHT * .4;
          break;
      };
    })
  }


  // This creates the view for the list of resturants on the home page 
  // It takes in data witch is a fetched list from the Yelp API
  rowRenderer = (_price, data) => {
    //const { eventImg, eventName, organizer, location, time } = data.item;
    return (
      <TouchableOpacity style={styles.listContainer}
        //Send info from this tab to other tab
        onPress={() => this.props.navigation.navigate(
          "Restaurants", { business: data })
        }>
        <Image style={styles.image} source=
          {{ uri: data.image_url }} />
        <View style={styles.body}>
          <Text style={styles.name}>{data.name}</Text>
          <View flexDirection={'row'}>
            <Text style={styles.info}>Free Delivery </Text>
            <Text style={styles.info}> 15-30 mins </Text>
            <Text style={styles.info}> {data.price} </Text>
            <Text style={styles.info}> {formatCategories(data)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  ShowHideTextComponentView = async () => {

    if (this.state.showGreeting == true) {
      this.setState({ showGreeting: false, showSearch: true })
    }
    else {
      this.setState({ showGreeting: true, showSearch: false, list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(await delSearch(this.state.longitude, this.state.latitude, "")) })
    }
  }
  /*removes back button*/
  static navigationOptions = {
    title: 'Restaurants',
    headerLeft: null,
  };

  render() {

    const { search } = this.state;
    const { navigation } = this.props;
    // business is a JSON of data from the restaurant that was clicked in the previous screen
    const name = navigation.getParam("name");

    return (
      // Safe area view helps with screens with notches, such that view doesnt extend over
      // forceInset allows view to spill over bottom wich is okay because list is scrollable
      <SafeAreaView flex={1} forceInset={{ bottom: 'never' }}>

        {/* This is the view for the toolbar */}
        <View flex={.05} justifyContent={"space-between"} alignItems={'center'}
          flexDirection={"row"} style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingTop: 0,
            paddingBottom: 10
          }}>
          <TouchableOpacity>
            <Icon color={'black'} size={25} name={"three-bars"} style={{ marginLeft: 15 }} />
          </TouchableOpacity>
          <View style={styles.textContainer}>{this.state.showGreeting && <AddSearchbar AddSearchbar={this.ShowHideTextComponentView} name={name} />}{this.state.showSearch && <SearchBar
            placeholder="Type Here..."
            lightTheme={true}
            containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5, borderColor: "white", padding: 0}}
            onChangeText={this.updateSearch}
            value={search}

          />}</View>
          <TouchableOpacity onPress={this.ShowHideTextComponentView
          }>
            <Icon color={'black'} size={25} name={"search"} style={{ marginRight: 15 }} />
          </TouchableOpacity>

        </View>

        {/* This is the view for the list of restaurants if API is loaded or loading text otherwise */}
        <View flex={.95}>
          {this.state.list != null ?
            <RecyclerListView
              dataProvider={this.state.list}
              rowRenderer={this.rowRenderer}
              layoutProvider={this.layoutProvider}
            /> :
            <ActivityIndicator size="large" color="#3498db" justifyContent="space-around" />
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
  textContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    justifyContent: 'space-around',
  },
  body: {
    alignSelf: 'flex-start',
    margin: SCREEN_WIDTH * .05,
  },
  image: {
    height: (SCREEN_HEIGHT * .4) * .7,
    width: SCREEN_WIDTH * .9,
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
    fontSize: 25,
    color: "black",
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'black',
    borderRadius: SCREEN_WIDTH * .05,
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