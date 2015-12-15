'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    ///*
    //  Add altering commands here.
    //  Return a promise to correctly handle asynchronicity.
    //
    //  Example:
      return queryInterface.bulkInsert('hobby', [
        {name: 'Backpacking', verbed: 'backpack', time: 72, short_desc: 'Backpacking is the outdoor recreation of' +
        ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
        'journey, and may or may not involve camping outdoors.', transport: TRUE, solo:	TRUE, quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'},
          {name: 'Backpacking', verbed: 'backpack', time: 72, short_desc: 'Backpacking is the outdoor recreation of' +
        ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
        'journey, and may or may not involve camping outdoors.', transport: TRUE, solo:	TRUE, quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'},
          {name: 'Backpacking', verbed: 'backpack', time: 72, short_desc: 'Backpacking is the outdoor recreation of' +
        ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
        'journey, and may or may not involve camping outdoors.', transport: TRUE, solo:	TRUE, quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'},
          {name: 'Backpacking', verbed: 'backpack', time: 72, short_desc: 'Backpacking is the outdoor recreation of' +
        ' carrying gear on one\'s back, while hiking for more than a day. It is often but not always an extended ' +
        'journey, and may or may not involve camping outdoors.', transport: TRUE, solo:	TRUE, quote: 'Love it!',
          imglink:'http://www.royaltyinn.com/wp-content/uploads/2015/05/Backpacker.jpg'}

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
