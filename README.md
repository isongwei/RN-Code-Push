##### 

[ios-step](https://github.com/Microsoft/react-native-code-push/blob/master/docs/setup-ios.md)

##### 安装

```shell
#账号相关
#安装
npm install -g code-push-cli
code-push register

e0efe7b48c4ec68504c5ed14b992e016de7534c7
code-push login

Usage: code-push app add <appName> <os> <platform>

选项：
  -v, --version  显示版本号  [布尔]

示例：
  app add MyApp ios react-native      Adds app "MyApp", indicating that it's an iOS React Native app
  app add MyApp windows react-native  Adds app "MyApp", indicating that it's a Windows React Native app
  app add MyApp android cordova       Adds app "MyApp", indicating that it's an Android Cordova app

#添加app
code-push app add MyApp ios react-native
#查看对应app 的status
code-push deployment ls MyApp -k


项目代码中也会用到   用于请求查询当前app的状态
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │q8ODH3dKbywnzVkS8mCvineZ9XJs64db34c3-9931-4b86-8104-001a2ebb4b64
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │yBuw1HwYaRFTDCrCc_roHRTfg5UW64db34c3-9931-4b86-8104-001a2ebb4b64
└────────────┴──────────────────────────────────────────────────────────────────┘


#安装模块

npm install --save react-native-code-push
react-native link react-native-code-push#会自动改变jsCodeLocation
#或者手动进行更改
#import <CodePush/CodePush.h>

jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
Replace it with this line:
jsCodeLocation = [CodePush bundleURL];

Usage: code-push app <command>
命令：
  add       创建一个新的App
  remove    删除App
  rm        删除App
  rename    重命名已经存在App
  list      列出与你账户关联的所有App
  ls        列出与你账户关联的所有App
  transfer  将一个App的所有权转让给另一个帐户

```

##### iOS端集成



一般环境

生成一个staging(灰度测试环境    上线前的测试)

默认是发到staging环境

![](http://www.zhangsongwei.com/20180725152059_Oedih2_3DEFFE6B-728F-4DE9-A185-C4B5CDE03656.jpeg)

![](http://www.zhangsongwei.com/20180725152107_sNiSNN_1644D036-3712-443F-B883-72C7B08F0630.jpeg)

```
//查看刚才的key

code-push deployment ls MyApp -k
```

![](http://www.zhangsongwei.com/20180725152324_NjAyc1_15D09DA8-83C2-4B82-AF11-EFA24189A704.jpeg)



pod集成配置

```shell
# React Native requirements
pod 'React', :path => '../node_modules/react-native', :subspecs => [
   'Core',
   'CxxBridge', # Include this for RN >= 0.47
   'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
   'RCTText',
   'RCTNetwork',
   'RCTWebSocket', # Needed for debugging
   'RCTAnimation', # Needed for FlatList and animations running on native UI thread
   # Add any other subspecs you want to use in your project
]
# Explicitly include Yoga if you are using RN >= 0.42.0
pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'
  
# CodePush plugin dependency
pod 'CodePush', :path => '../node_modules/react-native-code-push'
```

*NOTE: JWT library should be >= version 3.0.x

Run `pod install`

*NOTE: The CodePush .podspec depends on the React pod, and so in order to ensure that it can correctly use the version of React Native that your app is built with, please make sure to define the React dependency in your app's Podfile as explained [here](https://facebook.github.io/react-native/docs/integration-with-existing-apps.html#podfile).*

然后info.plist 文件 添加 `CodePushDeploymentKey`字段 知道是查询那个app

code-push deployment ls <appName> -k  可以获取(-k 是为了展示Key)

info.plist

```xml
<key>CodePushPublicKey</key>
        <string>-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANkWYydPuyOumR/sn2agNBVDnzyRpM16NAUpYPGxNgjSEp0etkDNgzzdzyvyl+OsAGBYF3jCxYOXozum+uV5hQECAwEAAQ==
-----END PUBLIC KEY-----</string>

上面的暂时不需要


<key>CodePushDeploymentKey</key>
	<string>$(CODE_PUSH_KEY)</string>
<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
		<key>NSExceptionDomains</key>
		<dict>
            <key>codepush.azurewebsites.net</key>
            <dict>
                <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
                <true/>
            </dict>
			<key>localhost</key>
			<dict>
				<key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
				<true/>
			</dict>
		</dict>
	</dict>
```







进行发包处理

 

```shell
code-push release-react <AppName> <PlatName>#都是默认参数

#先自动执行打包程序
node node_modules/react-native/local-cli/cli.js bundle --assets-dest /var/folders/g5/f8hqh2bn3dl9942583b0c7tr0000gn/T/CodePush --bundle-output /var/folders/g5/f8hqh2bn3dl9942583b0c7tr0000gn/T/CodePush/main.jsbundle --dev false --entry-file index.ios.js --platform ios

#然后上传到热更新服务器
Releasing update contents to CodePush

Upload progress:[==================================================] 100% 0.0s
Successfully released an update containing the "/var/folders/g5/f8hqh2bn3dl9942583b0c7tr0000gn/T/CodePush" directory to the "Staging" deployment of the "MyProjectIOS" app.

#查看发布的历史记录：
code-push deployment history MyProjectIOS Staging

针对回滚情况 似乎再发一版会有更新
```

相关参数

```shell
  --bundleName, -b           JS bundle file名字.如果没有指定则使用默认 [字符串] [默认值: null]
      						"main.jsbundle" (iOS), 
     						 "index.android.bundle" (Android) 
      						"index.windows.bundle" (Windows)  
  --deploymentName, -d       部署到某个  [字符串] [默认值: "Staging"]
  --description, --des       发布更新的描述[字符串] [默认值: null]
  --development, --dev       是否生成dev版本 [布尔] [默认值: false]
  --disabled, -x             本次发布是否可以立即下载[布尔] [默认值: false]
  --entryFile, -e            index 路径,默认 "index.<platform>.js" and then "index.js" will 
                              be used (if they exist)  [字符串] [默认值: null]
  --gradleFile, -g           这次版本发布指定的版本号gradle file(安卓) [默认值: null]
  --mandatory, -m            强制更新[布尔] [默认值: false]
  --plistFile, -p            info.plist路径 [默认值: null]
  --plistFilePrefix, --pre   找info.plist文件时的前缀 [默认值: null]
  --rollout, -r              发布覆盖的百分比 [字符串] [默认值: "100%"]
  --privateKeyPath, -k       为签名指定RSA private key的位置 [字符串] [默认值: false]
  --targetBinaryVersion, -t  指定对应更新的版本,忽略则针对当前项目中的版本(e.g 1.1.0, ~1.2.3) [字符串] [默认值: null]
                              "Info.plist" (iOS), 
                              "build.gradle" (Android)
                              "Package.appxmanifest" (Windows)
  --sourcemapOutput, -s      Path to where the sourcemap for the resulting bundle should be written. If omitted, a sourcemap will not be generated.  [字符串] [默认值: null]
  --outputDir, -o            Path to where the bundle and sourcemap should be written. If omitted, a bundle and sourcemap will not be written.  [字符串] [默认值: null]
  --config, -c               Path to the React Native CLI configuration file  [字符串] [默认值: null]
  --noDuplicateReleaseError  When this flag is set, releasing a package that is identical to the latest release will produce a warning instead of an error  [布尔] [默认值: false]
  -v, --version              显示版本号  [布尔]
```





api参数

```js
import CodePush from 'react-native-code-push';//导入相关库 一般都是手动配置热更新策略
const key = 'xxx';//配置相关环境的key
{
    //检查更新
    CodePush.checkForUpdate(key).then((update) => {
        //当前版本对应的更新包
      console.log('-------' + JSON.stringify(update))
      if (!update) {
        console.log('已是最新版本！')
      } else {
        this.setState({
          des: JSON.stringify(update)
        })
        alert('有更新')
      }
    })
    //手动更新
    CodePush.sync({
      //安装模式
      //ON_NEXT_RESUME 下次恢复到前台时
      //ON_NEXT_RESTART 下一次重启时
      //IMMEDIATE 马上更新
      installMode: CodePush.InstallMode.ON_NEXT_RESTART,
      // deploymentKey: key,
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
        optionalIgnoreButtonLabel: '稍后',
        //非强制更新时，确认按钮文字. 默认为"Install"
        optionalInstallButtonLabel: '后台更新',
        //非强制更新时，检查到更新的消息文本
        optionalUpdateMessage: '有新版本了，是否更新？',
        //Alert窗口的标题
        title: '更新提示'
      }
    },(status) => {
      alert(status)
    },(progress)=>{
        progress.totalBytes //总大小
        progress.receivedBytes//已接收大小
    });
    //相关参数
     function sync(
    	 options?: SyncOptions,
         syncStatusChangedCallback?: SyncStatusChangedCallback,
         downloadProgressCallback?: DowloadProgressCallback,
         handleBinaryVersionMismatchCallback?:HandleBinaryVersionMismatchCallback
                   ): Promise<SyncStatus>;
     //配置选项
     SyncOptions:{
         //默认 info.plist 可以覆盖
         deploymentKey?: string;
         //安装策略
         InstallMode:{
	        IMMEDIATE,//马上
    	    ON_NEXT_RESTART,//下次重启
        	ON_NEXT_RESUME,//下次恢复到前台时
	        ON_NEXT_SUSPEND//后台时间足够长的时候
     	 }
	     installMode?: CodePush.InstallMode;
         //强制安装策略
	    mandatoryInstallMode?: CodePush.InstallMode;
         //当选择 ON_NEXT_RESUME  在后台最少待多长时间后在进行更新
	    minimumBackgroundDuration?: number;
        //更新弹窗
        UpdateDialog:{
            //是否显示
		    appendReleaseDescription?: boolean;
            //更新内容
		    descriptionPrefix?: string;
            //强制更新按钮文字
		    mandatoryContinueButtonLabel?: string;
            //强制更新信息
		    mandatoryUpdateMessage?: string;
            //稍后更新文字
		    optionalIgnoreButtonLabel?: string;
           	//更新按钮文字
		    optionalInstallButtonLabel?: string;
            //检查更新文字
		    optionalUpdateMessage?: string;
            //alert  Title
		    title?: string;
        }
	    updateDialog?: UpdateDialog;
     }
    //回调
    SyncStatusChangedCallback:{
		//传入一个回调
		//codePush.SyncStatus
        (statue)=>{
            
            switch (status) {
                case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                    alert('codePush.SyncStatus.CHECKING_FOR_UPDATE');
                    break;
                case codePush.SyncStatus.AWAITING_USER_ACTION:
                    alert('codePush.SyncStatus.AWAITING_USER_ACTION');
                    break;
                case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                    alert('codePush.SyncStatus.DOWNLOADING_PACKAGE');
                    break;
                case codePush.SyncStatus.INSTALLING_UPDATE:
                    alert('codePush.SyncStatus.INSTALLING_UPDATE');
                    break;
                case codePush.SyncStatus.UP_TO_DATE:
                    alert('codePush.SyncStatus.UP_TO_DATE');
                    break;
                case codePush.SyncStatus.UPDATE_IGNORED:
                    alert('codePush.SyncStatus.UPDATE_IGNORED');
                    break;
                case codePush.SyncStatus.UPDATE_INSTALLED:
                    alert('codePush.SyncStatus.UPDATE_INSTALLED');
                    break;
                case codePush.SyncStatus.SYNC_IN_PROGRESS:
                    alert('codePush.SyncStatus.SYNC_IN_PROGRESS');
                    break;
                case codePush.SyncStatus.UNKNOWN_ERROR:
                    alert('codePush.SyncStatus.UNKNOWN_ERROR');
                    break;
        }
    }
    //进度回调
    DowloadProgressCallback:{
        //也是传入回调参数
        //DownloadProgress
        (progress)=>{
            progress.totalBytes //总大小
            progress.receivedBytes//已接收大小
        }
    }
    //处理回调
    HandleBinaryVersionMismatchCallback:{
    	//回调函数
        //RemotePackage 一个类
        (update)=>{
            download(downloadProgressCallback?: DowloadProgressCallback): Promise<LocalPackage>;
        	//下载url
		    downloadUrl: string;
        }
	}
}
```



