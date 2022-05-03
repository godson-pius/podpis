
const container = document.getElementById('container');
const spinner = document.getElementById('spinner');
const button = document.getElementById('button');
const open = document.getElementById('open');
const test = document.getElementById('test');

button.addEventListener('click', () => {

  container.classList.remove('border-primary')
  container.classList.add('border-dark')

  spinner.classList.remove('text-primary')
  spinner.classList.add('text-dark')

  button.classList.remove('btn-primary')
  button.classList.add('btn-dark')

  open.classList.remove('btn-primary')
  open.classList.add('btn-dark')

  test.classList.remove('btn-primary')
  test.classList.add('btn-dark')
})

button.addEventListener('dblclick', () => {
  container.setAttribute('class', 'shadow-sm mt-3 p-3 mb-5 bg-secondary bg-opacity-25 border-start border-5 rounded-start border-primary')
  spinner.setAttribute('class', 'spinner-grow text-primary border border-light shadow-md border-2')
  button.setAttribute('class', 'btn btn-primary btn-sm rounded-pill shadow')
  open.setAttribute('class', 'rounded btn btn-primary btn-sm')
  test.setAttribute('class', 'rounded btn btn-primary btn-sm')
})

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

console.log(URLSearchParams.length)