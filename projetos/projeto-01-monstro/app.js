new Vue({
	el: '#app',
	data: {
		gameFinished: false,
		playerLife: 100,
		monsterLife: 100,
		logs: [
			{
				type: 'heal',
				value: 7,
			}
		],
	},
	methods: {
		normalAttack() {
			const maxAttack = 10;
			const monsterAttack = Math.floor(Math.random() * maxAttack)

			let playerAttack = Math.floor(Math.random() * maxAttack)
			const playerAttack2 = Math.floor(Math.random() * maxAttack)

			playerAttack = playerAttack < playerAttack2 ? playerAttack : playerAttack2

			this.playerLife -= monsterAttack
			this.monsterLife -= playerAttack

			this.logAttack('JOGADOR', playerAttack);
			this.logAttack('MONSTRO', monsterAttack);
		},
		logAttack(from, value) {
			const target = from == 'JOGADOR' ? 'MONSTRO' : 'JOGADOR';

			const newLog = {
				type: 'attack',
				fromPlayer: from == 'JOGADOR',
				value: value,
				from: from,
				target: target
			}
			this.logs.push(newLog)
		}
	},
})