import Onboarding from 'react-native-onboarding-swiper';
import {Image,StyleSheet, Text, View,Button, TouchableHighlight,} from 'react-native'
import { useRef } from 'react';

const OnBoarding = () => {
 const Next = ({ isLight, ...props }) => (
  <TouchableHighlight>
    <Text style={{color:'red'}}>Next</Text>
  </TouchableHighlight>
);

  return( 
    
 
  <Onboarding
  NextButtonComponent={Next}
  //showPagination={false}
    onDone={() => console.log('done')}
  swipeEnabled={false} // Disable swiping
    //ref={onboardingRef}
    bottomBarHighlight={ false}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/_DSC0242.jpg')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image source={require('../assets/_DSC0242.jpg')} />,
        title: 'The Title',
        subtitle: 'This is the subtitle that sumplements the title.',
      },
      {
        backgroundColor: '#999',
        image:<Image source={require('../assets/_DSC0242.jpg')} />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
        {
        backgroundColor: '#999',
        image:<Image source={require('../assets/_DSC0242.jpg')} />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
    ]}
  />

  

  )
}

export default OnBoarding

const styles = StyleSheet.create({})