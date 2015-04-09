var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
/**
 * 這是一個 singleton 物件
 */
var AppActions = {
  
  // getAll: function() {
  //   AppDispatcher.dispatch({
  //     actionType: AppConstants.VOTE_GET_ALL
  //   });
  // },

  update: function(item) {
    //定義每個 action 要送出去的資料
    AppDispatcher.dispatch({
      //actionType 要和 TodoContants 定義的一致
      actionType: AppConstants.VOTE_UPDATE,
      item: item
    });
  },

  updateTotalVoteCounts: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.VOTE_UPDATE_TOTAL_COUNT
    });
  }


};

module.exports = AppActions;
