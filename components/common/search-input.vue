<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-input" @tap="openSearch">
			<input type="text" class="uni-input icon iconfont" disabled placeholder="搜索话题" placeholder-class="icon-sousuo font-size-middle u-f-ajc topic-search"/>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			openSearch(){
				this.$emit("openSearch")
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-input{
	padding: 10rpx;
}
.search-input>input{
	background-color: #ffffff;
	border-radius: 10rpx;
}
.topic-search{
	display: flex;
	justify-content: center;
	background-color: #ebebeb;
	border-radius: 10rpx;
}
</style>
