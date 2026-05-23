/////////////////////////////////////////slider/////////////////////////////////////
const slideImg1 = document.getElementById('slideImg1')
const slideImg2 = document.getElementById('slideImg2')
const images = ['img/01.jpg', 'img/02.jpg', 'img/03.jpg', 'img/04.jpg', 'img/05.jpg', 'img/06.jpg', 'img/07.jpg', 'img/08.jpg',]
const imgNextPrev = ['img/img-vid.jpeg', 'img/01.jpg', 'img/02.jpg', 'img/03.jpg', 'img/04.jpg', 'img/05.jpg', 'img/06.jpg', 'img/07.jpg', 'img/08.jpg',]
const videoSlide = document.querySelector('video')
const imgPrev = document.getElementById('imgPrev')
const imgNext = document.getElementById('imgNext')
let currentIndex4 = 0
let isAnimating4 = false
let timer = null
let turn = 1
let isVideoMode = true
let activeImg = videoSlide
let hiddenImg = slideImg1


activeImg.classList.add('active')

function switchToImage(newSrc) {
    if (isAnimating4) return
    isAnimating4 = true

    hiddenImg.src = newSrc
    hiddenImg.classList.remove('slideHidden')

    activeImg.classList.add('fade-out')
    hiddenImg.classList.add('fade-in')

    setTimeout(() => {
        activeImg.classList.remove('active', 'fade-out')

        hiddenImg.classList.remove('fade-in')
        hiddenImg.classList.add('active')

        let temp = activeImg
        activeImg = hiddenImg
        hiddenImg = temp

        hiddenImg.classList.add('slideHidden')
        hiddenImg.classList.remove('active', 'fade-out', 'fade-in')

        isVideoMode = false
        isAnimating4 = false
    }, 600)
}

function switchToVideo() {
    if (isAnimating4) return
    isAnimating4 = true

    videoSlide.classList.remove('slideHidden')
    videoSlide.currentTime = 0
    videoSlide.play()

    activeImg.classList.add('fade-out')
    videoSlide.classList.add('fade-in')

    setTimeout(() => {
        activeImg.classList.remove('active', 'fade-out')
        activeImg.classList.add('slideHidden')

        videoSlide.classList.remove('fade-in')
        videoSlide.classList.add('active')

        activeImg = videoSlide
        hiddenImg = (hiddenImg === slideImg1) ? slideImg2 : slideImg1
        hiddenImg.classList.add('slideHidden')

        isVideoMode = true
        isAnimating4 = false
    }, 600)
}

function switchFromVideoToImage(newSrc) {
    if (isAnimating4) return
    isAnimating4 = true

    if (activeImg === videoSlide) {
        hiddenImg = slideImg1
        hiddenImg.src = newSrc
    }

    hiddenImg.classList.remove('slideHidden')

    videoSlide.classList.add('fade-out')
    hiddenImg.classList.add('fade-in')

    setTimeout(() => {
        videoSlide.classList.remove('active', 'fade-out')
        videoSlide.classList.add('slideHidden')
        videoSlide.pause()

        hiddenImg.classList.remove('fade-in')
        hiddenImg.classList.add('active')

        activeImg = hiddenImg
        hiddenImg = (hiddenImg === slideImg1) ? slideImg2 : slideImg1
        hiddenImg.classList.add('slideHidden')

        isVideoMode = false
        isAnimating4 = false
    }, 600)
}

function startTimer() {
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
        if (!isAnimating4) nextImg()
    }, 8000)
}

function stopTimer() {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
}

