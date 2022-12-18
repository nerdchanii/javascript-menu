class Category {
  constructor(name, menus) {
    this.name = name;
    this.menus = menus;
  }

  addMenu(menuName) {
    this.menus.push(menuName);
  }

  getMenuNames() {
    return [...this.menus];
  }

  getMenuNameById(id) {
    return this.menus[id - 1];
  }
}

module.exports = Category;
