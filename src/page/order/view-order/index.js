const getCart = function(){
       $.ajax({
           xhrFields: {
               withCredentials: true
           },
           type    :"GET",
           url     :"http://localhost:8090/order/getOrder",
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

                $('#courier').text(data.courier);
                $('#totalPrice').text(data.totalPrice);

                let i;
                for(i=0;i<data.lineItems.length;i++){
                    let html =  "<tr>"+
                                    "<td>"+data.lineItems[i].item.itemId+"</td>"+
                                    "<td>"+
                                        "<b>"+data.lineItems[i].item.attribute1+"</b>"+
                                        // "<b>"+data.lineItems[i].item.attribute2+"</b>"+
                                        // "<b>"+data.lineItems[i].item.attribute3+"</b>"+
                                        //"<b>"+data.lineItems[i].item.attribute4+"</b>"+
                                        // "<b>"+data.lineItems[i].item.attribute5+"</b>"+
                                    "</td>"+
                                    "<td>"+data.lineItems[i].quantity+"</td>"+
                                    "<td>"+data.lineItems[i].unitPrice+"</td>"+  
                                        //"<fmt:formatNumber th:text="${lineItem.unitPrice}" pattern="$#,##0.00" />"
                                    "</tr>";

                                    $('#lineItems').after(html);   
                }
                
 
           },
           error :function (){
               window.alert('data');
           }
       });   
};


getCart();