# Vue项目创建

```Vue.js
$ vue init webpack project--------------------- 安装vue脚手架的命令，采用webpack打包工具，项目名是project
This will install Vue 2.x version of the template. ---------------------这里说明将要创建一个vue 2.x版本的项目
For Vue 1.x use: vue init webpack#1.0 project
? Project name (project) ---------------------项目名称
? Project name project
? Project description (A Vue.js project) ---------------------项目描述
? Project description A Vue.js project
? Author wujy--------------------- 项目创建者
? Author wujy
? Vue build (Use arrow keys)
? Vue build standalone
? Install vue-router? (Y/n) --------------------- 是否安装Vue路由，推荐安装，是页面跳转用的
? Install vue-router? Yes
? Use ESLint to lint your code? (Y/n) n ---------------------是否启用eslint检测规则，这里个人建议选no，因为这里有很多的坑，具体以后会讲
? Use ESLint to lint your code? No
? Setup unit tests with Karma + Mocha? (Y/n) n  ----------------是否安装单元测试，因人而异，可以自行选择
? Setup unit tests with Karma + Mocha? No
? Setup e2e tests with Nightwatch? (Y/n) n  --------------------是否安装e2e测试，可自行选择
? Setup e2e tests with Nightwatch? No
vue-cli · Generated "project".
To get started: --------------------- 这里说明如何启动这个服务
cd project   --------------------进入项目文件夹
npm install   ---------------------安装依赖，推荐使用淘宝镜像cnpm
npm run dev  -----------------------项目运行

作者：广顾dun
链接：https://juejin.im/post/5b0d12ab6fb9a009f64d76c0
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

# 安装调试工具

vue-devtools： 是一款基于chrome游览器的插件，用于调试vue应用，这可以极大地提高我们的调试效率。

# Vue开发必备

`vue+vue-router(路由)+vuex(状态管理)+vue-lazyload(图片懒加载)+mint-ui(界面构建)`

# 动画涉及库

`vue-scroller(上拉刷新，下拉加载) + better-scroll(滚动) + animate(跨浏览器的CSS动画库) + swiper(触摸滑动插件)`

# css预编译器

stylus: 使得css处理简介

# Vue项目结构

| 目录/文件    | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| build        | 这个是我们最终发布的时候会把代码发布在这里，在开发阶段，我们基本不用管。 |
| config       | 配置目录，默认配置没有问题，所以我们也不用管                 |
| node_modules | 这个目录是存放我们项目开发依赖的一些模块，这里面有很多很多内容，不过高兴的是，我们也不用管 |
| src          | 我们的开发目录，基本上绝大多数工作都是在这里开展的           |
| static       | 资源目录，我们可以把一些图片啊，字体啊，放在这里。           |
| test         | 初始测试目录，没用，删除即可                                 |
| .xxxx文件    | 这些是一些配置文件，包括语法配置，git配置等。基本不用管，放着就是了 |
| index.html   | 首页入口文件，基本不用管，如果是开发移动端项目，可以在`head`区域加上你合适的`meta`头 |
| package.json | 项目配置文件。前期基本不用管，但是你可以找一下相关的资料，学习一下里面的各项配置。至少，要知道分别是干嘛的。初期就不管了。 |
| README.md    | 不用管                                                       |

![1571660680746](C:\Users\xysc1\AppData\Roaming\Typora\typora-user-images\1571660680746.png)

![1571660808270](C:\Users\xysc1\AppData\Roaming\Typora\typora-user-images\1571660808270.png)

# 毕业设计 Vue项目目录结构

![1571662196392](C:\Users\xysc1\AppData\Roaming\Typora\typora-user-images\1571662196392.png)