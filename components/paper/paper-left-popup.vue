<template>
	<view>
		<view class="paper-left-popup-mask " v-show="show" @click="clickmask">
			<view class="paper-left-popup" v-show="show">
				<view class="u-f-ac" hover-class="paper-left-popup-hover" @click="addfriend">
					<view class="icon iconfont icon-sousuo"></view>
					加糗友
				</view>
				<view class="u-f-ac" hover-class="paper-left-popup-hover" @click="clear">
					<view class="icon iconfont icon-qingchu"></view>
					清除未读
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			show:Boolean
		},
		data() {
			return {
				Show:this.show
			};
		},
		methods:{
			clickmask(){
				this.$emit("clickmask")
			},
			addfriend(){
				this.$emit("addfriend")
			},
			clear(){
				this.$emit("clear")
			},
		}
	}
</script>

<style lang="scss" scoped>
.paper-left-popup{
	position: fixed;
	right: 0;
	top:130rpx;
	background-color: #FFFFFF;
	z-index: 2000;
	width:35%;
	box-shadow: 1rpx 1rpx 20rpx 2rpx #CCCCCC;
}
.paper-left-popup-mask{
	position: fixed;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	background-color: #BEBEBE70;
	z-index: 1999;
	
}
.paper-left-popup>view{
	padding: 20rpx;
	font-size: 32rpx;
	
	view{
			margin-right: 10rpx;
			font-weight: bold;
	}
}
.paper-left-popup-hover{
	background-color: #EEEEEE;
}
</style>
