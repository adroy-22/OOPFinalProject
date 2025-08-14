const Status = Object.freeze({
  ToDo: 'ToDo',
  InProgress: 'InProgress',
  Done: 'Done',

  values() {
    return Object.values(this).filter(value => typeof value === 'string');
  },

  isValid(status) {
    return this.values().includes(status);
  },

  getNext(currentStatus) {
    const statusOrder = [this.ToDo, this.InProgress, this.Done];
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === statusOrder.length - 1) {
      return currentStatus;
    }
    return statusOrder[currentIndex + 1];
  }
});

const Priority = Object.freeze({
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
  Critical: 'Critical',

  values() {
    return Object.values(this).filter(value => typeof value === 'string');
  },

  isValid(priority) {
    return this.values().includes(priority);
  },

  getWeight(priority) {
    const weights = {
      [this.Low]: 1,
      [this.Medium]: 2,
      [this.High]: 3,
      [this.Critical]: 4
    };
    return weights[priority] || 0;
  },

  compare(priority1, priority2) {
    const weight1 = this.getWeight(priority1);
    const weight2 = this.getWeight(priority2);
    if (weight1 < weight2) return -1;
    if (weight1 > weight2) return 1;
    return 0;
  },

  getColorClass(priority) {
    const colorMap = {
      [this.Low]: 'priority-low',
      [this.Medium]: 'priority-medium',
      [this.High]: 'priority-high',
      [this.Critical]: 'priority-critical'
    };
    return colorMap[priority] || 'priority-medium';
  }
});

class EnumUtils {
  static isValidEnumValue(enumObj, value) {
    return enumObj.isValid ? enumObj.isValid(value) : enumObj.values().includes(value);
  }

  static getRandomValue(enumObj) {
    const values = enumObj.values();
    return values[Math.floor(Math.random() * values.length)];
  }

  static getValuesAsArray(enumObj) {
    return enumObj.values();
  }
}

export { Status, Priority, EnumUtils }; 