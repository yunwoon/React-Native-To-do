import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const { width, height } = Dimensions.get('window');

const DetailHeader = ({navigation, deleteProps}) => {
    return(
        <View style={styles.header}>
        <View style={styles.container}>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {navigation.goBack()}}
                hitSlop={{top:32, bottom:32, left:32, right:32}}>
                <Ionicons name= "ios-arrow-back" size={25} color={'#7a7171'}/>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {deleteProps()}}
                hitSlop={{top:2, bottom:2, left:2, right:2}}>
                <Ionicons name= "ios-close" size={25} color={'#7a7171'}/>
            </TouchableOpacity>

        </View>
        </View>
    )
};

const styles = StyleSheet.create({
    header:{
        alignItems: 'center',
    },
    container:{
        flexDirection: 'row',
        alignItems:'center',
        width: width-50,
        justifyContent: 'space-between',
    },
})
//이러한(WriteHeader.js) 컴포넌트를 만들었으면 export 해줘야 해
export default withNavigation(DetailHeader);