function nextImg() {
    if (isAnimating4) return

    if (isVideoMode) {
        currentIndex4 = 0
        switchFromVideoToImage(images[currentIndex4])
        startTimer()
    } else if (!isVideoMode && currentIndex4 < images.length - 1) {
        currentIndex4++
        switchToImage(images[currentIndex4])
    } else if (!isVideoMode && currentIndex4 === images.length - 1) {
        switchToVideo()
        currentIndex4 = -1
        stopTimer()
    }

    if (turn < imgNextPrev.length - 1) {
        turn++
        setTimeout(() => {
            imgNext.src = imgNextPrev[turn]
        }, 100);
        if (turn >= 2) {
            imgPrev.src = imgNextPrev[turn - 2]
        } else {
            imgPrev.src = imgNextPrev[imgNextPrev.length - 1]
        }
    } else {
        turn = 0
        setTimeout(() => {
            imgNext.src = imgNextPrev[turn]
            imgPrev.src = imgNextPrev[imgNextPrev.length - 2]
        }, 100);
    }
}

function prevImg() {
    if (isAnimating4) return

    if (isVideoMode) {
        currentIndex4 = images.length - 1
        switchFromVideoToImage(images[currentIndex4])
        startTimer()
    } else if (!isVideoMode && currentIndex4 > 0) {
        currentIndex4--
        switchToImage(images[currentIndex4])
    } else if (!isVideoMode && currentIndex4 === 0) {
        switchToVideo()
        currentIndex4 = -1
        stopTimer()
    }

    if (turn !== 1) {
        if (turn > 2) {
            turn--
            setTimeout(() => {
                imgNext.src = imgNextPrev[turn]
                imgPrev.src = imgNextPrev[turn - 2]
            }, 100);

        } else if (turn === 2) {
            turn--
            setTimeout(() => {
                imgNext.src = imgNextPrev[turn]
                imgPrev.src = imgNextPrev[imgNextPrev.length - 1]
            }, 100);
        } else {
            turn = imgNextPrev.length - 1
            setTimeout(() => {
                imgPrev.src = imgNextPrev[turn - 2]
            }, 100);
            imgNext.src = imgNextPrev[turn]
        }
    } else {
        setTimeout(() => {
            imgPrev.src = imgNextPrev[imgNextPrev.length - 2]
            turn--
            imgNext.src = imgNextPrev[turn]
        }, 100);
    }
}

videoSlide.addEventListener('ended', () => {
    if (isVideoMode && !isAnimating4) {
        nextImg()
        startTimer()
    }
})

startTimer()
///////////////////////////////////////////////////////end slider//////////////////////////////////////

////////////////////////////////////////////////////menu//////////////////////////////////////
const ham1 = document.getElementById('ham1')
const menu1 = document.getElementById('menu1')
const ham2 = document.getElementById('ham2')
const menu2 = document.getElementById('menu2')
const close = document.getElementById('close')
let stat = false

function openSideBar() {
    setTimeout(() => {
        menu2.classList.add('w-full')
    }, 200);
    menu2.children[0].classList.add('right-0')
    stat = true
}

function closeSideBar() {
    setTimeout(() => {
        menu2.classList.remove('w-full')
    }, 200);
    menu2.children[0].classList.remove('right-0')
    stat = false
}

ham2.addEventListener('click', (e) => {
    e.stopPropagation()
    openSideBar()
})

document.addEventListener('click', (e) => {
    if (stat && !menu2.children[0].contains(e.target)) {
        closeSideBar()
    }
})

window.addEventListener('scroll', () => {
    const st = window.scrollY
    if (st > 500) {
        closeSideBar()
    }
})
/////////////////////////////
function openMenu() {
    setTimeout(() => {
        menu1.classList.add('w-full')
    }, 200);
    menu1.children[0].classList.add('left-0')
    stat = true
    document.body.classList.add('overflow-hidden')
}

function closeMenu() {
    setTimeout(() => {
        menu1.classList.remove('w-full')
    }, 200);
    menu1.children[0].classList.remove('left-0')
    stat = false
    document.body.classList.remove('overflow-hidden')
}

ham1.addEventListener('click', (e) => {
    e.stopPropagation()
    openMenu()
    setTimeout(() => {
        ham1.classList.add('hidden')
        ham1.nextElementSibling.classList.remove('hidden')
    }, 200);
})

