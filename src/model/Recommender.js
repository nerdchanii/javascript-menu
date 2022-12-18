const { Random } = require('@woowacourse/mission-utils');
class Recommender {
  constructor(categories) {
    this.categories = categories;
  }

  getCategory(categoryId) {
    return this.categories.get(categoryId);
  }

  recommendMenu(category, coach) {
    const menuNumbers = category.getMenuNames().map((__, idx) => idx + 1);
    const [menuNumber] = Random.shuffle(menuNumbers);
    const menu  = category.getMenuNameById(menuNumber);
    if (coach.isHate(menu) || coach.isRecommend(menu)) return this.recommendMenu(category, coach);
    return menu;
  }
}

module.exports = Recommender;
