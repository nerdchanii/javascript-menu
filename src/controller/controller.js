const Coach = require('../model/Coach');
const Service = require('../services/index');
const View = require('../View/View');
class Controller {
  constructor() {
    this.service = new Service();
    this.view = new View();
  }

  play() {
  }

}

module.exports = Controller;
