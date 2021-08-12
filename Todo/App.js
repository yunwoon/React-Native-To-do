import React from 'react';
import { StyleSheet, View, FlatList, AsyncStorage } from 'react-native';
import Header from './app/components/Header';
import Subtitle from './app/components/Subtitle';
import Input from './app/components/Input';
import Listitem from './app/components/Listitem';

export default class App extends React.Component { //function은 state를 다루지 못하기에 class로 !
  constructor(props) { //생성자
    super(props); //React.Component가 초기에 가진 성질을 App이라는 Class component 로 그대로 가져와라
    this.state = { //{} <- 객체object 모양 //초기 state
      inputValue: '',
      todos: [] //[] <- 배열array 모양
    }
  }
  
  UNSAFE_componentWillMount(){ //리액트가 화면에 렌더링=마운트 되는 걸(컴포넌트 보여지기 전에 하는 것!)
    this.getData()
  }
  
  storeData=()=>{ //데이터 저장
    AsyncStorage.setItem('@todo:state', JSON.stringify(this.state)); //todo라는 앱 이름의 state를 여기 저장하겠다
  }

  getData=() =>{ //데이터 가져오는
    AsyncStorage.getItem('@todo:state').then((state)=>{
      if(state != null){
        this.setState(JSON.parse(state));
      }
    })
  }

  _makeTodoItem = ({ item, index }) => { //method 선언
    return (
      <Listitem
        name={item.title}
        isComplete={item.iscomplete}
        changeComplete={() => { //변경 사항을 나타내기 위한 함수 (익명함수에 화살표함수)
          const newTodo = [...this.state.todos]
          newTodo[index].iscomplete = !newTodo[index].iscomplete
          this.setState({ todos: newTodo }, this.storeData)
        }}
        deleteItem={() => {
          const newTodo = [...this.state.todos]
          newTodo.splice(index, 1) //삭제가 실행되면 자기 자신의 index를 splice (자름)
          this.setState({ todos: newTodo }, this.storeData)
        }}  />
    );
  }

  _changeText = (value) => {
    this.setState({ inputValue: value });
  } //텍스트가 변경되면 그 value 값을 받아서 inputValue 값을 바꿈!

  _addTodoItem = () => {
    if (this.state.inputValue !== "") {
      const prevTodo = this.state.todos;
      const newTodo = { title: this.state.inputValue, iscomplete: false };

      this.setState({
        inputValue: '',
        todos: prevTodo.concat(newTodo)
      }, this.storeData);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headercenter}>
          <Header />
        </View>

        <View style={styles.subtitleposi}>
          <Subtitle title="To-Do 입력" />
          <Input
            value={this.state.inputValue}
            changeText={this._changeText}
            addTodoItem={this._addTodoItem} />
        </View>

        <View style={styles.subtitleposi}>
          <Subtitle title="해야 할 일 목록" />
          <FlatList
            data={this.state.todos}
            renderItem={this._makeTodoItem}
            keyExtractor={(item, index) => { return `${index}` }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({ //JSX 에서 스타일 지정하는 기법
  container: {
    flex: 1, // <View> 가 우리 화면을 어떻게 유동적으로 가지는지
    backgroundColor: '#fff',
    //alignItems: 'center', => 행 기준 정렬 / justifyContent: 'center', => 열 기준 정렬
  },
  headercenter: {
    alignItems: 'center',
  },
  subtitleposi: {
    marginLeft: 50,
  },
});
