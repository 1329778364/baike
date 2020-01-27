<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
			<mini-nav-bar :fixed="true" :border=false :statusBar="true" color="#333333" background-color="#FFFFFF">
				<block slot="left">
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
		 
		 
	</view>
</template>

<script>
	import miniNavBar from '../../components/common/mini-nav-bar.vue';
	export default {
		components:{
			miniNavBar
		},
		data() {
			return {
				inputContent:""
			};
		},
		// #ifdef APP-PLUS
		onNavigationBarButtonTap(e){
			if (e.index == 0){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onNavigationBarSearchInputClicked: () => {
			console.log(e.detail)
		},
		
		onNavigationBarSearchInputConfirmed: () => {
			console.log(e.detail)
		},
		// #endif
		methods:{
			
			confirmInput(){
			console.log("输入的内容是", this.inputContent)
		},
			backToPre(e){
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	
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
