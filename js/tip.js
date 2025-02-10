document.addEventListener("DOMContentLoaded", function () {
    const billAmountInput = document.querySelector("input[name='bill_amount']");
    const numberOfPeopleInput = document.querySelector("input[name='number_of_people']");
    const tipPercentageInput = document.querySelector("input[name='tip_percentage']");
    const tipFlatInput = document.querySelector("input[name='tip_flat']");
    const tipPercentageBlock = document.getElementById("tip_percentage_block");
    const tipFlatBlock = document.getElementById("tip_flat_block");
    const tipTypeRadios = document.querySelectorAll("input[name='pnl_brocker_type_calc_radio']");
    const calculateButton = document.querySelector(".calculate_tip_button");
    const resetButton = document.querySelector(".reset_button_tip_calc");

    // Update the tip percentage label dynamically
    tipPercentageInput.addEventListener("input", function () {
        this.previousElementSibling.textContent = `Tip (${this.value}%)`;
    });

    // Toggle between percentage and flat tip input fields
    tipTypeRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "percentage") {
                tipPercentageBlock.style.display = "block";
                tipFlatBlock.style.display = "none";
            } else {
                tipPercentageBlock.style.display = "none";
                tipFlatBlock.style.display = "block";
            }
        });
    });

    // Function to calculate the tip
    function calculateTip() {
        let billAmount = parseFloat(billAmountInput.value) || 0;
        let numberOfPeople = parseInt(numberOfPeopleInput.value) || 1;
        let tipAmount = 0;

        // Check if percentage tip is selected
        if (document.querySelector("input[value='percentage']").checked) {
            let tipPercentage = parseFloat(tipPercentageInput.value) || 0;
            tipAmount = (billAmount * tipPercentage) / 100;
        } 
        // If flat tip is selected
        else {
            tipAmount = parseFloat(tipFlatInput.value) || 0;
        }

        let totalAmount = billAmount + tipAmount;
        let tipPerPerson = tipAmount/numberOfPeople;
        let amountPerPerson = totalAmount / numberOfPeople;
        $('#my-number').counto(amountPerPerson.toFixed(2), 500);
        $('#my-number-tip-per-person').counto(tipPerPerson.toFixed(2), 500);
        $('#my-number-tip-amt').counto(tipAmount.toFixed(2), 500);
        $('#my-number-bill-amt').counto(totalAmount.toFixed(2), 500);

        
        // alert(`Total Bill: $${totalAmount.toFixed(2)}\nTip Amount: $${tipPerPerson.toFixed(2)}\nEach Person Pays: $${amountPerPerson.toFixed(2)}`);
    }

    // Reset form fields
    function resetFields() {
        billAmountInput.value = "500";
        numberOfPeopleInput.value = "1";
        tipPercentageInput.value = "0";
        tipFlatInput.value = "";
        tipPercentageBlock.style.display = "block";
        tipFlatBlock.style.display = "none";
        document.querySelector("input[value='percentage']").checked = true;
    }

    // Event Listeners
    calculateButton.addEventListener("click", calculateTip);
    resetButton.addEventListener("click", resetFields);
});
