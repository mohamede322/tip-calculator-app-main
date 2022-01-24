const bill = document.getElementById("bill")
const tips = document.querySelectorAll(".tip")
const people = document.getElementById("people")
const tipPerson = document.querySelector(".tip-person")
const totalPerson = document.querySelector(".total-person")
const resetBtn = document.querySelector(".reset-btn-container")
const customBtn = document.querySelector(".custom")
const popUp = document.querySelector(".pop-up")
const customTip = document.getElementById("custom-tip")
const container = document.querySelector(".container")
const popContainer = document.querySelector(".pop-container ")
const mobileEnterBtn = document.querySelector(".enter-btn")

window.addEventListener("keyup" , () => {
    if (event.keyCode === 13) {
        calculate()
    }

})

mobileEnterBtn.addEventListener("click" , () => {
    calculate()
    removeCustomInput()
})

customBtn.addEventListener("click" , () => {
    getCustomTip()
})

let customTipValue = 0;

function getCustomTip() {
    popUp.style.display = "block"
    customTip.focus()
    container.style.cssText = "filter:blur(1px)"
    popContainer.style.cssText = "z-index:100"
    window.addEventListener("keyup" , () => {
        if (event.keyCode === 13) {
            removeCustomInput()
        }
    })
}

function removeCustomInput() {
    popUp.style.display = "none"
    container.style.cssText = "filter:blur(0)"
    popContainer.style.cssText = "z-index:0"
    customTipValue = customTip.value
}

resetBtn.addEventListener("click" , () => {
    reset()
})

function reset() {
    bill.value = ""
    people.value = ""
    tipPerson.innerHTML = ""
    totalPerson.innerHTML = ""
    bill.focus()
    customTip.value = ""

    tips.forEach(tip => tip.classList.remove("active"))
}

function calculate() {

    tips.forEach(tip => {
        if (!tip.classList.contains("active") && people.value != "") {
            getTotalTip()
            getTotalAmount()
        }
    })

}

function getTotalAmount() {
    let amount = bill.value
    let currentPeople = people.value
    let tip = Number(tipPerson.innerHTML.split("$")[1])
    let totalAmount = (amount / currentPeople)
    let finalAmount = totalAmount + tip

    totalPerson.innerHTML = `$${finalAmount.toFixed(2)}`
}

function getTotalTip() {
    let currentTip = document.querySelector(".active")

    if (!currentTip.classList.contains("custom")) {
       let tipPercentage = currentTip.innerText
       let tip = tipPercentage.split("%")[0]
       getTipAmount(tip)

    }else {
        let customTipValue = customTip.value
        let custom = customTipValue.split("%")[0]
        getTipAmount(custom)
    }

}

function getTipAmount(tipPercentage) {
    let totalTip = (bill.value * tipPercentage) / 100
    let tipPerPerson = (totalTip / people.value).toFixed(2)
    tipPerson.innerHTML = `$${tipPerPerson}`
}

getActiveTip()

function getActiveTip() {
    tips.forEach(tip => {
        tip.addEventListener("click" , () => {
            tips.forEach(tip => {
                tip.classList.remove("active")
            })
            tip.classList.add("active")
        })
    })
}



