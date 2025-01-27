function calculateEMI() {
    // Get user inputs
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const tenureInYears = parseFloat(document.getElementById('tenure').value);
    const lmelement = document.getElementById('loanAmount');
    if (!loanAmount || loanAmount <= 0) {
      shakeInput($(lmelement));
        return;
    }
    console.log('annualInterestRate',annualInterestRate);
    // Convert tenure to months
    const tenureInMonths =  12 * parseFloat(tenureInYears);
    // alert(tenureInMonths)
    let emi = 0;
    let totalAmountPaid = 0;
    let totalInterest = 0;

    if (!annualInterestRate || annualInterestRate === 0) {
        // If interest rate is 0, EMI is a simple division of the loan amount by the tenure
        emi = loanAmount / tenureInMonths;
        totalAmountPaid = loanAmount; // No interest means total amount paid is just the principal
        totalInterest = 0;
    } else {
        // Calculate monthly interest rate and EMI
        const monthlyRate = annualInterestRate / 12;
        emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths) / (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
        totalAmountPaid = emi * tenureInMonths;
        totalInterest = totalAmountPaid - loanAmount;
    }

    // Update the UI with calculated values
    $(".montly_emi_value").counto(emi.toFixed(2), 500);
    $(".total_interest_value").counto(totalInterest.toFixed(2), 500);
    $(".loan_amount").counto(loanAmount.toFixed(2), 500);
    $(".total_amount_value").counto((loanAmount+totalInterest).toFixed(2), 500);


    
    // Initialize variables for EMI schedule
    // let balance = loanAmount;
    // const emiTableBody = document.querySelector('#emiTable tbody');
    // emiTableBody.innerHTML = ''; // Clear existing table rows

    // for (let month = 1; month <= tenure; month++) {
    //     const interest = balance * monthlyRate;
    //     const principal = emi - interest; 
    //     balance -= principal;

    //     // Add a new row to the table
    //     const row = document.createElement('tr');
    //     row.innerHTML = `
    //         <td>${month}</td>
    //         <td>${emi.toFixed(2)}</td>
    //         <td>${interest.toFixed(2)}</td>
    //         <td>${principal.toFixed(2)}</td>
    //         <td>${Math.max(balance, 0).toFixed(2)}</td>
    //     `;
    //     emiTableBody.appendChild(row);
    // }
}

$(function(){
    $(".calculate_emi_button").click(function(){
        calculateEMI();
    })
})

    // JavaScript to clear the input fields when the button is clicked
    // Check if the reset button exists
    // Check if the reset button exists
    const resetButton = document.querySelector('.reset_button_emi_calc');

    if (resetButton) {
      // If the button exists, add the event listener
      resetButton.addEventListener('click', function() {
        // Select all input elements
        const inputs = document.querySelectorAll('input');
        
        // Loop through all inputs and clear only text and number fields
        inputs.forEach(function(input) {
          // Check if the input type is 'text' or 'number'
        //   if (input.type === 'text' || input.type === 'number') {
        //     input.value = '';  // Clear the value of each matching input
        //   }
    
          if (input.name === 'loanAmount') {
            // Set value to 0 for the input with name 'brockerage_percentage'
            input.value = '';
          }
    
        });
        $('.my-number').counto( '0.00', 500);
        
      });
    } else {
      console.error('Button with class "reset_button_pl_calc" not found.');
    }


// Attach event listeners to all range inputs with the class "custom_range_wx"
const rangeInput = document.getElementById('interest_rate');

// Attach event listener to the range input
rangeInput.addEventListener('input', callCalculateEmi);

function callCalculateEmi(event) {
    // Update the input field with the range value using jQuery
    $("#interestRate").val(event.target.value);
    // Recalculate EMI
    calculateEMI();
}

const tenureYearrangeInput = document.getElementById('tenure_year_range');

// Attach event listener to the range input
tenureYearrangeInput.addEventListener('input', tyrcallCalculateEmi);

function tyrcallCalculateEmi(event) {
    // Update the input field with the range value using jQuery
    $("#tenure").val(event.target.value);
    // Recalculate EMI
    calculateEMI();
}