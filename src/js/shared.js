// MARK: Tickets menu
const ticketsBox = document.querySelector('#ticketsBox')
const ticketsToggle = document.querySelector('#ticketsToggle')
const menuBtn = document.querySelector('#menuBtn')
const menuBox = document.querySelector('#menuBox')

ticketsToggle.addEventListener('click', () => {
    ticketsBox.classList.toggle('hidden')

    if(!menuBox.classList.contains('hidden')){
        menuBtn.classList.toggle('closed')
        menuBox.classList.toggle('hidden')
    }
})

// MARK: Menu button

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('closed')
    menuBox.classList.toggle('hidden')

    if(!ticketsBox.classList.contains('hidden')){
        ticketsBox.classList.add('hidden')
    }
})