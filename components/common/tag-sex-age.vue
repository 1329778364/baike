<template>
	<view>
		<view class="icon iconfont tag-sex"
		:class="sex == 0?'icon-nan':'icon-nv tag-nv'">
			{{age}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			sex:Number,
			age:Number
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.tag-sex{
		background-color: #007AFF;
		color: #FFFFFF;
		font-size: 23rpx;
		padding: 5rpx 10rpx;
		border-radius: 20rpx;
		line-height: 22rpx;
		height: 22rpx;
		}
		
	.tag-nv{
		background-color: #FF689D;
	}
</style>
