import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Subtitle({title}){ //props title 을 뿌려주는 거임
    return (
        <View >
            <Text style={styles.subtitletext}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    subtitletext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3f4e66',
    },
  });