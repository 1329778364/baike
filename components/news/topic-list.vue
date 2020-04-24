<template>
	<view class="u-f-ac topic-list animated fadeIn fast" @tap="tap">
		<view class="image-box">
			<image class="image-rectangle" :src="item.titlepic" mode="aspectFill"></image>
		</view>
		<view class="u-f-dc u-flex-start">
			<view class="font-size-lg uni-bold" style="line-height: 80rpx;">#{{item.title}}#</view>
			<view class="font-size-middle font-color-gray">{{item.desc}}</view>
			<view class="font-size-middle font-color-gray">动态 {{item.totalnum}} 今日 {{item.todaynum}}</view>
		</view>	
	</view>
</template>

<script>
	export default {
		props:{
			ischange:{
				type:Boolean,
				default:false
			},
			item:Object,
			index:Number
		},
		methods:{
			tap(e){
				this.$emit("tap", e)
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.topic-list{
		border-bottom: 2rpx solid #999999;
	}

</style>
