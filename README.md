##### RN热更新的使用

##### 安装

```shell
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

➜  Desktop code-push app add MyApp ios react-native

┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ _3UqQiRuX7oBgq0K44uNZiv09UJK64db34c3-9931-4b86-8104-001a2ebb4b64 │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ BZRXrW3uEASGsNQFkMb8-u3wMz1A64db34c3-9931-4b86-8104-001a2ebb4b64 │
└────────────┴──────────────────────────────────────────────────────────────────┘


#安装模块

npm install --save react-native-code-push


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

![](http://www.zhangsongwei.com/20180725152059_Oedih2_3DEFFE6B-728F-4DE9-A185-C4B5CDE03656.jpeg)

![](http://www.zhangsongwei.com/20180725152107_sNiSNN_1644D036-3712-443F-B883-72C7B08F0630.jpeg)

```
//查看刚才的key

code-push deployment ls MyApp -k
```

![](http://www.zhangsongwei.com/20180725152324_NjAyc1_15D09DA8-83C2-4B82-AF11-EFA24189A704.jpeg)













