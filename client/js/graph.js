let state = '';

// function campaignFemale() {
//     closeCta();
//     showAd('campaign-female');
// }

function campaign() {
    state = 'campaign';
    closeCta();
    hideBuySuccess();
    showAd('campaign-male');
}

function cta() {
    state = 'cta';
    showCta('running-cta');
}

function shop() {
    state = 'shop';
    showCta('shop-cta');
    showAd('runfalcon');
}

function buy() {
    state = 'buy';
    closeCta();
    showAd('campaign-male');
    showBuySuccess();
    socket.emit('payment', true);
}

let engagementTimeout;

function faceEnter() {
    if (state === 'campaign') {
        cta();
        engagementTimeout = setTimeout(() => shop(), 5000);
    }
}

function faceLeave() {
    clearTimeout(engagementTimeout);
    if (state === 'buy') {
        socket.emit('pickup', true);
    }
    campaign();
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode === 32 && state === 'shop') {
        buy();
    }
});

campaign();