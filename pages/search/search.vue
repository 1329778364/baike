<template>
	<view>
		<!-- p83 没有进一步实现 -->
		<!-- #ifdef MP-WEIXIN -->
			<mini-nav-bar :leftwidth=leftwidth fixed="true" :border=false :statusBar="true" color="#333333" background-color="#FFFFFF">
				<view slot="left" ></view>
				<block>
					<view class="input-view">
						<view class="icon iconfont icon-sousuo"></view>
						<input :disabled="false" class="nav-bar-input" type="text" v-model="inputContent" @confirm="confirmInput">
					</view>
				</block>
				<block slot="right">
					<view style="font-size: 32rpx;" @click="backToPre">取消</view>
				</block>
			</mini-nav-bar>
		<!-- #endif -->
		
		<!-- 搜索内容展示 -->
		<template v-if="list.length>0">
			<block v-for="(item, index) in list" :key="index">
				<template v-if="searchType == 'post'" >
					<index-list @change="updateData" :item="item" :index="index"></index-list>
				</template>
				<template v-else >
					<topic-list :item="item"></topic-list>
				</template>
			</block>
			<load-more :loadtext="loadtext"></load-more>
		</template> 
		<template v-else-if="issearch && list.length<1 ">
			<no-thing></no-thing>
		</template>
		 
	</view>
</template>

<script>
	import miniNavBar from '../../components/common/mini-nav-bar.vue';
	import indexList from '../../components/index/index-list.vue';
	import topicList from '../../components/news/topic-list.vue';
	
	import loadMore from '../../components/common/load-more.vue';
	import noThing from '../../components/common/no-thing.vue';
	
	export default {
		components:{
			miniNavBar,
			indexList,
			topicList,
			loadMore,
			noThing
		},
		data() {
			return {
				searchType:"post",
				inputContent:"",
				issearch:false,
				loadtext:"",
				page:1,
				list:[],
				loadtext:"上拉加载更多",
				leftwidth:"width:1px;",
			};
		},
		
		onNavigationBarButtonTap(e){
			if (e.index == 0){
				uni.navigateBack({
					delta:1
				})
			}
		},
		
		onNavigationBarSearchInputClicked(){
			console.log(e.detail)
		},
		
		onNavigationBarSearchInputConfirmed(e){
			this.inputContent = e.text
			this.getSearchData()
		},
		// 监听页面触底事件
		onReachBottom() {
			this.loadmore();
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.getSearchData();
			uni.stopPullDownRefresh();
		},
		
		onLoad(e) {
			if (!e) return; 
			this.searchType = e.searchType || 'post';
			// #ifdef APP-PLUS
			let pageTitle = '搜索文章';
			if (this.searchType == 'topic') {
				pageTitle = '搜索话题';
			} else if(this.searchType == 'user'){
				pageTitle = '搜索用户';
			}
			let currentWebview = this.$mp.page.$getAppWebview();  
			let tn = currentWebview.getStyle().titleNView;  
			tn.searchInput.placeholder = pageTitle; 
			currentWebview.setStyle({  
				titleNView: tn  
			});
			// #endif
			uni.$on("updateData",this.updateData)
		},
		
		methods:{
			/* 更新操作数据 */
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
			updateGuanzhu(res){
				this.list.forEach((item, index)=>{
					if(item.userid === res.userid){
						item.isguanzhu = res.data
					}
				})
			},
			updateSupport(res){
				/* 找到对应文章好的对象进行引用 */
				let obj = this.list.find(value =>{
					return value.id === res.post_id
				})
				if(!obj) return
				let oldindex = obj.infonum.index
				/* 当前操作 更新图标颜色 */
				obj.infonum.index = res.dotype 
				/* 更新数字 */
				/* 之前有操作过 */
				if(oldindex !==0){
					oldindex === 1 ? obj.infonum.dingnum--: obj.infonum.cainum--
				}
				/* 本次操作 */
				res.dotype ==1?obj.infonum.dingnum++:obj.infonum.cainum++
			
			},
			async getSearchData(){
				let url = "/search/post"
				switch (this.searchType){
					case "post":
						url = "/search/post"
						break;
					case "topic":
						url = "/search/topic"
						break;
					case "user":
						url = "/search/user"
						break;
				}
				uni.showLoading({title:"Loading..."})
				let [err, res] = await this.$http.post(url, { keyword:this.inputContent, page:this.page}, {token:false})
				let error = this.util.CheckError(err, res,()=>{
					uni.hideLoading()
					this.issearch = true
				},()=>{
					uni.hideLoading()
					this.issearch = true
				})
				if(!error) return
				let list = res.data.data.list
				
				if(res){
					let listitem = list.map((obj, index)=>{
						switch (this.searchType){
							case "post":
								return {
									userid:obj.user.id,
									userpic:obj.user.userpic,
									username:obj.user.username,
									id:obj.id,
									title:obj.title,
									titlepic:obj.titlepic,
									path:obj.path,
									share:obj.share,
									infonum:{
										index:(obj.support.length)>0? (obj.support[0].type+1):0,
										dingnum:obj.ding_count,
										cainum:obj.cai_count
									},
									isguanzhu:true,
									video:false,
									type:"img",
									commentnum:obj.comment_count,
									sharenum:obj.sharenum
								}
								break;
							case "topic":
								return{
									id:obj.id,
									titlepic:obj.titlepic,
									title:obj.title,
									desc:obj.desc,
									totalnum:obj.post_count,
									todaynum:obj.todaypost_count
								}
								break;
						}
						
					})
				this.list = list.length>0 ? this.list.concat(listitem):[]
				console.log(listitem);
				}
				this.issearch = true;
				this.loadtext= list.length < 10 ? "没有更多数据了" : "上拉加载更多";
				uni.hideLoading()
			},
			confirmInput(){
				this.getSearchData()			
			},
			backToPre(e){
				uni.navigateBack({
					delta: 1
				});
			},
			loadmore(){
				if (this.loadtext != "上拉加载更多"){ return }
				this.list.loadtext = "加载中"
				this.page++
				this.getSearchData()
			},
		}
	}
</script>

<style lang="scss">
	.leftButton{
		width: 2px!important;
	}
	.input-view{
		display: flex;
		flex-direction: row;
		width: 160px;
		background-color: #f8f8f8;
		height: 30px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}
	
	.nav-bar-input {
		height: 30px;
		line-height: 30px; 
		padding: 0 5px;
		font-size: 30rpx;
		background-color: #f8f8f8;
	}
</style>
