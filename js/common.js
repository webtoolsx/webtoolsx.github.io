// Function to update the brokerage percentage
function updateRange(event) {
    // Get the range input element that triggered the event
    const rangeInput = event.target;
    
    // Get the current value of the range input
    const value = rangeInput.value;
    
    // Find the associated span with the class "range_pctg"
    const labelSpan = rangeInput.closest('.slider-container').querySelector('.range_pctg');
    
    if (labelSpan) {
        if (labelSpan.tagName.toLowerCase() === 'span') {
            labelSpan.textContent = value;
        } else if (labelSpan.tagName.toLowerCase() === 'input') {
            labelSpan.value = value;
        }
    }
}

// Attach event listeners to all range inputs with the class "custom_range_wx"
const rangeInputs = document.querySelectorAll('.custom_range_wx');

rangeInputs.forEach(rangeInput => {
    rangeInput.addEventListener('input', updateRange);
});

function shakeInput($input) {
    $input.addClass('shake');
    setTimeout(function() {
        $input.removeClass('shake');
    }, 500); // Remove the shake class after the animation completes
}