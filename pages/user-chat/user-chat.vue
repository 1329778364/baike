<template>
	<view class="page-bgc">
		<scroll-view id="scrollview" scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true"
		:style="{height:style.contentH+'px'}">			
			<block v-for="(item, index) in list" :key="index">
				<view class="chat-item">
					<user-chat-list :item="item" :key="index"></user-chat-list>
				</view>
			</block>
		</scroll-view>
		
		<user-chat-bottom @submit="submit"></user-chat-bottom>
	</view>
</template> 

<script>
	import userChatBottom from '../../components/user-chat/user-chat-bottom.vue';
	import userChatList from "../../components/user-chat/user-chat-list.vue"
	
	import time from "../../common/time.js"
	import app from"../../App.vue"
	export default {
		components:{
			userChatBottom,
			userChatList
		},
		data() {
			return {
				list:"",
				
				scrollTop:0, /* 滚动条位置*/
				style:{
					contentH:0,
					itemH:0
				}
			};
		},
		onLoad() {
		
		},
		onReady() {
			this.getdata()
			this.initdata()
			this.pageToBottom(true)  
			
		},
		mounted() {
			
		},  
		updated() {  
			// this.pageToBottom()  
		},
		methods:{
			pageToBottom(isfirst = false){
				let q = uni.createSelectorQuery().in(this)
				let itemH = q.selectAll('.chat-item')
				this.$nextTick(() =>{
					itemH.fields({
						size:true
					},data =>{
						if(data){
							if(isfirst){
								for(let i=0; i<data.length;i++){
									this.style.itemH += data[i].height
								}
							} else{
								this.style.itemH += data[data.length-1].height
							}
							this.scrollTop = (this.style.itemH > this.style.contentH)? this.style.itemH : 0 ;
						}
					}).exec();
				})
				// q.exec((res)=>{
				// 	res[1].forEach((rect)=>{
				// 		this.style.itemH += rect.height
				// 	})
				// 	if (this.style.itemH > this.style.contentH){
				// 		this.scrollTop = this.style.itemH
				// 	}
				// })
			},
			/* 初始化页面参数 */
			initdata(){
				this.style.contentH	= app.globalData.windowHeight - app.globalData.navHeight + 30				
				// #ifdef APP-PLUS
				this.style.contentH	= app.globalData.windowHeight - app.globalData.navHeight - 110	
				// #endif
			},
			getdata(){
				let arr = [
					{
						isme:false,
						userpic:"../../static/8.jpg",
						type:"text",
						data:"hahghah",
						time:"1580708820"
					},
					{
						isme:false,
						userpic:"../../static/8.jpg",
						type:"image",
						data:"../../static/image1.png",
						time:"1580709820"
					},{
						isme:true,
						userpic:"../../static/8.jpg",
						type:"text",
						data:"hahghah",
						time:"1580705220"
					},{
						isme:true,
						userpic:"../../static/8.jpg",
						type:"image",
						data:"../../static/image1.png",
						time:"1580705220"
					},
					{
						isme:true,
						userpic:"../../static/8.jpg",
						type:"image",
						data:"../../static/image1.png",
						time:"1580705220"
					},
					{
						isme:true,
						userpic:"../../static/8.jpg",
						type:"image",
						data:"../../static/image1.png",
						time:"1580705220"
					},
					{
						isme:true,
						userpic:"../../static/8.jpg",
						type:"image",
						data:"../../static/image1.png",
						time:"1580705220"
					},
					{
						isme:true,
						userpic:"../../static/8.jpg",
						type:"image",
						data:"../../static/image1.png",
						time:"1580705220"
					},
					{
						isme:true,
						userpic:"../../static/8.jpg",
						type:"image",
						data:"../../static/image1.png",
						time:"1580705220"
					},
					{
						isme:true,
						userpic:"../../static/8.jpg",
						type:"image",
						data:"../../static/image1.png",
						time:"1580705220"
					},
					{
						isme:true,
						userpic:"../../static/8.jpg",
						type:"image",
						data:"../../static/image1.png",
						time:"1580705220"
					},
					{
						isme:false,
						userpic:"../../static/8.jpg",
						type:"text",
						data:"hahghah",
						time:"1580708820"
					},
					{
						isme:false,
						userpic:"../../static/8.jpg",
						type:"text",
						data:"hahghah",
						time:"1580708820"
					},
					{
						isme:false,
						userpic:"../../static/8.jpg",
						type:"text",
						data:"hahghah",
						time:"1580708820"
					}
				]
				
				for (var i = 0; i < arr.length; i++) {
					arr[i].gstime = time.gettime.getChatTime(arr[i].time,i>0?arr[i-1].time:0)
				}
				this.list = arr
			},
			submit(data){
				/* 发送逻辑 */
				let now = new Date().getTime();
				let obj = {
						isme:true,
						userpic:"../../static/8.jpg",
						type:"text",
						data:data,
						time:now,
						gstime:time.gettime.getChatTime(now, this.list[this.list.length-1].time)
					}
				this.list.push(obj)
				this.pageToBottom()
				console.log("发送数据为", data)
			}
		}
	}
</script> 

<style lang="scss" scoped>

</style>
