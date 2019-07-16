/* ================ Run Ready ================ */
// log
const log = console.log.bind(console)

// e
const e = function (selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `selector ${selector} not found`
        log(s)
        // alert(s)
        //
        return null
    } else {
        return element
    }
}

// es 返回一个数组，包含所有被选中的元素
const es = function (selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `selector ${selector} not found`
        log(s)
        // alert(s)
        //
        return []
    } else {
        return elements
    }
}

// appendHtml
const appendHtml = function (inElement, inHtml) {
    let element = inElement
    let html = inHtml

    element.insertAdjacentHTML('beforeend', html)
}

// bindEvenet
const bindEvent = function (inElement, inEventName, inCallback) {
    let element = inElement
    let eventName = inEventName
    let callback = inCallback

    element.addEventListener(eventName, callback)
}

// removeClassAll
const removeClassAll = function (inClassName) {
    let className = inClassName
    let selector = '.' + className
    let elements = es(selector)

    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        // log('--->removeClassAll: className and element = ', className, e)
        e.classList.remove(className)
    }

}

// bindAll 给所有的元素绑定事件
const bindAll = function (inSelector, inEventName, inCallback) {
    let selector = inSelector
    let eventName = inEventName
    let callback = inCallback

    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]

        bindEvent(e, eventName, callback)
    }
}

// find 查找 element 的所有子元素
const find = function (inElement, inSelector) {
    let element = inElement
    let selector = inSelector

    let e = element.querySelector(selector)
    if (e === null) {
        let tipsInfo = `Tips：选择器 ${selector} 没有找到元素或 JS 没有放到 <body> 中。`
        alert(tipsInfo)

        return null
    } else {
        return e
    }
}

// closestClass()
const closestClass = function (inElement, inClassName = '') {
    let element = inElement
    let className = inClassName
    let parent = element.parentElement

    for (let i = 0; i < 100; i++) {

        if (parent === null) {
            return null
        }

        let parentClassList = parent.classList

        if ((String(parentClassList) === String(className))) {
            return parent
        } else {
            parent = parent.parentElement
        }
    }
}

// closestId()
const closestId = function (inElement, inId = '') {
    let element = inElement
    let keyId = inId
    let parent = element.parentElement

    for (let i = 0; i < 100; i++) {

        if (parent === null) {
            return null
        }

        let parentId = parent.id

        if ((String(parentId) === String(keyId))) {
            return parent
        } else {
            parent = parent.parentElement
        }
    }
}

// closesstTag()
const closestTag = function (inElement, inTag = '') {
    let element = inElement
    let keyTag = inTag
    keyTag = keyTag.toUpperCase()
    let parent = element.parentElement

    for (let i = 0; i < 100; i++) {

        if (parent === null) {
            return null
        }

        let parentTag = parent.tagName

        if (parentTag === keyTag) {
            return parent
        } else {
            parent = parent.parentElement
        }
    }
}

// closest(inElement, inKeySelector): 循环查找 element 的直系父元素
// 如果父元素符合选择器, 则返回这个父元素, 若没有，则返回 null
const closest = function (inElement, inKeySelector = '') {
    let element = inElement
    let keySelector = inKeySelector
    let keySelectorHead = keySelector[0]

    let keyClass = ''
    let keyId = ''
    let keyTag = ''

    if (keySelectorHead === '.') {
        keyClass = keySelector.slice(1)

        return closestClass(element, keyClass)
    } else if (keySelectorHead === '#') {
        keyId = keySelector.slice(1)

        return closestId(element, keyId)
    } else {
        keyTag = keySelector.slice(0)
        keyTag = keyTag.toUpperCase()

        return closestTag(element, keyTag)
    }
}

/* ================ Basic Model ================ */
const formatVideoTime = function(inTime) {

    let time = inTime

    let hour = Math.floor(time / 3600)
    hour = hour < 10 ? '0' + hour : hour

    let minute = Math.floor(time % 3600 / 60)
    minute = minute < 10 ? '0' + minute : minute

    let second = Math.floor(time % 60)
    second = second < 10 ? '0' + second : second

    return `${hour}:${minute}:${second}`
}

