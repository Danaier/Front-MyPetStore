//修改用户信息

var _util = require('util/util.js');
var _account_service = require('service/account-service.js');

const editAccount=function(){
    return new Promise(function(resolve,reject){
        $.ajax({
            xhrFields:{
                withCredentials:true
            },
            type:"POST",
            url:_util.getSeverURL("account/editAccount"),
            dataType:"json",
            data:{
                username    :   $('#username').val(),
                password    :   $('#password').val(),
                phoneVCode  :   $('#phoneVCode').val(),
                firstname   :   $('#firstname').val(),
                lastname    :   $('#lastname').val(),
                email       :   $('#email').val(),
                address1    :   $('#address1').val(),
                city        :   $('#address2').val(),
                state       :   $('#state').val(),
                zip         :   $('#zip').val(),
                country     :   $('#country').val(),
                languagepre :   $('#languagepre').val()
            },
            success:function(res){
                if(res.status===0){
                    if(res.msg==="用户名或密码不能为空"){
                        //修改失败显示错误信息
                        console.log(res.msg);
                        return;
                    }else{
                        //修改成功后跳往登录页面
                        resolve("修改成功");
                        _util.request({
                            url : _util.getSeverURL('account/signout'),
                            success : function(data,msg){
                                console.log('sign out')
                            }
                        });
                        window.location.href="../../view/account/account-signin.html";

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

$('#editbtn').on('click',editAccount);



//判断用户是否登录
const isLogin=function(){
    return new Promise(
        function(resolve,reject){
            _account_service.checkLogin(
                function(data,msg){
                    if(msg==="没有用户登录"){
                        alert("用户未登录");
                        window.location.href = '../../view/account/account-signin.html?redirect='+encodeURIComponent(window.location.href);
                    }else{
                        resolve(data);//data是User对象
                    }
                },
                function(){
                    console.log("ERROR!!!!!!");
                }
            )
        }
    )
}

// 渲染账户信息界面
const viewAccount=function(data){
    return new Promise(
        function(resolve,reject){
            _util.request({
                method  : 'POST',
                url     :_util.getSeverURL('account/get_login_account_info'),
                success :function(data,msg){
                   //let data=res.data;
                    console.log(data);
                    console.log(data.username);
                    $('#username').val(data.username);
                    $('#password').val(data.password);
                    $('#repeatpwd').val(data.password);
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
            })
        }
    )
}

//异步操作，首先判断用户是否登录，再渲染用户信息
async function getAccount(){
    let login_account=await isLogin();
    await viewAccount(login_account);
}

$(document).ready(function(){
    getAccount();
})