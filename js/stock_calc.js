import StockCalculator from './calclib.js';

function calculate_pl() {
    // Retrieve the input values
    let buyAtPrice = parseFloat(document.querySelector('input[name="buy_at_price"]').value);
    let sellAtPrice = parseFloat(document.querySelector('input[name="sell_at_price"]').value);
    let buyQty = parseInt(document.querySelector('input[name="buy_qty"]').value, 10);
    let sellQty = parseInt(document.querySelector('input[name="sell_qty"]').value, 10);
    var brockerage_percentage = parseFloat(document.querySelector('input[name="brockerage_percentage"]').value, 10);

    let $buyAtPriceInput = $('input[name="buy_at_price"]');
    let $sellAtPriceInput = $('input[name="sell_at_price"]');
    let $buyQtyInput = $('input[name="buy_qty"]');
    let $sellQtyInput = $('input[name="sell_qty"]');
    var pl_brokerage_type = document.querySelector('input[name="pnl_brocker_type_calc_radio"]:checked').value;

    if (pl_brokerage_type == 'flat') {
        brockerage_percentage = parseFloat(document.querySelector('input[name="brockerage_flat"]').value);

        // If the parsed value is NaN, set it to 0
        if (isNaN(brockerage_percentage)) {
            brockerage_percentage = 0;
        }
    }

    let allValid = true;

    // Validate inputs and shake invalid ones
    if (isNaN(buyAtPrice) || buyAtPrice <= 0) {
        shakeInput($buyAtPriceInput);
        allValid = false;
    }
    if (isNaN(sellAtPrice) || sellAtPrice <= 0) {
        shakeInput($sellAtPriceInput);
        allValid = false;
    }
    if (isNaN(buyQty) || buyQty <= 0) {
        shakeInput($buyQtyInput);
        allValid = false;
    }
    if (isNaN(sellQty) || sellQty <= 0 || sellQty > buyQty) {
        shakeInput($sellQtyInput);
        allValid = false;
    }

    // If any input is invalid, halt further processing
    if (!allValid) {
        return;
    }

    // Validation: Sell quantity must be less than or equal to buy quantity
    if (sellQty > buyQty) {
        alert("You have maximum " + buyQty + " to sell");
        return; // Exit the function if validation fails
    }

    // Calculate the profit or loss
    let profit = StockCalculator.calculateProfitOrLoss(buyAtPrice, buyQty, sellAtPrice, sellQty, brockerage_percentage, pl_brokerage_type);
    console.log(profit);

    // Update the UI with the formatted profit/loss value
    const $profLossView = $('.prof_loss_view');

    if ($profLossView.length > 0) {
        $profLossView.removeClass('profit loss npnl');
        $profLossView.addClass(profit.prof_status);
    }

    $('#my-number').counto(profit.profitOrLoss.toFixed(2), 500);
    $('#total_investment').counto(profit.totalBuyValue.toFixed(2), 500);
    $('#total_brockerage').counto(profit.brockerage_percentage_amt.toFixed(2), 500);
    $('.calc_pl_percentage').counto(profit.profitPercentage, 500);

    var x = [
        { 'title': 'Total Invest', quantity: profit.totalBuyValue },
        { 'title': 'Profit', quantity: Math.abs(profit.profitOrLoss) },
    ];

    let arrowElement = document.getElementById("pl_updown_arrow");

    if (profit.prof_status == 'profit') {
        arrowElement.classList.remove("fa-arrow-down");
        arrowElement.classList.add("fa-arrow-up");
    } else if (profit.prof_status == 'loss') {
        arrowElement.classList.remove("fa-arrow-up");
        arrowElement.classList.add("fa-arrow-down");
    } else {
        arrowElement.classList.remove("fa-arrow-up", "fa-arrow-down");
    }
}

const calculatePlButton = document.querySelector('.calculate_pl_button');

$(document).ready(function () {
    $('input[name="pnl_brocker_type_calc_radio"]').change(function () {
        if ($(this).val() == 'percentage') {
            $("#pnl_brocker_type_flat_block").hide();
            $("#pnl_brocker_type_percentage_block").show();
        } else {
            $("#pnl_brocker_type_percentage_block").hide();
            $("#pnl_brocker_type_flat_block").show();
        }
        calculate_pl();
    });

    $('input').on('keydown', function (event) {
        if (event.key === 'Enter') {
            calculate_pl();
        }
    });
});

