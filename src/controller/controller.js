const Coach = require('../model/Coach');
const Service = require('../services/index');
const View = require('../View/View');
class Controller {
  constructor() {
    this.service = new Service();
    this.view = new View();
  }

  play() {
    this.view.showServiceStart();
    this.view.getCoachNames((coachNames) => {
      coachNames.forEach((coach) => {
        this.service.addCoach(new Coach(coach));
      });
      this.getHateFood();
    });
  }

  getHateFood(coachIndex = 0) {
    if (coachIndex === this.service.coaches.length) return  this.generateWeeklyRecommend();
    const coach = this.service.coaches[coachIndex];
    this.view.getHateFood(coach.name, (hates) => {
      coach.addHate(hates);
      this.getHateFood(coachIndex + 1);
    });
  }

  generateWeeklyRecommend() {
    const [days, categories, coaches] = this.service.getWeeklyRecommend();
    this.showWeeklyRecommend(days, categories, coaches);
  }

  showWeeklyRecommend(days, categories, coaches) {
    this.view.showWeeklyRecommend(days, categories, coaches);
  }
}

module.exports = Controller;
