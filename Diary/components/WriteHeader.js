import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const WriteHeader = ({navigation, saveProps, selectImage}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {navigation.goBack()}}
                hitSlop={{top:32, bottom:32, left:32, right:32}}>
                <Ionicons name= "ios-arrow-back" size={25}/>
            </TouchableOpacity>

            <View style={styles.iconContainer}>
                <TouchableOpacity
                    activeOpacity = {0.8}
                    onPress = {() =>{
                        selectImage();
                    }}
                    hitSlop={{top:2, bottom:2, left:2, right:2}}>
                    <Ionicons name="ios-image" size={25}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity = {0.8}
                    onPress = {() =>{
                        saveProps();
                    }}
                    hitSlop={{top:2, bottom:2, left:2, right:2}}>
                    <Ionicons name="ios-save" size={25}/>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer:{
        flexDirection: 'row',
        width: 60,
        justifyContent: 'space-between',
    }
})
//이러한(WriteHeader.js) 컴포넌트를 만들었으면 export 해줘야 해
export default withNavigation(WriteHeader);