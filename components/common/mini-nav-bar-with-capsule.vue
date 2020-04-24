<template>
	<navigation-custom :config="config" :scrollTop="scrollTop" @customConduct="customConduct" :scrollMaxHeight="scrollMaxHeight">
		<view slot="middle" class="nav-tab-bar u-f-ajc">
			<block v-for="(item, index) in tabBars" :key="index">
				<view class="u-f-jsb" :class="{'active':tabIndex==index}" @tap="changeTab(index)">
					{{item.name}} 
					<view v-if="tabIndex == index" class="nav-tab-bar-line"></view>
				</view>
			</block>
		</view>
	</navigation-custom>
</template>

<script>
	import navigationCustom from "../navigation-custom/navigation-custom.vue"
	
	export default {
		components:{
			navigationCustom
		},
		props:{
			tabBars:Array,
			index:Number,
			tabIndex:Number
		},
		data() {
			return {
				tabindex:this.tabIndex,
				config:{
				    title:"我是标题", //title
				    bgcolor:"#55aaff", //背景颜色
				    fontcolor:"red", //文字颜色，默认白色
				    type:1, //type 1，3胶囊 2，4无胶囊模式
				    transparent:true, //是否背景透明 默认白色
				    linear:true, //是为开启下滑渐变
				    share:false, //是否将主页按钮显示为分享按钮
				    // menuIcon:"../static/icon/back_.png", 当type为3或者4的时候左边的icon文件位置，注意位置与当前页面不一样
				    // menuText:"返回", 当type为3或4的时候icon右边的文字
				},
				scrollTop:0 ,// 当linear为true的时候需要通过onpagescroll传递参数
				scrollMaxHeight:200 //滑动的高度限制，超过这个高度即背景全部显示
			};
		},
		onPageScroll(e) {
		    this.scrollTop = e.scrollTop;
		},
		methods:{
			customConduct(){
			    console.log("ssssss")
			},
			changeTab(index){
				this.tabindex = index
				this.$emit("changeTab", this.tabindex)
			}
			
		}
	}
</script>

<style lang="scss">
.nav-tab-bar>view{
		font-size: 32rpx;
		padding: 0 20rpx;
		font-weight: bold;
		color: #969696;
	}
.active{
	color: #333333!important;
	
}
.nav-tab-bar-line{
	border-bottom:  5rpx solid #ffee30;
	border-top:  5rpx solid #ffee30;
	width: 70rpx;
	border-radius: 20rpx;
}
</style>
