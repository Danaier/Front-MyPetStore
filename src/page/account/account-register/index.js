const register=function(){
    return new Promise(function(resolve,reject){
        $.ajax({
            type:"POST",
            url:"http://localhost:8090/account/register",
            dataType:"json",
            data:{
                username    :   $('#username').val(),
                password    :   $('#password').val(),
                repeatpwd   :   $('#repeatpwd').val(),
                phoneVCode  :   $('#phoneVCode').val(),
                firstname   :   $('#firstname').val(),
                lastname    :   $('#lastname').val(),
                email       :   $('#email').val(),
                address1    :   $('#address1').val(),
                city        :   $('#address2').val(),
                state       :   $('#state').val(),
                zip         :   $('#zip').val(),
                country     :   $('#country').val(),
                languagepre :   $('languagepre').val()
            },
            success:function(res){
                if(res.status===0){
                    if(res.msg==="用户名或密码不能为空"){
                        //注册失败显示错误信息
                        console.log(res.msg);
                        $('#isExistInfo').attr("class","errortips").text('用户名或密码不能为空');
                        return;
                    }else{
                        //注册成功后跳往登录页面
                        resolve("注册成功");
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

const isUsernameExist = function(){
    return new Promise(function(resolve,reject){
       $.ajax({/*
           xhrFields: {
               withCredentials: true
           },*/
           type    :"GET",
           url     :"http://localhost:8090/account/usernameIsExist?username="+$('#username').val(),
           success :function(data){
               
               $('#iEI').show();

               if(data === "Empty"){
                   $('#iEI').hide();
                   return;
               }else if(data === "Not Exist"){
                   $('#isExistInfo').attr("class","oktips").text('用户名不存在');
                   return;
               }else if(data === "Exist"){
                   $('#isExistInfo').attr("class","errortips").text('用户名已存在');
                   resolve("用户名存在");
               }
           },
           error :function (){
               window.alert('data');
           }
       });   
   });
}
$('#username').on('blur',isUsernameExist);
$('#registerBtn').on('click',register);

//todo:PhoneNumber