// fetch('https://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })

// fetch('https://workspaces-ws-9pjms-app1.eu10.trial.applicationstudio.cloud.sap/weather?address=boston').then((response)=>{
//     response.json().then((data) =>{
//         if(data.error){
//             console.log(error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event) =>{
    event.preventDefault()

    const location = search.value

    messageOne.textContent ='Loading...'
    messageTwo.textContent =''
    fetch('https://workspaces-ws-9pjms-app1.eu10.trial.applicationstudio.cloud.sap/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})