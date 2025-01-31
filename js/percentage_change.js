document.addEventListener("DOMContentLoaded", function() {
    const percentageInput = document.getElementById("percentage");
    const baseValueInput = document.getElementById("baseValue");
    const resultInput = document.getElementById("result");
    const resetBtn = document.getElementById("resetBtn");

    function calculatePercentage() {
      let percentage = parseFloat(percentageInput.value);
      let baseValue = parseFloat(baseValueInput.value);

      if (!isNaN(percentage) && !isNaN(baseValue)) {
        resultInput.value = ((percentage / 100) * baseValue).toFixed(2);
      } else {
        resultInput.value = "";
      }
    }

    percentageInput.addEventListener("input", calculatePercentage);
    baseValueInput.addEventListener("input", calculatePercentage);

    resetBtn.addEventListener("click", function() {
      percentageInput.value = "";
      baseValueInput.value = "";
      resultInput.value = "";
    });
  });


document.addEventListener("DOMContentLoaded", function() {
    const partValueInput = document.getElementById("partValue");
    const wholeValueInput = document.getElementById("wholeValue");
    const percentageResultInput = document.getElementById("percentageResult");
    const resetPercentageBtn = document.getElementById("resetPercentage");

    function calculatePercentage() {
      let partValue = parseFloat(partValueInput.value);
      let wholeValue = parseFloat(wholeValueInput.value);

      if (!isNaN(partValue) && !isNaN(wholeValue) && wholeValue !== 0) {
        percentageResultInput.value = ((partValue / wholeValue) * 100).toFixed(2);
      } else {
        percentageResultInput.value = "";
      }
    }

    partValueInput.addEventListener("input", calculatePercentage);
    wholeValueInput.addEventListener("input", calculatePercentage);

    resetPercentageBtn.addEventListener("click", function() {
      partValueInput.value = "";
      wholeValueInput.value = "";
      percentageResultInput.value = "";
    });
  });