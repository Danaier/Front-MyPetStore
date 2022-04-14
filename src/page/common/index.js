//通用webpack使每个页面引入该css
require('./mypetstore.css');



// var _util = require('util/util.js');

//header显示登陆用户和signin|signout的显示&so_on
require('page/common/header/index.js');


// 用于调试
console.log('this is common js');



// //str转json (for search completion)
// function strToJson(str){
//     var json = (new Function("return"+str))();
//     return json;
// }

// // 搜索补全
// $("#searchbar").autocomplete({

//     source:
//     // "searchThis?keyword="+$("#searchbar").val(),
//         function (request,response){
//         $.ajax({
//             type    : "GET",
//             url     : _util.getSeverURL("catalog/searchThis?keyword=")+$("#searchbar").val(),
//             success : function (data){
//                     //console.log(strToJson(data));
//                     response(strToJson(data));
//             }
//         })
//     },
//     minLength: 1,
// });