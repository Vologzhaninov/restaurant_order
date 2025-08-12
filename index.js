import menuArray from './data.js'

const main = document.getElementById('main')
const orderSection = document.getElementById('order-section')
const orderList = document.getElementById('order-list')
const totalPrice = document.getElementById('total-price')
const orderBtn = document.getElementById('order-btn')
const modalPayment = document.getElementById('modal-payment')
const paymentBtn = document.getElementById('payment-btn')

let orderArray = []
let paymentUser = {name: '', card: '', cvv: ''}

function  getMenuHtml(){
    return menuArray.map(item => {
        return `
         <div class="cards">
             <div class="card-item">
                <span class="emoji">${item.emoji}</span>
                <div class="menu-item">
                    <h2>${item.name}</h2>
                    <p>${item.ingredients.join(', ')}</p>
                    <span>$${item.price}</span>
                </div>
                <button class="card-btn" data-add-btn="${item.id}">+</button>
             </div>
         </div>
        `
    }).join('')
}

function addToOrderList(itemId){
    const orderItem = menuArray.filter(item => item.id == itemId)[0]
    if (orderItem) {
        orderArray.push({id: orderArray.length, name: orderItem.name, price: orderItem.price, isRemoved: false})
        renderOrderList();
    }
}

function removeFromOrderList(itemId){
    const orderItem = orderArray.filter(item => item.id == itemId)[0]
    if (orderItem) {
        orderItem.isRemoved = true
        renderOrderList();
    }
}

function renderOrderList(){
    if (orderArray.filter(item => !item.isRemoved).length > 0) {
        orderSection.classList.remove('invisible')
        orderList.innerHTML = ''
        orderArray.forEach(orderItem => {
            if (!orderItem.isRemoved) {
                orderList.innerHTML += `
        <div class="order-item">
            <p>${orderItem.name}</p>
            <button class="remove-btn" data-remove-btn="${orderItem.id}">remove</button>
            <p class="price">$${orderItem.price}</p>
        </div>
        `
            }
        })
        renderTotalPrice()
    }
    else {
        orderSection.classList.add('invisible')
        orderList.innerHTML = ''
        orderArray = []
    }
    
}

function renderTotalPrice(){
    const orderTotalPrice = orderArray.reduce((total, item) => {
        return total + (item.isRemoved ? 0 : item.price)
    }, 0) 
    totalPrice.innerText = `$${orderTotalPrice}`
}

function renderMenu(){
    main.innerHTML = getMenuHtml()
}

function renderMessageBox(userName){
    const messageBox = document.createElement('div')
    const text = `Thanks, ${userName}! Your order is on its way!`
    const messageText = document.createElement('h5')
    messageBox.className = 'message-box'


    // const textMessage = `Thanks, ${userNmae}! Your order is on its way!`
    // orderSection.innerHTML = `
    //     <div class="message-box">
    //         <h5 id="message"></h5>
    //     </div>
    // `
    // return document.getElementById('message').innerText = textMessage
}

document.addEventListener('click', function(e){
    if (e.target.dataset.addBtn) {
        addToOrderList(e.target.dataset.addBtn)
    }
    if (e.target.dataset.removeBtn) {
        removeFromOrderList(e.target.dataset.removeBtn)
    }
})

orderBtn.addEventListener('click', function(){
    modalPayment.style.display = 'block'
    main.classList.add('disabled')
    orderSection.classList.add('disabled')
})

modalPayment.addEventListener('submit', function(event){
    event.preventDefault()
})

paymentBtn.addEventListener('click', function(){
    paymentUser.name = document.getElementById('name').value
    paymentUser.card = document.getElementById('card').value
    paymentUser.cvv = document.getElementById('cvv').value
    modalPayment.style.display = 'none'
    main.classList.remove('disabled')
    orderSection.classList.remove('disabled')
    orderArray = []
    orderSection.innerHTML = `
        <div class="message-box">
            <h5 class="message-text" id="message-text"></h5>
        </div>
    `
    document.getElementById('message-text').innerText = `Thanks, ${paymentUser.name}! Your order is on its way!`
})

renderMenu()
