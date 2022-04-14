var _forgetPassword = require('util/forgetPassword.js');
var _util = require('util/util.js');

//登录函数(通过密码)
const signin = function(){
    return new Promise(function(resolve,reject){
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type        : "POST",
            url         : _util.getSeverURL("account/login"),
            dataType    : 'json',
            data        : {  
                            username    :   $('#signin_name').val(),
                            password    :   $('#signinpsw').val()
                        },
            success :function(res){
                if(res.status===0){
                    if(res.msg==="password不正确"){
                        //登录失败，显示错误信息
                        console.log(res.msg);
                        $('#errorMsg').attr("class","errortips").text('用户名或密码错误，请重新登录');
                        return;
                    }
                    else{
                        //登录成功，隐藏signin标志
                        $('#signin').hide(); 
                        resolve("登录成功");
                        window.location.href = "../../view/catalog/catalog-main.html";
                    }
                }   
                else{
                    //todo请求失败
                    alert('fail');
                }
            },
            error :function (){
                window.alert('error');
            }
        });
    });
}

//登录函数(通过手机号)
const signinPhone = function(){
    _util.request({
        method  : 'POST',
        url     : _util.getSeverURL('account/signinPhone'),
        data    : {
            username    : $('#usernamePhone').val(),
            phoneNumber : $('#phoneNumber').val(),
            inputVCode  : $('#phoneVCode').val(),
        },

        success : function(data,msg){
            console.log(msg);
            if(msg=="登录成功"){
                window.location.href = "../../view/catalog/catalog-main.html";
            }else{
                $('#errorMsg').attr("class","errortips").text(msg);
            }

        }
    })
}

//发送手机验证码
const sendPhoneVCode = function(){
    $('#phoneCode').off("click"); //解除绑定点击事件

    $('#phoneCode').unbind("click");//移除绑定点击事件

    $('#phoneCode').unbind(); //移除所有绑定事件

    $('#phoneCode').on("click",function (){

        var p = $('#phoneNumber').val();
        var data = "phoneNumber="+ p;
        console.log(data);
        
        _util.request({
            method  : "POST",
            url     : _util.getSeverURL("account/phoneVCode"),
            data    : data,
            success :function(data,msg){
                alert(msg);
            }
        });
        
        
    });
}


//判断用户名是否存在
const isUsernameExist = function(){
     return new Promise(function(resolve,reject){
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type    : "GET",
            url     : _util.getSeverURL("account/usernameIsExist?username=")+$('#signin_name').val(),
            success : function(data){
                
                $('#iEI').show();

                if(data === "Empty"){
                    $('#iEI').hide();
                    return;
                }else if(data === "Not Exist"){
                    $('#isExistInfo').attr("class","errortips").text('用户不存在');
                    return;
                }else if(data === "Exist"){
                    $('#isExistInfo').attr("class","oktips").text('用户存在');
                    resolve("用户存在");
                }
            },
            error :function (){
                window.alert('data');
            }
        });   
    });
};


//获取验证码
function getAuthCode(){
    return new Promise(function(resolve,reject){
        _util.request({
            url     : _util.getSeverURL('account/getAuthCode'),
            success : function(data,msg,setValue){
                console.log(msg);
                resolve(msg)
            }
        })
    })
}

//先判断用户名是否存在，再进行登录
async function getData(){

    //用户是否存在
    let msg = await isUsernameExist();
    console.log(msg);

    //获取验证码以及判断是否正确
    let authCode = await getAuthCode();
    var inputCode = $('#inputCode').val();
    if (authCode==inputCode){
        let result = await signin();
        console.log(result);
        require('page/common/header/index.js');
    }else {
        console.log("inputCode:"+ inputCode);
        console.log("authCode:" +  authCode);
        $('#authCodeWrong').show();
        $('#inputCode').val('');
        $('#inputCode')[0].focus();
    }
    
}

//通过Vue绑定渲染验证码图片
var app = new Vue({
        el      : '#Sign',
        data    : {
            myImage : _util.getSeverURL('account/authCode'),
            myReload() {
                document.getElementById("myImage").src = _util.getSeverURL("account/authCode?")+Math.random();
            }
        }
});

//切换登录方式
var switchSignInForm = function(){
    $('#signInPhoneForm').hide();
    $('#loginThroughPhone').on('click',function (){
        $('#signInPhoneForm').show();
        $('#signInPasswordForm').hide();
    })
    $('#loginThroughPassword').on('click',function (){
        $('#signInPasswordForm').show();
        $('#signInPhoneForm').hide();
    })
}


$(document).ready(function() {

    //登录按钮的绑定（通过密码）
    $('#btn').on('click',getData);

    //隐藏验证码错误提示
    $('#authCodeWrong').hide();

    //切换登陆方式
    switchSignInForm();

    //忘記密碼
    _forgetPassword();

    //手机号验证码发送
    sendPhoneVCode();

    //手机号登录
    $('#signin_Phone').on('click',signinPhone);

})




