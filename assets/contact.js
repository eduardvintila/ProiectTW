let mesaj_eroare = "Ai gresit la introducerea: ";
sessionStorage.setItem("timp", 10);
var cap = "";

function generateRandom(lungime) {
    let rez = '';
    let caractere = 'ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789';
    for (var i = 0; i < lungime; i++) {
        rez += caractere.charAt(Math.floor(Math.random() * caractere.length));
    }
    return rez;
}

function generateCaptcha() {
    cap = generateRandom(8);
    console.log(cap);
    let captcha_div = document.getElementById("captcha");
    let captcha_input = document.getElementById("captcha_input");
    let captchas = document.querySelectorAll(".captcha_text");
    for (var i = 0; i < 8; i++) {
        if (!captchas.length) {
            bi = document.createElement("b");
            bi.className = "captcha_text";
            captcha_div.insertBefore(bi, captcha_input);
        }
        else bi = captchas[i]; // daca am creat inainte un captcha

        bi.innerHTML = cap[i];
        bi.style.color = '#' + Math.floor(Math.random() * 16777215).toString(16); // culoare random
        bi.style.position = "relative";
        bi.style.top = "-" + Math.floor(Math.random() * 20).toString(10) + "%";
        bi.style.fontSize = Math.floor(Math.random() * 20 + 15).toString(10) + "px";
        bi.style.display = "inline-block";
        bi.style.transform = "rotate(" + Math.floor(Math.random() * 40 - 20).toString(10) + "deg)";

    }
    captcha_div.insertBefore(document.createElement("div"), captcha_input);
}

window.onload = function () {
    let bod = document.getElementsByTagName("body")[0];
    bod.addEventListener("keyup", function (event) {

        if (event.keyCode == 13) {
            buton = document.getElementById("butontrimitere");
            buton.click();
        }
    })
}

function checknume(nume) {
    let re = /[a-zA-Z\s]+/
    if (!re.test(nume)) {
        mesaj_eroare += "numelui, ";
        return false;
    }
    return true;
}


function checktel(tel) {
    let re = /07\d{8}/
    if (!re.test(tel)) {
        mesaj_eroare += "numarului de telefon, ";
        return false;
    }
    return true;
}

function checkmail(mail) {
    let re = /[a-zA-Z]+@[a-zA-Z]+\.[a-z]{2,}/
    if (!re.test(mail)) {
        mesaj_eroare += "mail-ului, ";
        return false;
    }

    return true;
}

function checkmesaj(mesaj) {
    let re = /.+/
    if (!re.test(mesaj))
        return false;

    return true;
}

function trimis_anterior() {
    if (sessionStorage.getItem("nume") && sessionStorage.getItem("timp") > 0)
        return true;

    return false;
}

function checkcaptcha(captcha_input) {
    if (cap != captcha_input) {
        mesaj_eroare += "captcha-ului, ";
        return false;
    }
    return true;
}

function validare() {
    mesaj_eroare = "Ai gresit la introducerea: ";
    let eroare = document.getElementById("eroare");
    eroare.style.color = "rgb(243, 209, 17)";
    if (trimis_anterior()) {
        timer = new Timer();
        eroare.style.visibility = "visible";
        eroare.innerHTML = "Ai mai trimis deja un mesaj. Mai trebuie sa astepti " + sessionStorage.getItem("timp") + " secunde";
        return false;
    }

    let nume = document.forms["formular-contact"]["nume"].value;
    let mail = document.forms["formular-contact"]["mail"].value;
    let tel = document.forms["formular-contact"]["telefon"].value;
    let mesaj = document.forms["formular-contact"]["mesaj"].value;
    let captcha_input = document.getElementById("captcha_input").value;
    let ok = true;


    ok = checknume(nume);
    ok = checkmail(mail) && ok;
    ok = checktel(tel) && ok;
    ok = checkmesaj(mesaj) && ok;
    ok = checkcaptcha(captcha_input) && ok;

    mesaj_eroare = mesaj_eroare.slice(0, -2);
    mesaj_eroare += "!";

    if (!ok) {
        eroare.style.visibility = "visible";
        eroare.innerHTML = mesaj_eroare;
        generateCaptcha();
    }
    return ok;
}

/*
function apasareButon()
{
    url = "https://edi47.free.beeceptor.com/test";
    fetch(url)
    .then((response) => {return response.json(); })
    .then((data) => {
        console.log(data);
        alert(data["mesaj"]);
    });

}
*/
function Timer() {
    let timer = setInterval(function () {

        var t = sessionStorage.getItem("timp");
        t -= 1;
        sessionStorage.setItem("timp", t);
    }, 1000);
}
