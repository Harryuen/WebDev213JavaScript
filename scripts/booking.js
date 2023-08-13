/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

  // Variables
  const dayButtons = document.querySelectorAll('.day-selector li');
  const fullButton = document.getElementById('full');
  const halfButton = document.getElementById('half');
  const clearButton = document.getElementById('clear-button');
  const calculatedCostElement = document.getElementById('calculated-cost');

  const fullDayRate = 30;
  const halfDayRate = 20;

  const selectedDays = [];
  let isFullDay = true;


/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

dayButtons.forEach(dayButton => {
    dayButton.addEventListener('click', () => {
      const day = dayButton.getAttribute('id');
      if (!selectedDays.includes(day)) {
        selectedDays.push(day);
        dayButton.classList.add('clicked', 'yellow-highlight');
      } else {
        const index = selectedDays.indexOf(day);
        selectedDays.splice(index, 1);
        dayButton.classList.remove('clicked', 'yellow-highlight');
      }
      calculateCost();
    });
  });


/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

clearButton.addEventListener('click', () => {
    selectedDays.forEach(day => {
      const dayButton = document.getElementById(day);
      dayButton.classList.remove('clicked');
    });
    selectedDays.length = 0;
    calculateCost();
  });





/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

halfButton.addEventListener('click', () => {
    halfButton.classList.add('clicked');
    fullButton.classList.remove('clicked');
    isFullDay = false;
    calculateCost();
  });



// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

fullButton.addEventListener('click', () => {
    fullButton.classList.add('clicked');
    halfButton.classList.remove('clicked');
    isFullDay = true;
    calculateCost();
  });


/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculateCost() {
    const rate = isFullDay ? fullDayRate : halfDayRate;
    const cost = rate * selectedDays.length;
    calculatedCostElement.textContent = cost;
  }
