class Coach {
  #hates = [];
  #recommendations = [];
  constructor(coachName) {
    this.name = coachName;
  }

  addHate(menuName) {
    this.#hates.push(menuName);
  }

  isHate(menuName) {
    return this.#hates.some((hateFoodName) => menuName === hateFoodName);
  }

  getWeeklyRecommend() {
    return [...this.#recommendations];
  }

  isRecommend(menu) {
    return this.#recommendations.some((menuName) => menu === menuName);
  }

  recommend(menuName) {
    return this.#recommendations.push(menuName);
  }
}

module.exports = Coach;
