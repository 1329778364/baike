<template>
	<view>
		<view class="topic-news border-box" >
			<view class="font-size-middle u-f-ac u-f-jsb">
				最近更新
			</view>
			<block v-for="(item,index) in news" :key="index" >
				<topic-list :item="item" :index="index" @tap="navToDetail(item)"></topic-list>
			</block>
		</view>
	</view>
</template>

<script>
	import topicList from "./topic-list.vue"
	export default {
		components:{
			topicList
		},
		props:{
			news:Array,
			index:Number
		},
		data() {
			return {
				
			};
		},
		
		methods:{
			navToDetail(res){
				uni.navigateTo({
					url: '../../pages/topic-detail/topic-detail?topicDetail='+JSON.stringify(res)
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
