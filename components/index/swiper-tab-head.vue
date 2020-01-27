<template>
	<view class="uni-tab-bar">
		<scroll-view scroll-x class="uni-swiper-tab">
			<block v-for="(item, index) in tabbars" :key="index">
				<view @click="chooseTab(index)" class="swiper-tab-list" :class="[(tabindex == index)?'active':'']" :id="item.id" >
					{{item.name}}
					<view class="swiper-tab-line"></view>
				</view>
			</block>
		</scroll-view>
	</view>	
</template> 

<script> 
	export default {
		props:{
			tabbars:Array,
			tabindex:Number 
		},
		methods:{
			chooseTab(index){
				this.$emit("tab", index)
			}
		}
	}
</script>

<style>
.uni-swiper-tab{
	border-bottom: 1px solid #EEEEEE;
}
.swiper-tab-list {
	color: #969696;
	font-weight: bold;
}
.uni-tab-bar .active{ 
	color: #343434;
}
/* 在active 执行的情况下载踩会生效 下面的这个样式 */
.active .swiper-tab-line{
	width: 60px;
	margin: auto;
	border-bottom: 4px solid #FEDE33;
}
</style>
