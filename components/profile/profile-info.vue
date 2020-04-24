<template>
	<view>
		<view class="u-f-ac border-box-no-border" @tap="navToUserSpace">
			<image class="avatar avatar-circle" :src="profileInfo.userpic" mode="widthFix"></image>
			<view class="profile-right u-f1 u-f-ac u-f-jsb">
				<view class="profile-middle">
					<view class="profile-name font-size-lg uni-bold">{{profileInfo.username}}</view>
					<view class="profile-info font-color-gray">总文章 {{profileInfo.totalnum}}  今日 {{profileInfo.todaynum}} </view>
				</view> 
				<view class="icon iconfont icon-jinru font-color-gray"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			profileInfo:Object,
			index:Number
		},
		data() {
			return {
				
			};
		},
		methods:{
			navToUserSpace(){
				uni.navigateTo({
					url: '../../pages/user-space/user-space'
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
