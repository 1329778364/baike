<template>
	<view>
		<mini-nav-bar :fixed="true" :border=false statusBar=true color="#333333" background-color="#FFFFFF" @click-right="navToFabu">
			<view slot="left" class="u-f-ajc qiandao">
				<view class="icon iconfont icon-qiandao" style="font-size: 40rpx; color: #FF9619;" @click="qiandao"></view>
			</view>
			<view class="input-view">
				<view class="icon iconfont icon-sousuo"></view>
				<input disabled=true class="nav-bar-input" type="text" placeholder="搜索" @click="onSearch">
			</view>
			<block slot="right">
				<view class="icon iconfont icon-bianji1 fabu"></view>
			</block>
		</mini-nav-bar>
	</view>
</template>

<script>
	import uniIcons from '../../components/uni-icons/uni-icons.vue'
	import miniNavBar from '../../components/common/mini-nav-bar.vue';
	import uniStatusBar from '../../components/uni-status-bar/uni-status-bar.vue';
	export default {
		components:{
			uniIcons,
			miniNavBar,
			uniStatusBar 
		},
		props:{
			city:String,
			/* 使用的时候只要传入city 数据便可以 */
		},
		methods:{
			qiandao(e){
				this.$emit("qiandao", e)
			},
			navToFabu(e){
				this.$emit("fabu", e) 
			},
			onSearch(e){
				this.$emit("search", e) /* 对外暴露的接口 为search*/
			}
		}
	}
</script> 

<style scoped lang="scss">
	.fabu{
		font-size: 40rpx;
		margin: auto;
	}
	.qiandao{
		font-size: 40rpx;
		margin: auto;
	}
	.uni-nav-bar-text {
		font-size: 30rpx;
	}
	
	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		margin-left: 4px;
	}
	.city view{
		margin: 2px;
	}
	
	.input-view {
		display: flex;
		flex-direction: row;
		width: 100px;
		background-color: #f8f8f8;
		height: 30px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}
	
	.input-uni-icon {
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
