let timeline = document.getElementById('timeline')
let music = document.querySelector('audio')
let playPauseBtn = document.getElementsByClassName('play-btn')[0]
let volumeControl = document.getElementById('volume-lvl')
let muteBtn = document.getElementById('mute-btn')
let loopBtn = document.getElementById('loop')
let backwardBtn = document.getElementById('backward-5')
let forwardBtn = document.getElementById('forward-5')
let state = false
let currMin = document.getElementById('curr-min')
let currSeg = document.getElementById('curr-seg')

let durMin = document.getElementById('dur-min')
let durSeg = document.getElementById('dur-seg')

let segs = 1
let mins = segs * 60

window.addEventListener('load', () => {
    
    var total = music.duration
    var minutos = Math.floor(total / mins)
    total = total - (minutos * mins)
    var segundos = Math.floor(total / segs)
    
    durMin.innerText = ('0' + minutos).slice(-2)
    durSeg.innerText = ('0' + segundos).slice(-2)

    timeline.addEventListener('change', () => {
        console.log((parseFloat(timeline.value)/100) * music.duration)
        music.currentTime = (parseFloat(timeline.value)/100) * music.duration
    })
    
    music.addEventListener('timeupdate', () => {
        var x = (music.currentTime*100/music.duration)
        var total = music.currentTime
        var minutos = Math.floor(total / mins)
        total = total - (minutos * mins)
        var segundos = Math.floor(total / segs)
        
        currMin.innerText = ('0' + minutos).slice(-2)

        currSeg.innerText = ('0' + segundos).slice(-2)
        
        timeline.value = x
        
        var color = `linear-gradient(90deg, rgb(79,214,0) ${x}%, rgb(24, 65, 0) ${x}%)`
        timeline.style.background = color
    })
})


playPauseBtn.addEventListener('click',() => {
    if(state){
        music.pause()
        playPauseBtn.children[0].classList.remove('fa-pause')
        playPauseBtn.children[0].classList.add('fa-play')
        state = false
    }else {
        music.play()
        playPauseBtn.children[0].classList.remove('fa-play')
        playPauseBtn.children[0].classList.add('fa-pause')
        state = true
    }
    
})


muteBtn.addEventListener('click', () => {
    switch (music.muted) {
        case true:
            music.muted = false
            muteBtn.children[0].classList.replace('fa-volume-times','fa-volume-up')
            break;
            
        default:
            music.muted = true
            muteBtn.children[0].classList.replace('fa-volume-up','fa-volume-times')           
            break;
    }
})

loopBtn.addEventListener('click', () => {
    switch (music.loop) {
        case true:
            music.loop = false
            loopBtn.classList.add('disabled')
            break;
            
        default:
            music.loop = true
            loopBtn.classList.remove('disabled')           
            break;
    }
})

forwardBtn.addEventListener('click', () => {
    music.currentTime = music.currentTime + 5
})

backwardBtn.addEventListener('click', () => {
    music.currentTime = music.currentTime - 5
})

volumeControl.addEventListener('change', () => {
    x = parseFloat(volumeControl.value)
    music.volume = parseFloat(volumeControl.value)/100
    var color = `linear-gradient(90deg, rgb(79,214,0) ${x}%, rgb(24, 65, 0) ${x}%)`
    volumeControl.style.background = color
})
