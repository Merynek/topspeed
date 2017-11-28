$( document ).ready(function() {
    var TWELVE_HOURS_PRICE = 4490,
        ONE_DAY_PRICE = 5500,
        TWO_DAY_PRICE = 8500,
        THREE_DAY_PRICE = 9600,
        FOUR_DAY_PRICE = 11230,
        FIVE_DAY_PRICE = 12500,
        WEEKEND_PRICE = 9000,
        HALF_HOUR_PRICE = 2000,
        HOUR_PRICE = 4000,
        currentPrice = TWELVE_HOURS_PRICE; //default

    var orderObject = {
        street: null,
        city: null,
        psc: null,
        customerName: null,
        customerStreet: null,
        customerCity: null,
        customerPsc: null,
        customerEmail: null,
        customerPhone: null,
        payMethod: "",
        duration: 1,
        delivery: 1
    };

    var orderMethod = "normal";

    $("#total-price").text(currentPrice);
    
    $("#borow-button").click(function () {
        if (orderMethod !== "normal") {
        } else {
            if(!firstStepIsValid()) {
                return;
            }
        }
        $("#borow-button").closest('.carousel').carousel('next');
    });

    //on click to recapitulaiton
    $("#order-continue").click(function () {
        if (!secondStepIsValid()) {
            if ($("#order-reservation-now").is(':checked')) {
                //todo   
            }
            return;
        }
        $("#order-continue").closest('.carousel').carousel('next');
        $("#overview-name").text(orderObject.customerName);
        $("#overview-street").text(orderObject.customerStreet);
        $("#overview-city").text(orderObject.customerCity);
        $("#overview-psc").text(orderObject.customerPsc);
        $("#overview-email").text(orderObject.customerEmail);
        $("#overview-phone").text(orderObject.customerPhone);
        $("#overview-pay-method").text(orderObject.payMethod);
    });

    /*RADIO BUTTON METHOD*/
    $(".drive-method").change(function () {
        if($("input[type='radio'].drive-method").is(':checked')) {
            var radioMethod = $("input[type='radio'].drive-method:checked").val();
    
            switch(radioMethod) {
                case "enjoy":
                    orderMethod = "onjoy";
                    $(".enjoyElement").show();
                    $(".normalElement").hide();
                    $(".form-item.street").hide();
                    $(".form-item.city").hide();
                    $(".form-item.psc").hide();
                    $("#total-price").text(HALF_HOUR_PRICE);
                    break;
                case "normal":
                    orderMethod = "normal";
                    $(".enjoyElement").hide();
                    $(".normalElement").show();
                    $(".form-item.street").show();
                    $(".form-item.city").show();
                    $(".form-item.psc").show();
                    $("#total-price").text(TWELVE_HOURS_PRICE);
                    break;
            }
        }
    });

    //change order-enjoy
    $("#order-enjoy").change(function() {
        var orderEnjoy = $("#order-enjoy");

        switch(orderEnjoy.val()) {
            case "1":
                currentPrice = HALF_HOUR_PRICE;
                orderObject.days = 1;
                break;
            case "2":
                currentPrice = HOUR_PRICE;
                orderObject.days = 2;
                break;
        }
        $("#total-price").text(currentPrice);
    });
    //change order time
    $("#order-time").change(function() {
        var orderTime = $("#order-time");

        switch(orderTime.val()) {
            case "1":
                currentPrice = TWELVE_HOURS_PRICE;
                orderObject.days = 1;
                break;
            case "2":
                currentPrice = ONE_DAY_PRICE;
                orderObject.days = 2;
                break;
            case "3":
                currentPrice = TWO_DAY_PRICE;
                orderObject.days = 3;
                break;
            case "4":
                currentPrice = THREE_DAY_PRICE;
                orderObject.days = 4;
                break;
            case "5":
                currentPrice = FOUR_DAY_PRICE;
                orderObject.days = 5;
                break;
            case "6":
                currentPrice = FIVE_DAY_PRICE;
                orderObject.days = 6;
                break;
            case "7":
                currentPrice = WEEKEND_PRICE;
                orderObject.days = 7;
                break;
        }
        $("#total-price").text(currentPrice);
    });

    //change delivery car
    $("#order-delivery").change(function() {
        var orderDelivery = $("#order-delivery");

        switch(orderDelivery.val()) {
            case "1":
                orderObject.delivery = 1;
                break;
            case "2":
                orderObject.delivery = 2;
                break;
            case "3":
                orderObject.delivery = 3;
                break;
        }
    });

    function firstStepIsValid() {
        var street = $("#order-street"),
            city = $("#order-city"),
            psc = $("#order-psc"),
            isValid = true;

        street.removeClass("error");
        city.removeClass("error");
        psc.removeClass("error");

        if (!street.val()) {
            isValid = false;
            street.addClass("error");
        }
        orderObject.street = street.val();

        if (!city.val()) {
            isValid = false;
            city.addClass("error");
        }
        orderObject.city = city.val();

        if (!psc.val()) {
            isValid = false;
            psc.addClass("error");
        }
        orderObject.psc = psc.val();

        return isValid;
    }

    function secondStepIsValid() {
        var customerName = $("#order-customer-name"),
            customerStreet = $("#order-customer-street"),
            customerCity = $("#order-customer-city"),
            customerPsc = $("#order-customer-psc"),
            customerEmail = $("#order-customer-email"),
            customerPhone = $("#order-customer-phone"),
            agreeIsChecked = $('#order-agree')[0].checked,
            agreeInput = $(".content-order .checkboxInput"),
            isValid = true;

        customerName.removeClass("error");
        customerStreet.removeClass("error");
        customerCity.removeClass("error");
        customerPsc.removeClass("error");
        customerEmail.removeClass("error");
        customerPhone.removeClass("error");
        agreeInput.removeClass("error");

        if(!agreeIsChecked) {
            agreeInput.addClass("error");
            isValid = false;
        }

        if (!customerName.val()) {
            isValid = false;
            customerName.addClass("error");
        }
        orderObject.customerName = customerName.val();

        if (!customerStreet.val()) {
            isValid = false;
            customerStreet.addClass("error");
        }
        orderObject.customerStreet = customerStreet.val();

        if (!customerCity.val()) {
            isValid = false;
            customerCity.addClass("error");
        }
        orderObject.customerCity = customerCity.val();

        if (!customerPsc.val()) {
            isValid = false;
            customerPsc.addClass("error");
        }
        orderObject.customerPsc = customerPsc.val();

        if (!customerEmail.val() || !validateEmail(customerEmail.val())) {
            isValid = false;
            customerEmail.addClass("error");
        }
        orderObject.customerEmail = customerEmail.val();

        if (!customerPhone.val()) {
            isValid = false;
            customerPhone.addClass("error");
        }
        orderObject.customerPhone = customerPhone.val();
        orderObject.payMethod = $("#order-customer-pay-method").val();

        return isValid;
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});