close.addEventListener('click', () => {
    closeMenu()
    setTimeout(() => {
        ham1.classList.remove('hidden')
        ham1.nextElementSibling.classList.add('hidden')
    }, 200);
})

document.addEventListener('click', (e) => {
    if (!stat && !menu1.children[0].contains(e.target)) {
        closeMenu()
        setTimeout(() => {
            ham1.classList.remove('hidden')
            ham1.nextElementSibling.classList.add('hidden')
        }, 200);
    }
})
/////////////////////////////////////////////////end menu/////////////////////////////////////////////

/////////////////////////////////////////////////rooms//////////////////////////////////////////////////
const Bus = document.getElementById('bus')
const card = document.querySelectorAll('.card')
let currentStartIndex = 0
let isDragging = false;
let startX = 0
let startY = 0
let startTranslate = 0
let currentTranslate = 0
let autoInterval;
let isHorizontalDrag = false
let directionDetected = false

function getCardWidth() {
    return card[0]?.offsetWidth || 0;
}

function getVisibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

function getPositionFromStart() {
    const cardWidth = getCardWidth()
    return currentStartIndex * cardWidth
}

function moveToStartIndex(newStartIndex, withTransition = true) {
    const totalCard = card.length
    const visible = getVisibleCount()
    const maxStartIndex = totalCard - visible

    if (newStartIndex > maxStartIndex) newStartIndex = 0
    if (newStartIndex < 0) newStartIndex = maxStartIndex

    currentStartIndex = newStartIndex
    const newPosition = getPositionFromStart()
    currentTranslate = newPosition

    if (withTransition) {
        Bus.style.transition = 'transform 0.3s ease'
    } else {
        Bus.style.transition = 'none'
    }

    Bus.style.transform = 'translateX(' + newPosition + 'px)'
}

function autoMove() {
    if (isDragging) return

    const visible = getVisibleCount()
    const totalCard = card.length
    const maxStartIndex = totalCard - visible

    let newIndex = currentStartIndex + 1

    if (newIndex > maxStartIndex) {
        newIndex = 0
    }

    moveToStartIndex(newIndex)
}

function startAutoMove() {
    if (autoInterval) clearInterval(autoInterval)
    autoInterval = setInterval(autoMove, 5000);
}

function startDrag(e) {
    isDragging = true
    directionDetected = false
    isHorizontalDrag = false
    clearInterval(autoInterval)

    if (e.type === 'mousedown') {
        startX = e.clientX
        startY = e.clientY
    } else {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
    }

    startTranslate = currentTranslate
    Bus.style.transition = 'none'
}

function onDrag(e) {
    if (!isDragging) return

    let currentX, currentY;
    if (e.type === 'mousemove') {
        currentX = e.clientX
        currentY = e.clientY
    } else {
        currentX = e.touches[0].clientX
        currentY = e.touches[0].clientY
    }

    const deltaX = currentX - startX
    const deltaY = currentY - startY

    if (!directionDetected && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
        directionDetected = true
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            isHorizontalDrag = true
        } else {
            isHorizontalDrag = false
        }
    }

    if (!isHorizontalDrag && directionDetected) {
        isDragging = false
        return
    }

    if (isHorizontalDrag) {
        if (e.cancelable) {
            e.preventDefault()
        }

        const cardWidth = getCardWidth()
        const visible = getVisibleCount()
        const maxStartIndex = card.length - visible
        const maxTranslate = maxStartIndex * cardWidth
        const minTranslate = 0

        let newTranslate = startTranslate + deltaX
        newTranslate = Math.max(minTranslate, Math.min(maxTranslate, newTranslate))

        Bus.style.transform = 'translateX(' + newTranslate + 'px)'
        currentTranslate = newTranslate
    }
}

