const dayEl = document.getElementById('gm-days');
const hourEl = document.getElementById('gm-hours');
const minuteEl = document.getElementById('gm-minutes');
const secondEl = document.getElementById('gm-seconds');
const yearEl = document.getElementById('gm-year');
const datePicker = document.getElementById('pick-date');

// default (nëse nuk zgjedhet datë)
let newYearTime = new Date().getTime();

// kur zgjedh datën në faqe
datePicker.addEventListener("change", function() {

    const picked = new Date(this.value);
    newYearTime = picked.getTime();

    // shfaq date në format day/month/year
    const d = picked.getDate().toString().padStart(2, "0");
    const m = (picked.getMonth() + 1).toString().padStart(2, "0");
    const y = picked.getFullYear();

    yearEl.innerText = `${d}/${m}/${y}`;
});


updateCountdown()

function updateCountdown(){
    const now = new Date().getTime();
    const gap = newYearTime - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    dayEl.innerText = d;
    hourEl.innerText = h;
    minuteEl.innerText = m;
    secondEl.innerText = s;

    setTimeout(updateCountdown, 1000);
}
