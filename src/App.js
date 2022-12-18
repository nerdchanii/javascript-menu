const Controller = require('./controller/controller');

class App {
  constructor() {
    this.controller = new Controller();
  }
  play() {
    this.controller.play();
  }
}

module.exports = App;

const app = new App();
app.play();
