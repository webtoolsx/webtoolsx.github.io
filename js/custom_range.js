// Define a CustomRange class
class CustomRange {
    constructor(rangeInput, valueDisplay) {
      this.rangeInput = rangeInput;
      this.valueDisplay = valueDisplay;
      
      // Initial update of value and background
      this.updateRangeValue();

      // Add event listener for 'input' event to update value and background dynamically
      this.rangeInput.addEventListener('input', () => {
        this.updateRangeValue();
      });
    }

    // Function to update the display value and the background of the range
    updateRangeValue() {
      const value = this.rangeInput.value;
      // this.valueDisplay.textContent = value;

      // Update the background gradient to reflect the slider's current value
      const percentage = (value - this.rangeInput.min) / (this.rangeInput.max - this.rangeInput.min) * 100;
      this.rangeInput.style.background = `linear-gradient(to right, #e74c3c ${percentage}%, #ddd ${percentage}%)`;
    }
  }

  // Get all range inputs and their corresponding value displays by class name
  const rangeInputs = document.querySelectorAll('input[type="range"]');
  const valueDisplays = document.getElementsByClassName('range-value');
  
  rangeInputs.forEach((rangeInput, index) => {
    const valueDisplay = valueDisplays[index];
    
    // Create a new CustomRange instance for each input
    new CustomRange(rangeInput, valueDisplay);
  });