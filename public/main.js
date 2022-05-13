const url = './api/productos';
const data = {};

fetch(url, {
  method: 'GET',
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));