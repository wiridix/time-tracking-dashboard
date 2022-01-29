const btns = document.querySelectorAll(".button");
const cards = document.querySelectorAll(".card");

async function printData(type) {
    const res = await fetch("../data.json");
    const data = await res.json();

    const titleCard = document.querySelectorAll(".card__title");
    const cardHour = document.querySelectorAll(".card__hour");
    const cardWeek = document.querySelectorAll(".card__week");

    for (let i = 0; i < data.length; i++) {

        let title = data[i].title;
        let current = data[i].timeframes[type].current;
        let previous = data[i].timeframes[type].previous;

        titleCard[i].innerHTML = title;
        cardHour[i].innerHTML = `${current}hrs`;

        switch (type) {
            case "daily":
                cardWeek[i].innerHTML = `Last Yesterday - ${previous}hrs`
                break;
            case "weekly":
                cardWeek[i].innerHTML = `Last Week - ${previous}hrs`
                break;
            case "monthly":
                cardWeek[i].innerHTML = `Last Month - ${previous}hrs`
                break;
        
            default:
                break;
        }
    }
}

btns.forEach((btn) => {
    btn.addEventListener("click", (bt) => {
        btns.forEach(btn => btn.classList.remove('active'));
        bt.target.classList.add('active')
        const type = (bt.target.innerHTML).toLowerCase()
        printData(type);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    printData('weekly')
});