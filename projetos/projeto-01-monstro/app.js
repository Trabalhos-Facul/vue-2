new Vue({
	el: '#app',
	data: {
		playing: false,
		gameFinished: false,
		playerLife: 100,
		monsterLife: 100,
		logs: [],
	},
	methods: {
		abortGame() {
			this.playing = false;
			this.gameFinished = false;
			this.playerLife = 100;
			this.monsterLife = 100;
			this.logs = [];

			this.playing = false;
		},
		attack(mode) {
			const maxAttack = 10;
			const normalAttack = Math.floor(Math.random() * maxAttack)

			let disadvantage = Math.floor(Math.random() * maxAttack)
			const disadvantage2 = Math.floor(Math.random() * maxAttack)

			disadvantage = disadvantage < disadvantage2 ? disadvantage : disadvantage2

			const playerAttack = mode == 'normal' ? disadvantage : normalAttack;
			const monsterAttack = mode == 'normal' ? normalAttack : disadvantage;

			this.monsterLife -= playerAttack
			this.logAttack('JOGADOR', playerAttack);

			this.playerLife -= monsterAttack
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
			this.logs.unshift(newLog)
		},
		heal() {
			const maxPoints = 10;
			const monsterAttack = Math.floor(Math.random() * maxPoints)

			let healPoints = Math.floor(Math.random() * maxPoints)
			const healPoints2 = Math.floor(Math.random() * maxPoints)

			healPoints = healPoints > healPoints2 ? healPoints : healPoints2;

			this.playerLife += healPoints
			this.logHeal(healPoints)

			this.playerLife -= monsterAttack
			this.logAttack('MONSTRO', monsterAttack);
		},
		logHeal(value) {
			const newLog = {
				type: 'heal',
				value: value,
			}
			this.logs.unshift(newLog)
		}
	},
	watch: {
		playerLife(newValue) {
			if (newValue <= 0) this.gameFinished = true
		},
		monsterLife(newValue) {
			if (newValue <= 0) this.gameFinished = true
		}
	},
})