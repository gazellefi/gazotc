<template>
	<div class="container f c_c">
		<!-- <span class="c9">{{$t('message.ComingSoon')}}</span> -->
		<div class="myNft">
			<div class="list">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="id" label="编号" width="180">
					</el-table-column>
					<el-table-column prop="token" label="NFTid" width="180">
					</el-table-column>
					<el-table-column prop="imgUrl" label="头像">
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	import config from "@/config";
	import tools from "@/api/public.js";

	var web3, gaznft, address;
	export default {
		data() {
			return {
				tableData: [],
				nftNum: 0,
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
				this.getGroupId();
			});
		},
		methods: {
			getGroupId() {
				gaznft.methods.balanceOf(address)
					.call((err, ret) => {
						this.nftNum = ret;
						this.getGroupToken();
					})
			},
			getGroupToken() {
				for (let i = 1; i <= this.nftNum; i++) {
					gaznft.methods.ownerId(address, i)
						.call((err, ret) => {
							this.getGroupImg(ret, i)
						})
				}
			},
			getGroupImg(e, index) {
				gaznft.methods.tokenIma(e)
					.call((err, ret) => {
						this.tableData.push({
							id: index,
							token: e,
							imgUrl: ret
						})
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
	.myNft{
		width: 100%;
	}
</style>
