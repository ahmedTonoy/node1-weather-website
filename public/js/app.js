console.log('Clint side javascript file!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading Weather Update!'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('http://localhost:3000/weather?address=' + encodeURI(location)).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = 'Location: ' + data.location
            messageTwo.textContent = 'Sky Condition: ' + data.skyCondition
            messageThree.textContent = 'Temparature: ' + data.temperature + ' degree Celcius'
        })
    })
})