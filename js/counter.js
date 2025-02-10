document.addEventListener("DOMContentLoaded", function () {
    function setupCounter(wrapperSelector) {
        document.querySelectorAll(wrapperSelector).forEach(wrapper => {
            const minusButton = wrapper.querySelector(".btn-minus");
            const plusButton = wrapper.querySelector(".btn-plus");
            const inputField = wrapper.querySelector("input");

            if (!minusButton || !plusButton || !inputField) {
                console.error("Missing elements in counter wrapper:", wrapper);
                return;
            }

            // Set initial min value
            const minValue = parseInt(inputField.getAttribute("min")) || 1;
            const stepValue = parseInt(inputField.getAttribute("step")) || 1;

            minusButton.addEventListener("click", function () {
                let currentValue = parseInt(inputField.value) || minValue;
                if (currentValue > minValue) {
                    inputField.value = currentValue - stepValue;
                }
            });

            plusButton.addEventListener("click", function () {
                let currentValue = parseInt(inputField.value) || minValue;
                inputField.value = currentValue + stepValue;
            });
        });
    }

    // Auto-initialize all counters with the class "counter-wrapper"
    setupCounter(".counter-wrapper");
});
