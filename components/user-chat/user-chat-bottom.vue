<template>
	<view>
		<view class="user-chat-bottom u-f-ac icon-size-xl bar-bgc border-top animated fadeInDown fast">
			<view class="icon iconfont icon-geren icon-size-xxl"></view>
			<view class="input-box u-f-ajc">
				<input type="text" placeholder-class="placeholder" placeholder="文明发言" v-model="text" />
			</view>
			<view class="icon iconfont icon-fabu icon-size-xxl"></view>
			<view v-if="!text" class="icon iconfont icon-zengjia1 icon-size-xxl"></view>
			<button v-else class="fasonbutton" type="primary" @click="submit">发送</button>
		</view>
	</view>
</template>	

<script>
	export default {
	
		data() {
			return {
				text:""
			};
		},
		methods:{
			submit(){
				this.$emit("submit", this.text)
				this.text = ""
			}
		}
	}
</script>

<style lang="scss" scoped>
.user-chat-bottom{
	position: fixed;
	height: 80rpx;
	bottom: 0;
	left:0;
	right: 0;
	padding: 1rpx 0;
	
	.input-box{
		margin: 0 10rpx;
		padding: 0 10rpx;
		flex: 1;
		font-size: 32rpx!important;
		// width: 100%;
		height: 80%;
		background-color: #ffffff;
		border-radius: 10rpx;
		input{
			height: 100%;
			margin: 10rpx 0;
		}
	}
	
	view{
		margin: 20rpx;
	}
}
.placeholder{
	height: 90%;
	background-color: #ffffff;
	width: 100%;
}
input{
	width: 100%;
}
.fasonbutton{
	font-size: 32rpx;
	margin-right: 20rpx;
	border-radius: 10rpx;
	padding: 0 20rpx;
	color: #EEEEEE;
}

.fasong-h{
	background-color: #1AAD19;
}
</style>
