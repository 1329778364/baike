
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/news/news","pages/paper/paper","pages/profile/profile","pages/search/search","pages/addInput/addInput","pages/fabu/fabu","pages/qiandao/qiandao"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"糗事百科","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#333333","selectedColor":"#ffdf34","borderStyle":"black","backgroundColor":"#FFFDEF","list":[{"pagePath":"pages/index/index","iconPath":"./static/icon/home.png","text":"糗事","selectedIconPath":"./static/icon/home_active.png"},{"pagePath":"pages/news/news","iconPath":"./static/icon/news.png","text":"动态","selectedIconPath":"./static/icon/news_active.png"},{"pagePath":"pages/paper/paper","iconPath":"./static/icon/chat.png","text":"小纸条","selectedIconPath":"./static/icon/chat_active.png"},{"pagePath":"pages/profile/profile","iconPath":"./static/icon/profile.png","text":"我的","selectedIconPath":"./static/icon/profile_active.png"}]},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"baike","compilerVersion":"2.5.1","entryPagePath":"pages/index/index","networkTimeout":{"request":6000,"connectSocket":6000,"uploadFile":6000,"downloadFile":6000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","scrollIndicator":"none","softinputMode":"adjustResize","titleNView":{"autoBackButton":false,"searchInput":{"align":"center","backgroundColor":"#F7F7F7","borderRadius":"4px","placeholder":"搜索糗事","placeholderColor":"#CCCCCC","disabled":true},"buttons":[{"color":"#FF9619","colorPressed":"#BBBBBB","float":"left","fontSize":"20px","fontSrc":"./static/icon.ttf","text":""},{"color":"#000000","colorPressed":"#BBBBBB","float":"right","fontSize":"20px","fontSrc":"./static/icon.ttf","text":""}]},"bounce":"none","pullToRefresh":{}}},{"path":"/pages/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarTitleText":"动态"}},{"path":"/pages/paper/paper","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"小纸条"}},{"path":"/pages/profile/profile","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/search/search","meta":{},"window":{"navigationStyle":"custom","titleNView":{"autoBackButton":false,"searchInput":{"align":"left","backgroundColor":"#F7F7F7","borderRadius":"4px","placeholder":"搜索","placeholderColor":"#CCCCCC","disabled":false},"buttons":[{"color":"#000000","colorPressed":"#BBBBBB","float":"right","fontSize":"16px","text":"取消"}]}}},{"path":"/pages/addInput/addInput","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/fabu/fabu","meta":{},"window":{}},{"path":"/pages/qiandao/qiandao","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes}}}});
