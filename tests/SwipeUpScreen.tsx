import { StyleSheet, Text, View,Animated } from 'react-native'
import React,{useRef} from 'react'
import PagerView from 'react-native-pager-view'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { scrollValue } from '../store/boolean';
//import {useHeade}
//import BottomDrawer from 'rn-bottom-drawer';

const TAB_BAR_HEIGHT = 49;






const SwipeUpScreen = () => {
  const isScroll = scrollValue((state)=>state.isScroll)
  const updateScrollValue = scrollValue((state)=>state.updateIsScroll)  

  const isPageOne= scrollValue((state)=>state.isPageOne)
  const updateIsPageOne = scrollValue((state)=>state.updateIsPageOne)

  return (
   <PagerView 


   onPageScroll={(e)=>{



    
     if(e.nativeEvent.offset*100<50 && e.nativeEvent.position==0)
 {

  //ssslet value = e.nativeEvent.offset*100*-1


  console.log('initial')
  console.log(e.nativeEvent.offset*100 +'  '+ e.nativeEvent.position)
  
  updateScrollValue(true) 
 }else{
   updateScrollValue(false) 
  console.log('!initial')
   console.log(e.nativeEvent.offset*100)
     console.log(e.nativeEvent.offset*100 +'  '+ e.nativeEvent.position)
   }}
  }
  
   



  scrollEnabled={true} orientation={'vertical'} style={styles.pagerView} initialPage={0}>
      <View 
      onTouchStart={()=>{ updateIsPageOne(true) }}
       key="1" style={{backgroundColor:'blue',position:'absolute', zIndex:-20 }}>
        <Text style={{color:'white'}}>First page</Text>
      </View>
      <View onTouchStart={()=>{
         updateIsPageOne(false) 
      
      }} key="2">
        <Text style={{color:'blue'}}>Second pages</Text>

       
      </View>


    </PagerView>
  )
}

export default SwipeUpScreen

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});