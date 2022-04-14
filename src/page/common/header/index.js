var _account_service = require('service/account-service.js');
const _util = require('../../../util/util');
import('page/common/jq/jquery-3.6.0.min.js');
import('page/common/jq/jquery-ui.min.js');

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

//若用户已登录，则返回账户信息，否则返回错误信息
const getAccount=function(){
    return new Promise(function(resolve,reject){
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type    : "POST",
            url     : _util.getSeverURL("account/get_login_account_info"),
            dataType: "json",
            success:function(res){
                if(res.status===0){
                    if(res.msg==="没有用户登录"){
                        alert("用户未登录");
                        window.location.href = '../../view/account/account-signin.html?redirect='+encodeURIComponent(window.location.href);
                    }else{
                    //从后端传值到前端
                    window.location.href = '../../view/account/account-edit.html?redirect='+encodeURIComponent(window.location.href);
                    let data=res.data;
                    console.log(data);
                    $('#username').val(data.username);
                    $('#password').val(data.password);
                    $('#phoneNumber').val(data.phone);
                    $('#firstname').val(data.firstname);
                    $('#lastname').val(data.lastname);
                    $('#email').val(data.email);
                    $('#address1').val(data.address1);
                    $('#address2').val(data.address2);
                    $('#city').val(data.city);
                    $('#zip').val(data.zip);
                    $('#state').val(data.state);
                    $('#country').val(data.country);
                    $('#languagepre').val(data.languagepre);
                    }
                }else{
                    alert('fail');
                }
            },
            error:function(){
                window.alert('error');
            }
        })
    })
}

$('#getAccount').on('click',getAccount);

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


