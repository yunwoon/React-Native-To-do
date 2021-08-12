import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function Input({value, changeText, addTodoItem}){
    return (
        <TextInput
            value={value}
            onChangeText={changeText}
            onEndEditing = {addTodoItem}

            style={styles.input}
            placeholder={"오늘의 할 일"}
            maxlentgh={30}
            returnKeyType="done"/> //실제 input 창이 띄어줄 애들!!
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
    },
  });