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

// 地址选择器组件
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
		</div>
	`,
	data() {
		return {
			addr: {},
			selectedProv: 0,
			selectedCity: 0,
			selectedDist: 0,
			provs: 0,
			cities: 0,
			dists: 0
		}
	},
	props: {
		// 从父组件传递过来的数据
		usrProvName: [String]
	},
	created() {
		log(`收货地址编辑窗口实例开始创建`)
		log(`用户提前选择的默认省份:${this.usrProvName}`)
		log(`this.usrProv = ${this.usrProv}`)
		// 在触发DOM操作之前载入省市区数据
		this.loadChineseRegion()
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
		// 通过侦听器实现省市区选择三联动
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
		loadChineseRegion() {
			log(`开始载入中国省市区数据`)
			axios.get('data/chineseRegion.json')
				.then(response => {
					log(`成功载入中国省市区数据`)
					let json = response.data.result.chineseRegion
					let formate = this.jsonProcessor(json)

					this.provs = this.addr.provs = formate.provs
					this.cities = this.addr.cities = formate.cities
					this.dists = this.addr.dists = formate.dists

					// 默认选中的省级区域
					this.setDefProv()
				})
				.catch(error => log(error))
		},
		// 对中国省市区的json数据进行处理转化
		jsonProcessor(data) {
			log(`开始对中国省市区的json数据进行处理`)
			return {
				provs: data.filter(item => item.level === 1),
				cities: data.filter(item => item.level === 2),
				dists: data.filter(item => item.level === 3)
			}
		},
		// 设置默认选中的省级地区
		setDefProv() {
			log(`开始设置默认省份`)
			this.provs.forEach(item => log(item.name))
			let p = this.provs.filter(item =>
				item.name == this.usrProvName && item.level === 1)[0]
			log('p = ' + p)
			this.selectedProv = p
		}
	}
})

const vm = new Vue({
	el: '.container',
	data: {
		stepbar: STEPBAR,
		usrAddrs: '',
		limitedNum: 4,
		addFlag: false,
		delFlag: false,
		itemToDel: '',
		// 通过地址位置权限获取的用户所在省份
		// 用来设置地址选择器的默认选中省份
		// 这里暂时先硬编码设置为湖南
		usrProv: '湖南省',
		addrInfo: '',// 从地址选择器组件获取到的地址信息对象
		street: '',
		zipCode: '',
		name: '',
		phone: '',
		telephone: '',
	},
	computed: {
		usrAddrsShow: function () {
			return this.usrAddrs.slice(0, this.limitedNum)
		},
		itemToAdd: function () {
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
	created: function () {
		log(`页面实例开始创建`)
		// 在触发DOM操作并渲染页面之前
		// 载入用户之前已经添加好的地址信息
		this.loadUsrAddr()
	},
	mounted: function () {

	},
	methods: {
		init: function () {
			// Vue不能检测在vue实例化之后
			// 添加到data中某一对象的属性
			// 使用$set API可以让Vue检测到这一属性并保持响应性
			this.usrAddrs.forEach(item =>	this.$set(item, 'isSeted', false))
		},
		loadUsrAddr() {
			log(`开始载入用户收货地址数据`)
			axios.get('data/usrAddrs.json')
				.then(response => {
					log(`成功载入用户收货地址数据`)
					this.usrAddrs = response.data.result.usrAddrs
					// 这里需要注意
					// 确保在异步获取用户收货地址成功之后再添加属性
					this.init()
				})
				.catch(error => log(`载入用户收货地址数据失败：${error}`))
		},
		showAllAddr: function () {
			this.limitedNum = this.usrAddrs.length
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
			this.usrAddrs.splice(this.usrAddrs.indexOf(this.itemToDel), 1)
			// 这里还有一步未完成
			// 删除地址之后需要发送新的地址信息到后台

			this.delFlag = false
		},
		readyAddAddr: function () {
			log(`准备添加一个地址`)
			this.addFlag = true
		},
		addAddr: function () {
			log(`开始添加一个地址`)
			log(this.itemToAdd)
			// 验证用户输入的地址信息
			this.validateAddr()
			this.$set(this.itemToAdd, 'isSeted', false)
			this.usrAddrs.push(this.itemToAdd)
			// 这里还有一步未完成
			// 添加地址之后需要发送新的地址信息到后台
			axios.post('data/usrAddrs.json', this.itemToAdd)
				.then(response => log(`成功发送添加的地址信息到后台:${response}`))
				.catch(error => log(`发送添加的地址信息到后台失败:${error}`))
			this.showAllAddr()
			this.addFlag = false
		},
		// 收货地址的输入表单验证
		validateAddr: function () {
			log(`开始验证添加的地址信息`)
		},
		// 将用户输入的地址信息对象进行转换和格式化
		// 以适当的格式保存在后台用户数据文件usrAddrs.json
		// 这一步不知道在前端还是在后端实现更合适？
		transformAddr: function (item) {
			return 0
		},
		setAddr: function (item) {
			item.isSeted = !item.isSeted
			this.usrAddrs.forEach(_item => {
				if (_item !== item) {
					_item.isSeted = false
				}
			})
		}
	}
})