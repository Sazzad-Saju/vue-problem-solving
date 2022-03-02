new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        healthDifference: 0,
        turns: []
    },
    computed: {
        // when negative make bar red
        monsterHealthbar() {
            if (this.monsterHealth <= 0) {
                return 'red'
            } else {
                return 'green'
            }
        },
        playerHealthbar() {
            if (this.playerHealth <= 0) {
                return 'red'
            } else {
                return 'green'
            }
        },
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.isGameRunning = true;
            this.turns = [];
        },
        attack() {
            // Player Attack
            var damage = this.calculateRandomFactor(3, 10)
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            })
            if (this.checkWin()) {
                return
            }
            // Monster Attack
            var damage = this.calculateRandomFactor(5, 12)
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            })
            this.checkWin()
            this.healthDifference = Math.abs(this.monsterHealth - this.playerHealth)
                // console.log(this.healthDifference)
        },
        specialAttack() {
            if (this.healthDifference >= 7 && this.healthDifference <= 17) {
                damage = this.calculateRandomFactor(7, 17)
                this.monsterHealth -= damage
                this.healthDifference = 0;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player hard hits Monster for ' + damage + ' ☠'
                })
                if (this.checkWin()) {
                    return
                }
            }
        },
        heal() {
            if (this.playerHealth < 90 && this.healthDifference >= 7 && this.healthDifference <= 17) {
                healing = this.calculateRandomFactor(7, 17);
                this.playerHealth += healing;
                this.healthDifference = 0;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player heals for +' + healing + ' 🖤'
                })
            }
        },
        giveUp() {
            this.isGameRunning = false
            alert('Game Over!')
        },
        calculateRandomFactor(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                if (confirm('You Won! New Game?')) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You Lost! New Game?')) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});