function endDrag() {
    if (!isDragging) {
        directionDetected = false
        isHorizontalDrag = false
        return
    }
    isDragging = false

    if (isHorizontalDrag) {
        const cardWidth = getCardWidth()
        const visible = getVisibleCount()
        const maxStartIndex = card.length - visible

        let rawIndex = Math.round(Math.abs(currentTranslate) / cardWidth)

        rawIndex = Math.max(0, Math.min(maxStartIndex, rawIndex))

        moveToStartIndex(rawIndex)
    }


    directionDetected = false
    isHorizontalDrag = false
    startAutoMove()
}

card.forEach((val) => {
    val.addEventListener('mousedown', startDrag)
    val.addEventListener('touchstart', startDrag, { passive: false })
})

window.addEventListener('mousemove', onDrag)
window.addEventListener('touchmove', onDrag, { passive: false })
window.addEventListener('mouseup', endDrag)
window.addEventListener('touchend', endDrag)

document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('dragstart', (e) => e.preventDefault())
})

window.addEventListener('resize', () => {
    if (!isDragging) {
        moveToStartIndex(currentStartIndex, false)
    }
})

moveToStartIndex(0, false)
startAutoMove()
///////////////////////////////////////////////end rooms////////////////////////////////////

//////////////////////////////////////////////healt//////////////////////////////////////
const healItem = document.querySelectorAll('#healItem')
const heal = document.querySelectorAll('#heal')

healItem[0].classList.add('bgOr')
function resetAll() {
    healItem.forEach(val => val.classList.remove('bgOr'))
    heal.forEach(val => {
        val.classList.remove('flex')
        val.classList.add('hidden')
    })
}
healItem.forEach((val, index) => {
    val.addEventListener('click', () => {
        resetAll()
        val.classList.add('bgOr')
        heal[index].classList.add('flex')
        heal[index].classList.remove('hidden')
    })
})
/////////////////////////////////////////////////// end healt //////////////////////////////////

/////////////////////////////////////////////////// restaurant ///////////////////////////////////
const resBus = document.getElementById('resBus')
const resCard = document.querySelectorAll('.resCard')
let autoTimer;
let cardW = resCard[0].offsetWidth
let totalSlides = resCard.length
let isAnimating = false
let isDraging2 = false
let startX2 = 0
let startY2 = 0
let currentTransform = 0
let currentIndex = 1
let isHorizontalDrag2 = false
let directionDetected2 = false

function cloneSlides() {
    const firstClone = resCard[0].cloneNode(true)
    firstClone.classList.add('clone')

    const lastClone = resCard[totalSlides - 1].cloneNode(true)
    lastClone.classList.add('clone')

    resBus.insertBefore(lastClone, resBus.firstChild)

    resBus.appendChild(firstClone)

    const newWidth = cardW * (totalSlides + 2)
    resBus.style.width = `${newWidth}px`

    resBus.style.transform = `translateX(-${cardW}px)`
    currentTransform = -cardW
}

function updateCardWidth() {
    cardW = resCard[0].offsetWidth
    const currentChildren = resBus.children.length
    if (currentChildren > totalSlides) {
        const newWidth = cardW * (totalSlides + 2)
        resBus.style.width = `${newWidth}px`
    }
}

function goToSlide(index, withAnimation = true) {
    if (withAnimation) {
        resBus.style.transition = 'transform 0.5s ease-in'
    } else {
        resBus.style.transition = 'none'
    }

    const newPosition = -index * cardW
    resBus.style.transform = `translateX(${newPosition}px)`
    currentTransform = newPosition
    currentIndex = index
}

function fixInfinitePosition() {
    if (currentIndex >= totalSlides + 1) {
        resBus.style.transition = 'none'
        const newIndex = 1
        const newPosition = -newIndex * cardW
        resBus.style.transform = `translateX(${newPosition}px)`
        currentTransform = newPosition
        currentIndex = newIndex
    }

    if (currentIndex <= 0) {
        resBus.style.transition = 'none'
        const newIndex = totalSlides
        const newPosition = -newIndex * cardW
        resBus.style.transform = `translateX(${newPosition}px)`
        currentTransform = newPosition
        currentIndex = newIndex
    }

    setTimeout(() => {
        resBus.style.transition = 'transform 0.5s ease-in'
    }, 50);
}

