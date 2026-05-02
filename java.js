// ============ BOOT ============
window.onload = function () {
  // start progress bar
  setTimeout(() => {
    document.getElementById('progressFill').style.width = '100%'
  }, 100)

  // after 3 seconds go to login
  setTimeout(() => {
    showScreen('loginScreen')
  }, 3000)

  startClock()
}


// ============ SCREENS ============
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.style.display = 'none'
  })
  document.getElementById(id).style.display = 'flex'
}


// ============ LOGIN ============
function login() {
  const user = document.getElementById('username').value
  const pass = document.getElementById('password').value

  if (user === 'admin' && pass === '1234') {
    localStorage.setItem('loggedIn', 'true')
    showScreen('desktopScreen')
  } else {
    alert('Wrong username or password!')
  }
}


// ============ WINDOWS ============
function openWindow(id) {
  document.getElementById(id).style.display = 'block'
  loadNotes() // refresh notes when opening
}

function closeWindow(id) {
  document.getElementById(id).style.display = 'none'
}


// ============ DRAG ============
let dragging = null
let offsetX = 0
let offsetY = 0

function startDrag(e, id) {
  dragging = document.getElementById(id)
  offsetX = e.clientX - dragging.offsetLeft
  offsetY = e.clientY - dragging.offsetTop
}

document.addEventListener('mousemove', function(e) {
  if (!dragging) return
  dragging.style.left = (e.clientX - offsetX) + 'px'
  dragging.style.top  = (e.clientY - offsetY) + 'px'
})

document.addEventListener('mouseup', function() {
  dragging = null
})


// ============ CLOCK ============
function startClock() {
  setInterval(function() {
    const now  = new Date()
    const h    = String(now.getHours()).padStart(2, '0')
    const m    = String(now.getMinutes()).padStart(2, '0')
    document.getElementById('clock').textContent = h + ':' + m
  }, 1000)
}


// ============ NOTES ============
function saveNote() {
  const text = document.getElementById('noteInput').value
  if (!text.trim()) return

  const notes = JSON.parse(localStorage.getItem('notes') || '[]')
  notes.push(text)
  localStorage.setItem('notes', JSON.stringify(notes))

  document.getElementById('noteInput').value = ''
  loadNotes()
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]')
  const list  = document.getElementById('notesList')
  if (!list) return

  list.innerHTML = notes.map(function(note) {
    return '<div class="note-item">' + note + '</div>'
  }).join('')
}


// ============ CALCULATOR ============
const buttons = [
  'C',  '⌫', '%', '/',
  '7',  '8', '9', '*',
  '4',  '5', '6', '-',
  '1',  '2', '3', '+',
  '0',        '.', '='
]

const grid = document.getElementById('calcGrid')

buttons.forEach(function(btn) {
  const b = document.createElement('button')
  b.textContent = btn

  if (btn === '=')   b.classList.add('calc-eq')
  if (btn === 'C')   b.classList.add('calc-clear')
  if (btn === '0')   b.classList.add('calc-zero')
  if (['/', '*', '-', '+', '%', '⌫'].includes(btn)) b.classList.add('calc-op')

  b.onclick = function() { calcInput(btn) }
  grid.appendChild(b)
})