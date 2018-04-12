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
new Vue({
	el: '#app',
	data: {
		addrInfo: ''
	},
	methods: {

	}
})