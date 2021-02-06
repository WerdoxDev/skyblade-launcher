import anime from 'animejs/lib/anime.es.js';

// Animated the last color percentage of a gradient (Only works with 2 colors)
function gradientColorStopAnimation(id, firstColor, secondColor, endValue, isEnter) {
    const elem = document.getElementById(id);
    const gradient = {
        startColor: firstColor,
        endColor: secondColor,
        endValue: 0
    };

    anime({
        targets: gradient,
        endValue: endValue,
        duration: 500,
        easing: 'easeOutQuint',
        update: function (a) {
            var value1 = a.animations[0].currentValue;
            if (isEnter) elem.style.backgroundImage = 'linear-gradient(to right,' + firstColor + ',' + secondColor + ' ' + value1 + '%)';
            else elem.style.backgroundImage = 'linear-gradient(to right,' + firstColor + ',' + secondColor + ' ' + (100 - value1) + '%)';
        }
    });
}

function transformAnimation(id, duration, xTo, yTo) {
    if (yTo === null) {
        anime({
            targets: id,
            translateX: xTo,
            duration: duration,
            easing: 'easeOutQuint'
        });
    } else if (xTo === null) {
        anime({
            targets: id,
            translateY: yTo,
            duration: duration,
            easing: 'easeOutQuint'
        });
    } else {
        anime({
            targets: id,
            translateX: xTo,
            translateY: yTo,
            duration: duration,
            easing: 'easeOutQuint'
        });
    }
}

function scaleAnimation(id, duration, xTo, yTo) {
    if (yTo === null) {
        anime({
            targets: id,
            scaleX: xTo,
            duration: duration,
            easing: 'easeOutQuint'
        });
    } else if (xTo === null) {
        anime({
            targets: id,
            scaleY: yTo,
            duration: duration,
            easing: 'easeOutQuint'
        });
    } else {
        anime({
            targets: id,
            scaleX: xTo,
            scaleY: yTo,
            duration: duration,
            easing: 'easeOutQuint'
        });
    }
}

export {gradientColorStopAnimation, transformAnimation, scaleAnimation};