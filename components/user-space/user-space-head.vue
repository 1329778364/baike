<template>
	<view class="page u-f-ajc u-f-dc">
		<image class="image-head" :src="getBgImg" mode="aspectFill" @tap="changeImg"></image>
		<view class="head-info  u-f-dc u-f-ajc">
			<image class="avatar-big avatar-circle" style="margin-right: 0;" :src="userinfo.userpic" mode="widthFix"></image>
			<view class="u-f-ajc margin-box">
				<view class="font-size-lg uni-bold  font-color-white">{{userinfo.username}} </view>
				<tag-sex-age :age="userinfo.age" :sex="userinfo.sex" ></tag-sex-age>
			</view>
			<view @tap="guanzhu" class="icon iconfont margin-box border-gray font-size-middle" :class="!isguanzhu?'bgc-yellow icon-zengjia':'font-color-white'">{{!isguanzhu?'关注':'已关注'}}</view>
		</view>
	</view>
</template>

<script>
	import tagSexAge from "../../components/common/tag-sex-age.vue"
	export default {
		props:{
			userinfo:Object
		},
		components:{
			tagSexAge
		},
		computed:{
			getBgImg(){
				return "../../static/bgimg/"+this.bgimg+".jpg"
			}
		},
		data() {
			return {
				isguanzhu:this.userinfo.isguanzhu,
				bgimg:this.userinfo.bgimg
			};
		},
		methods:{
			changeImg(){
				let num = parseInt(this.bgimg)
				this.bgimg = num < 4 ? ++num : 1
			},
			guanzhu(){
				this.isguanzhu = !this.isguanzhu
			}
		}
	}
</script>

<style lang="scss" scoped>
.image-head{
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	width: 100%;
}

.head-info{
	width: 40%;
	position: relative;
}

</style>
