new Vue({
	el: '#app',
	data: {
		logs: [
			{
				type: 'attack',
				fromPlayer: false,
				value: 11,
				from: 'MONSTRO',
				target:'JOGADOR',
			},
			{
				type: 'attack',
				fromPlayer: true,
				value: 9,
				from:'JOGADOR',
				targer: 'MONSTRO',
			},
			{
				type: 'heal',
				value: 7,
			}
		],
	}
})