// var Hogan = require('hogan.js');

// var template = '<p>{{test}}</p>';

// var data = {
//     test:'abc'
// }

// var hoganTemplate = Hogan.compile(template);
// var result = hoganTemplate.render(data);

// $('#test').html(result);
var _util = require('util/util.js');
var listTemplate = require('./index.string');
var _catalog_service = require('service/catalog-service.js');

    

var catalogList={
    listData    :{
        title       :   '',
        headList    :   [],
        productList :   {},
        itemList    :   {}
    },
    productHeadList :[
        'Product Id',
        'Name',
    ],
    itemHeadList:[
        'Item Id',
        'Product Id',
        'Descritption',
        'List Price',
        ' '
    ],
    init:function(){
        this.bindEvent();
        this.loadAccountInfo();
        return this;
    },
    bindEvent:function(){

    },
    loadAccountInfo:function(){
        var id = _util.getURLParam('id');
        var route =_util.getURLParam('route');
        var _this =this;
        console.log(id);
        console.log(id);

        if(route==='product'){
            _catalog_service.getProductList(id,
                function(data,msg){
                    console.log(data);
                    _this.listData.headList=_this.productHeadList;
                    _this.listData.title=id;
                    _this.listData.productList=data;
                    _this.listData.itemList=null;

                    var result = _util.renderHtml(listTemplate,{listData:_this.listData});
                    console.log(result);
                    $('#Catalog').html(result);
                },
                function(){
    
                }   
            
            );
        }
        if(route==='item'){
            _catalog_service.getLitemList(id,
                function(data,msg){
                    console.log(data);
                    _this.listData.headList=_this.itemHeadList;
                    _this.listData.title=id;
                    _this.listData.productList=null;
                    _this.listData.itemList=data;

                    var result = _util.renderHtml(listTemplate,{listData:_this.listData});
                    console.log(result);
                    $('#Catalog').html(result);
                },
                function(){
    
                }
            );
        }

    }
}

module.exports = catalogList.init();