if (calculatePlButton) {
    calculatePlButton.addEventListener('click', function () {
        calculate_pl();
    });
} else {
    console.log('.calculate_pl_button not found');
}

function shakeInput($input) {
    $input.addClass('shake');
    setTimeout(function () {
        $input.removeClass('shake');
    }, 500); // Remove the shake class after the animation completes
}

// Function to update the brokerage percentage
function updateBrokerage() {
    const rangeInput = document.getElementById('customRange3');
    const value = rangeInput.value;
    const label = document.querySelector('label[for="customRange3"]');
    label.textContent = `Brokerage (${value}%)`;
    calculate_pl();
}

const customRange3 = document.getElementById('customRange3');

if (customRange3) {
    customRange3.addEventListener('input', updateBrokerage);
} else {
    console.log('#customRange3 not found');
}

function calculate_average() {
    const buyAtPrices = document.getElementsByName('buy_at_price[]');
    const buyQtys = document.getElementsByName('buy_qty[]');
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('shake'));

    let totalPrice = 0;
    let totalQuantity = 0;
    let invest_list = [];

    for (let i = 0; i < buyAtPrices.length; i++) {
        const price = parseFloat(buyAtPrices[i].value);
        const qty = parseInt(buyQtys[i].value, 10);

        if (price == '' || qty == '' || isNaN(price) || isNaN(qty)) {
            if (price == '' || isNaN(price)) {
                shakeInput($(buyAtPrices[i]));
            }
            if (qty == '' || isNaN(qty)) {
                shakeInput($(buyQtys[i]));
            }
            return; // Stop further execution
        }

        invest_list[i] = price * qty;
        totalPrice += price * qty;
        totalQuantity += qty;
    }

    let averagePrice = 0;
    if (totalQuantity > 0) {
        averagePrice = totalPrice / totalQuantity;
    }

    console.log('Total Price:', totalPrice);
    console.log('Total Quantity:', totalQuantity);
    console.log('invest_list:', invest_list);
    $('#my-number').counto(averagePrice.toFixed(4), 500);
    $('#total_investment').html(totalPrice.toFixed(4));
}

const button = document.querySelector('.calculate_avg_button');

$('input').on('keydown', function (event) {
    if (event.key === 'Enter') {
        calculate_average();
    }
});

if (button) {
    button.addEventListener('click', function () {
        calculate_average();
    });
}

const resetButton = document.querySelector('.reset_button_pl_calc');

if (resetButton) {
    resetButton.addEventListener('click', function () {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(function (input) {
            if (input.type === 'text' || input.type === 'number') {
                input.value = '';
            }
            if (input.name === 'brockerage_percentage') {
                input.value = '0';
            }
        });
        $('#my-number').counto('0.00', 500);
        $(".calc_numbers").html('0.00');
        $('.calc_pl_percentage').counto('0', 500);
        const label = document.querySelector('label[for="customRange3"]');
        let arrowElement = document.getElementById("pl_updown_arrow");
        arrowElement.classList.remove("fa-arrow-up", "fa-arrow-down");

        if (label) {
            label.textContent = `Brokerage (0%)`;
        }
    });
} else {
    console.error('Button with class "reset_button_pl_calc" not found.');
}

const button_percent_change = document.querySelector('.calculate_percentage_change_button');

if (button_percent_change) {
    button_percent_change.addEventListener('click', function () {
        calculatePercentageChange();
    });
}

$(document).ready(function () {
    $('input[name="percent_calc_radio"]').change(function () {
        calculatePercentageChange();
    });
});

