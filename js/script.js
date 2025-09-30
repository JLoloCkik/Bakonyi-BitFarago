document.addEventListener('DOMContentLoaded', function() {

    function frissitOra() {
        const oraElem = document.getElementById('ora');
        // Ha nem létezik az 'ora' id-jű elem, ne csináljon semmit (hibamegelőzés)
        if (!oraElem) return;

        const most = new Date();
        const ora = most.getHours().toString().padStart(2, '0');
        const perc = most.getMinutes().toString().padStart(2, '0');
        const masodperc = most.getSeconds().toString().padStart(2, '0');
        const idoString = `${ora}:${perc}:${masodperc}`;

        oraElem.textContent = idoString;
    }

    frissitOra();

    setInterval(frissitOra, 1000);

    const kepGomb = document.getElementById('kep-gomb');
    const kepek = document.querySelectorAll('.extra-kep');
    let aktualisKepIndex = -1;

    kepGomb.addEventListener('click', function() {

        if (aktualisKepIndex > -1) {
            kepek[aktualisKepIndex].style.display = 'none';
        }

        aktualisKepIndex = (aktualisKepIndex + 1) % kepek.length;

        kepek[aktualisKepIndex].style.display = 'block';
    });
});


function toggleBemutatkozas(elemId) {
    const elem = document.getElementById(elemId);
    if (elem.style.display === 'none' || elem.style.display === '') {
        elem.style.display = 'block';
    } else {

        elem.style.display = 'none';
    }
}