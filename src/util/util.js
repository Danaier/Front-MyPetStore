var config ={
    serverHost  :   'http://localhost:8090/'
}

var _util = {

    request : function(param){
        var _this=this;
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type        :   param.method||'GET',
            url         :   param.url||'',
            dataType    :   param.type||'json',
            data        :   param.data||'',
            success     :   function(res){
                if( 0 === res.status){
                    //回调，如果请求成功将请求得到的data和msg作为参数回调account-service中的函数param.success
                    typeof param.success === 'function' &&param.success(res.data,res.msg);
                }
                else if(10 === res.status){
                    _this.doLogin();
                }
                else if(1 === res.status){
                    typeof param.error === 'function' &&param.error(res.msg);
                }
            },
            error       :   function(errMsg){
                //todo:请求错误的提示
            }
        });
    },
    doLogin     : function(){
        window.location.href = '../account/signin.html?redirect='+encodeURIComponent(window.location.href);
    },
    getSeverURL :  function(path){
        return config.serverHost + path;
    }
};

module.exports =_util;