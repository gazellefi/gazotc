import abr from "@/abi/mine/abrMine.json"
import ord from "@/abi/mine/ordMine.json"
import tra from "@/abi/mine/tra.json"
import pool from "@/abi/mine/pool.json"

var a = [
	{
		contract: '0x9d6E88C9db314714f2385bA720f58e3C32511198',
		id: 'abr',
		abi: abr
	},
	{
		contract: '0xf9fb937645aFb0E9Db588847CBfD83C1bE9e9511',
		id: 'ord',
		abi: ord
	},
	{
		contract: '0xb1063268CE4642b9DDBf4D0661f75BEF7C650209',
		id: 'tra',
		abi: tra
	},
	{
		contract: '0xE05F1Bd0bb5Bfe3ba4037Bad5B0A274382a97cDc',
		id: 'pool',
		abi: pool
	}
]

export default a