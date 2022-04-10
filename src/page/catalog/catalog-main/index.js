// require('page/common/header/index.js');
var _util = require('util/util.js');

const fastsignin = function(){

    _util.request({
        method  : 'POST',
        url     : _util.getSeverURL('account/login'),
        data    : {username : '123',password : '123'},
        success : function(){
            window.location.href = "../../view/catalog/catalog-main.html";
        },
    })

}

$('#fast_signin').on('click',fastsignin);