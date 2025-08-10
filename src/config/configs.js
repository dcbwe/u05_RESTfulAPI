module.exports = {
  dailyRoutine: {
    options: [
      'sitting',
      'sitting and standing',
      'standing and moving',
      'standing, moving and lifting',
      'moving',
      'moving and lifting'
    ],
    values: {
      'sitting':                      0.0,
      'sitting and standing':         0.1,
      'standing and moving':          0.2,
      'standing, moving and lifting': 0.4,
      'moving':                       0.3,
      'moving and lifting':           0.5
    }
  },
  trainingLevel: {
    options: [
      '0-1 day/week',
      '1-2 days/week',
      '2-4 days/week',
      '4-6 days/week',
      '7 days/week'
    ],
    values: {
      '0-1 day/week':  0.0,
      '1-2 days/week': 0.1,
      '2-4 days/week': 0.2,
      '4-6 days/week': 0.3,
      '7 days/week':   0.4
    }
  },
  gender: {
    options: ['male', 'female'],
    values: {
      male:    5,
      female: -161
    }
  },
  activityBase: 1.2,
  units: {
    options: ['standard', 'us']
  },
  language: {
    options: ['en', 'sv']
  }
};
Object.freeze(module.exports);