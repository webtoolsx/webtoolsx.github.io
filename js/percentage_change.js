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

// ── Swap buttons ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  function animateSpin(btn) {
    btn.classList.remove("spinning");
    void btn.offsetWidth; // reflow to restart animation
    btn.classList.add("spinning");
    btn.addEventListener("animationend", () => btn.classList.remove("spinning"), { once: true });
  }

  // Row 1: swap percentage ↔ base value, then recalculate
  const swapBtn1 = document.getElementById("swapBtn1");
  if (swapBtn1) {
    swapBtn1.addEventListener("click", function () {
      const pct = document.getElementById("percentage");
      const base = document.getElementById("baseValue");
      [pct.value, base.value] = [base.value, pct.value];
      pct.dispatchEvent(new Event("input"));
      animateSpin(this);
    });
  }

  // Row 2: swap part ↔ whole value, then recalculate
  const swapBtn2 = document.getElementById("swapBtn2");
  if (swapBtn2) {
    swapBtn2.addEventListener("click", function () {
      const part = document.getElementById("partValue");
      const whole = document.getElementById("wholeValue");
      [part.value, whole.value] = [whole.value, part.value];
      part.dispatchEvent(new Event("input"));
      animateSpin(this);
    });
  }
});