const userInputs = document.querySelector(".control");
const billInput = document.querySelector(".bill-amount-input input");
const peopleInput = document.querySelector(".people-count-input input");
const peopleInputContainer = document.querySelector(".people-count-input");
const tipPerPerson = document.querySelector(".tip-amount-digit p");
const totalPerPerson = document.querySelector(".total-digit p");
const customeTip = document.getElementById("custome-tip");
const resetBtn = document.getElementById("reset-btn");
const errorMessage = document.querySelector(".people-count-error");
const buttonsContainer = document.querySelector(".grid");
let selectedButton = undefined;
let tipPecentage = undefined;

//------------Fucntions-------------
function calculateTip(){
    let bill = Number(billInput.value);
    let peopleCount = Number(peopleInput.value);
    if (!isNaN(tipPecentage) && !isNaN(bill) && !isNaN(peopleCount)  && peopleCount > 0  ){
        let tip = (parseFloat((bill / peopleCount) * (tipPecentage / 100)));
        tipPerPerson.innerText = tip.toFixed(2);
        totalPerPerson.innerText = ( ( bill / peopleCount ) + tip ).toFixed(2);
        return;
    }
    else return;
}

function getTipPercentage(event){
    if (event.target.classList.contains("button") && event.target.id != "custome-tip") {
        selectedButton != undefined ? selectedButton.classList.remove("active") : null; //Clear the previous button active status if it is defined
        customeTip.value = null; //Clear the custome value when button is clicked
        selectedButton = event.target;
        tipPecentage = parseFloat(selectedButton.innerText);
        selectedButton.classList.add("active");
    }
}

function resetCalculator(){
    tipPerPerson.innerText = "0.00";
    totalPerPerson.innerText = "0.00";
    billInput.value = null;
    peopleInput.value = null;
    errorMessage.style.visibility = null;
    peopleInputContainer.style.border = null;
    customeTip.value = null;
    selectedButton != undefined ? selectedButton.classList.remove("active") : null;
}

//-------------Event Listeners-------------
buttonsContainer.addEventListener("click", (event)=> {
    getTipPercentage(event); 
    calculateTip();
});

billInput.addEventListener("input", calculateTip);

peopleInput.addEventListener("input", (event)=> {
    if (event.target.value <= 0){
        errorMessage.style.visibility = "visible";
        peopleInputContainer.style.border = "1px solid orangered";
        return;
    }else{
        errorMessage.style.visibility = null;
        peopleInputContainer.style.border = null;
        calculateTip();
    } 
});

customeTip.addEventListener("input", ()=> {
    selectedButton != undefined ? selectedButton.classList.remove("active") : null;
    tipPecentage = parseFloat(customeTip.value);
    calculateTip();
});

resetBtn.addEventListener("click", resetCalculator);



