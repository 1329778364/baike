<template>
	<view>
		<view class="paper-list-item u-f-ac animated fadeIn fast" @click="opendetail">
			<image class="avatar avatar-circle" :src="item.userpic" mode="widthFix"></image>
			<view class="item-right">
				<view class="u-f-ac u-f-jsb item-right-title font-size-lg uni-bold">
					{{item.username}}
					<view class="font-size-middle font-color-gray">{{item.time}}</view>
				</view>
				<view class="u-f-ac u-f-jsb font-color-gray">
					{{item.data}}
					<view v-if="item.noreadnum>0">
						<uni-badge :text="item.noreadnum" type="error"></uni-badge>
					</view>
				</view> 
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from "../../components/uni-badge/uni-badge.vue"
	
	export default {
		components:{
			uniBadge
		},
		props:{
			item:Object,
			index:Number
		},
		data() {
			return {
				
			};
		},
		methods:{
			opendetail(){
				uni.navigateTo({
					url: '../../pages/user-chat/user-chat'
				});
			}
		}
		
	}
</script>

<style lang="scss">

.paper-list-item{
	width: 100%;
	height: 100%;
	border-bottom:1rpx solid #EEEEEE;
	padding: 20rpx 0;
}
.item-right{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
