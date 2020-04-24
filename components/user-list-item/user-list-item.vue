<template>
	<view>
		<view class="user-list u-f-ac border-bottom-gray animated fadeIn fast">
			<image class="avatar avatar-circle" :src="item.userpic" mode="widthFix"></image>
			<view class="user-list-right u-f-ajc u-f-jsb">
				<view style="flex:1;">
					<view class="">{{item.username}}</view>
					<view style="display: inline-block;">
						<tag-sex-age :age="item.age" :sex="item.sex"></tag-sex-age>
					</view>
				</view> 
				<view class="u-f-ajc">
					<view class="icon iconfont font-color-gray icon-size-xl" :class="item.isguanzhu?'icon-xuanze-yixuan':'icon-zengjia1'"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tagSexAge from "../common/tag-sex-age.vue"
	export default {
		components:{
			tagSexAge
		},
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

<style lang="scss">
	.user-list{
		padding: 10rpx 0;
	}
	.user-list-right{
		width: 100%;
	}
	.icon-zengjia1{
			color: #F87918;
	}
</style>
