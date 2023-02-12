new Vue({
	el: '#app',
	data: {
		playing: false,
		gameFinished: false,
		playerLife: 100,
		monsterLife: 100,
		specialAttachEnable: true,
		specialCoolDown: 3,
		specialCoolDownCount: 0,
		round: 0,
		logs: [],
	},
	methods: {
		abortGame() {
			this.playing = false;
			this.gameFinished = false;
			this.playerLife = 100;
			this.monsterLife = 100;
			this.logs = [];
			this.round = 0;

			this.playing = false;
		},
		attack(mode) {
			if (mode == 'special') this.specialAttachEnable = false;
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

			this.round++
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

			this.playerLife += healPoints
			this.logHeal(healPoints)

			this.playerLife -= monsterAttack
			this.logAttack('MONSTRO', monsterAttack);

			this.round++
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
			if (newValue <= 0){ this.gameFinished = true
			}else if(newValue > 100) this.playerLife = 100
		},
		monsterLife(newValue) {
			if (newValue <= 0){
				this.monsterLife = 0
				this.gameFinished = true
			}
		},
		round(){
			if (this.specialCoolDownCount == this.specialCoolDown) {
				this.specialCoolDownCount = 0
				this.specialAttachEnable = true
			} else this.specialCoolDownCount++
		}
	},
})