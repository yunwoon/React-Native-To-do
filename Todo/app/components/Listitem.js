import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

export default function Listitem({name, isComplete, changeComplete, deleteItem}) {
    return (
        <View style={styles.listitembox}>
            <View style={styles.makerow}>
                <TouchableOpacity onPress={changeComplete}>
                    <AntDesign name={isComplete? "checkcircle":"frowno"} size={20} style={styles.checkmargin}/>
                </TouchableOpacity>
                <Text style={styles.item}>{name}</Text>
            </View>
            <TouchableOpacity onPress={deleteItem}>
                <AntDesign name="close" size={20} />
            </TouchableOpacity>
        </View>
    );
}

const { width, height } = Dimensions.get('window') //기기 화면 사이즈를 width, height에 저장

const styles = StyleSheet.create({
    listitembox: {
        borderBottomWidth: 1,
        padding: 5,
        marginTop: 10,
        width: width - 120, //listitembox의 가로 길이를 우리가 얻은 기기 가로 길이보다 120 작게
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", //component 사이사이 space
    },
    item: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    makerow: {
        flexDirection: "row",
    },
    checkmargin:{
        marginRight: 15,
    },
});