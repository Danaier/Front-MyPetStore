var _util = require('util/util.js');


var fitemId,fattribute1,fproductname,fdescription;

var fadetime = 100;

var flw1 = "<table>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "";

    // "                <image th:src=\"${product.description}\"/>\n"

var flw2 =
    ""+
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" ;

     // "                <b>${sessionScope.item.itemId}</b>\n"

var flw3 =
"            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <b><font size=\"4\">\n" ;


 // "                    ${sessionScope.item.attribute1}"


var flw4 =

    // "                    ${sessionScope.item.attribute2}\n" +
    // "                    ${sessionScope.item.attribute3}\n" +
    // "                    ${sessionScope.item.attribute4}\n" +
    // "                    ${sessionScope.item.attribute5}\n" +
    "                </font></b>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>" ;


    // "${sessionScope.product.name}"




var flw5 =
    "</td>\n"+
    "        </tr>\n" +
    // "        <tr>\n" +
    // "            <td><c:if test=\"${sessionScope.item1<=0}\">Back ordered</c:if>\n" +
    // "                <c:if test=\"${sessionScope.item1>0}\">${sessionScope.item1} in stock.</c:if>\n" +
    //
    // "            </td>\n" +
    // "        </tr>\n" +
    // "        <tr>\n" +
    // "            <td>\n" +
    // "                <fmt:formatNumber value=\"${sessionScope.item.listPrice}\"\n" +
    // "                                  pattern=\"$#,##0.00\"/>\n" +
    // "            </td>\n" +
    // "        </tr>\n" +
    // "        <tr>\n" +
    // "            <td>\n" +
    // "                <a class=\"Button\" href=\"addItemToServlet?workingItemId=${item.itemId}\">Add to Cart</a>\n" +
    // "            </td>\n" +
    // "        </tr>\n" +
    "    </table>";

function mousePosition(ev){
    ev = ev || window.event;
    if(ev.pageX || ev.pageY){
        return {x:ev.pageX, y:ev.pageY};
    }
    return {
        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y:ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}

var map = new Map();

map.set("Birdspic"      , "EST-18");
map.set("Fishpic"       , "EST-4" );
map.set("Dogspic"       , "EST-6" );
map.set("Reptilespic"   , "EST-13");
map.set("Catspic"       , "EST-16");
map.set("Birds2pic"     , "EST-18");


var _floatingWindow = function(){

    $("#tooltip").hide();

    $(".ImageInMain").mouseover(function(e){

        var   id = $(this).attr("id"); 
        // console.log(id);

        _util.request({
            url      : _util.getSeverURL("catalog/items/")+map.get(id),
            success  : function (data,msg) {
                // console.log(msg);
                fdescription = data.productDescription;
                fitemId = data.itemId;
                fattribute1 = data.attribute1;
                fproductname = data.productName;

                //获取鼠标位置函数
                var mousePos = mousePosition(e);
                var  xOffset = 20;
                var  yOffset = 25;
                $("#tooltip").css("display","block").css("position","absolute").css("top",(mousePos.y - yOffset) + "px").css("left",(mousePos.x + xOffset) + "px");
                var flw = flw1+fdescription+flw2+fitemId+flw3+fattribute1+flw4+fproductname+flw5;
                $("#tooltip").empty();
                $("#tooltip").append(flw);
                $("#tooltip").hide();
                $("#tooltip").fadeIn(fadetime);
           }
        })

    });

    //鼠标离开表格隐藏悬浮框
    $(".ImageInMain").mouseout(function(){
        // $("#tooltip").fadeOut(500)
        $("#tooltip").empty();
        $("#tooltip").css("display","none");
    });

}

module.exports = _floatingWindow;

