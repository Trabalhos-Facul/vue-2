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
		logs: [],
	},
	methods: {
		abortGame() {
			this.playing = false;
			this.gameFinished = false;
			this.playerLife = 100;
			this.monsterLife = 100;
			this.specialAttachEnable = true;
			this.specialCoolDownCount = 0;
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

			disadvantage = Math.min(disadvantage, disadvantage2)

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
			const fromPlayer = from == 'JOGADOR'

			const newLog = {
				type: 'attack',
				fromPlayer: fromPlayer,
				value: value,
				from: from,
				target: target,
				resultTargetLife: target == 'JOGADOR'? this.playerLife : this.monsterLife
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
				currentLife: this.playerLife
			}
			this.logs.unshift(newLog)
		}
	},
	watch: {
		playerLife(newValue, oldValue) {
			if (newValue <= 0){
				this.playerLife = 0
				this.gameFinished = true
			}else if(newValue > 100) this.playerLife = 100
			if (this.specialCoolDownCount >= this.specialCoolDown) {
				this.specialCoolDownCount = 0
				this.specialAttachEnable = true
			} else if ( newValue <= oldValue) this.specialCoolDownCount++
		},
		monsterLife(newValue) {
			if (newValue <= 0){
				this.monsterLife = 0
				this.gameFinished = true
			}
		},
	},
})