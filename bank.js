const repayButtonElement = document.getElementById("repay-btn")
const balanceElement = document.getElementById("balance")
const debtElement = document.getElementById("debt")

let balance = 0
let debt = 0

const deposit = amount => {
    balance += amount
    balanceElement.textContent = balance
    updateLoanElements()
}

const withdraw = amount => {
    balance -= amount
    balanceElement.textContent = balance
    updateLoanElements()
    }

const getBalance = () => {
    balanceElement.textContent = balance
    return balance
    
}

const increaseDebt = (amount) => {
    debt += amount
    debtElement.innerHTML = "Debt: " +"<b>" + debt +" SEK" + "</b>"
    updateLoanElements()
}

const decreaseDebt = (amount) => {debt -= amount
    debtElement.innerHTML = "Debt: " +"<b>" + debt +" SEK" + "</b>"
    updateLoanElements()
}

const getDebt = () => {return debt}

function updateLoanElements() {  
    if (getDebt() == 0) {
      repayButtonElement.style.display = 'none'
      debtElement.style.display = 'none'
    } else {
      repayButtonElement.style.display = 'inline'
      debtElement.style.display = 'inline'
    }
  }
  function initBankElements () {
    balanceElement.textContent = balance
    debtElement.innerHTML = "Debt: " +"<b>" + debt +" SEK" + "</b>"
  }


const bank = {
    deposit,
    withdraw,
    getBalance,
    increaseDebt,
    decreaseDebt,
    getDebt,
    updateLoanElements,
    initBankElements
}

export default bank



