const ADDR_DATA = {
	"status": 0,
	"msg": "",
	"result": {
		"addrList": [
			{
				"id": 00001,
				"prov": "湖南省",
				"city": "长沙市",
				"name": "海文",
				"dist": "开福区",
				"town": "清水塘",
				"street": "清水塘街道迎宾路235号迎宾大厦2301室",
				"phone": "18912345678"
			},
			{
				"id": 00002,
				"prov": "湖南省",
				"city": "长沙市",
				"name": "姜辰",
				"dist": "岳麓区",
				"town": "天顶",
				"street": "麓云南路黄荆小区B38栋1号",
				"phone": "18207420287"
			},
			{
				"id": 00003,
				"prov": "湖南省",
				"city": "长沙市",
				"name": "文泰来",
				"dist": "开福区",
				"town": "清水塘",
				"street": "清水塘街道迎宾路235号迎宾大厦2303室",
				"phone": "18912345678"
			},
			{
				"id": 00004,
				"prov": "湖南省",
				"city": "长沙市",
				"name": "张三",
				"dist": "长沙县",
				"town": "星沙",
				"street": "漓湘路圣力华苑8栋1单元23楼",
				"phone": "13512345678"
			},
			{
				"id": 00005,
				"prov": "湖南省",
				"city": "长沙市",
				"name": "李四",
				"dist": "开福区",
				"town": "东风路",
				"street": "东风路街道砚瓦池社区新二村安置小区2栋",
				"phone": "18912345678"
			},
			{
				"id": 00006,
				"prov": "湖南省",
				"city": "长沙市",
				"name": "王五",
				"dist": "雨花区",
				"town": "环保工业园",
				"street": "正大轻科装备制造有限公司",
				"phone": "18912345678"
			},
			{
				"id": 00006,
				"prov": "湖南省",
				"city": "长沙市",
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

const [provs, cities, dists] = [
	CHINA_REGION.provs,
	CHINA_REGION.cities,
	CHINA_REGION.dists
]
const provNames = provs.map(item => item.name)
const cityNames = cities.map(item => item.name)

Vue.component('addr-selector', {
	template: `
		<div class="addr-selector">
			<select v-model="selectedProv" name="prov">
				<option v-for="item in provs" :value="item">
					{{ item.name }}
				</option>
			</select>
			<select v-model="selectedCity" name="city">
				<option v-for="item in cities" :value="item">
					{{ item.name }}
				</option>
			</select>
			<select v-model="selectedDist" name="dist">
				<option v-for="item in dists" :value="item">
					{{ item.name }}
				</option>
			</select>
			<div>{{ selectedAddr.prov }}-{{ selectedAddr.city }}-{{ selectedAddr.dist }}</div>
		</div>
	`,
	data() {
		return {
			addr: CHINA_REGION,
			selectedProv: 0,
			selectedCity: 0,
			selectedDist: 0,
			provs: CHINA_REGION.provs,
			cities: CHINA_REGION.cities,
			dists: CHINA_REGION.dists
		}
	},
	computed: {
		selectedAddr() {
			return {
				prov: this.selectedProv.name,
				city: this.selectedCity.name,
				dist: this.selectedDist.name
			}
		}
	},
	watch: {
		// 通过监听器实现省市区选择三联动
		selectedProv(newProv, oldProv) {
			if (newProv.prov === '71' || newProv.prov === '81' || newProv === '82') {
				this.cities = [newProv]
				this.dists = [newProv]
			} else {
				this.cities = this.addr.cities.filter(item =>
					item.level === 2 && item.prov && newProv.prov === item.prov)
			}
			this.$nextTick(() => {
				this.selectedCity = this.cities[0]
				this.$emit('input', this.selectedAddr)
			})
		},
		selectedCity(newCity, oldCity) {
			this.dists = this.addr.dists.filter(item =>
				item.level === 3 && item.prov && item.prov === newCity.prov &&
				item.city && newCity.city === item.city && item.name !== '市辖区')
			this.$nextTick(() => {
				this.selectedDist = this.dists[0]
				this.$emit('input', this.selectedAddr)
			})
		},
		selectedDist(newDist, oldDist) {
			this.$nextTick(() => this.$emit('input', this.selectedAddr))
		}
	},
	methods: {

	}
})

const vm = new Vue({
	el: '.container',
	data: {
		stepbar: STEPBAR,
		addrList: ADDR_DATA.result.addrList,
		limitedNum: 4,
		addFlag: false,
		delFlag: false,
		itemToDel: 0,
		// 从地址选择器组件获取的信息对象
		addrInfo: 0,
		street: '',
		zipCode: 0,
		name: '',
		phone: 0,
		telephone: 0,
	},
	computed: {
		addrListShow: function () {
			return this.addrList.slice(0, this.limitedNum)
		},
		itemToAdd: function() {
			return {
				prov: this.addrInfo.prov,
				city: this.addrInfo.city,
				dist: this.addrInfo.dist,
				street: this.street,
				zipCode: this.zipCode,
				name: this.name,
				phone: this.phone,
				telephone: this.telephone
			}
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			this.init()
		})
	},
	methods: {
		init: function () {
			this.addrList.forEach(item =>	this.$set(item, 'isSeted', false))
		},
		showAllAddr: function () {
			this.limitedNum = this.addrList.length
		},
		modifyAddr: function (item) {
			log(`id=${item.id}的地址被修改了`)
		},
		readyDelAddr: function (item) {
			log(`准备删除一个地址`)
			this.delFlag = true
			this.itemToDel = item
		},
		delAddr: function () {
			log(`你删除了一个地址`)
			this.addrList.splice(this.addrList.indexOf(this.itemToDel), 1)
			this.delFlag = false
		},
		readyAddAddr: function () {
			log(`准备添加一个地址`)
			this.addFlag = true
		},
		addAddr: function () {
			log(`你添加了一个地址`)	
			log(this.itemToAdd)
			this.$set(this.itemToAdd, 'isSeted', false)
			this.addrList.push(this.itemToAdd)
			this.showAllAddr()
			this.addFlag = false
		},
		setAddr: function (item) {
			item.isSeted = !item.isSeted
			this.addrList.forEach(_item => {
				if (_item !== item) {
					_item.isSeted = false
				}
			})
		}
	}
})