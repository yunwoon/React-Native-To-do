import React from 'react';
import { StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { AsyncStorage } from 'react-native';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="calendar-multiselect" size={30} style={{ color: tintColor }} />
    )
  }

  _storeDate = async() => {
    await AsyncStorage.setItem('@diary:state', JSON.stringify(this.state))
  }

  _getData = async() => {
    const mystate = await AsyncStorage.getItem('@diary:state')
    if (mystate !== null) {
      this.setState(JSON.parse(mystate))
    }
  }

  constructor(props){
    super(props)
    this.state = {
      selectedDate: '',

      Posts: [
        {
          id : 1,
          title: '02/02',
          content: '오늘 뭐 먹지',
          date: '2020-02-02',
        },
        {
          id : 2,
          title: '02/05',
          content: '일기 어플 UI 완성 했지',
          date: '2020-02-05',
        },
      ]
    }
  }

  componentDidMount(){ //화면이 뜨는 걸 Mount 되었다 표현함
      this._getData()
      this.props.navigation.addListener(
        'didFocus', //MainScreen 에 다시 focus 가 맞춰지면 밑(newpost) 실행
        ()=>{
          newpost =  this.props.navigation.getParam('myparam')
          signal = this.props.navigation.getParam('signal')
          if(newpost){
            const PrevPosts = [...this.state.Posts]
            this.setState({Posts: PrevPosts.concat(newpost)}, this._storeDate)
            this.props.navigation.navigate('MainScreen',{myparam:false}) //중복 방지
              //newpost 한번 사용했으니 다음 param 값 필요없으니 false 설정
          } else if(signal){ //삭제 기능 !!
              const PrevPosts2= [...this.state.Posts]

              deleteIndex = PrevPosts2.findIndex((item)=>{return item.id == signal})
              PrevPosts2.splice(deleteIndex,1)

              this.setState({Posts:PrevPosts2}, this._storeDate)
              this.props.navigation.navigate('MainScreen',{signal:false})
          }
        }
      );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          onDayPress={(day) => { this.setState(this.state.selectedDate = day) }}
          current={new Date()} />
        <ScrollView>
          <FlatList
            data={this.state.Posts.filter(data => { return data.date == this.state.selectedDate.dateString })}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate('Detail', { post: item }) }}>
                  <View style={styles.detailbox}>
                    <Text style={styles.detailtitle}>
                      {item.title}
                    </Text>
                    <Text style={styles.detailcontent}>
                    {item.content}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => { return '$(index)' }} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 100,
  },
  fontcontainer: {
    fontSize: 30,
    fontWeight: "bold",
  },
  detailbox:{
    marginVertical:30,
    marginLeft: 30,
    borderLeftColor: 'black',
    borderLeftWidth: 5,
    paddingLeft: 20,
  },
  detailtitle:{
    fontWeight:'bold',
    fontSize: 40,
  },
  detailcontent:{
    fontSize: 14,
  },
});
