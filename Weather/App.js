import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './app/Weather';
import * as Location from 'expo-location';

const API_KEY = "48ee97fbe2afee8bd04b8549899c03d5"

export default class App extends React.Component { //state 쓸거라 class 로 변경!
  constructor(props){
    super(props);
    this.state = {
      isLoaded : false,
    }
  }
  componentDidMount(){
    this._getWeather()
  }

  _getWeather = async () => {
    await Location.requestPermissionsAsync() //Async 가 비동기니깐 await 붙여주는 거임
    const _location = await Location.getCurrentPositionAsync()
    const {coords :{latitude, longitude}} = _location

    const _response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`)
    //위에 있는 API 키 가져다 쓸 것이기 때문에 `사용
    const _json = await _response.json() // 현재 _response 는 바로 사용할 수 없는 값이라서 json 으로 변경

    this.setState({isLoaded : true, temp : Math.floor(_json.main.temp), title : _json.weather[0].main })
    //console.log(_json) //가져온 API 값 확인을 위해
    //console.log(Math.floor(_json.main.temp)) //Math.floor 로 반내림 해줌 (아래 2자리)
    //console.log(_json.weather[0].main)
  }

  render(){
    return (
      <View style={styles.container}>
        {this.state.isLoaded? <Weather temp={this.state.temp} title={this.state.title} />:<ActivityIndicator style={styles.indicator} color="black" size="large"/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicator:{
    flex:1,
    alignContent:"center",
    justifyContent:"center",
  },
});