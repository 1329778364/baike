<template>
	<view>
		<view class="u-f-ac u-f-jsb profile-data border-box-no-border">
			<view class="u-f-ac u-f-jsb" style="flex: 1;" v-for="(item, index) in profiledata" :key="index">
				<view class="u-f1 u-f-ajc u-f-dc"><view class="">{{item.num}}</view>{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			profiledata:Array		
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.profile-data>view:nth-child(2)>view{
		view{
			font-size: 32rpx;
		}
		font-size: 32rpx;
		color: #333333;
	}

</style>
