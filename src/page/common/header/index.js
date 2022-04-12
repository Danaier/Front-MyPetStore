var _account_service = require('service/account-service.js');
const _util = require('../../../util/util');

const signout = function(){
        
            _util.request({
                url : _util.getSeverURL('account/signout'),
                success : function(data,msg){
                    console.log('sign out')
                },
                error   : function(){
                    //服务器异常
                }
            });

            window.location.href = "../../view/catalog/catalog-main.html";
    
    };

var header = {

    init : function(){
        this.bindEvents();
        this.loadAccountInfo();
        return this;
    },
    bindEvents : function(){

        var _this = this;

        $('#signout').on("click",signout);

    },
    loadAccountInfo : function(){
        _account_service.checkLogin(
            //account_service的resolve函数
            function(data,msg){
                if(msg==="没有用户登录"){
                    $('#signout').hide();
                }
                else{
                    $('#signin').hide();
                    $('#isLogin').html('当前用户：'+data.username);
                }
                console.log("Success......");
            },
            //account_service的reject函数
            function(errMsg){
               // $('#signout').hide();
                console.log("Error......");
            }
        );
    }
};
module.exports = header.init();


