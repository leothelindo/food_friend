import React from 'react';
import { MapView } from 'expo';
export default class Map extends React.Component {
  constructor() {
    super();
this.state = {
      origin: { latitude: 40.7050758, longitude: -74.0091604 },
    };
getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          let newOrigin = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
this.setState({
            origin: newOrigin,
          });
          resolve(true);
        },
        err => {
          console.log(err);
          reject(reject);
        },
        { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
      );
    });
  };
async componentDidMount() {
    await this.getLocation();
  }
render() {
    return (
      <MapView
        style={{ flex: 1 }}
        provider="google"
        region={{
          latitude: this.state.origin.latitude,
          longitude: this.state.origin.longitude,
          latitudeDelta: 0.0100,
          longitudeDelta: 0.0100,
        }}
      >
        <MapView.Marker coordinate={this.state.origin}/>
      </MapView>
    );
  }
}