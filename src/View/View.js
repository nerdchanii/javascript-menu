const categories = require('../constants/category.constants');
const { Console } = require('@woowacourse/mission-utils');
const { refiner } = require('../utils');
class View {
  constructor() {
    this.io = Console;
  }

  showServiceStart() {
    this.io.print('점심 메뉴 추천을 시작합니다.\n');
  }

  getCoachNames(callback) {
    this.io.readLine('\n코치의 이름을 입력해 주세요. (, 로 구분)\n', (input) => {
      try {
        const coachNames = refiner.stringToArray(input, { delimiter: ',', type: String });
        View.#validateCoachNames(coachNames);
        callback(coachNames);
      } catch (err) {
        this.io.print(err.message);
        this.getCoachNames(callback);
      }
    });
  }

  getHateFood(coachName, callback) {
    this.io.readLine(`\n${coachName}(이)가 못 먹는 메뉴를 입력해 주세요.\n`, (input) => {
      try {
        const hateFoods = refiner.stringToArray(input, { delimiter: ',', type: String, trim: true });
        View.#validateFoodInCategories(hateFoods);
        callback(hateFoods);
      } catch (err) {
        this.io.print(err.message);
        this.getHateFood(coachName, callback);
      }
    });
  }

  showWeeklyRecommend(days, categories, recommend) {
    this.io.print('메뉴 추천 결과입니다.');
    this.io.print(`[ ${days.join(' | ')} ]`);
    this.io.print(`[ ${categories.join(' | ')} ]`);
    recommend.forEach(({ name, foods }) => {
      this.io.print(`[ ${[name, ...foods].join(' | ')} ]`);
    });
    this.io.print('추천을 완료했습니다.');
  }

  static #validateFoodInCategories(hateFoods) {
    if (hateFoods.length === 1 && hateFoods[0] === '') return true;
    const wholeMenus = Object.entries(categories).map(([key, { menus }]) => menus)
      .flat();
    if (!hateFoods.every((food) => wholeMenus.some((menu) => menu === food))) {
      throw new Error('[ERROR]없는 음식인데요? ');
    }
  }

  static #validateCoachNames(coachNames) {
    if (coachNames.length < 2) throw new Error('[ERROR] 혼밥은 외로워요. 최소 두명의 코치가 같이 먹어야해요.');
    if (coachNames.length > 5) throw new Error('[ERROR] 6명부터는 너무 많아요. 5명까지만 함께 먹을 수 있어요.');
    if (coachNames.some((name) => name.length < 2)) throw new Error('[ERROR] 코치님 이름이 너무 짧아요. 2글자 이상 입력해주세요\n');
    if (coachNames.some((name) => name.length > 4)) throw new Error('[ERROR] 코치님 이름이 너무 길어요. 4글자 이하로 이름을 입력해주세요\n');
    return true;
  }
}

module.exports = View;
