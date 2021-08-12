import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import WriteHeader from '../components/WriteHeader';
import uuid from 'uuid/v1';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const { width, height } = Dimensions.get('window');

export default class WriteScreen extends React.Component {
    static navigationOptions = {
        tabBarOnPress:({navigation}) =>{ //Write 라는 이름으로 네비게이터 이동하게끔
            navigation.navigate('Write') //추가 옵션 준거임
        },
    }

    constructor(props){
        super(props)
        this.state = { //기억하고 있어야 할 것들 state 에 작성!!!! ★
            inputTitle: '',
            inputContent: '',
            imageUri:'',
        }
    }
    
    _changeTitle = (value) =>{ //실시간으로 입력되는 text input 값을 onchangetext 에 대입해주는 함수
        this.setState({inputTitle: value})
    }

    _changeContent = (value) =>{
        this.setState({inputContent: value})
    }

    _getToday = () => { //오늘 날짜를 받아올 함수
        tyear = (new Date().getFullYear()).toString()
        tmonth = (new Date().getMonth()+1).toString()
        tday = (new Date().getDate()).toString()
        if(parseInt(tmonth) < 10){
            tmonth = '0' + tmonth
        }
        if(parseInt(tday) < 10){
            tday = '0' + tday
        }
        return (tyear +'-' + tmonth + '-' + tday)
    }

    _saveText = () => {
        if (this.state.inputTitle !== ''){ //IF 제목이 있으면 저장해라!
            const id = uuid()
            const date = this._getToday()
            const newpost = {
                id : id,
                title: this.state.inputTitle,
                content: this.state.inputContent,
                date: date,
                imageUri: this.state.imageUri,
            }
            this.setState(
                { inputTitle: '', inputContent: '', imageUri:'', }
            )
            this.props.navigation.navigate('MainScreen', {myparam:newpost})
        }else{ //ELSE 암것도 없으면 화면만 이동시켜라~
            this.props.navigation.navigate('MainScreen')
        }
    }

    _selectImage = async () => {
        /*if (Constants.platform.ios) { //아이폰 개발시에는 이것도 추가해야함 ~~
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }*/

        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        });
    
        if (!result.cancelled) {
          this.setState({ imageUri: result.uri });
        }
      };

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <View style = {styles.contentContainer}>
                    <WriteHeader 
                        saveProps={this._saveText}
                        selectImage={this._selectImage}/>
                    <TextInput
                        onChangeText= {this._changeTitle}
                        value = {this.state.inputTitle}

                        placeholder= "제목을 입력하세요"
                        style={styles.title}
                        returnKeyType="done" />

                    {this.state.imageUri?
                       <Image source={{uri:this.state.imageUri}} style={{width:200, height:200}}/>:
                       null }
                    
                    <TextInput
                        onChangeText= {this._changeContent}
                        value = {this.state.inputContent}

                        placeholder= "내용을 입력하세요"
                        multiline={true}
                        style={styles.content}
                        returnKeyType="done" />
                </View>
            </SafeAreaView>
          );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 30,
  },
  contentContainer:{
      width: width - 60,
  },
  title:{
      marginVertical: 30,
      fontSize: 30,
      paddingBottom: 12,
      borderBottomWidth: 2,
  },
  content:{
    fontSize: 20,
  },
});