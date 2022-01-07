<template>
	<div class="fc a_c">
		<div class="f a_c c_c" style="height: 315px;margin-top: 3.75rem;width: 100%;">
			<el-carousel :autoplay="false"  arrow="nerver"  indicator-position="none" height="100%">
			  <el-carousel-item style="position:relative">
			    <img src="../../assets/img/giphy.gif" alt="" style="width:100%;">
			  </el-carousel-item>
			</el-carousel>
		</div>
		<el-row class="rule_content">
			<el-col :sm="24" :md="24">
				<el-collapse v-model="activeName" accordion>
				  <el-collapse-item :title="$t('message.dapp.TransactionRules')" name="1">
					<div class="list">
					  <div class="listItem" v-for="(v,i) in langList">
						{{ $t(`message.dapp.`+v)}}
					  </div>
					</div>
				  </el-collapse-item>
				  <el-collapse-item :title="$t('message.dapp.MarginRules')" name="2">
					<div class="list">
					  <div class="listItem" v-for="(v,i) in langList1">
						{{ $t(`message.dapp.`+v)}}
					  </div>
					</div>
				  </el-collapse-item>
				  <el-collapse-item :title="$t('message.dapp.QualificationArbitrators')" name="3">
					<div class="list">
					  <div class="listItem" v-for="(v,i) in langList2">
						{{ $t(`message.dapp.`+v)}}
					  </div>
					</div>
				  </el-collapse-item>
				  <el-collapse-item :title="$t('message.dapp.firstRules')" name="4">
					<div class="list">
					  <div class="listItem" v-for="(v,i) in langList3">
						{{ $t(`message.dapp.`+v)}}
					  </div>
					</div>
				  </el-collapse-item>
				  <el-collapse-item :title="$t('message.dapp.twoRules')" name="5">
					  <div class="list">
						<div class="listItem" v-for="(v,i) in langList4">
						  {{ $t(`message.dapp.`+v)}}
						</div>
					  </div>
				  </el-collapse-item>
				</el-collapse>
			</el-col>
		</el-row>
			<!-- <div class="in_nav">
				
			</div> -->
	</div>
</template>

<script>
	export default{
		data(){
			return{
				langList: [
				  'transactionRules1',
				  'transactionRules2',
				  'transactionRules3',
				  'transactionRules4',
				  'transactionRules5',
				  'transactionRules6',
				  'transactionRules7',
				  'transactionRules8',
				  'transactionRules9',
				  'transactionRules10',
				  'transactionRules11',
				  'transactionRules12',
				  'transactionRules13',
				  'transactionRules14',
				  'transactionRules15',
				  'transactionRules16',
				],
				langList1: [
				  'marginRules1',
				  'marginRules2',
				  'marginRules3',
				  'marginRules4',
				  'marginRules5',
				],
				langList2: [
				  'rulesOfArbitratorsOne1',
				  'rulesOfArbitratorsOne2',
				  'rulesOfArbitratorsOne3',
				  'rulesOfArbitratorsOne4',
				  'rulesOfArbitratorsOne5',
				  'rulesOfArbitratorsOne6',
				  'rulesOfArbitratorsOne7',
				  'rulesOfArbitratorsOne8',
				  'rulesOfArbitratorsOne9',
				],
				langList3: [
				  'rulesOfArbitratorsTwo1',
				  'rulesOfArbitratorsTwo2',
				  'rulesOfArbitratorsTwo3',
				  'rulesOfArbitratorsTwo4',
				  'rulesOfArbitratorsTwo5',
				  'rulesOfArbitratorsTwo6',
				  'rulesOfArbitratorsTwo7',
				  'rulesOfArbitratorsTwo8',
				  'rulesOfArbitratorsTwo9',
				  'rulesOfArbitratorsTwo10',
				  'rulesOfArbitratorsTwo11',
				  'rulesOfArbitratorsTwo12',
				  'rulesOfArbitratorsTwo13',
				  'rulesOfArbitratorsTwo14',
				  'rulesOfArbitratorsTwo15',
				  'rulesOfArbitratorsTwo16',
				],
				langList4: [
				  'rulesOfArbitratorsThr1',
				  'rulesOfArbitratorsThr2',
				  'rulesOfArbitratorsThr3',
				  'rulesOfArbitratorsThr4',
				  'rulesOfArbitratorsThr5',
				  'rulesOfArbitratorsThr6',
				  'rulesOfArbitratorsThr7',
				  'rulesOfArbitratorsThr8',
				  'rulesOfArbitratorsThr9',
				  'rulesOfArbitratorsThr10',
				  'rulesOfArbitratorsThr11',
				  'rulesOfArbitratorsThr12',
				  'rulesOfArbitratorsThr13',
				  'rulesOfArbitratorsThr14',
				  'rulesOfArbitratorsThr15',
				  'rulesOfArbitratorsThr16',
				],
				activeName: '0'
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	/deep/.el-carousel__arrow{
		opacity: 0;
	}
	.rule_content{
		width: 100%;
		max-width: 1200px;
		display: flex;flex-direction: column;
		align-items: center;
		min-height: 450px;
		padding: 0 30px;
		margin-top: 50px;
		.in_nav{
			width: 50%;
		}
	}
	div{
		/deep/ .el-collapse-item__header{
				// color: #4451fa;
				// background: linear-gradient(to left, #09deea, #4451fa);
				padding: 15px 0;
				text-align: center;
				border-radius: 5px;
				font-size: 18px;
				font-weight: bolder;
			}
	}
	.list{
		.listItem {
		  padding: 15px 0;
		  color: #333;
		  border-bottom: 1px dotted #ccc;
		  font-size: 14px;
		  &:hover{
				color: red;
				font-weight: bolder;
		  }
		}
	}
	@media screen and (max-width:991px) {
		.a_c{
			margin-top: 0px !important;
		}
	}
	
</style>
