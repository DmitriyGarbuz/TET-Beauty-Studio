
// var btn = document.querySelector('.btn-white').querySelectorAll("a");

// console.log(btn[0]);

// function closeHeder() {
//     var heder = document.getElementById('menu-12');
//     heder.style.display = "none";
//     console.log(heder.style.display);
//     var closer = document.querySelector('.appointer_widget-close-button');

// };

// function openHeder() {
//     var heder = document.getElementById('menu-12');
//     heder.style.display = "block";
//     console.log(heder.style.display);

// };

// closer.addEventListener("click", openHeder);
// btn[0].addEventListener("click", function () {
//     var heder = document.getElementById('menu-12');
//     heder.style.display = "none";
//     console.log(heder.style.display);
// });


// function cliked(event) {
//     console.log(event.target);
// }

// var a = document.addEventListener("click", (e) => {
//     console.log(e.target.value);
// });
var selector = '.appointer__widget-submit-button';
var time = 1000;

function waitForElementToDisplay(selector, time) {
    if (document.querySelector(selector) != null) {
        var submit = document.querySelector(selector);
        if (submit.textContent === 'Далее') {
            setTimeout(function () {
                waitForElementToDisplay(selector, time);
            }, time);
        }
        else {
            var price
            var name = document.querySelector('.appointer__widget-selected-product-name');
            var spec = document.querySelector('.appointer__widget-selected-company-user-info');
            var close = document.querySelector('.appointer_widget-close-button');
            var back = document.querySelector('.appointer_widget-back-button');
            // console.log(cl_phone.value);

            if (document.querySelector('.appointer__widget-total-price') != null) {
                price = document.querySelector('.appointer__widget-total-price');
            } else {
                price = document.querySelector('.appointer__widget-selected-product-price');
            }

            if (price != null) {
                close.addEventListener("click", () => event_back(selector, time));
                close.addEventListener("click", event_exit);
                submit.addEventListener("click", (event) => datalayerPush(name.textContent, price.textContent, spec.textContent, event));

            } else {
                setTimeout(function () {
                    waitForElementToDisplay(selector, time);
                }, time);
            }

        }
    }
    else {
        setTimeout(function () {
            waitForElementToDisplay(selector, time);
        }, time);
    }


}



function event_back(selector, time) {
    setTimeout(function () {
        waitForElementToDisplay(selector, time);
    }, time);
}

function event_exit() {
    setTimeout(function () {
        var btn_buy = document.querySelector('.btn-buy');
        var tag_a = btn_buy.querySelector('a');
        tag_a.addEventListener("click", waitForElementToDisplay(selector, time,));
    }, 1500);
}


var btn_buy = document.querySelector('.btn-buy');
var tag_a = btn_buy.querySelector('a');
tag_a.addEventListener("click", waitForElementToDisplay(selector, time));


function datalayerPush(a, b, c, e) {
    var res_cookie = e.view.document.cookie;
    var parce = res_cookie.split(' ');

    function toObject(parce,) {
        var rv = {};
        for (var i = 0; i < parce.length; ++i) {
            var arr = parce[i].split('=');

            var key_name = arr[0];
            var data = arr[1];
            rv[key_name] = data;
        }

        if (rv['appointer__customer-name'] != undefined & rv['appointer__customer-phone'] != undefined) {
            var phone_str = rv['appointer__customer-phone'].replace(';', '');
            // console.log(phone_str);
            var now = c + " " + a;
            var price_num = b.replace(' грн', '');
            price_num = Number(price_num);
            var price_dolar = price_num / 28;
            price_dolar = price_dolar.toFixed(2);
            var client = rv['appointer__customer-name'].replace(';', '');
            client = decodeURI(client);


            dataLayer.push({ 'event': 'pokupka' });
            fbq('track', 'Purchase', { currency: "USD", content_ids: phone_str, value: price_dolar, content_name: client, content_category: a });
            dataLayer.push({
                'transactionId': phone_str,
                'transactionTotal': price_num,
                'transactionProducts': [{
                    'sku': now,
                    'name': a,
                    'price': price_num,
                    'quantity': 1
                }]
            });
        }
    }
    toObject(parce);
    // console.log(parce);
    // var phone_str = parce[1].split('=');
    // phone_str = phone_str[1].replace(';', '');
    // console.log(phone_str);
}

