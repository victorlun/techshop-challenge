const payElement = document.getElementById("pay")

let pay = 0

const increasePay = () => {pay += 100
    payElement.textContent = pay;
}

const setPay = (amount) => {pay = amount
    payElement.textContent = pay;
}

const getPay = () => {return pay}


const work = {
increasePay,
getPay,
setPay
}

export default work
