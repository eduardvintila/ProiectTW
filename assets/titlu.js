let v = []
let index = 0;

function animatieTitlu () {
    let titlu = "Bine ai venit pe Sisteme de Operare Linux!";
    let titlu_div = document.getElementsByClassName("titlu");
    let img = document.getElementById("linux-distros");
    for (var i = 0; i < titlu.length ; i++) {
        let bi = document.createElement("b");
        bi.innerHTML = titlu[i];
        bi.style.fontSize = "1.8em";
        bi.style.visibility = "hidden";
        titlu_div[0].insertBefore(bi, img);
        v.push(bi);
    }
    titlu_div[0].insertBefore(document.createElement("br"), img);
    titlu_div[0].insertBefore(document.createElement("br"), img);
    loadEventuri();
    let timer = new Timer();

}

function Timer() {
    let timer = setInterval(function () {
        if (index <= v.length - index - 1) {
            v[index].style.visibility = "visible";
            v[v.length - index - 1].style.visibility = "visible";
            index++;
        }
    }, 100);
}