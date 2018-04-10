const log = console.log.bind(console)
const ADDR_DATA = {
	"status": 0,
	"msg": "",
	"result": {
		"addrList": [
			{
				"id": 00001,
				"prov": "湖南",
				"city": "长沙",
				"name": "海文",
				"dist": "开福",
				"town": "清水塘",
				"street": "清水塘街道迎宾路235号迎宾大厦2301室",
				"phone": "18912345678"
			},
			{
				"id": 00002,
				"prov": "湖南",
				"city": "长沙",
				"name": "海文",
				"dist": "开福",
				"town": "清水塘",
				"street": "清水塘街道迎宾路235号迎宾大厦2302室",
				"phone": "18912345678"
			},
			{
				"id": 00003,
				"prov": "湖南",
				"city": "长沙",
				"name": "海文",
				"dist": "开福",
				"town": "清水塘",
				"street": "清水塘街道迎宾路235号迎宾大厦2303室",
				"phone": "18912345678"
			},
			{
				"id": 00004,
				"prov": "湖南",
				"city": "长沙",
				"name": "海文",
				"dist": "开福",
				"town": "清水塘",
				"street": "清水塘街道迎宾路235号迎宾大厦2304室",
				"phone": "18912345678"
			},
			{
				"id": 00005,
				"prov": "湖南",
				"city": "长沙",
				"name": "海文",
				"dist": "开福",
				"town": "清水塘",
				"street": "清水塘街道迎宾路235号迎宾大厦2305室",
				"phone": "18912345678"
			},
			{
				"id": 00006,
				"prov": "湖南",
				"city": "长沙",
				"name": "海文",
				"dist": "开福",
				"town": "清水塘",
				"street": "清水塘街道迎宾路235号迎宾大厦2306室",
				"phone": "18912345678"
			},
			{
				"id": 00006,
				"prov": "湖南",
				"city": "长沙",
				"name": "海文",
				"dist": "开福",
				"town": "清水塘",
				"street": "清水塘街道迎宾路235号迎宾大厦2307室",
				"phone": "18912345678"
			}
		]
	}
}
const STEPBAR = [
	{
		no: 1,
		name: '查看购物车'
	},
	{
		no: 2,
		name: '拍下商品'
	},
	{
		no: 3,
		name: '付款到支付宝'
	},
	{
		no: 4,
		name: '确认收货'
	},
	{
		no: 5,
		name: '评价'
	}
]
const vm = new Vue({
	el: '.container',
	data: {
		stepbar: STEPBAR,
		addrList: ADDR_DATA.result.addrList,
		limitedNum: 4
	},
	computed: {
		addrListShow: function() {
			return this.addrList.slice(0, this.limitedNum)
		}
	},
	mounted: function() {
		this.$nextTick(function() {
		})
	},
	methods: {
		showAllAddr: function() {
			this.limitedNum = this.addrList.length
		},
		modifyAddr: function(item) {
			log(`id=${item.id}的地址被修改了`)
		},
		addAddr: function() {
			log(`你添加了一个地址`)
		}
	}
})