function nextRes() {
    if (isAnimating) return;
    isAnimating = true
    goToSlide(currentIndex + 1)

    setTimeout(() => {
        fixInfinitePosition()
        isAnimating = false
    }, 500);
}

function prevRes() {
    if (isAnimating) return;
    isAnimating = true
    goToSlide(currentIndex - 1)

    setTimeout(() => {
        fixInfinitePosition()
        isAnimating = false
    }, 500);
}

function startAutoPlay() {
    stopAutoPlay()
    autoTimer = setInterval(() => {
        if (!isAnimating && !isDraging2) {
            nextRes()
        }
    }, 10000);
}

function stopAutoPlay() {
    if (autoTimer) {
        clearInterval(autoTimer)
        autoTimer = null
    }
}

let dragStartTransform = 0
let dragStartIndex = 0

function onDragStart(e) {
    if (isAnimating) return;
    stopAutoPlay()
    isDraging2 = true
    directionDetected2 = false
    isHorizontalDrag2 = false

    if (e.type === 'mousedown') {
        startX2 = e.pageX
        startY2 = e.pageY
    } else {
        startX2 = e.touches[0].pageX
        startY2 = e.touches[0].pageY
    }

    dragStartTransform = currentTransform
    dragStartIndex = currentIndex
    resBus.style.transition = 'none'
}

function onDragMove(e) {
    if (!isDraging2) return;

    let currentX, currentY;
    if (e.type === 'mousemove') {
        currentX = e.pageX
        currentY = e.pageY
    } else {
        currentX = e.touches[0].pageX
        currentY = e.touches[0].pageY
    }

    const deltaX = currentX - startX2
    const deltaY = currentY - startY2

    if (!directionDetected2 && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
        directionDetected2 = true
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            isHorizontalDrag2 = true
        } else {
            isHorizontalDrag2 = false
        }
    }

    if (!isHorizontalDrag2 && directionDetected2) {
        isDraging2 = false
        return
    }

    if (isHorizontalDrag2) {
        if (e.cancelable) {
            e.preventDefault()
        }

        const moveX = currentX - startX2
        let newTransform = dragStartTransform + moveX

        const maxTransform = 0
        const minTransform = -(totalSlides + 1) * cardW

        if (newTransform > maxTransform) newTransform = maxTransform
        if (newTransform < minTransform) newTransform = minTransform

        resBus.style.transform = `translateX(${newTransform}px)`
        currentTransform = newTransform
    }
}

function onDragEnd(e) {
    if (!isDraging2) {
        directionDetected2 = false
        isHorizontalDrag2 = false
        return
    }

    isDraging2 = false

    if (isHorizontalDrag2) {
        const moveAmount = currentTransform - dragStartTransform
        const movePercent = Math.abs(moveAmount) / cardW

        let newIndex = currentIndex;

        if (movePercent > 0.2) {
            if (moveAmount < 0) {
                newIndex = currentIndex + 1
            } else {
                newIndex = currentIndex - 1;
            }
        }

        goToSlide(newIndex, true)

        setTimeout(() => {
            fixInfinitePosition()
            startAutoPlay()
        }, 500);
    }

    directionDetected2 = false
    isHorizontalDrag2 = false
    startAutoPlay()
}

resBus.addEventListener('mousedown', onDragStart)
window.addEventListener('mousemove', onDragMove)
window.addEventListener('mouseup', onDragEnd)

resBus.addEventListener('touchstart', onDragStart)
window.addEventListener('touchmove', onDragMove, { passive: false })
window.addEventListener('touchend', onDragEnd)

