import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import DetailHeader from '../components/DetailHeader';
import NullPage from '../components/NullPage';

const { width, height } = Dimensions.get('window');

export default class DetailScreen extends React.Component {

  post = this.props.navigation.getParam('post')

  _deleteSignal = () => {
    this.props.navigation.navigate('MainScreen', {signal:this.post.id})
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <DetailHeader deleteProps = {this._deleteSignal} />
        {this.post ?
          <View>
            <View style = {styles.detailbox}>
              <Text style={styles.detailtitle}>
                [ {this.post.title} ]
              </Text>
            </View>

            {
             this.post.imageUri?
             <Image source={{uri:this.post.imageUri}} style={styles.imagebox}/>:
                null
            }

            <View style={styles.detailbox}>
              <Text style={styles.detailcontent}>
                {this.post.content}
              </Text>
            </View>
          </View>
          :<NullPage/>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
  },
  textstyle:{
    fontSize:40,
  },
  detailbox:{
    marginVertical:30,
    marginLeft: 30,
    borderLeftColor: 'black',
    borderLeftWidth: 5,
    paddingLeft: 20,
  },
  detailtitle:{
    fontSize: 40,
    fontWeight: 'bold',
  },
  detailcontent:{
    fontSize: 20,
  },
  imagebox:{
    marginLeft: 30,
    marginBottom: 15,
    marginTop: 15,
    width: 200,
    height:200,
  }
});