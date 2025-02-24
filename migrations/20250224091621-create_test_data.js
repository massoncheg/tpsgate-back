module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.collection('users').insertMany([
      { "email": "user1@some.com", "password": "0000" },
      { "email": "user2@some.com", "password": "1111" }
    ]);

    await db.collection('weekdays').insertMany([
      {
        "title": "Понедельник",
        "timeRange": {
          "startTime": "04:20",
          "endTime": "05:00"
        }
      },
      {
        "title": "Вторник",
        "timeRange": {
          "startTime": "04:20",
          "endTime": "05:00"
        }
      },
      {
        "title": "Среда",
        "timeRange": {
          "startTime": "04:20",
          "endTime": "05:00"
        }
      },
      {
        "title": "Четверг",
        "timeRange": {
          "startTime": "04:20",
          "endTime": "05:00"
        }
      },
      {
        "title": "Пятница",
        "timeRange": {
          "startTime": "04:20",
          "endTime": "05:00"
        }
      },
      {
        "title": "Суббота",
        "timeRange": {
          "startTime": "04:20",
          "endTime": "05:00"
        }
      },
      {
        "title": "Воскресенье",
        "timeRange": {
          "startTime": "04:20",
          "endTime": "05:00"
        }
      }
    ]
    );
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db) {
    await db.collection('users').deleteMany({});
    await db.collection('weekdays').deleteMany({});
  }
};
