var _forgetPassword = require('util/forgetPassword.js');
var _util = require('util/util.js');

//登陆函数
const signin = function(){
    return new Promise(function(resolve,reject){
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type        :"POST",
            url         :"http://localhost:8090/account/login",
            dataType    :'json',
            data        :{  username    :   $('#signin_name').val(),
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

//判断用户名是否存在
const isUsernameExist = function(){
     return new Promise(function(resolve,reject){
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type    :"GET",
            url     :"http://localhost:8090/account/usernameIsExist?username="+$('#signin_name').val(),
            success :function(data){
                
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

//先判断用户名是否存在，再进行登陆
async function getData(){
    let msg = await isUsernameExist();
    console.log(msg);
    let result = await signin();
    console.log(result);
    require('page/common/header/index.js');
}
var app = new Vue({
        el      : '#Sign',
        data    : {
            myImage : _util.getSeverURL('account/authCode'),
            myReload() {
                document.getElementById("myImage").src = _util.getSeverURL("account/authCode?")+Math.random();
            }
        }
    })
$(document).ready(function() {


    //登陆按钮的绑定（通过密码）
    $('#btn').on('click',getData);


    //切换登陆方式
    $('#signInPhoneForm').hide();
    $('#loginThroughPhone').on('click',function (){
        $('#signInPhoneForm').show();
        $('#signInPasswordForm').hide();
    })
    $('#loginThroughPassword').on('click',function (){
        $('#signInPasswordForm').show();
        $('#signInPhoneForm').hide();
    })

    


    //忘記密碼
    _forgetPassword();

})




