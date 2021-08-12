import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function Weather({temp, title}) {
    weather = {
        Sunny:{
            icon: 'weather-sunny',
            backcolor: ['#e1eec3', '#f05053'],
        },
        Snow:{
            icon: 'weather-snowy',
            backcolor: ['#a5aad1', '#7279a8', '#5a618f'],
        },
        Clouds:{
            icon: 'weather-cloudy',
            backcolor: ['#cbb4d4', '#20002c'],
        },
        Rain:{
            icon: 'weather-rainy',
            backcolor: ['#3494E6', '#EC6EAD'],
        },
        Thunderstorm:{
            icon: 'weather-lightning',
            backcolor: ['#E6DADA', '#274046'],
        },
        Drizzle:{
            icon: 'weather-hail',
            backcolor: ['#F3904F', '#3B4371'],
        },
        Mist:{
            icon: 'weather-fog',
            backcolor: ['#2980b9', '#2c3e50'],
        },
        Clear:{
            icon: 'weather-sunset',
            backcolor: ['#ffdde1', '#ee9ca7'],
        },
        Haze:{
            icon: 'weather-hurricane',
            backcolor: ['#e4e4d9', '#215f00'],
        },
    }
    return (
        <LinearGradient
            colors={this.weather[title].backcolor}
            style={styles.weatherback}>
            <View style={styles.iconarea}>
                <Text style={styles.iconcustom}>
                    <MaterialCommunityIcons name={this.weather[title].icon} size={350} />
                </Text>
            </View>
            <View style={styles.textarea}>
                <Text style={styles.textcustom}>
                    {title}
                </Text>
                <Text style={styles.textcustom}>
                    {temp}℃
                </Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    weatherback: {
        flex: 1,
    },
    iconarea:{
        flex:2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textarea:{
        flex:1,
        alignItems: 'center',
    },
    iconcustom:{
        color:"white",
    },
    textcustom:{
        fontSize:35,
        fontWeight:"bold",
        color:"white",
    },
});