window.addEventListener('resize', () => {
    updateCardWidth()
    goToSlide(currentIndex, false)
})

updateCardWidth()
cloneSlides()
goToSlide(1, false)
startAutoPlay()
/////////////////////////////////////////////////// end restaurant ///////////////////////////////////

//////////////////////////////////////////////// to up ///////////////////////////////////
const toUp = document.getElementById('toUp')

window.addEventListener('scroll', () => {
    let tS = window.scrollY
    if ((tS >= 300) && (window.innerWidth >= 768)) {
        toUp.classList.remove('w-0', 'h-0', 'opacity-0', 'invisible', 'top-1/2', 'left-1/2')
        toUp.classList.add('w-full', 'h-full', 'opacity-100', 'visible', 'top-0', 'left-0')
    } else {
        toUp.classList.remove('w-full', 'h-full', 'opacity-100', 'visible', 'top-0', 'left-0')
        toUp.classList.add('w-0', 'h-0', 'opacity-0', 'invisible', 'top-1/2', 'left-1/2')
    }
})

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
}

toUp.addEventListener('click', scrollToTop)
//////////////////////////////////////////////// end to up ///////////////////////////////////

///////////////////////////////////////////////// comment ///////////////////////////////////
const comBus = document.getElementById('comBus')
const comCard = document.querySelectorAll('.comCard')
let autoTimer3;
let totalSlides3 = comCard.length
let isAnimating3 = false
let isDragging3 = false
let startX3 = 0
let startY3 = 0
let currentTransform3 = 0
let currentIndex3 = 1
let cardW3 = 0
let isHorizontalDrag3 = false
let directionDetected3 = false

function getRealWidth() {
    const contBus = comBus.parentElement
    return contBus.offsetWidth
}

function updateCardWidth3() {
    cardW3 = getRealWidth()
    const currentChildren = comBus.children.length
    if (currentChildren > totalSlides3) {
        const newWidth = cardW3 * (totalSlides3 + 2)
        comBus.style.width = `${newWidth}px`
    }
    const allCards = document.querySelectorAll('.comCard')
    allCards.forEach(card => {
        card.style.width = `${cardW3}px`
    })
}

function cloneSlides3() {
    const firstClone = comCard[0].cloneNode(true)
    firstClone.classList.add('clone')
    const lastClone = comCard[totalSlides3 - 1].cloneNode(true)
    lastClone.classList.add('clone')
    comBus.insertBefore(lastClone, comBus.firstChild)
    comBus.appendChild(firstClone)
    updateCardWidth3()
    comBus.style.transform = `translateX(-${cardW3}px)`
    currentTransform3 = -cardW3
}

function goToSlide3(ind, withAnimations = true) {
    if (withAnimations) {
        comBus.style.transition = 'transform 0.3s ease-in'
    } else {
        comBus.style.transition = 'none'
    }
    const newPosition = -ind * cardW3
    comBus.style.transform = `translateX(${newPosition}px)`
    currentTransform3 = newPosition
    currentIndex3 = ind
}

function fixInfinitePosition3() {
    if (currentIndex3 >= totalSlides3 + 1) {
        comBus.style.transition = 'none'
        const newIndex = 1
        const newPosition = -newIndex * cardW3
        comBus.style.transform = `translateX(${newPosition}px)`
        currentTransform3 = newPosition
        currentIndex3 = newIndex
    }
    if (currentIndex3 <= 0) {
        comBus.style.transition = 'none'
        const newIndex = totalSlides3
        const newPosition = -newIndex * cardW3
        comBus.style.transform = `translateX(${newPosition}px)`
        currentTransform3 = newPosition
        currentIndex3 = newIndex
    }
    setTimeout(() => {
        comBus.style.transition = 'transform 0.3s ease-in'
    }, 50);
}

