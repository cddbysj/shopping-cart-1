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
				"name": "姜辰",
				"dist": "岳麓",
				"town": "天顶",
				"street": "麓云南路黄荆小区B38栋1号",
				"phone": "18207420287"
			},
			{
				"id": 00003,
				"prov": "湖南",
				"city": "长沙",
				"name": "文泰来",
				"dist": "开福",
				"town": "清水塘",
				"street": "清水塘街道迎宾路235号迎宾大厦2303室",
				"phone": "18912345678"
			},
			{
				"id": 00004,
				"prov": "湖南",
				"city": "长沙",
				"name": "张三",
				"dist": "长沙县",
				"town": "星沙",
				"street": "漓湘路圣力华苑8栋1单元23楼",
				"phone": "13512345678"
			},
			{
				"id": 00005,
				"prov": "湖南",
				"city": "长沙",
				"name": "李四",
				"dist": "开福",
				"town": "东风路",
				"street": "东风路街道砚瓦池社区新二村安置小区2栋",
				"phone": "18912345678"
			},
			{
				"id": 00006,
				"prov": "湖南",
				"city": "长沙",
				"name": "王五",
				"dist": "雨花",
				"town": "环保工业园",
				"street": "正大轻科装备制造有限公司",
				"phone": "18912345678"
			},
			{
				"id": 00006,
				"prov": "湖南",
				"city": "长沙",
				"name": "赵六",
				"dist": "长沙县",
				"town": "榔梨镇",
				"street": "土岭社区八字槽门",
				"phone": "13601010202"
			}
		]
	}
}
const STEPBAR = [
	{
		no: '',
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
const REGIONS = [
	{
		"id": 0,
		"name": "请选择"
	},
	{
		"id": 1,
		"name": "中国大陆"
	},
	{
		"id": 2,
		"name": "港澳"
	},
	{
		"id": 3,
		"name": "台湾"
	},
	{
		"id": 4,
		"name": "马来西亚"
	},
	{
		"id": 5,
		"name": "其他地区"
	}
]
const vm = new Vue({
	el: '.container',
	data: {
		stepbar: STEPBAR,
		addrList: ADDR_DATA.result.addrList,
		regionList: REGIONS,
		limitedNum: 4,
		addFlag: false,
		delFlag: false,
		itemToAdd: null,
		itemToDel: null,
	},
	computed: {
		addrListShow: function() {
			return this.addrList.slice(0, this.limitedNum)
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			this.init()
		})
	},
	methods: {
		init: function() {
			this.addrList.forEach(item =>	this.$set(item, 'isSeted', false))
		},
		showAllAddr: function() {
			this.limitedNum = this.addrList.length
		},
		modifyAddr: function(item) {
			log(`id=${item.id}的地址被修改了`)
		},
		readyDelAddr: function(item) {
			log(`准备删除一个地址`)
			this.delFlag = true
			this.itemToDel = item
		},
		delAddr: function() {
			log(`你删除了一个地址`)
			this.addrList.splice(this.addrList.indexOf(this.itemToDel), 1)
			this.delFlag = false
		},
		readyAddAddr: function() {
			log(`准备添加一个地址`)
			this.addFlag = true
		},
		addAddr: function() {
			log(`你添加了一个地址`)
			this.addrList.push(item)
		},
		setAddr: function(item) {
			item.isSeted = !item.isSeted
			this.addrList.forEach(_item => {
				if (_item !== item) {
					_item.isSeted = false
				}
			})
		}
	}
})