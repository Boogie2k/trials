import { StyleSheet, Text, View, PermissionsAndroid, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import Geolocation from 'react-native-geolocation-service'

  

const LocationScreen = () => {
const [lat, setLat] =useState()
const [long, setLong] =useState()

  // Placeholder coordinates
const lat2 = 40.712776;
const lon2 = -74.005974;

function getDistanceFromLatLonInKm(lat1:any, lon1:any, lat2:any, lon2:any) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg:any) {
  return deg * (Math.PI/180)
}



  // Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const getLocation = () => {

  const result = requestLocationPermission();
  try {
    result.then(res => {
      console.log('res is:', res);

      if (res) {
          console.log(res)
     Geolocation.getCurrentPosition(
          position => {
            console.log(position);

             const lat1:any = position.coords.latitude;
    const lon1:any = position.coords.longitude;
    const distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    setLat(lat1)
    setLong(lon1)
    console.log({lat, long })


    console.log("Distance in km: " + distance);
    console.log("Distance in miles: " + distance * 0.621371); // Convert km to miles
 
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
           
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );  
      }
    });
  } catch (error) {
    console.log({error})
  }
    
    
   
  };

  const getCity =async()=>{
   const res= await fetch(`https://nominatim.openstreetmap.org/reverse?lat=6.264205&lon=5.6512583&format=json`)
   const data= await res.json()
    console.log(data.address.county)
  }

  return (
    <View>
      <Text style={{color:'black'}}>LocationScreen</Text>
      <Text style={{color:'black'}} onPress={getLocation}>Get Location</Text>

      <TouchableHighlight onPress={getLocation}>
        <Text style={{color:'red'}}>Get Location</Text>   
      </TouchableHighlight>

       <TouchableHighlight onPress={getCity}>
        <Text style={{color:'red'}}>Get city</Text>   
      </TouchableHighlight>
    </View>
  )
}

export default LocationScreen

const styles = StyleSheet.create({})