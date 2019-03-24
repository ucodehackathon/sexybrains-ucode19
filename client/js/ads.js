let actualFrame;

function changeFrameSoft(id, duration) {
    if (actualFrame && id === actualFrame.id) return;
    if (actualFrame) {
        actualFrame.classList.add('hide');
        actualFrame.style.zIndex = 2;
        const lastId = actualFrame.id;
        setTimeout(() => {
            document.getElementById(lastId).style.display = 'none';
            document.getElementById(lastId).classList.remove('hide');
        }, 500);
    }
    actualFrame = document.getElementById(id);
    actualFrame.style.display = 'block';
    actualFrame.style.zIndex = 1;
    actualFrame.getElementsByClassName('inner')[0].style.animationDuration = duration + 's';
    actualFrame.getElementsByTagName('img')[0].style.animationDuration = duration + 's';
}

function changeFrame(id, duration) {
    if (actualFrame && id === actualFrame.id) return;
    if (actualFrame) actualFrame.style.display = 'none';
    actualFrame = document.getElementById(id);
    actualFrame.style.display = 'block';
    actualFrame.getElementsByClassName('inner')[0].style.animationDuration = duration + 's';
    actualFrame.getElementsByTagName('img')[0].style.animationDuration = duration + 's';
}

let actualAd;
let adInterval;

function showAd(name) {
    if (ads[name] === actualAd) return;
    if (adInterval) clearInterval(adInterval);

    actualAd = ads[name];
    actualAd.index = 0;
    changeFrameSoft(actualAd.frames[actualAd.index], actualAd.duration);
    adInterval = setInterval(() => {
        actualAd.index = (actualAd.index + 1) % actualAd.frames.length;
        changeFrame(actualAd.frames[actualAd.index], actualAd.duration);
    }, actualAd.duration * 1000);
}

let actualCta;

function showCta(id) {
    if (actualCta) actualCta.classList.remove('show');
    actualCta = document.getElementById(id);
    actualCta.classList.add('show');
    document.body.classList.add('has-cta');
}

function closeCta() {
    if (actualCta) actualCta.classList.remove('show');
    document.body.classList.remove('has-cta');
}

function showBuySuccess() {
    document.getElementById('buy-success').classList.add('show');
}

function hideBuySuccess() {
    document.getElementById('buy-success').classList.remove('show');
}

const ads = {
    'campaign-male': {
        frames: [ 'hiking-male', 'running-male' ],
        duration: 10,
    },
    'campaign-female': {
        frames: [ 'hiking-female' ],
        duration: 10,
    },
    'runfalcon': {
        frames: [ 'runfalcon-main', 'runfalcon-detail-1', 'runfalcon-detail-2', 'runfalcon-detail-3' ],
        duration: 5,
    }
};
