const F = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25];
const K = "C D E F G A B C ".split(" ");

let ctx; 
const on = {};
const row = document.getElementById('row');

const b = F.map((note, i) => {
    const cloud = document.createElement('div');
    cloud.textContent = K[i];
    row.append(cloud);
    return cloud;
});

function start(i) {
    ctx = ctx || new AudioContext();
    if (on[i]) return;

    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = F[i];
    g.gain.value = 0.2;

    o.connect(g).connect(ctx.destination);
    o.start();

    on[i] = o;
    b[i].classList.add('on');
}

    function stop(i) {
        if (!on[i]) return;
        on[i].stop();
        on[i]=0;
        b[i].classList.remove('on')
    }

    b.forEach((cloud, i) => {
        cloud.onpointerdown = () => start(i);
        cloud.onpointerup = () => stop(i);
        cloud.onpointerleave = () => stop(i);
    });