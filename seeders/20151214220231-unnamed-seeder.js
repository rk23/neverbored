'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    ///*
    //  Add altering commands here.
    //  Return a promise to correctly handle asynchronicity.
    //
    //  Example:
      return queryInterface.bulkInsert('hobby', [
        {name: 'Backpacking',
          verbed: 'backpack',
          time: 72,
          short_desc: 'Backpacking is the outdoor recreation of' +
        ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
        'journey, and may or may not involve camping outdoors.',
          transport: TRUE,
          solo:	TRUE,
          quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'
        },{name: 'spelunking',
          verbed: 'spelunk',
          time: 8,
          short_desc: 'Caving — also traditionally known as spelunking in the United States and Canada and potholing in the United Kingdom and Ireland — is the recreational pastime of exploring wild (generally non-commercial) cave systems.',
          transport: TRUE,
          solo:	FALSE,
          quote: 'Great time',
          imglink:'http://cdn.grindtv.com/wp-content/uploads/2013/09/Adam-Spillane-1024x682.jpg'
        },{name: 'home brewing',
          verbed: 'brew',
          time: 72,
          short_desc: 'Backpacking is the outdoor recreation of' +
          ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
          'journey, and may or may not involve camping outdoors.',
          transport: TRUE,
          solo:	TRUE,
          quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'
        },{name: 'Backpacking',
          verbed: 'backpack',
          time: 72,
          short_desc: 'Backpacking is the outdoor recreation of' +
          ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
          'journey, and may or may not involve camping outdoors.',
          transport: TRUE,
          solo:	TRUE,
          quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'
        },{name: 'Backpacking',
          verbed: 'backpack',
          time: 72,
          short_desc: 'Backpacking is the outdoor recreation of' +
          ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
          'journey, and may or may not involve camping outdoors.',
          transport: TRUE,
          solo:	TRUE,
          quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'
        },{name: 'Backpacking',
          verbed: 'backpack',
          time: 72,
          short_desc: 'Backpacking is the outdoor recreation of' +
          ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
          'journey, and may or may not involve camping outdoors.',
          transport: TRUE,
          solo:	TRUE,
          quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'
        },{name: 'Backpacking',
          verbed: 'backpack',
          time: 72,
          short_desc: 'Backpacking is the outdoor recreation of' +
          ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
          'journey, and may or may not involve camping outdoors.',
          transport: TRUE,
          solo:	TRUE,
          quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'
        },{name: 'Backpacking',
          verbed: 'backpack',
          time: 72,
          short_desc: 'Backpacking is the outdoor recreation of' +
          ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
          'journey, and may or may not involve camping outdoors.',
          transport: TRUE,
          solo:	TRUE,
          quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'
        },{name: 'Backpacking',
          verbed: 'backpack',
          time: 72,
          short_desc: 'Backpacking is the outdoor recreation of' +
          ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
          'journey, and may or may not involve camping outdoors.',
          transport: TRUE,
          solo:	TRUE,
          quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'
        },{name: 'Backpacking',
          verbed: 'backpack',
          time: 72,
          short_desc: 'Backpacking is the outdoor recreation of' +
          ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
          'journey, and may or may not involve camping outdoors.',
          transport: TRUE,
          solo:	TRUE,
          quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'
        },{name: 'Backpacking',
          verbed: 'backpack',
          time: 72,
          short_desc: 'Backpacking is the outdoor recreation of' +
          ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
          'journey, and may or may not involve camping outdoors.',
          transport: TRUE,
          solo:	TRUE,
          quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'
        },{name: 'Backpacking',
          verbed: 'backpack',
          time: 72,
          short_desc: 'Backpacking is the outdoor recreation of' +
          ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
          'journey, and may or may not involve camping outdoors.',
          transport: TRUE,
          solo:	TRUE,
          quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'
        }

      ], {});

  },

  down: function (queryInterface, Sequelize) {
    ///*
    //  Add reverting commands here.
    //  Return a promise to correctly handle asynchronicity.
    //
    //  Example:
      return queryInterface.bulkDelete('Person', null, {});
  }
};
