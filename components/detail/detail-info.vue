<template>
	<view class="u-f-ajc animated fadeIn fast">
		<view class="common-list u-f">
			<view class="common-list-l">
				<image :src="item.userpic" mode="widthFix" lazy-load></image>
			</view>
			<view class="common-list-r u-f-jsb">
				<view class="u-f-ac u-f-jsb">
					<view class="u-f-ajc" style="font-size: 32rpx; color: #999999;">
						{{item.username}}
						<tag-sex-age v-if="getAge!==false && getSex!==false" :age="getAge" :sex="getSex"></tag-sex-age>
					</view>
					<view v-if="showguanzhu" @tap="guanzhu" class="u-f-ajc guanzhuButton" >
						<view v-if="!item.isguanzhu" class="font-size-middle icon iconfont icon-zengjia"></view>
						<view v-if="!item.isguanzhu" class="font-size-middle">关注</view>
						<view v-if="item.isguanzhu" class="font-size-middle font-color-gray ">已关注</view>
					</view>
				</view> 
				
				<view class="font-size-middle font-color-gray" v-show="item.create_time">{{item.create_time}}</view>
				
				<view class="font-size-lg ">{{item.title}}</view>
				<view class="font-size-middle ">{{item.content}}</view>
				<!-- 图文 视频 -->
				<view v-if="item.titlepic" class="common-image-box ">
					<block v-for="(pic, index) in item.morepic" :key="index">
						<image @tap="imageDetail(index)" class="image-rectangle" :src="pic" mode="widthFix" lazy-load></image>
					</block>
					<view v-if="item.video != false" class="common-list-play icon iconfont icon-bofang"></view>
					<view v-if="item.video != false" class="common-list-playinfo">
						{{item.video.looknum}} 次播放 {{item.video.long}}
					</view>
				</view>
				<!-- 分享 -->
				<view v-if="item.share" class="common-list-share u-f-ac">
					<image :src="item.share.titlepic" mode="widthFix" lazy-load></image>
					<view class="">{{item.share.title}}</view>
				</view>
				<view class="u-f-ac u-f-jsb bottom-info">
					<view>{{item.address}}</view>
					<view class="u-f-ac">
						<view class="icon iconfont icon-zhuanfa u-f-ac">
							<view class="mini-box">{{item.sharenum}}</view>
						</view>
						<view class="icon iconfont icon-pinglun1 u-f-ac">
							<view class="mini-box">{{item.commentnum}}</view>
						</view>
						<view class="icon iconfont icon-dianzan1 u-f-ac" :class="[(item.infonum.index == 1)?'font-color-red':'']"
						@tap="caozuo('ding')">
							<view class="mini-box">{{item.goodnum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tagSexAge from "../common/tag-sex-age.vue" ;
	export default {
		components:{
			tagSexAge
		},
		computed:{
			getAge(){
				return this.item.age
			},
			getSex(){
				return this.item.sex
			},
			showguanzhu(){
				return (this.User.userinfo.id == this.item.userid)?false:true
			}
		},
		data(){
			return{
			}
		},
		props:{
			item:Object,
			index:Number
		},
		methods:{
			imageDetail: function(index) {
				// console.log(e)
				// var current = this.item.morepic[0]
				uni.previewImage({
					current: index,
					urls: this.item.morepic
				})
			},	
			
			async caozuo(type){
				let index = (type==="ding") ? 1:2
				try{
					if(this.item.infonum.index === index) uni.showToast({
						title:"请勿重复操作", icon:"none"}) 
					let [err ,res] = await this.$http.post("/support",{post_id:this.item.id,type:index-1},{token:true, checkAuth:true, checkToken:true})
					if(!this.util.CheckError(err, res)) return
				}catch(e){ return }
				uni.showToast({title: "点赞成功!"});
				let data = {
					type:"support",
					post_id:this.item.id,
					dotype: index
				}
				/* 修改父组件数据 */
				this.$emit("change",data)				
				/* 全局修改数据 */
				uni.$emit("updateData",data)
				
			},
			async guanzhu(){
				/* 实时呈现 */				
				let [err, res] = await this.$http.post(this.item.isguanzhu?"/user/unfollow":"/user/follow", 
					{follow_id:this.item.userid},  /* 待关注用户id*/
					{token:true, checkToken:true, checkAuth:true})						
				
				let data = {
					type:"guanzhu",
					userid:this.item.userid,
					data:this.item.isguanzhu?false:true
				}
				/* 父组件数据更新 */
				this.$emit("change",data)	
				/* 全局通知  */
				uni.$emit("updateData",data)
			}		
		}
		
	}
</script>

<style lang="scss" >
	@import url("../../common/list.css");
	.common-list{
		width: 100%; 
		padding: 20rpx 20rpx;
		margin: 0;	
		border: 0;
		border-bottom: 1px solid #efefef;
		background-color: #FFFFFF;
		border-radius: 0;
	}
</style>
