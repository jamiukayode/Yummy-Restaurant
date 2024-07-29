$(document).ready(function () {

    // fetch all foods

    let backendurl = "http://localhost:8000"

    $.ajax({
        type: "get",
        crossDomain: true,
        url: "http://localhost:8000/foods/",
        dataType: "json",
        success: function (response) {
            $.map(response, function (food, index) {
                let eachFood = `<div class="col-lg-4 menu-item ">
                
                <a href="${backendurl + food.image}" class="glightbox"><img src="${backendurl + food.image}" class="menu-img img-fluid rounded-3" alt=""></a>
                <h5>${food.name}</h5> <hr/>
                <i>${food.description}</i>
               
                <p class="price">
                  ${food.price}
                </p>
                <button onclick= "addToCart (${food.id})" class="btn btn-outline-danger rounded-3"> Add </button>
              </div>`

                $("#foods").append(eachFood)
            });
        },

        error: function (error) {
            console.log(error);
        }
    });


});


// signup 

$('#signupform').submit(function (e) {
    e.preventDefault()

    let form = new FormData(e.currentTarget)

    $.ajax({
        type: "post",
        url: "http://localhost:8000/signup/",
        data: form,
        dataType: "json",
        processData: false,
        cache: false,
        contentType: false,
        success: function (response) {
            alert("Signup successful");
            window.location.href = '/login.html';
        },
        error: function (error) {
            $.map(error.responseJSON, function (value, key) {
                alert(key + ': ' + value)
            });
        }
    });

})




//login 

$('#loginForm').submit(function (e) {
    e.preventDefault()

    let form = new FormData(e.currentTarget)

    $.ajax({
        type: "post",
        url: "http://localhost:8000/login/",
        data: form,
        dataType: "json",
        processData: false,
        cache: false,
        contentType: false,
        success: function (response) {
            localStorage.setItem("userid", response)
            localStorage.setItem("login", true)
            alert("Login successful");
            window.location.href = '/index.html';   
        },
        error: function (error) {
            $.map(error.responseJSON, function (value, key) {
                alert(key + ': ' + value)
            });
        }
    });

})

// Add to cart
function addToCart(id){
    let userid = localStorage.getItem('userid');

    if( userid == null ){
        window.location.href = '/login.html';
    }
    else{
        $.ajax({
            type: "get",
            url: `http://localhost:8000/addtocart/${userid}/${id}`,
            dataType: "json",
            contentType: false,
            processData:false,
            cache:false,
            success: function (response) {
                alert('added successfully');
                window.location.href = '/cart.html';
            },
            error: function (error) {
                alert(error.responseJSON)
            }
        });
    }
}


// fecth carts
let userid = window.localStorage.getItem('userid');
$.ajax({
    type: "get",
    url: `http://localhost:8000/fetchcart/${userid}`,   
    dataType: "json",
    success: function (response) {
        // total item in cart
        let total = 0;
        $.map(response,function (food, index){
            total+= food.total
        });

        $("#total").text(total)
    }
});



// Book a table 

$('#bookTableForm').submit(function (e) {
    e.preventDefault()

    let form = new FormData(e.currentTarget)

    $.ajax({
        type: "post",
        url: "http://localhost:8000/booktable/",
        data: form,
        dataType: "json",
        processData: false,
        cache: false,
        contentType: false,
        success: function (response) {
            alert("You have reserved a table in our restaurant, look forward to see you soon");
            window.location.href = '/index.html';
        },
        error: function (error) {
            $.map(error.responseJSON, function (value, key) {
                alert(key + ': ' + value)
            });
        }
    });

})


// send a message 

$('#sendMessageForm').submit(function (e) {
    e.preventDefault()

    let form = new FormData(e.currentTarget)

    $.ajax({
        type: "post",
        url: "http://localhost:8000/message/",
        data: form,
        dataType: "json",
        processData: false,
        cache: false,
        contentType: false,
        success: function (response) {
            alert("You have sent a message to us, we will respond to you soon! ");
            window.location.href = '/index.html';
        },
        error: function (error) {
            $.map(error.responseJSON, function (value, key) {
                alert(key + ': ' + value)
            });
        }
    });

})
