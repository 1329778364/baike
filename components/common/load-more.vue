<template>
	<view class="loadmore">{{loadtext}}</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		
		props:{
			loadtext:String
		}
		
	}
</script>

<style lang="scss">
	.loadmore{
		text-align: center;
		font-size: $uni-font-size-base;
		color: #AAAAAA;
		padding: 10rpx;
	}
</style>
