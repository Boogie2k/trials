import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput, 
  Animated
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {useState, useEffect} from 'react';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import { useUserStore } from '../store/store';

const TAB_HEIGHT = 72;
const CONTENT_HEIGHT = 240;

const Login= () => {
  const [loggedIn, setloggedIn] = useState(false);
const [userInfo, setuserInfo] = useState([]);


const name =useUserStore((state)=>state.name)
const email = useUserStore((state)=>state.email)



const updateName =useUserStore((state)=>state.updateName)
 const updateEmail = useUserStore((state)=>state.updateEmail)  


 const signin = async()=>{

  try {
    await GoogleSignin.hasPlayServices();
    const userInfos:any = await GoogleSignin.signIn();
    setuserInfo(userInfos );
    setloggedIn(true)
    console.log(userInfos)
  } catch (error:any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code  === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
 }
 useEffect(() => {
  GoogleSignin.configure({
	webClientId: '665957680621-ga4jjb5gkue1e9lu3svlq75be2skv2nc.apps.googleusercontent.com',
	//androidClientId: '665957680621-d0vti19gceqc5hracvrhq9s4v13q6bku.apps.googleusercontent.com',
   offlineAccess: true,
	scopes: ['profile', 'email'],
});
 }, []);

 const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
      console.log({userInfo})
    } catch (error) {
      console.error(error);
    }
  };
  const DummyList = [
  {id:1,value:"List Item 1"},
  {id:2,value:"List Item 2"},
  {id:3,value:"List Item 3"},
  {id:4,value:"List Item 4"},
  {id:5,value:"List Item 5"},
  {id:6,value:"List Item 6"},
  {id:7,value:"List Item 7"},
  {id:8,value:"List Item 8"},
  {id:9,value:"List Item 9"},
  {id:10,value:"List Item 10"}
]


const scrollOffset = useState(new Animated.Value(0))[0];

  const yTanslateContent = scrollOffset.interpolate({
    inputRange: [0, CONTENT_HEIGHT],
    outputRange: [0, -CONTENT_HEIGHT]
  });

  const scaleContent = scrollOffset.interpolate({
    inputRange: [0, CONTENT_HEIGHT],
    outputRange: [1, 0]
  });

  const expandedContentOpacity = scrollOffset.interpolate({
    inputRange: [0, CONTENT_HEIGHT],
    outputRange: [1, 0]
  });

  const collapsedContentOpacity = scrollOffset.interpolate({
    inputRange: [0, CONTENT_HEIGHT],
    outputRange: [0, 1]
  });

  const scrollEventHandler = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollOffset
          }
        }
      }
    ],
    { useNativeDriver: true }
  );
  return (
   <SafeAreaView style ={styles.container}>

{  !loggedIn?  <View>
    <TextInput defaultValue={name} onChangeText={(e)=>updateName(e)} style={{borderWidth:1, marginBottom:5, borderStyle:'solid', borderColor:'black', color:'black'}} placeholder='name'/>
    <TextInput  defaultValue={email} onChangeText={(newEmail)=>{updateEmail(newEmail)}} style={{borderWidth:1, borderStyle:'solid', borderColor:'black', color:'black'}} placeholder='name'/>
      
      <Button onPress={signin} title='sign in with google'/>
      </View>

:
      <View>
        <Animated.View style={styles.headerContainer}>
        {/* visible when expanded */}
        <Animated.View style={[styles.visibleTabStyles, { opacity: expandedContentOpacity }]}>
          <Text>{"TAB 1"}</Text>
        </Animated.View>
        {/* visible when collapsed */}
        <Animated.View style={[styles.hiddenTabStyles, { opacity: collapsedContentOpacity }]}>
          <Text>{"TAB 2"}</Text>
        </Animated.View>
        {/* content visible when expanded */}
        <Animated.View
          style={[
            styles.contentStyles,
            {
              opacity: expandedContentOpacity,
              transform: [{ translateY: yTanslateContent }, { scale: scaleContent }]
            }
          ]}
        >
          <Text style={styles.headerText}>{"Header Content"}</Text>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        style={{ paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingTop: TAB_HEIGHT + CONTENT_HEIGHT }}
        onScroll={scrollEventHandler}
      >
        {DummyList.map(data => {
          return (
            <View style={styles.listItem} key={data.id}>
              <Text>{data.value}</Text>
            </View>
          );
        })}
      </Animated.ScrollView>

      <Button onPress={signOut} title='signout'/></View>}

      
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

   listItem:{
    height:100,
    marginVertical:8,
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#e6eded"
  },
  headerContainer:{
    backgroundColor:"blue",
    zIndex:2
  },
  visibleTabStyles:{
    position:"absolute",
    top:0,
    left:0,
    right:0,
    paddingTop:25,
    height:TAB_HEIGHT,
    backgroundColor:"#d4ffff",
    justifyContent:"center",
    alignItems:"center",
    borderBottomWidth:0.33
  },
  hiddenTabStyles:{
    position:"absolute",
    top:0,
    left:0,
    right:0,
    paddingTop:25,
    height:TAB_HEIGHT,
    backgroundColor:"#9cf7ff",
    justifyContent:"center",
    alignItems:"center"
  },
  contentStyles:{
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    top:TAB_HEIGHT,
    left:0,
    right:0,
    borderBottomWidth:0.25,
    backgroundColor:"#e6f7f4",
    height:CONTENT_HEIGHT
  },
  headerText:{
    fontSize:18
  }
});

export default Login;