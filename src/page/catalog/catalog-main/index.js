// require('page/common/header/index.js');
var _util = require('util/util.js');
var _account_service = require('service/account-service.js');
var _floatingWindow = require('util/floatingWindow.js');

//快速登陆
const fastsignin = function(){

    _util.request({
        method  : 'POST',
        url     : _util.getSeverURL('account/login'),
        data    : {username : '123',password : '123'},
        success : function(){
            window.location.href = "../../view/catalog/catalog-main.html";
            // console.log('fast sign in 123');
            // $('#fast_signin').hide();
        },
    })

}

//判断用户是否存在
const getUsername = function(){

    return new Promise(function(resolve,reject){
        var username;
        _account_service.checkLogin(
            function(data,msg){
                if(msg==="没有用户登录"){
                    //window.location.href = '../account/account-signin.html?redirect='+encodeURIComponent(window.location.href);
                    resolve(null);
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


//快速登陆按钮显示隐藏
async function fastsigninlogo(){
    let username = await getUsername();
    
    if(username==null){
        console.log('no user');
        $('#fast_signin').show();
    }else{
        console.log(username);
        $('#fast_signin').hide();
    }
    
}

$(document).ready(function (){

    //快速登陆
    $('#fast_signin').on('click',fastsignin);

    //快速登陆按钮的显示隐藏
    fastsigninlogo();

    //悬浮窗
    _floatingWindow();

})
