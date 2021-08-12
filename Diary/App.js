//각 Screen 별로 네이게이터를 만들어서 연결할 수 있지만,
//우리는!! "App 차원"에서 네비게이터를 등록하고 그 네비게이터에 스크린들을 등록할 거임
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import WriteScreen from './screens/WriteScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BaseNavi = createBottomTabNavigator(
  {
    MainScreen: {
      screen: MainScreen,
    },
    DetailScreen: { //navigator 에 내가 보여주고 싶은 스크린을 등록하는 공간임
      screen: DetailScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="book-open-page-variant" size={30} style={{ color: tintColor }} />
        )
      }
    },
    WriteScreen: {
      screen: WriteScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="feather" size={30} style={{ color: tintColor }} />
        )
      }
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
    }
  },
);

const BaseNavi2 = createStackNavigator(
  {
    Write  :WriteScreen,
    Tab : BaseNavi,
    Detail : DetailScreen,
  },
  {
    initialRouteName: 'Tab',
    mode: 'card', //아이폰용 card modal 차이 해보자
    headerMode: 'none', //'screen' 하면 위에 뒤로가기 버튼 나타남!!
  }
);

const MyNavi = createAppContainer(BaseNavi2); //createstacknavigator 여기 등록함

export default function App() {
  return (
    <View style={styles.container}>
      <MyNavi />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
