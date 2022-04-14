var _util = require('util/util.js');

var _catalog_service={
    getProductList : function(categoryId,resolve,reject){
        _util.request({
            url     :   _util.getSeverURL('catalog/categories/'+categoryId+'/products'),
            success :   resolve,
            error   :   reject,
        });
    },

    getLitemList : function(productId,resolve,reject){
        _util.request({
            url     :   _util.getSeverURL('catalog/product/'+productId+'/items'),
            success :   resolve,
            error   :   reject,
        });
    },

    getItem : function(itemId,resolve,reject){
        _util.request({
            url     :   _util.getSeverURL('catalog/items/'+itemId),
            success :   resolve,
            error   :   reject,
        });
    },


};

module.exports = _catalog_service;