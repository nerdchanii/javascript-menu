const { Console } = require('@woowacourse/mission-utils');

class View {
  constructor() {
    this.io = Console;
  }

  showServiceStart() {
    this.io.print('점심 메뉴 추천을 시작합니다.\n');
  }

  getCoachNames(callback) {
    try {
      this.io.readLine('\n코치의 이름을 입력해 주세요. (, 로 구분)\n', (input) => {
        const coachNames = input.split(',');
        callback(coachNames);
      });
    } catch (err) {
      this.io.print(err.message);
      this.getCoachNames(callback);
    }
  }

  getHateFood(coachName, callback) {
    try {
      this.io.readLine(`\n${coachName}(이)가 못 먹는 메뉴를 입력해 주세요.\n`, (input) => {
        const hateFoods = input.split(',');
        callback(hateFoods);
      });
    } catch (err) {
      this.io.print(err.message);
      this.getHateFood(callback);
    }
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
}

module.exports = View;
