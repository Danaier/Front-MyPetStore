var _util = require('util/util.js');
var listTemplate = require('./index.string');
var _catalog_service = require('service/catalog-service.js');


const addItemTocart = function(){
    
}


var item={
    itemData    :{
        image   :   '',
        data    :   {}
    },
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
                // <img src="../../../images/bird3.gif" />
                // /images/bird3.gif
                _this.itemData.data=data;
                _this.itemData.image=data.productDescription;

                var result = _util.renderHtml(listTemplate,{itemData:_this.itemData});
                console.log(result);
                $('#Catalog').html(result);
            },
            function(){

            }   
        
        );

    }
}

module.exports = item.init();