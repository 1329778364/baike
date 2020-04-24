<template>
	<view>
		<navigation-custom :config="tabbarconfig" @clickleft="clickleft" @clickright="clickright" ></navigation-custom>
		<topic-info :topicInfo="topicInfo"></topic-info>
		
		<swiper-tab-head :tabbars="tabbars" :tabindex="tabindex" @tab="chooseTab" scrollItemStyle="width:50%"></swiper-tab-head>
		<view class="topic-detail-list">
			<block v-for="(item, index) in tablist" :key="index">
				<template v-if="tabindex == index">
					<block v-for="(list, listindex) in item.list" :key="listindex">
						<common-list :item="list" :index="listindex" @change="updateData"></common-list>
					</block>
					<load-more :loadtext="item.loadtext"></load-more>
				</template>
			</block>
		</view>
	</view>
</template>

<script>
	import navigationCustom from "../../components/navigation-custom/navigation-custom.vue"
	import topicInfo from "../../components/topic/topic-info.vue"
	import swiperTabHead from "../../components/index/swiper-tab-head.vue"
	import commonList from "../../components/common/common-list.vue"
	import loadMore from "../../components/common/load-more.vue"
	export default {
		
		components:{
			navigationCustom,
			topicInfo,
			swiperTabHead,
			commonList,
			loadMore
		},
		computed:{
			tabbarconfig(){
				return this.config.tabbar_config
			}
		},
		data() {
			return {
				
				tabindex:0,
				tabbars:[
					{name:"默认", id:"moren"},
					{name:"最新", id:"zuixin"}
				],
				
				
				/* 话题信息 */
				topicInfo:{
					titlepic:"",
					title:"",
					desc:"",
					topic_class_id:1, /* 标识 topic的 类型id */
					totalnum:"",
					todaynum:""
				},
				
				tablist:[
					{
						name:"默认",
						loadtext:"上拉加载更多",
						page:1,
						firstload:false,
						list:[]
					},
					{
						name:"更新",
						loadtext:"上拉加载更多",
						page:1,
						firstload:false,
						list:[]
					}
				]
				
			};
		},
		/* 触底加载 */
		onReachBottom(){
			console.log("触底事件")
			this.loadmore()
			
		},	
		/* 下拉刷新 */
		onPullDownRefresh() {
			this.getList()
		},
		onLoad(res) {
			this.topicInfo = JSON.parse(res.topicDetail)
			this.getList()
			uni.$on("updateData", this.updateData)
		},
		methods:{
			/* 获取特定话题下面的数据 */
			async getList(){
				let url = `/topic/${this.topicInfo.topic_class_id}/post/${this.tablist[this.tabindex].page}`
				let [err, res] = await this.$http.get(url,{},{token:true})
				// 错误处理
				if (!this.util.CheckError(err,res)) {
					return this.tablist[this.tabindex].loadtext="上拉加载更多";
				}

				let list = res.data.data.list
				let arr = list.map((item, index)=>{
					return {
						userid:item.user.id,
						userpic:item.user.userpic,
						username:item.user.username,
						isguanzhu:!!item.user.fens.length,
						id:item.id, /* 文章的id*/
						title:item.title,
						type:"img", // img:图文,video:视频
						titlepic:item.titlepic,
						video:false,
						path:item.path,
						share:item.share,
						/* 用户操作信息*/
						infonum:{ 
							index:(item.support.length>0) ? (item.support[0].type+1) : 0,
							dingnum:item.ding_count,
							cainum:item.cai_count,
						},
						/* 所有的评论点赞分享总数  */
						goodnum:item.ding_count,
						commentnum:item.comment_count,
						sharenum:item.sharenum,
					}
				}) 
				this.tablist[this.tabindex].list = this.tablist[this.tabindex].page > 1 ? this.tablist[this.tabindex].list.concat(arr) : arr; 
				this.tablist[this.tabindex].firstload = true;
				
				uni.stopPullDownRefresh();
				return	this.tablist[this.tabindex].loadtext=(list.length < 10) ?"没有更多数据了" : "上拉加载更多";
			},
	
			/* 子组件是件更新父组件数据 */
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
			
			updateSupport(res){
				/* 找到对应文章好的对象进行引用 */
				let obj = this.tablist[this.tabindex].list.find(value =>{
					return value.id === res.post_id
				})
				if(!obj || obj.infonum.index === 1) return
				if(res.dotype ==1){					
					obj.infonum.index = res.dotype
					obj.goodnum ++
				}
			
			},
			
			updateGuanzhu(res){
				this.tablist[this.tabindex].list.forEach((item, index)=>{
					if(item.userid === res.userid){
						item.isguanzhu = res.data
					}
				})
			},
		
			loadmore(){
				if(this.tablist[this.tabindex].loadtext!="上拉加载更多") return;
				// 修改状态
				this.tablist[this.tabindex].loadtext="加载中...";
				// 页数+1
				this.tablist[this.tabindex].page++;
				// 获取数据
				this.getList();
			},
			chooseTab(e){
				this.tabindex = e
				console.log("tab", this.tabindex)				
			},
			clickright(){
				console.log("点击菜单")
			},
			clickleft(){
				uni.navigateBack({
					delta:1
				})
   			}
		}
	}
</script>

<style lang="scss">


</style>
