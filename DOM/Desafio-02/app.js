new Vue({
	el: '#desafio',
	data: {
		valor: ''
	},
	methods: {
		onAlertCicked(){
			alert('hahahaha');
		},
		getInput(event){
			this.valor = event.target.value;
		}
	}
})