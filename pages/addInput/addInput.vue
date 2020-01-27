<template>
	<!-- 内容发布页 -->
	<view>
		<!-- 导航栏 -->
		<!-- #ifdef MP-WEIXIN -->
			<mini-nav-bar fixed=true :border="false" :status-bar="true" @clickLeft="back" color="#333333" background-color="#FFFFFF" @clickRight="togglePopup('center', 'popup')">
				<view slot="left" class="button-action">
					<image src="../../static/icon/navbar/back_.png" mode=""></image>
				</view>	
				<view style="font-size: 32rpx;" class="u-f-ajc" @click="changeLook">
					{{yinsi}}
					<view style="font-size: 32rpx;" class="icon iconfont icon-xialazhankai"></view>
				</view> 
				<view slot="right" style="font-size: 32rpx;">发布</view>
			</mini-nav-bar>		
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
			<uni-nav-bar :statusBar="true" rightText="发布" left-icon="back" @clickLeft="back" @clickRight="togglePopup('center', 'popup')" >
				<view class="u-f-ajc" style="width: 100%;" @click="changeLook">
					<view style="font-size: 32rpx;">{{yinsi}}</view>
					<view class="icon iconfont icon-xialazhankai"></view>
				</view>
			</uni-nav-bar>		
		<!-- #endif -->
		<view class="uni-textarea">
			<textarea v-model="text" placeholder="说一句话吧!" />
		</view>
		<!-- 上传多图 -->
		<upload-image @upload="upload"></upload-image>
		
		<uni-popup maskClick="true" ref="showpopup" :type="type" @change="change">
			<view class="gonggao">
				<view class="u-f-ajc">
					<image src="../../static/8.jpg" mode="widthFix"></image>
				</view>
				<view>1.设计黄色、政治及骚扰信息</view>
				<view>1.设计黄色、政治及骚扰信息</view>
				<view>1.设计黄色、政治及骚扰信息</view>
				<view>1.设计黄色、政治及骚扰信息</view>
				<button @tap="hidePopup">朕知道了</button>
			</view>
		</uni-popup>
		

	</view>
</template> 

<script>
	import uniIcons from '../../components/uni-icons/uni-icons.vue';
	import uniStatusBar from '../../components/uni-status-bar/uni-status-bar.vue';
	import miniNavBar from '../../components/common/mini-nav-bar.vue';
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';
	import uploadImage from "../../common/upload-image.vue";
	import uniPopup from '../../components/uni-popup/uni-popup.vue';
	
	let changeLook = ["所有人可见", "仅自己可见"];
	export default {
		components:{
			uniIcons,
			uniStatusBar,
			miniNavBar,
			uniNavBar,
			uploadImage,
			uniPopup 
		},
		data(){
			return {
				isGet:false,
				content: '顶部弹 popup',
				type: '',
				
				yinsi:"所有人可见",
				text:"",
				imageList:[]
			}
		},
		/* 监听返回 */
		onBackPress: (res) => {
			if(true){
				uni.showModal({
					content: '是否保存为草稿？',
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if (res.confirm){
							console.log("保存")
						} else{
							console.log("不保存")
						}
						this.isGet = true;
						uni.navigateBack({
							delta:1
						});
					}
				});
			}
			console.log("点击返回按钮", res) 
			return true;
		}, 
		methods: {	
			// hidePopup(){
			// 	this.
			// },
			change(e) {	
				console.log('是否打开:' + e.show)
			},
			togglePopup(type, open) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break
			
					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			upload(arr){
				this.imageList = arr
			},
			changeLook(){
				uni.showActionSheet({
					itemList:changeLook, 
					success: res => { 
						console.log("选择的是",res)
						this.yinsi = changeLook[res.tapIndex]
					}
				});
			},
			back(e){
				uni.navigateBack({
					delta: 1
				});
			},
			fabu(e){
				console.log(e)
				console.log("跳转发布页面",e)
				this.$refs.popup.open()
				// uni.navigateTo({
				// 	url: '../fabu/fabu'
				// });
			}
			
 		}
	}
</script>

<style lang="scss">
.gonggao{
		background-color: #FFFFFF;
		width:600rpx;	
	}
.gonggao image{
	width: 80%;
	}
.gonggao button{
	background-color: #FFE934;
	width: 80%;
}
	
.uni-textarea{
	border: 1px solid #EEEEEE;
}

.button {
	flex: 1;
	margin: 10px 0;
}

.popup-content {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	background-color: #fff;
	padding: 15px;
	font-size: 14px;
}
.button-action{
	flex: 1;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	
	image{
		width: 60upx;
		height: 60upx;
		padding: 6upx;
		box-sizing: border-box;
	}
}
</style>
