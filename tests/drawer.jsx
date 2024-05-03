import { StyleSheet, Text, View , Button} from 'react-native'
import React from 'react'
import BottomDrawer from 'rn-bottom-drawer';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const TAB_BAR_HEIGHT = 49;


const Drawer = () => {
  const width = useSharedValue(100);
   const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };
  
  return (
     <View style={{ flex: 1, alignItems: 'center' }}>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
        }}
      />
      <Button onPress={handlePress   } title="Click me" />
    </View>
  )
}

export default Drawer

const styles = StyleSheet.create({})