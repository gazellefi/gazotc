<template>
	<div class="container f c_c">
		<!-- <span class="c9">{{$t('message.ComingSoon')}}</span> -->
		<div class="vipNft">
			<div class="methodBox">
				<div class="compoundBtn" @click="compoundOne">合成</div>
				<div class="compoundCondition">消耗{{bnbNum}}BNB</div>
			</div>
			<div class="methodBox">
				<div class="compoundBtn" @click="compoundTwo">合成</div>
				<div class="compoundCondition">消耗{{ANum}}Gaz</div>
			</div>
			<div class="methodBox">
				<div class="compoundBtn" @click="compoundThree">合成</div>
				<div class="compoundCondition">消耗{{bnbNum}}BNB+{{BNum}}Gaz</div>
			</div>
		</div>
	</div>
</template>

<script>
	import config from "@/config";
	import tools from "@/api/public.js";

	var web3, gaznft, address, gaz;
	export default {
		data() {
			return {
				bnbNum: '',
				ANum: '',
				BNum: '',
				imgName: '',
				bnbContract: '',
				gazDecimals: ''
			}
		},
		mounted() {
			tools.testMASK().then((res) => {
				let {
					web,
					id
				} = res;
				address = id;
				web3 = web;
				gaznft = new web3.eth.Contract(
					config["hyue"][config["key"]]["gaznft"]["abi"],
					config["hyue"][config["key"]]["gaznft"]["heyue"]
				);
				gaz = new web3.eth.Contract(
					config["hyue"][config["key"]]["gaz"]["abi"],
					config["hyue"][config["key"]]["gaz"]["heyue"]
				);
				this.getGaz();
				this.getPayData();
			});
		},
		methods: {
			getPayData() {
				gaznft.methods.bnbNum()
					.call((err, ret) => {
						this.bnbNum = ret / 10 ** 18,
							this.bnbContract = ret
					});
				gaznft.methods.ANum()
					.call((err, ret) => {
						this.ANum = ret / (10 ** this.gazDecimals)
					});
				gaznft.methods.BNum()
					.call((err, ret) => {
						this.BNum = ret / (10 ** this.gazDecimals)
					});
			},
			getGaz() {
				gaz.methods.decimals().call((err, ret) => {
					this.gazDecimals = ret;
				})
			},
			compoundOne() {
				gaznft.methods.bnbMint(address, "")
					.send({
						from: address,
						value: this.bnbContract
					}, (err, ret) => {
						console.log(err)
						console.log(ret)
					})
			},
			compoundTwo() {
				gaz.methods.allowance(address, config["hyue"][config["key"]]["gaznft"]["heyue"])
					.call((err, ret) => {
						let decimalsNum = 0;
						decimalsNum = ret / 10 ** this.gazDecimals
						console.log(decimalsNum, this.ANum)
						if (decimalsNum >= this.ANum) {
							console.log(111)
							// gaznft.methods.
						} else {
							console.log(String(this.ANum * 10 ** this.gazDecimals))
							gaz.methods
								.approve(config["hyue"][config["key"]]["gaznft"]["heyue"], String(this.ANum * 10 **
									this.gazDecimals))
								.send({
									from: address
								}, (e, r) => {
									console.log(r)
								})
						}
					})
			},
			compoundThree() {
				gaz.methods.allowance(address, config["hyue"][config["key"]]["gaznft"]["heyue"])
					.call((err, ret) => {
						let decimalsNum = 0;
						decimalsNum = ret / 10 ** this.gazDecimals
						console.log(decimalsNum, this.BNum)
						if (decimalsNum >= this.BNum) {
							console.log(111)
							// gaznft.methods.
						} else {
							console.log(String(this.BNum * 10 ** this.gazDecimals))
							gaz.methods
								.approve(config["hyue"][config["key"]]["gaznft"]["heyue"], String(this.BNum * 10 **
									this.gazDecimals))
								.send({
									from: address
								}, (e, r) => {
									console.log(r)
								})
						}
					})

			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.container {
		font-size: 18px;
		font-weight: bolder;
		padding-top: 30px;
	}

	.vipNft {
		width: 100%;
	}

	.methodBox {
		display: flex;
		font-size: 20px;
		align-items: center;

		.compoundBtn {
			background: #5775E6FF;
			padding: 20px;
			color: #fff;
			width: 155px;
			text-align: center;
			border-radius: 10px;
			margin: 5px;
		}
	}
</style>