const videoInfo = function(inPlayer) {
    let player = inPlayer
    let allTime = e('#id-info-allTime')
    let allTimeValue = ''
    let nowTime = e('#id-info-nowTime')
    let nowTimeValue = ''
    let progress = e('#id-info-progress')
    let progressNowValue = 0
    let volumeBar = e('#id-button-volumeBar')
    let volume = 0
    let volumeString = ''
    
    // ViedoTime
    allTimeValue = parseInt(player.duration)
    allTimeValue = formatVideoTime(allTimeValue)
    allTime.innerText = allTimeValue
    
    // TimeProgress
    player.ontimeupdate = function() {
        nowTimeValue = parseInt(player.currentTime)
        nowTimeValue = formatVideoTime(nowTimeValue)
        nowTime.innerText = nowTimeValue

        let playerWidth = player.clientWidth || player.offsetWidth;
        let progressMaxWidth = parseInt(playerWidth * 0.75)
        progressNowValue = parseInt(player.currentTime / player.duration * progressMaxWidth)
        progress.style.width= parseInt(progressNowValue) + 'px'

        volume = parseInt(player.volume * 100)
        // log('--->volume =', volume)
        // for (let i = 0; i < 5; i++) {
        //     const element = array[i];
            
        // }
        volumeString = `linear-gradient(to right, rgb(1, 124, 212) 0%, rgb(1, 124, 212) ${volume}%, rgba(255, 255, 255, 0.1) ${volume + 1}%)`
        volumeBar.style.background = volumeString

    }

}

const bindVideoScreen = function(inPlayer) {
    let player = inPlayer
    let button = e('#id-button-play')

    player.addEventListener('click', function(event) {
        videoPlay(player, 'trans')
    })

    player.addEventListener('mousedown', function(event) {
        let buttonNum = event.button

        // log('--->bindVideoScreen: buttonNum =', buttonNum)

        if (buttonNum === 1) {
            if (player.requestFullscreen) {
                player.requestFullscreen()
            } else if (player.webkitRequestFullscreen) {
                player.webkitRequestFullscreen()
            } else if (player.mozRequestFullscreen) {
                player.mozRequestFullscreen()
            } else {

            }
        }
    })
}

const bindVideoProgressBar = function(inPlayer) {
    let player = inPlayer
    let button = e('#id-info-progressBar')
    let clickX = 0
    let jumpX = 0
    let jumpTime = 0

    button.addEventListener('click', function(event) {
        clickX = event.offsetX

        let playerWidth = player.clientWidth || player.offsetWidth;
        let progressBarWidth = parseInt(playerWidth * 0.75)

        let max = progressBarWidth / 2
        if (clickX < max) {
            jumpX = max - clickX
        } else {
            jumpX = clickX - max
        }

        jumpTime = parseInt(jumpX / max * player.duration)
        // log('===>jumpTime =', jumpTime)
        player.currentTime = jumpTime
    })
}

const bindVideoLoop = function(inPlayer) {
    let player = inPlayer
    let button = e('#id-button-loop')

    button.addEventListener('click', function(event) {
        let state = button.dataset.state
        if (state ==='noloop') {
            player.loop = true

            button.classList.toggle("icon-loop")
            button.classList.toggle("icon-youjiantou")

            state = 'loop'
            button.textContent = ''

            button.dataset.state = state
        } else {
            player.loop = false

            button.classList.toggle("icon-loop")
            button.classList.toggle("icon-youjiantou")

            state = 'noloop'
            button.textContent = ''
            
            button.dataset.state = state

        }
    })
}

const videoMute = function(inPlayer, inState = true) {
    let player = inPlayer
    let state = inState
    let muteButton = e('#id-button-mute')

    if (state) {
        player.muted = true

        muteButton.classList.remove("icon-volume")
        muteButton.classList.add("icon-mute")

        state = 'mute'
        // button.textContent = ''

        muteButton.dataset.state = state
    } else {
        player.muted = false

        muteButton.classList.add("icon-volume")
        muteButton.classList.remove("icon-mute")

        state = 'nomute'
        // button.textContent = ''
        
        muteButton.dataset.state = state
    }
}

const bindVideoMute = function(inPlayer) {
    let player = inPlayer
    let button = e('#id-button-mute')

    button.addEventListener('click', function(event) {
        let state = button.dataset.state
        if (state ==='nomute') {
            // player.muted = true

            // button.classList.toggle("icon-volume")
            // button.classList.toggle("icon-mute")

            // state = 'mute'
            // // button.textContent = ''

            // button.dataset.state = state
            videoMute(player, true)
        } else {
            // player.muted = false

            // button.classList.toggle("icon-volume")
            // button.classList.toggle("icon-mute")

            // state = 'nomute'
            // // button.textContent = ''
            
            // button.dataset.state = state
            videoMute(player, false)
        }
    })
}

