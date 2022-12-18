const { Random } = require('@woowacourse/mission-utils');
const CATEGORY = require('../constants/category.constants');
const DAYS = require('../constants/days.constants.js');
const Category = require('../model/Category');
const Recommender = require('../model/Recommender');

class Service {
  constructor() {
    this.days = 5;
    this.coaches = [];
    this.categories = new Map(
      Object.entries(CATEGORY).map(([key, { id, menus }]) => [id, new Category(key, menus)]),
    );
    this.Recommender = new Recommender(this.categories);
  }

  addCoach(coach) {
    this.coaches.push(coach);
  }

  getWeeksCategories() {
    const weeklyCategories = [];
    for (let day = 0; day < this.days; day++) {
      const category = this.Recommender.getCategory(Random.pickNumberInRange(1, 5));
      weeklyCategories.push(category);
    }
    return weeklyCategories;
  }

  getWeeklyRecommend() {
    const categories = this.getWeeksCategories();
    this.recommends(categories);
    const { PREFIX, MON, TUE, WED, THU, FRI } = DAYS;
    const days = [PREFIX, MON, TUE, WED, THU, FRI];
    const weeklyCategories = ['카테고리', ...categories.map((category) => category.name)];
    const coachesWeeklyMenu = this.coaches.map((coach) => ({
      name: coach.name,
      foods: coach.getWeeklyRecommend(),
    }));
    return ([days, weeklyCategories, coachesWeeklyMenu]);
  }

  recommends(categories) {
    this.coaches.forEach((coach) => {
      for (const category of categories) {
        const menu = this.Recommender.recommendMenu(category, coach);
        coach.recommend(menu);
      }
    });
  }
}

module.exports = Service;
