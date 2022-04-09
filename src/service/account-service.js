var _util = require('util/util.js');

var _account_service = {
    checkLogin :function(resolve,reject){
        _util.request({
            url     :   _util.getSeverURL('account/get_login_account_info'),
            // url     :   _util.getSeverURL('catalog/categories'),
            method  :   'POST',
            success :   resolve, 
            error   :   reject
        });
    },
    login : function(resolve,reject){
        _util.request({
            url     :   _util.getSeverURL('account/login'),
            data    :   usr,
            method  :   'POST',
            success :   resolve,
            error   :   reject
        });
    }
    
};

module.exports = _account_service;