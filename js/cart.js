new Vue({
	el: '#app',
	data: {
		productList: [],
		checkAllFlag: false,
		delFlag: false,
		batchDelFlag: false,
		itemToDel: null,
	},
	computed: {
		totalMoney: function() {
			let sum = 0
			this.productList.forEach(item => sum += item.checked?
					item.productPrice * item.productQuantity : 0
			)
			return sum
		},
		checkedItemNum: function() {
			let n = 0
			this.productList.forEach(item => {
				if (item.checked) {
					n++
				}
			})
			return n
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			this.fetchData()
		})
	},
	filters: {
		chineseYuan: function(value) {
			return '¥' + value.toFixed(2)
		}
	},
	methods: {
		fetchData: function() {
			axios.get('data/usrProducts.json')
				.then(response => {
					this.productList = response.data.result.productList
					this.init()
				})
				.catch(error => log(error))
		},
		// 在获取到数据后初始化，避免存在未注册的属性
		init: function() {
			this.productList.forEach(item => {
				if (typeof item.checked === 'undefined') {
					this.$set(item, 'checked', false)
				}
				if (typeof item.showFlag === 'undefined') {
					this.$set(item, 'showFlag', false)
				}
			})
		},
		// 选中商品
		checkItem: function(item) {
			item.checked = !item.checked
			// 判断是否全选
			let flag = true
			this.productList.forEach(item => {
				if (!item.checked) {
					flag = false
				}
			})
			this.checkAllFlag = flag
		},
		// 增加和减少商品数量
		changeQuantity: function(item, flag) {
			if (flag < 0) {
				item.productQuantity--
				if (item.productQuantity < 2) {
					item.productQuantity = 1
				}
			} else {
				item.productQuantity++
				if (item.productQuantity > 99) {
					item.productQuantity = 99
				}
			}
		},
		// 确认删除该商品
		readyDelItem: function(item) {
			this.delFlag = true
			this.itemToDel = item
		},
		// 删除商品
		delItem: function(item) {
			this.productList.splice(this.productList.indexOf(item), 1)
			this.delFlag = false
		},
		// 确认批量删除商品
		readyBatchDel: function() {
			this.batchDelFlag = true
		},
		// 批量删除商品
		batchDel: function() {
			for (var i = 0; i < this.productList.length; i++) {
				let item = this.productList[i]
				if (item.checked) {
					this.productList.splice(this.productList.indexOf(item), 1)
					// 注意：在for循环内使用数组splice方法的坑
					// splice方法改变了原数组
					i--
				}
			}
			this.batchDelFlag = false
		},
		// 全选商品
		checkAll: function() {
			this.checkAllFlag = !this.checkAllFlag
			this.productList.forEach(item =>
				item.checked = this.checkAllFlag)
		}
	}
})