const habitForm = document.getElementById("habit-form");
const habitNameInput = document.getElementById("habit-name");
const habitDaysInput = document.getElementById("habit-days");
const submitButton = document.getElementById("submit-button");
const tracker = document.getElementById("tracker");
const habitTitle = document.getElementById("habit-title");
const streakMessage = document.getElementById("streak-message");
const circleContainer = document.getElementById("circle-container");
const resetButton = document.getElementById("reset-button");

let habitName = "";
let goalDays = 0;
let clickedDays = 0;

function loadHabitData() {
  const savedHabit = JSON.parse(localStorage.getItem("habitData"));
  if (savedHabit) {
    habitName = savedHabit.habitName;
    goalDays = savedHabit.goalDays;
    clickedDays = savedHabit.clickedDays;
    renderHabitTracker();
  } else {
    resetButton.style.display = "none";
    habitForm.style.display = "block";
    tracker.style.display = "none";
  }
}

function renderHabitTracker() {
  habitTitle.textContent = `Habit to break: ${habitName}`;
  streakMessage.textContent = `Days left to goal: ${goalDays - clickedDays}`;

  circleContainer.innerHTML = "";
  for (let i = 0; i < goalDays; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle", "outline");

    circle.textContent = i + 1;
    if (i < clickedDays) {
      circle.classList.add("clicked");
    }

    circle.addEventListener("click", () => {
      if (i === clickedDays || i < clickedDays) {
        toggleCircle(i);
      }
    });

    circleContainer.appendChild(circle);
  }

  habitForm.style.display = "none";
  tracker.style.display = "block";
  resetButton.style.display = "block";

  if (goalDays - clickedDays > 0) {
    streakMessage.style.color = "#cccccc";
  } else if (clickedDays === goalDays) {
    streakMessage.textContent =
      "Congratulations! You have completed your streak!";
    streakMessage.style.color = "green";
    resetButton.style.display = "block";
  }
}

function toggleCircle(index) {
  const circles = document.querySelectorAll(".circle");
  const circle = circles[index];

  if (circle.classList.contains("clicked")) {
    circle.classList.remove("clicked");
    clickedDays--;
  } else {
    circle.classList.add("clicked");
    clickedDays++;
  }

  saveHabitData();
  renderHabitTracker();
}

function saveHabitData() {
  const habitData = {
    habitName: habitName,
    goalDays: goalDays,
    clickedDays: clickedDays,
  };
  localStorage.setItem("habitData", JSON.stringify(habitData));
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  habitName = habitNameInput.value;
  goalDays = parseInt(habitDaysInput.value);

  if (habitName && goalDays) {
    clickedDays = 0;
    saveHabitData();
    renderHabitTracker();
  } else {
    alert("Please fill in both fields!");
  }
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem("habitData");
  habitForm.style.display = "block";
  tracker.style.display = "none";
  resetButton.style.display = "none";
  habitNameInput.value = "";
  habitDaysInput.value = "";
});

loadHabitData();