function nextCom() {
    if (isAnimating3) return
    isAnimating3 = true
    goToSlide3(currentIndex3 + 1)
    setTimeout(() => {
        fixInfinitePosition3()
        isAnimating3 = false
    }, 300);
}

function prevCom() {
    if (isAnimating3) return
    isAnimating3 = true
    goToSlide3(currentIndex3 - 1)
    setTimeout(() => {
        fixInfinitePosition3()
        isAnimating3 = false
    }, 300);
}

function startAutoPlay3() {
    stopAutoPlay3()
    autoTimer3 = setInterval(() => {
        if (!isDragging3 && !isAnimating3) {
            nextCom()
        }
    }, 5000);
}

function stopAutoPlay3() {
    if (autoTimer3) {
        clearInterval(autoTimer3)
        autoTimer3 = null
    }
}

let dragStartTransform3 = 0
let dragStartIndex3 = 0

function onDragStart3(e) {
    if (isAnimating3) return
    stopAutoPlay3()
    isDragging3 = true
    directionDetected3 = false
    isHorizontalDrag3 = false

    if (e.type === 'mousedown') {
        startX3 = e.pageX
        startY3 = e.pageY
    } else {
        startX3 = e.touches[0].pageX
        startY3 = e.touches[0].pageY
    }

    dragStartTransform3 = currentTransform3
    dragStartIndex3 = currentIndex3
    comBus.style.transition = 'none'
}

function onDragMove3(e) {
    if (!isDragging3) return;

    let currentX, currentY;
    if (e.type === 'mousemove') {
        currentX = e.pageX
        currentY = e.pageY
    } else {
        currentX = e.touches[0].pageX
        currentY = e.touches[0].pageY
    }

    const deltaX = currentX - startX3
    const deltaY = currentY - startY3

    if (!directionDetected3 && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
        directionDetected3 = true
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            isHorizontalDrag3 = true
        } else {
            isHorizontalDrag3 = false
        }
    }

    if (!isHorizontalDrag3 && directionDetected3) {
        isDragging3 = false
        return
    }

    if (isHorizontalDrag3) {
        if (e.cancelable) {
            e.preventDefault()
        }

        const moveX = currentX - startX3
        let newTransform = dragStartTransform3 + moveX

        const maxTransform = 0
        const minTransform = -(totalSlides3 + 1) * cardW3

        if (newTransform > maxTransform) newTransform = maxTransform
        if (newTransform < minTransform) newTransform = minTransform

        comBus.style.transform = `translateX(${newTransform}px)`
        currentTransform3 = newTransform
    }
}

function onDragEnd3(e) {
    if (!isDragging3) {
        directionDetected3 = false
        isHorizontalDrag3 = false
        return
    }

    isDragging3 = false

    if (isHorizontalDrag3) {
        const moveAmount = currentTransform3 - dragStartTransform3
        const movePercent = Math.abs(moveAmount) / cardW3
        let newIndex = currentIndex3

        if (movePercent > 0.2) {
            if (moveAmount < 0) {
                newIndex = currentIndex3 + 1
            } else {
                newIndex = currentIndex3 - 1
            }
        }

        goToSlide3(newIndex, true)

        setTimeout(() => {
            fixInfinitePosition3()
            startAutoPlay3()
        }, 300);
    }

    directionDetected3 = false
    isHorizontalDrag3 = false
    startAutoPlay3()
}

comBus.addEventListener('mousedown', onDragStart3)
window.addEventListener('mousemove', onDragMove3)
window.addEventListener('mouseup', onDragEnd3)

comBus.addEventListener('touchstart', onDragStart3)
window.addEventListener('touchmove', onDragMove3, { passive: false })
window.addEventListener('touchend', onDragEnd3)

window.addEventListener('resize', () => {
    updateCardWidth3()
    goToSlide3(currentIndex3, false)
})

updateCardWidth3()
cloneSlides3()
goToSlide3(1, false)
startAutoPlay3()
///////////////////////////////////////////////// end comment ///////////////////////////////////