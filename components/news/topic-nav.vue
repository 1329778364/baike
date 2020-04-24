<template>
	<view>
		<!-- 热门分类 -->
		<view class="topic-nav border-box">
			<view class="u-f-ajc u-f-jsb">
				<view class="font-size-middle">热门分类</view>
				<view class="u-f font-size-middle" @tap="topicNav">
					更多<view class="icon iconfont icon-jinru"></view>
				</view>
			</view>
			<view class="u-f-ac font-size-middle u-f-jsa">
				<block v-for="(item, index) in nav" :key="index">
					<view class="">{{item.name}}</view>
				</block>
			</view>
		</view>
		<!-- 最近更新 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			nav:Array,
			index:Number
		},
		methods:{
			topicNav(e){
				this.$emit("tap")
				uni.navigateTo({
					url: '../../pages/topic-nav/topic-nav'
				});
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	
.topic-nav>view:first-child{
	margin-bottom: 10rpx;
}
.topic-nav>view:last-child>view{
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	background-color: #D8D8D8;
	color: #666666;
	border-radius: 10rpx;
	margin: 0 10rpx;
	font-size: $uni-font-size-sm;
}
</style>
