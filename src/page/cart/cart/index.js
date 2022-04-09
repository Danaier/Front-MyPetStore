var _util = require('util/util.js');
var _account_service = require('service/account-service.js');



const getUsername = function(){

    return new Promise(function(resolve,reject){
        var username;
        _account_service.checkLogin(
            function(data,msg){
                if(msg==="没有用户登录"){
                    window.location.href = '../account/signin.html?redirect='+encodeURIComponent(window.location.href);
                }
                else{  
                    resolve(data.username);      
                }
            },
            function(){
                console.log("Error......");
            }
        );

    });
    
}

const viewCart = function(username){

    return new Promise(function(resolve,reject){
        _util.request({
            url : _util.getSeverURL('cart/getCart'),
            data: { username : username },
            success : function(data,msg){
                if(msg=="购物车为空"){
                    cartEmpty();
                }else{
                    formCart(data);
                    console.log(data);
                }
                
            },
            error   : function(){
                //服务器异常
            }
        });

    });
}

const formCart = function(data){
    var app = new Vue ({
        el  : '#carttable',
        data: {
            cartIsEmpty   : false,
            cartIsNotEmpty: true,
            cart   : data,
            updateCartItem:function(){

            },
        }
    });
}

const cartEmpty = function(){
    var emptyCartMSG = new Vue ({
        el  : '#carttable',
        data: {
            cartIsEmpty     : true,
            cartIsNotEmpty  : false,
        }
    });
}

//不能使用同步操作，因为要访问后端导致延迟，所以需要采用异步方法
async function showCart(){
    let username = await getUsername();
    await viewCart(username);
}

$(document).ready(function(){

    showCart();

})

