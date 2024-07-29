$(document).ready(function () {

    let backendurl = "http://localhost:8000"

    // fecth carts
    let userid = window.localStorage.getItem('userid');
    $.ajax({
        type: "get",
        url: `http://localhost:8000/fetchcart/${userid}`,
        dataType: "json",
        success: function (response) {

            // display total amount and Items added to cart
            let totalprice = 0;
            let totalitem = 0;
            $.map(response, function (each, index) {
                totalprice += each.qty * each.food.price
                totalitem += each.qty
            })
            localStorage.setItem("amount", totalprice)
            $('#totalitem').append(totalitem)
            $('#totalprice').append(totalprice)



            $.map(response, function (each, index) {
                let cart = `
            <div class="row mb-3">
                <div class="col-md-3">
                    <img src="${backendurl + each.food.image}" class="img-fluid food-img" alt="Item 1">
                    <h5>${each.food.name}</h5>
                    // <p>${each.food.description} </p>
                </div>
                <div class="col-md-3">
                    <div class="quantity">
                        <button class="btn btn-danger btn-sm"> - </button>
                        <input type="number" class="form-control" value="${each.qty}">
                        <button class="btn btn-danger btn-sm"> + </button>
                    </div>
                </div>
                <div class="col-md-3">
                    <p class="mb-0"> &#8358; ${each.food.price}</p>
                </div>
                <div class="col-md-3">
                    <p class="mb-0"> &#8358; ${each.qty * each.food.price}</p>
                </div>
            </div>
           
           `;
                $('#carts').append(cart)

            })
        }
    });




});

//setting up paystack
$('#Checkout').click(function(){
    payWithPaystack(); //call the function to initiate payment
})

const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener("submit", payWithPaystack, false);

function payWithPaystack() {

    let handler = PaystackPop.setup({
        key: 'pk_test_aa5827817dbb4d7d63db83d2f1ac1b16719f2152', // Replace with your public key
        // email: document.getElementById("email-address").value,
        email: 'testing@gmail.com',
        amount: localStorage.getItem('amount'),
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
            alert('Window closed.');
        },
        callback: function (response) {
            let message = 'Payment complete! Reference: ' + response.reference;
            alert(message);
        }
    });

    handler.openIframe();
}
