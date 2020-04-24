<template>
	<view id="user-chat-item">
		<view v-if="item.gstime" class="u-f-ajc font-size-small font-color-gray">{{item.gstime}}</view>
		<view class="user-chat-list u-f" :class="item.isme?'user-chat-me':''">
			<image v-if="!item.isme" class="avatar-small avatar-rectangle-small" :src="item.userpic" mode="widthFix"></image>
			<view class="u-f" :class="item.isme?'user-chat-list-body-me bgc-green':'user-chat-list-body bar-bgc'" :style="item.type=='image'?'padding:0px;':''">
				<text v-if="item.type=='text'">{{item.data}}</text>
				<image v-if="item.type=='image'" style="flex:1;" :src="item.data" mode="widthFix"></image>
				<view :class="item.isme?'item6-me':'item6'"></view> 
			</view>
			<image v-if="item.isme" class="avatar-small avatar-rectangle-small" :src="item.userpic" mode="widthFix" style="margin-right: 0px; margin-left:10px"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.user-chat-item{
		width: 100vm;
	}
	.user-chat-list{
		margin: 20rpx;
	}
	.item6{
		position: absolute;
		left: -12px;
		top: 10px;
		width: 0;
		height: 0;
		border-color: transparent #f7f7f7 transparent transparent;
		border-style: solid;
		border-width: 6px 6px 6px 6px;
	}
	.item6-me{
		position: absolute;
		left: auto;
		right: -12px;
		top: 10px;
		width: 0;
		height: 0;
		border-color: transparent transparent transparent #f7f7f7;
		border-style: solid;
		border-width: 6px 6px 6px 6px;
	}
	.user-chat-list-body{
		padding: 5px;
		max-width: 400rpx;
		border-radius:10rpx; 
		position: relative;
		
		image{
			max-width: 200rpx;
			max-height: 300rpx;
		}
	}
	.user-chat-me{
		justify-content: flex-end;
		.user-chat-list-body-me{
			padding: 5px;
			max-width: 400rpx;
			border-radius:10rpx; 
			position: relative;
		}
	}
	.user-chat-list-body-me>image{
		max-width: 200rpx;	
		max-height: 300rpx;
	}
	
	

</style>
