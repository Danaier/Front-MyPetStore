const getCart = function(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type    :"GET",
        url     :"http://localhost:8090/order/getConfirmOrder",
        success :function(res){

             let data = res.data;
         
             $('#cardType').text(data.cardType);
             //$('#cardType').after("<b>"+data.cardType+"</b>");
             //$('#cardType').text(''+data.lineItems.length);
             $('#creditCard').text(data.creditCard);
             $('#expiryDate').text(data.expiryDate);

             $('#billToFirstName').text(data.billToFirstName);
             $('#billToLastName').text(data.billToLastName);
             $('#billAddress1').text(data.billAddress1);
             $('#billAddress2').text(data.billAddress2);
             $('#billCity').text(data.billCity);
             $('#billState').text(data.billState);
             $('#billZip').text(data.billZip);
             $('#billCountry').text(data.billCountry);


             $('#shipToFirstName').text(data.shipToFirstName);
             $('#shipToLastName').text(data.shipToLastName);
             $('#shipAddress1').text(data.shipAddress1);
             $('#shipAddress2').text(data.shipAddress2);
             $('#shipCity').text(data.shipCity);
             $('#shipState').text(data.shipState);
             $('#shipZip').text(data.shipZip);
             $('#shipCountry').text(data.shipCountry);
             

        },
        error :function (){
            window.alert('data');
        }
    });   
};


getCart();