<template>
	<view>
		<view @tap="clickevent" class="list-item border-bottom-gray u-f-ac u-f-jsb" hover-class="hover-color-gray">
			<view class="u-f">					
				<view v-if="item.icon" class="icon-margin-right icon iconfont" :class="['icon-'+ item.icon]"></view>
				{{item.name}}
			</view>
				<view class="icon iconfont icon-fontsize-lg font-color-gray" :class="{'icon-jinru':!item.data}">{{item.data||''}}</view>
		</view> 
	</view>
</template>
 
<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		
		data() {
			return {
				
			};
		},
		methods:{
			clickevent(){
				console.log("进入")
				switch (this.item.clicktype){
					case "navigateTo":
						if(this.item.url){uni.navigateTo({url: this.item.url})}
						break;
					case "clear":
						uni.showModal({
							title: '提示',
							content: '是否清除缓存',
							showCancel: false,
							cancelText: '',
							confirmText: '立即清除',
							success: res => {
								if(res.confirm){
									uni.clearStorage()
									this.User.logout(false)
									uni.showToast({
										title: '清除缓存成功!'
									});
								}
							}
						});
						break;
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
