<script>	
	export default {
		globalData:{
			windowHeight:"",
			navHeight:"",
			navTop:""
		},
		
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef MP-WEIXIN
			let menuButtonObject = uni.getMenuButtonBoundingClientRect();
			/* 获取系统从信息 */
			uni.getSystemInfo({
				success: (res) => {					
					let statusBarHeight = res.statusBarHeight,
					navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
					navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度
					this.globalData.navHeight = navHeight;
					this.globalData.navTop = navTop;
					this.globalData.windowHeight = res.windowHeight;
				},
				fail: (err) => {
						console.log(err);
					  }
				})
				// #endif
				
				// #ifdef APP-PLUS
				uni.getSystemInfo({
					success: (res) => {					
						this.globalData.windowHeight = res.windowHeight;
					},
					fail: (err) => {
							console.log(err);
						  }
					})
				// #endif
			},
			

			
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
	/* 引入图标库 */
	@import url("./common/icon.css");
	/* 引入动画库 */
	@import url("./common/animate.css");
	/* 引入图标字体库 */
	@import url("./common/iconfont.css");
	
	/* 自定义公共样式 */
	@import url("./common/common.css");
</style>
