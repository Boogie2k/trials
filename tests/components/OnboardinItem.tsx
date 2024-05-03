import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

const OnboardinItem = ({items}:any) => {
  const {height} =useWindowDimensions()
  console.log(items)
  return (
    <View style={{height}}>
      <Text style={{backgroundColor:'red',}}>{items.name}</Text>
      <Text style={{backgroundColor:'blue', }}>{items.desc}</Text>

    </View>
  )
}

export default OnboardinItem

const styles = StyleSheet.create({})