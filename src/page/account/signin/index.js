// const isUsernameExist = function(){

//         $.ajax({
//             type    :"GET",
//             url     :"http://localhost:8090/account/usernameIsExist?username="+$('#username').val(),
//             success :function(data){
                
//                 $('#iEI').show();

//                 if(data === "Empty"){
//                     $('#iEI').hide();
//                 }else if(data === "Not Exist"){
//                     $('#isExistInfo').attr("class","oktips").text('用户不存在');
//                 }else if(data === "Exist"){
//                     $('#isExistInfo').attr("class","errortips").text('用户存在');
//                 }
//             },
//             error :function (){
//                 window.alert('data');
//             }
//         });
// };

// const signin = function(){

//     $.ajax({
//         type        :"POST",
//         url         :"http://localhost:8090/account/login",
//         dataType    :'json',
//         data        :{  username    :   $('#username').val(),
//                         password    :   $('#password').val()
//                     },
//         success :function(res){
//             if(res.status===0){
//                 if(res.msg==="password不正确"){
//                     //todao登录失败
//                 }
//                 else{
//                     //todo登录成功
//                     //header.init();
//                     $('#signin').hide(); 
//                     //window.location.href = "../../view/catalog/catalog-main.html";
//                 }
//             }   
//             else{
//                 //todo请求失败
//             } 
//         },
//         error :function (){
//             window.alert('data');
//         }
//     });
// };


const signin = function(){
    return new Promise(function(resolve,reject){
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type        :"POST",
            url         :"http://localhost:8090/account/login",
            dataType    :'json',
            data        :{  username    :   $('#username').val(),
                            password    :   $('#password').val()
                        },
            success :function(res){
                if(res.status===0){
                    if(res.msg==="password不正确"){
                        //todo登录失败
                    }
                    else{
                        //todo登录成功
                        //header.init();
                        $('#signin').hide(); 
                        resolve("登录成功");
                        window.location.href = "../../view/catalog/catalog-main.html";
                    }
                }   
                else{
                    //todo请求失败
                } 
            },
            error :function (){
                window.alert('data');
            }
        });
    });
}


const isUsernameExist = function(){
     return new Promise(function(resolve,reject){
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type    :"GET",
            url     :"http://localhost:8090/account/usernameIsExist?username="+$('#username').val(),
            success :function(data){
                
                $('#iEI').show();

                if(data === "Empty"){
                    $('#iEI').hide();
                    return;
                }else if(data === "Not Exist"){
                    $('#isExistInfo').attr("class","oktips").text('用户不存在');
                    return;
                }else if(data === "Exist"){
                    $('#isExistInfo').attr("class","errortips").text('用户存在');
                    resolve("用户存在");
                }
            },
            error :function (){
                window.alert('data');
            }
        });   
    });
};


async function getData(){
    let msg = await isUsernameExist();
    console.log(msg);
    let result = await signin();
    console.log(result);
    require('page/common/header/index.js');
}

// $('#username').on('nput',isUsernameExist);
$('#btn').on('click',getData);

