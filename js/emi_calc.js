function generateLoanTable(loanAmount, annualInterestRate, tenureInYears,tenureMonths, emi) {
  let tenureInMonths = tenureInYears * 12;
    tenureInMonths = tenureInMonths + tenureMonths;
  const monthlyRate = annualInterestRate / 12;
  let balance = loanAmount;

  const tableBody = document.getElementById('loanTableBody');
  tableBody.innerHTML = ""; // Clear previous entries

  for (let month = 1; month <= tenureInMonths; month++) {
      const interest = balance * monthlyRate;
      const principal = emi - interest;
      balance -= principal;

      // Determine Payment Status
      // let status = "Paid";
      // let badgeClass = "bg-success";
      let status = "Pending";
      let badgeClass = "bg-warning";
      // if (month === tenureInMonths - 1) { status = "Pending"; badgeClass = "bg-warning"; }
      // if (month === tenureInMonths) { status = "Upcoming"; badgeClass = "bg-primary"; }

      // Generate a formatted date
      const paymentDate = new Date();
      paymentDate.setMonth(paymentDate.getMonth() + month);
      const formattedDate = paymentDate.toISOString().split('T')[0];

      // Add row to table
      const row = `
          <tr>
            
              <td>Month ${month}</td>
              <td>${emi.toFixed(2)}</td>
              <td>${principal.toFixed(2)}</td>
              <td>${interest.toFixed(2)}</td>
              <td>${Math.max(balance, 0).toFixed(2)}</td>
              <td>${formattedDate}</td>
          </tr>
      `;
      // <td><span class="badge ${badgeClass}">${status}</span></td>

      tableBody.innerHTML += row;
  }
}


document.getElementById("generateTableBtn").addEventListener("click", function () {
  const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100;
  const tenureInYears = parseFloat(document.getElementById('tenure').value);
  const tenureInMonthsInp = parseFloat(document.getElementById('tenure_month').value);

  if (!loanAmount || loanAmount <= 0) {
      alert("Please enter a valid loan amount");
      return;
  }

  let tenureInMonths = tenureInYears * 12;
    tenureInMonths = tenureInMonths + tenureInMonthsInp;
  const monthlyRate = annualInterestRate / 12;
  let emi = 0;

  if (!annualInterestRate || annualInterestRate === 0) {
      emi = loanAmount / tenureInMonths;
  } else {
      emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths) / (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
  }

  // Call generateLoanTable when button is clicked
  generateLoanTable(loanAmount, annualInterestRate, tenureInYears,tenureInMonthsInp, emi);
});




function calculateEMI() {
    // Get user inputs
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const tenureInYears = parseFloat(document.getElementById('tenure').value);
    const tenureInMonthsInp = parseFloat(document.getElementById('tenure_month').value);
    const lmelement = document.getElementById('loanAmount');
    if (!loanAmount || loanAmount <= 0) {
      shakeInput($(lmelement));
        return;
    }
    console.log('annualInterestRate',annualInterestRate);
    // Convert tenure to months
    var tenureInMonths =  12 * parseFloat(tenureInYears);
    tenureInMonths = tenureInMonths + tenureInMonthsInp;
    // alert(tenureInMonths)
    let emi = 0;
    let totalAmountPaid = 0;
    let totalInterest = 0;
    let monthlyInterestData = [];
    let monthlyPrincipalData = [];
    let balance = loanAmount;

    if (!annualInterestRate || annualInterestRate === 0) {
        // If interest rate is 0, EMI is a simple division of the loan amount by the tenure
        if (tenureInMonths === 0) {
            emi = loanAmount;
        } else {
        emi = loanAmount / tenureInMonths;
        }
        totalAmountPaid = loanAmount; // No interest means total amount paid is just the principal
        totalInterest = 0;

        // Store equal principal payments each month
        for (let month = 1; month <= tenureInMonths; month++) {
          monthlyInterestData.push("0.00"); // No interest in this case
          monthlyPrincipalData.push(emi.toFixed(2)); // Entire EMI is principal
          }
    } else {
        // Calculate monthly interest rate and EMI
        const monthlyRate = annualInterestRate / 12;
        if (tenureInMonths === 0) {
            emi = loanAmount;
        } else {
            emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths) / (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
        }
        totalAmountPaid = emi * tenureInMonths;
        totalInterest = totalAmountPaid - loanAmount;

        // Generate Interest Reduction Over Time
        for (let month = 1; month <= tenureInMonths; month++) {
          const interest = balance * monthlyRate;
          const principal = emi - interest;
          balance -= principal;
          monthlyInterestData.push(interest.toFixed(2)); // Save interest reduction over time
          monthlyPrincipalData.push(principal.toFixed(2)); // Save principal paid
      }
    }


    // Update Pie Chart Data (Loan vs Interest)
    updatePieChart(loanAmount, totalInterest);

    // Update Line Chart Data (Interest Reduction Over Time)
    updateLineChart(monthlyInterestData);

    // Update the UI with calculated values
    $(".montly_emi_value").counto(emi.toFixed(2), 500);
    
    $(".total_interest_value").counto(totalInterest.toFixed(2), 500);
    $(".loan_amount").counto(loanAmount.toFixed(2), 500);
    $(".total_amount_value").counto((loanAmount+totalInterest).toFixed(2), 500);

}

// Initialize Charts
const ctx1 = document.getElementById('lineChart').getContext('2d');
const ctx2 = document.getElementById('halfPieChart').getContext('2d');

// Line Chart (Interest Reduction)
let lineChart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Monthly Interest ($)',
            data: [],
            borderColor: 'blue',
            borderWidth: 2,
            fill: false,
            tension: 0.4
        }]
    },
    options: { responsive: true }
});

// Half Pie Chart (Loan vs Interest)
let pieChart = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['Total Loan', 'Total Interest'],
        datasets: [{
            data: [0, 0],
            backgroundColor: ['#67ff0059', '#ff2cca4f'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        cutout: '50%',
        rotation: -90,
        circumference: 180
    }
});

// Function to update Pie Chart
function updatePieChart(loanAmount, totalInterest) {
    pieChart.data.datasets[0].data = [loanAmount, totalInterest];
    pieChart.update();
}

// Function to update Line Chart
function updateLineChart(monthlyInterestData) {
    const labels = Array.from({ length: monthlyInterestData.length }, (_, i) => `Month ${i + 1}`);
    lineChart.data.labels = labels;
    lineChart.data.datasets[0].data = monthlyInterestData;
    lineChart.update();
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

const tenureMonthrangeInput = document.getElementById('tenure_month_range');
// Attach event listener to the range input
tenureMonthrangeInput.addEventListener('input', tyrcallCalculateEmiMonth);

function tyrcallCalculateEmiMonth(event) {
    // Update the input field with the range value using jQuery
    $("#tenure_month").val(event.target.value);
    // Recalculate EMI
    calculateEMI();
}