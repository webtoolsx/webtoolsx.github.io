import StockCalculator from './calclib.js';


    function calculate_pl() {
        // Retrieve the input values
        let buyAtPrice = parseFloat(document.querySelector('input[name="buy_at_price"]').value);
        let sellAtPrice = parseFloat(document.querySelector('input[name="sell_at_price"]').value);
        let buyQty = parseInt(document.querySelector('input[name="buy_qty"]').value, 10);
        let sellQty = parseInt(document.querySelector('input[name="sell_qty"]').value, 10);
        let brockerage_percentage = parseFloat(document.querySelector('input[name="brockerage_percentage"]').value, 10);
    

        let $buyAtPriceInput = $('input[name="buy_at_price"]');
        let $sellAtPriceInput = $('input[name="sell_at_price"]');
        let $buyQtyInput = $('input[name="buy_qty"]');
        let $sellQtyInput = $('input[name="sell_qty"]');

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
            alert("You have maximum "+buyQty+" to sell");
            return; // Exit the function if validation fails
        }
    
        // Calculate the profit or loss
        let profit = StockCalculator.calculateProfitOrLoss(buyAtPrice, buyQty, sellAtPrice, sellQty,brockerage_percentage);
        console.log(profit);
        // Update the UI with the formatted profit/loss value

        // Select the element with class 'prof_loss_view'
        const $profLossView = $('.prof_loss_view');

        // Ensure the element exists
        if ($profLossView.length > 0) {
            // Remove all previous status classes
            $profLossView.removeClass('profit loss npnl');

            // Add the new class based on prof_status
            $profLossView.addClass(profit.prof_status);
        }

        $('#my-number').counto(  profit.profitOrLoss.toFixed(4), 500);
        $('#total_investment').counto(  profit.totalBuyValue.toFixed(4), 500);
        $('#total_brockerage').counto(  profit.brockerage_percentage_amt.toFixed(4), 500);
        
    }
    

const calculatePlButton = document.querySelector('.calculate_pl_button');

if (calculatePlButton) {
    calculatePlButton.addEventListener('click', function() {
        calculate_pl();
    });
} else {
    console.log('.calculate_pl_button not found');
}
    function shakeInput($input) {
        $input.addClass('shake');
        setTimeout(function() {
            $input.removeClass('shake');
        }, 500); // Remove the shake class after the animation completes
    }

    // Function to update the brokerage percentage
    function updateBrokerage() {
        // Get the range input element
        const rangeInput = document.getElementById('customRange3');
        
        // Get the current value of the range input
        const value = rangeInput.value;
        
        // Update the label with the new value
        const label = document.querySelector('label[for="customRange3"]');
        label.textContent = `Brokerage (${value}%)`;
        calculate_pl();
    }

    // Attach an event listener to the range input
    const customRange3 = document.getElementById('customRange3');

    if (customRange3) {
        customRange3.addEventListener('input', updateBrokerage);
    } else {
        console.log('#customRange3 not found');
    }

    function calculate_average() {
        // Get all elements with the name 'buy_at_price[]'
        const buyAtPrices = document.getElementsByName('buy_at_price[]');
        // Get all elements with the name 'buy_qty[]'
        const buyQtys = document.getElementsByName('buy_qty[]');
        
        // Initialize variables for the total price and total quantity
        let totalPrice = 0;
        let totalQuantity = 0;
        let invest_list = [];
        // Loop through all the 'buy_at_price[]' inputs
        for (let i = 0; i < buyAtPrices.length; i++) {
            // Get the value of each buy price
            const price = parseFloat(buyAtPrices[i].value);
            
            // Get the corresponding quantity for this price (assuming both arrays are aligned)
            const qty = parseInt(buyQtys[i].value, 10);
            invest_list[i]=price * qty;
            // Add the price * quantity to the total price
            totalPrice += price * qty;
    
            // Add the quantity to the total quantity
            totalQuantity += qty;
        }
    
        // Calculate the average price (if totalQuantity is not zero to avoid division by zero)
        let averagePrice = 0;
        if (totalQuantity > 0) {
            averagePrice = totalPrice / totalQuantity;
        }
    
        // Output the result (you can use it elsewhere, such as showing it in the UI)
        console.log('Total Price:', totalPrice);
        console.log('Total Quantity:', totalQuantity);
        console.log('invest_list:', invest_list);
        $('#my-number').counto(  averagePrice.toFixed(4), 500);
        invest_list.forEach((item, index) => {
            // console.log(index, item);
            // alert("#"+(index+1)+"_total_investment");
            $("#"+(index+1)+"_total_investment").html(item);
          });
        $('#total_investment').html(  totalPrice.toFixed(4));
       
    }
    

    // document.querySelector('.calculate_avg_button').addEventListener('click', function() {
    //     // This will show an alert when the button is clicked

    //         calculate_average();

    // });
// Check if the element with the class 'calculate_avg_button' exists
const button = document.querySelector('.calculate_avg_button');
    
if (button) {
    // If it exists, add the event listener
    button.addEventListener('click', function() {
        calculate_average();
    });
} else {
    // If the element doesn't exist, log an error or handle it accordingly
    console.error('Button with class "calculate_avg_button" not found.');
}


    // JavaScript to clear the input fields when the button is clicked
    // Check if the reset button exists
    // Check if the reset button exists
const resetButton = document.querySelector('.reset_button_pl_calc');

if (resetButton) {
  // If the button exists, add the event listener
  resetButton.addEventListener('click', function() {
    // Select all input elements
    const inputs = document.querySelectorAll('input');
    
    // Loop through all inputs and clear only text and number fields
    inputs.forEach(function(input) {
      // Check if the input type is 'text' or 'number'
      if (input.type === 'text' || input.type === 'number') {
        input.value = '';  // Clear the value of each matching input
      }

      if (input.name === 'brockerage_percentage') {
        // Set value to 0 for the input with name 'brockerage_percentage'
        input.value = '0';
      }

    });
    $('#my-number').counto( '0.00', 500);
    $(".calc_numbers").html('0.00');
    if(label){
        const label = document.querySelector('label[for="customRange3"]');
        label.textContent = `Brokerage (0%)`;
    }
    
  });
} else {
  console.error('Button with class "reset_button_pl_calc" not found.');
}
