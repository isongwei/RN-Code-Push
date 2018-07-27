/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
  Component,


} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';


import CodePush from 'react-native-code-push';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component < Props > {

  constructor(props) {
    super(props);



  }

  syncImmediate() {
    CodePush.checkForUpdate('BZRXrW3uEASGsNQFkMb8-u3wMz1A64db34c3-9931-4b86-8104-001a2ebb4b64').then((update) => {
      console.log('-------' + update)
      if (!update) {
        console.log('已是最新版本！')
      }
    })
  }

  componentWillMount() {
    CodePush.disallowRestart()
    this.syncImmediate()
  }

  componentDidMount() {
    CodePush.allowRestart()
  }


  render() {
    return (
      <View style={styles.container}>
        

      <TouchableOpacity
        onPress = {()=>{
          this.syncImmediate()
        }
      
    } >
    <Text>
          button
        </Text>


      </TouchableOpacity>    
<Text style={styles.welcome}>Welcome to React Native!</Text>

   <TouchableOpacity
        onPress = {()=>{
          
CodePush.sync(
        {deploymentKey: 'BZRXrW3uEASGsNQFkMb8-u3wMz1A64db34c3-9931-4b86-8104-001a2ebb4b64', updateDialog: {}, installMode: CodePush.InstallMode.IMMEDIATE},
        
    )
        }
      
    } >
    <Text>
马上更新
        </Text>


      </TouchableOpacity>    




      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});