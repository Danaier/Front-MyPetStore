var _util = require('util/util.js');
var _account_service = require('service/account-service.js');
import {currency} from 'util/currency'
Vue.filter("currency",currency);

//判断用户是否存在
const getUsername = function(){

    return new Promise(function(resolve,reject){
        var username;
        _account_service.checkLogin(
            function(data,msg){
                if(msg==="没有用户登录"){
                    //window.location.href = '../account/account-signin.html?redirect='+encodeURIComponent(window.location.href);
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
//渲染购物车
const viewCart = function(username){
    return new Promise(function(resolve,reject){
        _util.request({
            url : _util.getSeverURL('cart/getCart'),
            data: { username : username },
            success : function(data,msg){
                if(msg=="购物车为空"){
                    cartEmpty();
                }else{
                    formCart(data,username);
                }
            },
            error   : function(){
                //服务器异常
            }
        });

    });
}

//在购物车内数量不为零时Vue渲染购物车
const formCart = function(data,username){
    var app = new Vue ({
        el  : '#carttable',
        data: {
            cartIsEmpty   : false,
            cartIsNotEmpty: true,
            cart   : data,
            
            updateCartItem(item){
                
                var id = item.target.getAttribute('name');
                var quantity = item.target.value;
                xhr = new XMLHttpRequest();
                xhr.onreadystatechange = update;
                xhr.open("POST", _util.getSeverURL("cart/updateCartItem?itemId=")+id+"&quantity="+quantity+"&username="+username, true);
                xhr.send(null);
                _util.request({
                    url : _util.getSeverURL('cart/getCart'),
                    data: { username : username },
                });


            },
            removeItemFromCart(event){
                var id = event.target.getAttribute('name');
                _util.request({
                    url     : _util.getSeverURL('cart/removeItemFromCart'),
                    data    : {itemId : id,username : username},
                });
                _util.request({
                    url : _util.getSeverURL('cart/getCart'),
                    data: { username : username },
                });
                var row = document.getElementById(id);
                document.getElementById("carttable").deleteRow(row.rowIndex);
            }
            
            
        }
    });
}
//在购物车为空时隐藏表单
const cartEmpty = function(){
    var emptyCartMSG = new Vue ({
        el  : '#carttable',
        data: {
            cartIsEmpty     : true,
            cartIsNotEmpty  : false,
            cart            : null,
        }
    });
}

//异步操作，首先判断用户是否存在，然后渲染购物车
//不能使用同步操作，因为要访问后端导致延迟，所以需要采用异步方法
async function showCart(){
    let username = await getUsername();
    await viewCart(username);
}



//手动输入数量更新购物车
var xhr;
function update() {
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            var result = xhr.responseText;
            var newItem = eval("("+result+")");
            var isRemoved = newItem.isRemoved;
            var m = document.getElementById("m");

            if(isRemoved == "false"){
                var item = document.getElementsByName(newItem.itemId);
                item.innerText = newItem.quantity;
                document.getElementById("itemtotalcost"+newItem.itemId).innerHTML=newItem.html;
            }
            else if(isRemoved == "true"){
                var row = document.getElementById(newItem.itemId);
                document.getElementById("carttable").deleteRow(row.rowIndex);
            }
        }
    }
}

//Remove删除按钮
function remove(){

}

$(document).ready(function(){
    //渲染页面
    showCart();
})

