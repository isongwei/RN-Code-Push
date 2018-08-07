/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native";

import CodePush from "react-native-code-push";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const key = "q8ODH3dKbywnzVkS8mCvineZ9XJs64db34c3-9931-4b86-8104-001a2ebb4b64";

export default class App extends Component {
  constructor(props) {
    console.disableYellowBox = true;  
    super(props);
    this.state = {
      des: "NONE"
    };
  }

  componentWillMount() {
    CodePush.disallowRestart();
    this.syncImmediate1();
  }

  componentDidMount() {
    CodePush.allowRestart();
  }
  syncImmediate1() {
    CodePush.checkForUpdate(key).then(update => {
      console.log("-------" + JSON.stringify(update));
      this.setState({
        des: JSON.stringify(update)
      });
    
    });
  }

  //如果有更新的提示
  syncImmediate2() {
    CodePush.sync({
      //安装模式
      //ON_NEXT_RESUME 下次恢复到前台时
      //ON_NEXT_RESTART 下一次重启时
      //IMMEDIATE 马上更新
      installMode: CodePush.InstallMode.IMMEDIATE,
      //对话框
      updateDialog: {
        //是否显示更新描述
        appendReleaseDescription: true,
        //更新描述的前缀。 默认为"Description"
        descriptionPrefix: "更新内容：",
        //强制更新按钮文字，默认为continue
        mandatoryContinueButtonLabel: "立即更新",
        //强制更新时的信息. 默认为"An update is available that must be installed."
        mandatoryUpdateMessage: "必须更新后才能使用",
        //非强制更新时，按钮文字,默认为"ignore"
        optionalIgnoreButtonLabel: "稍后",
        //非强制更新时，确认按钮文字. 默认为"Install"
        optionalInstallButtonLabel: "后台更新",
        //非强制更新时，检查到更新的消息文本
        optionalUpdateMessage: "有新版本了，是否更新？",
        //Alert窗口的标题
        title: "更新提示"
      }
    });
  }

  render() {
    return <View style={styles.container}>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Button title="检查更新" onPress={() => {
              this.syncImmediate1();
            }} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="下载检查" onPress={() => {
              this.syncImmediate2();
            }} />
        </View>
        <View style={{ flex: 8 }}>

        <Text>
          {this.state.des}
        </Text>
        </View>
        <Text>
这是最新的1.0.6版本
        </Text>
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
