$('#shippingAddressRequired').on('click',shippingShow);

const  confirmOrder= function(){
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type        :"POST",
            url         :"http://localhost:8090/order/confirmOrder",
            dataType    :'json',
            data        :{  cardType                    :   $('#cardType').val(),
                            creditCard                  :   $('#creditCard').val(),
                            shippingAddressRequired     :   $("#shippingAddressRequired").get(0).checked,
                            expiryDate                  :   $('#expiryDate').val(),

                            firstName                   :   $('#firstName').val(),
                            lastName                    :   $('#lastName').val(),
                            address1                    :   $('#address1').val(),
                            address2                    :   $('#address2').val(),
                            city                        :   $('#city').val(),
                            state                       :   $('#state').val(),
                            zip                         :   $('#zip').val(),
                            country                     :   $('#country').val(),
        },
            success :function(res){
                if(res.status===0){
                        //todo登录成功
                        //header.init();
                        console.log($("#shippingAddressRequired").get(0).checked);
                        console.log("订单修改成功");
                        window.location.href = "../../view/order/confirm-order.html";
                }   
                else{
                    //todo请求失败
                } 
            },
            error :function (){
                window.alert('data');
            }
        });
}


$('#submit').on('click',confirmOrder);

const getCart = function(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type    :"GET",
        url     :"http://localhost:8090/order/getOrder",
        success :function(res){

             let data = res.data;
         
             $('#cardType').val(data.cardType);
             $('#creditCard').val(data.creditCard);
             $('#expiryDate').val(data.expiryDate);

             $('#billToFirstName').val(data.billToFirstName);
             $('#billToLastName').val(data.billToLastName);
             $('#billAddress1').val(data.billAddress1);
             $('#billAddress2').val(data.billAddress2);
             $('#billCity').val(data.billCity);
             $('#billState').val(data.billState);
             $('#billZip').val(data.billZip);
             $('#billCountry').val(data.billCountry);




            //  $('#shipToFirstName').text(data.shipToFirstName);
            //  $('#shipToLastName').text(data.shipToLastName);
            //  $('#shipAddress1').text(data.shipAddress1);
            //  $('#shipAddress2').text(data.shipAddress2);
            //  $('#shipCity').text(data.shipCity);
            //  $('#shipState').text(data.shipState);
            //  $('#shipZip').text(data.shipZip);
            //  $('#shipCountry').text(data.shipCountry);

            //  $('#courier').text(data.courier);
            //  $('#totalPrice').text(data.totalPrice);


             

        },
        error :function (){
            window.alert('data');
        }
    });   
};
getCart();


function shippingShow() {
    var Shipping = document.getElementById("Shipping");
    if(this.checked){
        console.log("checked");
        var ship_ToFirstName = document.getElementById("billToFirstName").value;
        var ship_ToLastName = document.getElementById("billToLastName").value;
        var ship_Address1 = document.getElementById("billAddress1").value;
        var ship_Address2 = document.getElementById("billAddress2").value;
        var ship_City = document.getElementById("billCity").value;
        var ship_State = document.getElementById("billState").value;
        var ship_Zip = document.getElementById("billZip").value;
        var ship_Country = document.getElementById("billCountry").value;
        Shipping.innerHTML = "<table id='table-3'>\n" +
            "\t<tr>\n" +
            "\t\t<th colspan=2>Shipping Address</th>\n" +
            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>First name:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input id=\"firstName\" type=\"text\" name=\"shipToFirstName\" value="+ship_ToFirstName+">\n"+

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>Last name:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input id=\"lastName\" type=\"text\" name=\"shipToLastName\" value="+ship_ToLastName+">\n"+

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>Address 1:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input id=\"address1\" type=\"text\" name=\"shipAddress1\" value="+ship_Address1+">\n"+

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>Address 2:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input id=\"address2\" type=\"text\" name=\"shipAddress2\" value="+ship_Address2+">\n"+

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>City:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input id=\"city\" type=\"text\" name=\"shipCity\" value="+ship_City+">\n"+

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>State:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input id=\"state\" type=\"text\" name=\"shipState\" value="+ship_State+">\n"+

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>Zip:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input id=\"zip\" type=\"text\" name=\"shipZip\" value="+ship_Zip+">\n"+

            "\t</tr>\n" +
            "\t<tr>\n" +
            "\t\t<td>Country:</td>\n" +
            "\t\t<td>\n" +
            "\t\t\t<input id=\"country\" type=\"text\" name=\"shipCountry\" value="+ship_Country+">\<n></n>"


    }
    else{

        Shipping.innerHTML = null;
        console.log("No Checked");
    }
}
