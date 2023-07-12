import bank from './bank.js'
import work from './work.js'


const API_URL = "https://hickory-quilled-actress.glitch.me/computers"
const JPG_URL = "https://hickory-quilled-actress.glitch.me/"
const laptopElement = document.getElementById("laptops")
const workButtonElement = document.getElementById("work-btn")
const bankButtonElement = document.getElementById("bank-btn")
const loanButtonElement = document.getElementById("loan-btn")
const repayButtonElement = document.getElementById("repay-btn")
const buyButtonElement = document.getElementById("buy-btn")
const payElement = document.getElementById("pay")
const laptopPicElement = document.getElementById("pic")
const laptopTitleElement = document.getElementById("laptop-title")
const laptopInfoElement = document.getElementById("laptop-info")

laptopElement.addEventListener("change", showLaptop)
workButtonElement.addEventListener("click", work.increasePay)
bankButtonElement.addEventListener("click", bankMoney)
loanButtonElement.addEventListener("click", initLoan)
repayButtonElement.addEventListener("click", repayLoan)
buyButtonElement.addEventListener("click", buyComputer)

let laptops = []

bank.initBankElements()
bank.updateLoanElements()

payElement.textContent = work.getPay()

function initLoan(){
    let loanAmount = prompt("Get a loan")
    while (isNaN(loanAmount) || (!loanAmount) || loanAmount == "")
        loanAmount = prompt("Get a loan, but please enter a number.  To cancel, enter '0' ")
    while (loanAmount  > (bank.getBalance() * 2))
       loanAmount = prompt("You can't loan more than 2x your balance. Enter a new loan.")
    if(bank.getDebt() > 0){
        alert("You already have a loan, pay that back in full to apply for a new loan!")
    }
    else {
        bank.increaseDebt(parseInt(loanAmount))
    bank.deposit(parseInt(loanAmount))

    }
}
function repayLoan(){
    if(work.getPay() === 0){
        alert("You don't have any money to pay back your loan with, work a little! ⚡") 
    }
    else if (work.getPay() >= bank.getDebt()){
        let remainder = work.getPay() - bank.getDebt()
        work.setPay(0)
        bank.decreaseDebt(bank.getDebt())
        bank.deposit(remainder)
        bank.updateLoanElements()
    }
    else {
        bank.decreaseDebt(work.getPay())
        work.setPay(0)
        bank.updateLoanElements()
    }
}

//WORK
function bankMoney(){
    if(bank.getDebt() > 0){
        bank.deposit(work.getPay() * 0.9)
        bank.decreaseDebt(work.getPay() * 0.1)
        work.setPay(0)
    }
    else{  
    bank.deposit(work.getPay())
    work.setPay(0)
    }
}
  function selectFirstOption() {
    laptopElement.selectedIndex = 1
    showLaptop()
  }

//API-Fetching
fetch(API_URL)
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToList(laptops))
    .catch(error => console.error(error.message))

const addLaptopsToList = (laptops) => {
    laptops.forEach(x => addLaptopToList(x))
        selectFirstOption()
}  
const addLaptopToList = (laptop) => {
    const laptopOption = document.createElement("option")
    laptopOption.value = laptop.id
    laptopOption.appendChild(document.createTextNode(laptop.title))
    laptopElement.appendChild(laptopOption)
  }
//LAPTOPS
function showLaptop() {
    const selectedLaptopId = Number(laptopElement.value)
    const selectedLaptop = laptops.find(laptop => laptop.id === selectedLaptopId)
    
        laptopPicElement.src = JPG_URL + selectedLaptop.image
        laptopTitleElement.innerText = selectedLaptop.title
        
        laptopInfoElement.innerHTML = "<b>" + "Description: " + "</b>" + selectedLaptop.description + "<br>" + "<b>" + "Price: " + "</b>" +
        selectedLaptop.price +" SEK" + "<br>" + "<b>" + "Specs: " + "</b>" + selectedLaptop.specs
}
function buyComputer(){
    const selectedLaptopId = Number(laptopElement.value)
    const selectedLaptop = laptops.find(laptop => laptop.id === selectedLaptopId)
    
    if(bank.getBalance() > selectedLaptop.price){
    if (confirm(`Confirm to buy the ${selectedLaptop.title}`)) {
        alert(`${selectedLaptop.title} successfully bought! 😁`)
        bank.withdraw(selectedLaptop.price) 
      } else {
        alert("Transaction canceled!")
      }
}
    else{
        alert("Not enough balance to buy computer 😭")
    }
}
