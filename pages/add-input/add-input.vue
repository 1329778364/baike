<template>
	<!-- 内容发布页 -->
	<view style="overflow: hidden;">
		<!-- 导航栏 -->
		<!-- #ifdef MP-WEIXIN -->
			<mini-nav-bar fixed=true :border="false" :status-bar="true" @clickLeft="back" color="#333333" background-color="#FFFFFF" @clickRight="togglePopup('center', 'popup')">
				<view slot="left" class="button-action">
					<image src="../../static/icon/navbar/back_.png" mode=""></image>
				</view>	
				<view class="u-f-ajc" @click="changeLook">
					<view class="font-size-lg">{{getType}}</view> 
					<view class=" font-size-lg icon iconfont icon-xialazhankai"></view>
				</view> 
				<view slot="right" class="font-size-middle" >发布</view>
			</mini-nav-bar>		
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
			<uni-nav-bar :border="false" :statusBar="true" @clickLeft="back" @clickRight="togglePopup('center', 'popup')" >
				<view slot="left" class="button-action">
					<image src="../../static/icon/navbar/back_.png" mode=""></image>
				</view>	
				<view class="u-f-ajc" style="width: 100%;" @click="changeLook">
					<view class="font-size-lg">{{getType}}</view>
					<view class="font-size-lg icon iconfont icon-xialazhankai"></view>
				</view>
				<view slot="right" class="font-size-middle" >发布</view>
			</uni-nav-bar>		
		<!-- #endif -->
		<view class="uni-textarea">
			<textarea v-model="text" placeholder="说一句话吧!" />
		</view>
		<!-- 上传多图 -->
		<upload-image @upload="upload"></upload-image>
		
		<!-- 底部 -->
		<view class="u-f-ac addinput-foot">
			
			<picker class="u-f1 u-f-ajc" mode="selector" :range="postclass.range" @change="changePostClass">
				<view class="u-f1 u-f-ajc">
				{{postclass.title ? postclass.title : "选择分类"}}
				</view>
			</picker>
			
			<view class="u-f1 u-f-ajc" 
			hover-class="addinput-foot-btn"
			@tap="changeTopic">{{topic.title ? topic.title : "选择话题"}}</view>
		</view>
		
		
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
	
	let changeLook = ["仅自己可见", "仅校友可见","不设置权限"];
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
				yinsi:1,/* 0、仅自己可见  1、所有人可见 2，仅校友可见  */
				text:"",
				imageList:[],
				
				postclass:{
					id:0,     // 当前选中分类id
					title:"", // 当前选中分类名称
					range:[], // 可选项
					list:[]   // 服务端获取到的分类列表
				},
				topic:{
					id:0,	  // 当前选中话题id
					title:""  // 当前选中话题名称
				}
			}
		},
		computed:{
			getType(){
				return changeLook[this.yinsi]
			}
		},
		onLoad(res) {
			// #ifdef MP-WEIXIN
				let postClass = res.postClass?JSON.parse(res.postClass):false
				this.getPostClass(postClass)			
			// #endif
			// #ifdef APP-PLUS
				this.getPostClass(false)	
			// #endif
		},
		methods: {	
			async getPostClass(postclass){
				if (postclass) {
					this.postclass.list = postclass;
					let arr = [];
					for (let i = 0; i < postclass.length; i++) {
						arr.push(postclass[i].name)
					}
					return this.postclass.range = arr;
				}
				try{
					console.log(this.postclass);
					let [err,res] = await this.$http.get('/postclass');
					if (!this.$http.errorCheck(err,res)) return;
					let list = res.data.data.list;
					let arr = [] , arr2 = [];
					for (let i = 0; i < list.length; i++) {
						arr.push(list[i].classname);
						arr2.push({
							id:list[i].id,
							name:list[i].classname
						})
					}
					this.postclass.range = arr;
					this.postclass.list = list;
				}catch(e){
					return;
				}
			},
			
			changePostClass(e){
				// 当前选中的id
				this.postclass.id = this.postclass.list[e.target.value].id;
				// 当前选中的名称
				this.postclass.title = this.postclass.list[e.target.value].name;
				console.log(this.postclass.title);
			},
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
						this.yinsi = res.tapIndex
					}
				});
			},
			back(e){
				//  如果有值
				if(!this.text && this.imageList.length<1){
					uni.navigateBack({
						delta:1
					});
					return
				}
				if(!this.isGet){
					this.baocun();
				}
			},
			
			baocun(){
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

.addinput-foot{
	background: #FFFFFF;
	position: fixed;bottom: 0;left: 0;right: 0;height: 88upx;border-top:1upx solid #DDDDDD
}

.addinput-foot-btn{
	background: #F4F4F4;
}
</style>
