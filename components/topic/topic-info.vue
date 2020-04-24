<template>
	<view>
		<view class="topic-bg">
			<image :src="topicInfo.titlepic" mode="aspectFill" lazy-load></image>
		</view> 
		
		<view class="topic-info border-box" style="border: #FFFFFF;" >
			<view class="topic-info-t u-f-ac" >
				<view class="image-box" style="margin: 0;">
					<image class="image-rectangle" :src="topicInfo.titlepic" mode="aspectFill"></image>
				</view>
				<view class="uni-bold font-size-lg" style="line-height: 100rpx; margin: 0 20rpx;"></view>
			</view>
			<view class="topic-info-c u-f-ac item-line font-color-gray">
				<view class=""> 动态 {{topicInfo.totalnum}} </view>
				<view class=""> 今日 {{topicInfo.todaynum}} </view>
			</view>
			<view class="topic-info-b font-size-middle item-line">
				{{topicInfo.desc}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			topicInfo:Object
		}
	}
</script>

<style lang="scss">
.topic-bg{
	width: 100%;
	height: 300rpx;
	position: absolute;
	overflow: hidden;
	top: 0;
}
.topic-bg>image{
	width: 100%;
	position: absolute;
	filter: blur(10px);
	z-index: -1;
}

.topic-info{
	position: relative;
	background-color: transparent;
	top: 50rpx;
}
.topic-info-t{
	align-items: flex-end;
}

</style>
