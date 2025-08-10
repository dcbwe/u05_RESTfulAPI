const CONFIG = require('../config/configs');

class HealthService {
  getBMR({ weight, height, age, gender }) {
    return 10 * weight 
         + 6.25 * height 
         - 5 * age 
         + CONFIG.gender.values[gender];
  }

  getActivityFactor({ dailyRoutine, trainingLevel }) {
    return CONFIG.activityBase 
         + CONFIG.dailyRoutine.values[dailyRoutine] 
         + CONFIG.trainingLevel.values[trainingLevel];
  }

  getCalories(bmr, activityFactor) {
    return bmr * activityFactor;
  }

  getHealth({ weight, height, age, gender, dailyRoutine, trainingLevel }) {
    const a = this.getActivityFactor({ dailyRoutine, trainingLevel });
    const b = this.getBMR({ weight, height, age, gender });
    const c = this.getCalories(b, a);
    return { bmr: b, activityFactor: a, calories: c };
  }
}

module.exports = new HealthService();
