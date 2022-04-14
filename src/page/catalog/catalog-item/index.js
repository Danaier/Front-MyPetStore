var _util = require('util/util.js');
var listTemplate = require('./index.string');
var _catalog_service = require('service/catalog-service.js');


const addItemTocart = function(){
    
}


var item={
    init:function(){
        this.bindEvent();
        this.loadAccountInfo();
        return this;
    },
    bindEvent:function(){

    },
    loadAccountInfo:function(){
        var id = _util.getURLParam('id');
        // var route =_util.getURLParam('route');
        var _this =this;

        console.log(id);

        _catalog_service.getItem(id,
            function(data,msg){
                //console.log(data);

                var result = _util.renderHtml(listTemplate,{data});
                console.log(result);
                $('#Catalog').html(result);
            },
            function(){

            }   
        
        );

    }
}

module.exports = item.init();