<template>
	<view>
		<!-- 轮播图 -->
		<swiper class="topic-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<block v-for="(item, index) in swipers" :key="index">
				<swiper-item>
					<image class="width-full boder-radius-base" :src="item.src" mode="aspectFill"></image>
				</swiper-item> 						
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			swipers:Array,
			index:Number
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.topic-swiper{
	padding: 0 20rpx 20rpx 20rpx;
	
}
.topic-swiper>image{
	width: 100%;
}
</style>
