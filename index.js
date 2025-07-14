const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let lastAnswer = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");

    switch (value) {
      case "C":
        display.value = "";
        break;

      case "←":
        display.value = display.value.slice(0, -1);
        break;

      case "=":
        try {
          let expression = display.value
            .replace(/÷/g, "/")
            .replace(/×/g, "*")
            .replace(/−/g, "-")
            .replace(/π/g, "pi")
            .replace(/√/g, "sqrt")
            .replace(/Ans/g, lastAnswer);

          const result = math.evaluate(expression);
          lastAnswer = result;
          display.value = result;
        } catch {
          display.value = "Error";
        }
        break;

      case "ans":
        display.value += lastAnswer;
        break;

      case "frac":
        try {
          const fraction = math.fraction(math.evaluate(display.value));
          display.value = `${fraction.n}/${fraction.d}`;
        } catch {
          display.value = "Error";
        }
        break;

      default:
        display.value += value;
    }
  });
});


// Keyboard support
document.addEventListener("keydown", (e) => {
  const allowed = "0123456789.+-*/()";
  if (allowed.includes(e.key)) {
    display.value += e.key;
  } else if (e.key === "Enter") {
    e.preventDefault();
    document.querySelector('.equal').click();
  } else if (e.key === "Backspace") {
    document.querySelector('[data-value="←"]').click();
  } else if (e.key === "Escape") {
    document.querySelector('[data-value="C"]').click();
  }
});