const bindVolumeBar = function(inPlayer) {
    let player = inPlayer
    let button = e('#id-button-volumeBar')
    let clickWidth = 0
    let jumpValue = 0

    button.addEventListener('click', function(event) {
        // log('')

        clickWidth = event.offsetX
        // log('--->clickWidth =', clickWidth)
        
        let volumeWidth = button.clientWidth || button.offsetWidth;
        // log('--->volumeWidth =', volumeWidth)
        
        jumpValue = parseInt(clickWidth / volumeWidth * 100) / 100
        // log('--->jumpValue =', jumpValue)

        if (jumpValue <= 0.01) {
            jumpValue = 0

            player.volume = jumpValue

            videoMute(player, true)
        } else if (jumpValue > 1) {
            videoMute(false)
            
            jumpValue = 1
            
            player.volume = jumpValue
        } else {
            videoMute(player, false)
            
            player.volume = jumpValue
        }

        // let progressBarWidth = parseInt(playerWidth * 0.75)

        // let max = progressBarWidth / 2
        // if (clickX < max) {
        //     jumpX = max - clickX
        // } else {
        //     jumpX = clickX - max
        // }

        // jumpTime = parseInt(jumpX / max * player.duration)
        // log('===>jumpTime =', jumpTime)
        // player.currentTime = jumpTime
    })
}

const videoPlay = function(inPlay = '', inKey = 'play') {
    let player = e('video')
    let key = inKey
    let playButton = e('#id-button-play')
    let state = playButton.dataset.state

    if (key === 'trans') {
        if (state === 'pause') {
            key = 'pause'
        } else if (state === 'play') {
            key = 'play'
        }
    }

    if (key === 'play') {
        log('--->videoPlay: key is play.')
        player.play()
        videoInfo(player)

        if (playButton.classList.contains('icon-play')) {
            playButton.classList.remove("icon-play")
        }
        if (!playButton.classList.contains('icon-pause')) {
            playButton.classList.add("icon-pause")
        }
        
        state = 'pause'
        playButton.textContent = ''
        
        playButton.dataset.state = state
        
    } else if (key === 'pause') {
        log('--->videoPlay: key is pause.')

        player.pause()

        if (playButton.classList.contains('icon-pause')) {
            playButton.classList.remove("icon-pause")
        }
        if (!playButton.classList.contains('icon-play')) {
            playButton.classList.add("icon-play")
        }

        state = 'play'
        playButton.textContent = ''

        playButton.dataset.state = state
    }
}

const bindVideoPlay = function(inPlayer) {
    let player = inPlayer
    let button = e('#id-button-play')

    button.addEventListener('click', function(event) {
        let state = button.dataset.state
        if (state === 'pause') {
            videoPlay(player, 'pause')
        } else {
            videoPlay(player, 'play')
        }
    })
}

const bindVideoListsButton = () => {
    let button = e('#id-button-list')
    let lists = e('#id-lists-main')

    button.addEventListener('click', function(event) {
        log('--->lists.style.visibility =', window.getComputedStyle(lists,null).display)

        lists.classList.toggle('listsHidden')
        button.classList.toggle('button-active')
        // if (lists.style.classList == 'block') {
        //     lists.style.display === 'none';
        // } else {
        //     lists.style.visibility === 'block';
        // }
    })

}

const bindVideoFullscreen = function(inPlayer) {
    let player = inPlayer
    let button = e('#id-button-expand')

    button.addEventListener('click', function(event) {
        if (player.requestFullscreen) {
            player.requestFullscreen()
        } else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen()
        } else if (player.mozRequestFullscreen) {
            player.mozRequestFullscreen()
        } else {

        }

    })
}

const bindVideoList = (inPlayer) => {
    let player = inPlayer
    let listsMain = e('#id-lists-main')

    bindAll('.list', 'click', function() {
        let url = this.dataset.url
        log('--->url =', url)
        // player.poster = ''
        player.src = url
        // player.play()
        videoPlay(player, 'play')

        let lists = es('.list')
        for (let i = 0; i < lists.length; i++) {
            lists[i].classList.remove('inplay')
            
        }
        this.classList.add('inplay')
        
        let listNum = String(this.dataset.listNum)
        log('--->listNum =', listNum)
    })
}






/* ================ Main Function ================ */
const bindVideo = function() {
    let player = e('video')

    bindVideoScreen(player)
    bindVideoProgressBar(player)
    bindVideoLoop(player)
    bindVideoMute(player)
    bindVolumeBar(player)
    bindVideoPlay(player)
    bindVideoListsButton()
    bindVideoFullscreen(player)
    bindVideoList(player)
    
}

/* ================ Test Function ================ */

/* ================ Run ================ */
const __main = function () {
    bindVideo()
}

__main()