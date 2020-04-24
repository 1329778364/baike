<template>
	<view >
		<detail-info :item="detail" @change="updateData"></detail-info>
		<view class="u-comment-title">{{comment.count!=0?'最新评论':'暂无评论'}}{{comment.count!=0?comment.count:''}}</view>
		<view class="uni-comment u-comment">
			<block v-for="(item,index) in comment.list" :key="index">
				<comment-list :item="item" :index="index"></comment-list>
			</block>
		</view>
		<view class="" style="height: 100rpx;"></view>
		<user-chat-bottom @submit="fabucomment"></user-chat-bottom>
		
		<!-- #ifdef APP-PLUS -->
		<more-share :show="showshare" @togle="toggle" :sharedata="sharedata"></more-share>
		<!-- #endif -->
	</view>
</template>

<script>
	import detailInfo from "../../components/detail/detail-info.vue"
	import time from "../../common/time.js";
	import commentList from "../../components/detail/comment-list.vue";
	import userChatBottom from "../../components/user-chat/user-chat-bottom.vue"
	import moreShare from "../../components/common/more-share.vue"
	export default {
		components:{
			detailInfo,
			commentList,
			userChatBottom,
			moreShare
		},
		data() {
			return {
				
				sharedata:{
					title:"",
					url:"",
					titlepic:"",
					shareType:0,
				},
				showshare:false,
				comment:{
					count:20,
					list:[]
				},
				detail: {}
			};
		},
		onLoad(e) {
			uni.showLoading({title:"加载中"})
			this.initData(JSON.parse(e.detailData))	
			this.getcomment()
			uni.hideLoading()
		},
		 
		onShareAppMessage() {
			return {
				title: "热点详情",
				path: '/pages/detail/detail?detailData=' + JSON.stringify(this.detail)
			} 
		},
		
		// #ifdef APP-PLUS
		// 监听导航右边按钮
		onNavigationBarButtonTap(e) {
			if(e.index==0){
				this.toggle();
			}
		},
		// 上拉触底事件
		onReachBottom() {
			// 上拉加载
			this.loadmore();
		},
		// 监听下拉刷新 
		onPullDownRefresh(){
			this.getdata();
		},
		// #endif

		methods:{
			updateData(res){
				switch (res.type){
					case "guanzhu":
						this.updateGuanzhu(res)
						break;
					case "support":
						this.updateSupport(res)
						break;
				}
			}, 
			// 初始化分享内容
			__initShare(obj){
				this.sharedata = {
					title:obj.title,
					content:obj.title,
					url:"http://www.dishaxy.com/",
					titlepic:obj.titlepic ? obj.titlepic : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png',
					shareType:0,
				}
			},
			updateGuanzhu(res){
				this.detail.isguanzhu = res.data
			},
			updateSupport(res){
				/* 找到对应文章好的对象进行引用 */
				if(res.dotype == 1) {
					this.detail.infonum.index = res.dotype
					this.detail.infonum.dingnum++
					this.detail.goodnum++					
				}
			},
			
			toggle(){
				this.showshare = !this.showshare
			},
			fabucomment(data){
				let obj = {
						id:1,
						fid:0,
						userpic:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
						username:"小猫咪",
						time:time.gettime.gettime(new Date().getTime()),
						data:data,
					}
					this.comment.list.push(obj)
			},
			async getcomment(){
				/* 获取评论数据信息 */
				let [err, res] = await this.$http.get(`/post/${this.detail.id}/comment`)
				let error = this.util.CheckError(err, res)
				if(!error) return
				let comments = res.data.data.detail
				this.comment.count = comments.length
				this.comment.list = this.comment.list.concat(this.__ArrSort(comments))
			},
			__ArrSort(arr,id = 0){
				var temp = [],lev=0;
				var forFn = function(arr, id, lev){
					for (var i = 0; i < arr.length; i++) {
						var item = arr[i];
						if (item.fid==id) {
							item.lev=lev;
							temp.push({
								id:item.id,
								fid:item.fid,
								userid:item.user.id,
								userpic:item.user.userpic,
								username:item.user.username,
								time:time.gettime.gettime(item.create_time),
								data:item.data,
							});
							forFn(arr, item.id,lev+1);
						}
					}
				};
				forFn(arr, id,lev);
				return temp;
			},
			/* 初始化数据 */
			initData(obj){
				/* 修改窗口标题 */
				uni.setNavigationBarTitle({
					title:obj.title
				}) 
				/* 加载分享信息 */
				this.__initShare(obj);
				/* 加载中 */
				uni.showLoading({ title:"Loading..", mask:true })
				obj.morepic = []
				obj.content = ""
				obj.goodnum = obj.infonum.dingnum
				this.detail = obj
				this.comment.count = obj.commentnum
				/* 获取文章详情 */
				this.getdetail()
				/* 获取评论信息 */
				if(this.comment.count){
					this.getcomment()
				}
			},
			/* 请求数据 */
			async getdetail(){
				let [err, res] = await this.$http.get("/post/"+this.detail.id)
				let error = this.util.CheckError(err, res, ()=>{
					uni.hideLoading()
				}, ()=>{
					uni.hideLoading()
				})
				if(!error) return 
				let detail = res.data.data.detail
				this.detail.content = detail.content
				console.log(this.detail);	
				try{
					let images = detail.image.map((obj, index)=>{
						return obj.url
					})
					this.detail.morepic = images
				}catch(e){
					this.detail.morepic = []
				}
				try{
					this.detail.age = detail.userinfo.age
					this.detail.sex = detail.userinfo.sex
				}catch(e){
					this.detail.age = false
					this.detail.sex = false
				}
				this.detail.create_time= detail.create_time
				return uni.hideLoading()
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	
.u-comment{
	padding: 0 20upx;
}
.u-comment-title{
	padding: 20upx;
	font-size: 30upx;
	font-weight: bold;
}
</style>
