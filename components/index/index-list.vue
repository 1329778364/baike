<template>
	<view>
		<view style="margin-top:5px ;" class="u-f-ajc u-f-dc">
			<view class="index-list u-f">
				<view class="index-list1 u-f-ac">
					<view>
						<image :src="item.userpic" mode="aspectFit" lazy-load="true"></image>
						<view>{{item.username}}</view> 
					</view>
					<!-- #ifdef MP-WEIXIN -->
						<view @tap="guanzhu" style="padding: 0 5px; border-radius: 100px; background: #D8D8D8;">
							<view v-if="!wxguanzhu" style="font-size: 32rpx;" class="icon iconfont icon-zengjia"></view>
							<view v-if="!wxguanzhu" style="font-size: 32rpx;">关注</view>
							<view v-if="wxguanzhu" style="font-size: 32rpx;">已关注</view>
						</view> 
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
						<view @tap="guanzhu" style="padding: 0 5px; border-radius: 100px; background: #D8D8D8;">
							<view v-show="!item.isguanzhu" style="font-size: 32rpx;" class="icon iconfont icon-zengjia"></view>
							<view v-show="!item.isguanzhu" style="font-size: 32rpx;">关注</view>
							<view v-show="item.isguanzhu" style="font-size: 32rpx;">已关注</view>
						</view>
					<!-- #endif -->
				</view>
				<view class="index-list2">{{item.title}}</view> 
				<view class="index-list3 u-f-ajc">
					<image :src="item.titlepic" mode="scaleToFill"></image>
					<view v-show="item.type == 'video'" class="index-list-play icon iconfont icon-bofang"></view>
					<view v-show="item.type== 'video'" class="index-list-play-info">{{item.playnum}}次播放 {{item.long}}</view>
				</view>
				<view class="index-list4 u-f-ac u-f-jsb">
					<view class="u-f-ajc">
						<view @tap="caozuo('ding')" class="u-f-ajc icon iconfont" :class="[(item.infonum.index==1)?'icon-dianzan1':'icon-dianzan']">
							<view class="detail">{{item.infonum.ding}}</view>
						</view> 
						<view @tap="caozuo('cai')" class="u-f-ajc icon iconfont" :class="[(item.infonum.index==2)?'icon-cai':'icon-cai1']">
							<view class="detail">{{item.infonum.cai}}</view>
						</view> 
					</view>
					<view class="u-f-ajc">
						<view class="u-f-ajc icon iconfont icon-pinglun">
							<view class="detail">{{item.commentnum}}</view>
						</view>
						<view class="u-f-ajc icon iconfont icon-zhuanfa">
							<view class="detail">{{item.sharenum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return{
				wxguanzhu:""
			}
		},
		props:{
				item:Object,
				index:Number,
				isguanzhu:Boolean
			},
			onLoad: () => {
				// #ifdef MP-WEIXIN
				this.wxguanzhu = this.isguanzhu
				// #endif
			},
			methods:{
				caozuo(type){
					switch (type){
						case "ding":
						if(this.item.infonum.index == 1){ return }
						if(this.item.infonum.index == 2){
							this.item.infonum.cai -= 1
							this.item.infonum.ding += 1
						}
						this.item.infonum.index = 1;
						 
							break;
						case "cai":
						if(this.item.infonum.index == 2){ return }
						if(this.item.infonum.index == 1){
							this.item.infonum.cai += 1
							this.item.infonum.ding -= 1
						}
						this.item.infonum.index = 2;
						
							break;
					}
					this.$emit("caozuo", this.item.infonum.index, this.item.infonum.ding, this.item.infonum.cai)
				},
				guanzhu(e){
					// #ifdef APP-PLUS
					if (!this.item.isguanzhu){
						this.item.isguanzhu = true
						uni.showToast({ 
							title:"关注成功"
						})
						}
					else {
						this.item.isguanzhu = false
						uni.showToast({ 
							title:"取消关注"
						}) 
					}
					this.$emit("guanzhu", this.item.isguanzhu)
					// #endif
					
					// #ifdef MP-WEIXIN
					if (!this.wxguanzhu){
						this.wxguanzhu = true
						uni.showToast({ 
							title:"关注成功"
						})
						} 
					else {
						this.wxguanzhu = false
						uni.showToast({ 
							title:"取消关注"
						})
					}
					// console.log(this.wxguanzhu)
					this.$emit("guanzhu", this.wxguanzhu)
					// #endif	
			}
		}
	}
</script>

<style scoped lang="scss">
.detail{
	margin: 0 10px;
}
.index-list{
	align-self: center;
	width: 90%;
	flex-direction: column;	
	margin-top: 4px auto;
	padding: 5px 10px;
	border-radius: 20rpx; 
	border: 1rpx solid #BBBBBB;
}
.index-list1{
	flex-direction: row;
	justify-content: space-between;
}
.index-list1 view{
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 5px 5px;	
}
.index-list1>view>view{
	font-size: $uni-font-size-base;
	margin: 0 10rpx;
}
.index-list1 image{
	border-radius: 10px;
	width: 60rpx;
	height: 60rpx;
}
.index-list2{
	font-size: $uni-font-size-lg;
	border-bottom:2rpx solid $uni-border-color;
	margin: 2px 0;
	font-size: $uni-font-size-lg;
}
.index-list3{
	border-radius: 20rpx;
	width: 100%;
	position: relative;
	margin: 2px 0;
	border-bottom: 2rpx;
}
.index-list3 image{
	width: 100%;
	border-radius: 10px;
}
.index-list4{
	flex-direction: row;
	justify-content: space-between;
}
.index-list4 view{
	flex-direction: row;
	margin: 0 5px;
	font-size: 32rpx;
}
.index-list-play{
	position: absolute;
	font-size: 160rpx;
	color: rgba($color: #EEEFFF, $alpha: 0.9);
},
.index-list-play-info{
	font-size:32rpx;
	padding: 4px 10px;
	position: absolute;
	background-color: rgba($color: #888888, $alpha: 0.7);
	color: #FFFFFF;
	right: 12rpx;
	bottom: 12rpx;
	border-radius: 40px;
}
</style>
