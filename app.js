new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame() {
      this.turns = [];
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack() {
      this.playerAttacks(3, 10);

      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();
    },
    specialAttack() {
      this.playerAttacks(10, 20);

      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10
      } else {
        this.playerHealth = 100;
      }

      this.logPlayerTurn('Player heals for 10');

      this.monsterAttacks();
    },
    giveUp() {
      this.gameIsRunning = false;
    },

    // Internal methods
    logPlayerTurn(text) {
      this.turns.unshift({
        isPlayer: true,
        text,
      });
    },
    playerAttacks(min, max) {
      let damage = this.calculateDamage(min, max);
      this.monsterHealth -= damage;

      this.logPlayerTurn(`Player hits Monster hard for ${damage}`);
    },
    monsterAttacks() {
      let damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;

      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage}`
      });

      this.checkWin();
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game?')) {
          this.startGame();
        }

        this.gameIsRunning = false;
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! New Game?')) {
          this.startGame();
        }

        this.gameIsRunning = false;
        return true;
      }

      return false;
    }
  }
})
