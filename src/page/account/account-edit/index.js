//修改用户信息
const editAccount=function(){
    return new Promise(function(resolve,reject){
        $.ajax({
            xhrFields:{
                withCredentials:true
            },
            type:"POST",
            url:"http://localhost:8090/account/editAccount",
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

/*
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

//渲染账户信息界面
const viewAccount=function(data){
    return new Promise(
        function(resolve,reject){
            _util.request({
                url:_util.getSeverURL('account/get_login_account_info'),
                success:function(data){
                   //let data=res.data;
                    console.log(data);
                    console.log(data.username);
                    $('#username').text(data.username);
                    $('#password').text(data.password);
                    $('#repeatpwd').text(data.password);
                    $('#phoneNumber').text(data.phone);
                    $('#firstname').text(data.firstname);
                    $('#lastname').text(data.lastname);
                    $('#email').text(data.email);
                    $('#address1').text(data.address1);
                    $('#address2').text(data.address2);
                    $('#city').text(data.city);
                    $('#zip').text(data.zip);
                    $('#state').text(data.state);
                    $('#country').text(data.country);
                    $('#languagepre').text(data.languagepre);
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
})*/