$('input').on('keydown', function (event) {
    if (event.key === 'Enter') {
        calculatePercentageChange();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let firstInput = document.getElementById("first_value");
    let secondInput = document.getElementById("second_value");

    if (firstInput && secondInput) {
        firstInput.addEventListener("input", handleInputPercentageChange);
        secondInput.addEventListener("input", handleInputPercentageChange);
    }
});

function handleInputPercentageChange() {
    let firstValue = document.getElementById("first_value").value;
    let secondValue = document.getElementById("second_value").value;

    if (firstValue.trim() !== "" && secondValue.trim() !== "") {
        calculatePercentageChange();
    }
}

let chartPchange; // Global variable for chart instance
function calculatePercentageChange() {
    var firstValue = parseFloat(document.getElementById("first_value").value);
    var secondValue = parseFloat(document.getElementById("second_value").value);
    var percent_calc_radio = document.querySelector('input[name="percent_calc_radio"]:checked').value;

    if (percent_calc_radio == 'p_change') {
        $(".difference_block").show();
        if (isNaN(firstValue) || isNaN(secondValue)) {
            if (isNaN(firstValue)) shakeInput($('#first_value'));
            if (isNaN(secondValue)) shakeInput($('#second_value'));
            return;
        }
    } else {
        $(".difference_block").hide();
        if (isNaN(firstValue) || isNaN(secondValue)) {
            if (isNaN(firstValue)) shakeInput($('#first_value'));
            if (isNaN(secondValue)) shakeInput($('#second_value'));
            return;
        }
    }

    if (percent_calc_radio == 'p_change') {
        var percentageChange = ((secondValue - firstValue) / firstValue) * 100;
        var pctg = percentageChange.toFixed(2);
        var changeType = percentageChange > 0 ? "increase" : (percentageChange < 0 ? "decrease" : "no change");
        var difference = secondValue - firstValue;
        var numberElement = document.getElementById("my-number");
        $('#my-number').counto(pctg, 500);
        $(".pctg_change_msg").html(secondValue + " is " + pctg + "% " + changeType);
        $("#pctg_diff_amt").html(difference);
    } else {
        var difference = secondValue - firstValue;
        var percentageChange = ((firstValue / secondValue)) * 100;
        var pctg = percentageChange.toFixed(2);
        var numberElement = document.getElementById("my-number");
        $('#my-number').counto(pctg, 500);
        $(".pctg_change_msg").html(firstValue + " is " + pctg + "% of " + secondValue);
    }

    if (percentageChange > 0) {
        numberElement.classList.add("profit");
        numberElement.classList.remove("loss");
    } else if (percentageChange < 0) {
        numberElement.classList.add("loss");
        numberElement.classList.remove("profit");
    } else {
        numberElement.classList.remove("profit", "loss");
    }



    const ctx = document.getElementById('changeChart').getContext('2d');
    if (chartPchange) {
        // Update existing chartPchange
        chartPchange.data.datasets[0].data = [firstValue];
        chartPchange.data.datasets[1].data = [secondValue];
        chartPchange.update(); // Refresh the chartPchange
    } else {
        // Create a new chartPchange if it doesn't exist
        chartPchange = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [""], // Hide labels
                datasets: [{
                    data: [firstValue],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235)',
                    borderWidth: 1,
                    borderRadius: 5,
                }, {
                    data: [secondValue],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132)',
                    borderWidth: 1,
                    borderRadius: 5,
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y', // Horizontal bars
                plugins: {
                    legend: { display: false } // Hide legend
                },
                scales: {
                    x: { beginAtZero: true }
                }
            }
        });
    }

}

const addnewAvgEntryBtn = document.getElementById("addnewAvgEntry");
if (addnewAvgEntryBtn) {
    document.getElementById("addnewAvgEntry").addEventListener("click", function () {
        let container = document.getElementById("buyFieldsContainer");
        let newEntry = document.createElement("div");
        newEntry.classList.add("row", "buy-entry");
        newEntry.innerHTML = `
            <div class="col-md-6 mb-3">
                <div class="input-group">
                    <span class="input-group-text input-group-text-buy"><img src="images/uparrow.svg" class="buy_sell_image_size"></span>
                    <input type="number" name="buy_at_price[]" class="form-control input_buysell_size" placeholder="Buy at" aria-label="Buy Price">
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="input-group">
                    <span class="input-group-text input-group-text-qty"><img src="images/qty.svg" class="buy_sell_image_size"></span>
                    <input type="number" name="buy_qty[]" class="form-control input_buysell_size" value="1" placeholder="Quantity" aria-label="Quantity">
                    <button type="button" class="btn btn-danger remove-entry">-</button>
                </div>
            </div>
        `;
        container.appendChild(newEntry);
    });
}

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-entry")) {
        event.target.closest(".buy-entry").remove();
        calculate_average();
    }
});