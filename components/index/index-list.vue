<template>
	<view>
		<view style="margin-top:5px ;" class="u-f-ajc u-f-dc" >
			<view class="index-list u-f">
				<view class="index-list1 u-f-ac">
					<view>
						<image :src="item.userpic" mode="aspectFit" lazy-load="true"></image>
						<view class="font-size-middle font-color-gray" style="margin-left: 20rpx;">{{item.username}}</view> 
					</view>
					<view v-if="showguanzhu" @tap="guanzhu" class="u-f-ajc guanzhuButton" >
						<view v-if="!item.isguanzhu" class="font-size-middle icon iconfont icon-zengjia"></view>
						<view v-if="!item.isguanzhu" class="font-size-middle">关注</view>
						<view v-if="item.isguanzhu" class="font-size-middle font-color-gray">已关注</view>
					</view> 
				</view>
				<view class="index-list2 font-size-lg" @click="navToDetail">{{item.title}}</view> 
				<view class="index-list3 u-f-ajc" @click="navToDetail">
					<image v-if="item.titlepic" :src="item.titlepic" mode="aspectFill"></image>
					<view v-show="item.type == 'video'" class="index-list-play icon iconfont icon-bofang"></view>
					<view v-show="item.type== 'video'" class="index-list-play-info">{{item.playnum}}次播放 {{item.long}}</view>
				</view>
				<view class="index-list4 u-f-ac u-f-jsb">
					<view class="u-f-ajc">
						<view @tap="caozuo('ding')" class="u-f-ajc icon iconfont" :class="[(item.infonum.index==1)?'icon-dianzan1':'icon-dianzan']">
							<view class="detail">{{item.infonum.dingnum}}</view>
						</view> 
						<view @tap="caozuo('cai')" class="u-f-ajc icon iconfont" :class="[(item.infonum.index==2)?'icon-cai':'icon-cai1']">
							<view class="detail">{{item.infonum.cainum}}</view>
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
				infonum:this.item.infonum
			}
		},
		computed:{
			showguanzhu(){
				return (this.User.userinfo.id == this.item.userid)?false:true
			}
		},
		props:{
				item:Object,
				index:Number,
			},
		onLoad: () => {

		},
		methods:{
			navToDetail(){
				uni.navigateTo({
					url: '../../pages/detail/detail?detailData='+ JSON.stringify(this.item)
				});
				this.$emit("tap")
			},
			async caozuo(type){
				let index = (type==="ding") ? 1:2
				let data = {
					type:"support",
					post_id:this.item.id,
					dotype: index
				}
				/* 修改父组件数据 */
				this.$emit("change",data)				
				if(index === 1) uni.showToast({title:"感谢点赞,推荐已收到!"});
				/* 全局修改数据 */
				uni.$emit("updateData",data)
				
				try{
					let [err ,res] = await this.$http.post("/support",{post_id:this.item.id,type:index-1},{token:true, checkAuth:true, checkToken:true})
					if(!this.util.CheckError(err, res)) return
				}catch(e){ return }
				
			},
			async guanzhu(){
				/* 实时呈现 */				
				let [err, res] = await this.$http.post(this.item.isguanzhu?"/user/unfollow":"/user/follow", 
					{follow_id:this.item.userid},  /* 待关注用户id*/
					{token:true, checkToken:true, checkAuth:true})						
				/* 成功之后修改首页数据 */	
				let data = {
					type:"guanzhu",
					userid:this.item.userid,
					data:this.item.isguanzhu?false:true
				}
				/* 父组件数据更新 */
				this.$emit("change",data)	
				/* 开启全局监听 */
				uni.$emit("updateData",data)
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
	margin: 5rpx 5rpx;
	padding: 5px 10px;
	border-radius: 10rpx; 
	box-shadow: #EEEEEE 0 0 10px 5px ;//边框阴影
}
.index-list1{
	flex-direction: row;
	justify-content: space-between;
}
.index-list1 view{
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 5px 0px;	
}
.index-list1>view>view{
	font-size: $uni-font-size-base;
	margin: 0 2rpx;
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
	font-size: 28rpx;
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
