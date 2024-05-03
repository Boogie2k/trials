/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect, useLayoutEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
 
  Button,
  StyleSheet,
   View, Text, TouchableOpacity, Animated
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator,useBottomTabBarHeight } from '@react-navigation/bottom-tabs';



//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



type Props = PropsWithChildren<{}>;

import Login from './tests/auth';
import SwipeUpScreen from './tests/SwipeUpScreen';
import drawer from './tests/drawer';

import { scrollValue } from './store/boolean';
import OnBoarding from './tests/OnBoarding';
import LocationScreen from './tests/LocationScreen';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation}:any) {
  const isScroll = scrollValue((state)=>state.isScroll)

 const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };


  
  return (
    <View style={{ flexDirection: 'row' , display:isScroll?'flex':'none', backgroundColor:'red', left:0, right:0 }}>
      {state.routes.map((route:any, index:any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key ={index}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const App = ({children}: Props) => {
  const Stack = createNativeStackNavigator();

  //const [tabBarHeight, setTabBarHeight] = useState(0);
  // const [tabBarHeight, setTabBarHeight] = useState<any>(undefined);

  //const tabBarHeight = useBottomTabBarHeight();
//console.log(tabBarHeight)
  return (

    
 <NavigationContainer>
    

      <Tab.Navigator screenOptions={{
        headerShown:false,
        
        }}  tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Login} />
    <Tab.Screen name="Swipe" component={SwipeUpScreen} />
      <Tab.Screen name="onboard" component={OnBoarding} />
    
       <Tab.Screen name="drawer" component={drawer} />
       <Tab.Screen name="Location" component={LocationScreen} />
      
    </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default App;
