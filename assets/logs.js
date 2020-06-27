function adaugaKeyDown(event)
{
    let obj = {nume: "keyup", tasta: event.code, data: new Date()}
    adaugaEvent(obj);
}

function adaugaKeyUp(event)
{
    let obj = {nume: "keydown", tasta: event.code, data: new Date()}
    adaugaEvent(obj);
}

function adaugaDblClick(event)
{
    let obj = {nume: "dblclick", coordx: event.clientX, coordy:event.clientY, data: new Date()}
    adaugaEvent(obj);
}

function adaugaClick(event)
{
    let obj = {nume: "click", coordx: event.clientX, coordy:event.clientY, data: new Date()}
    adaugaEvent(obj);
}

function adaugaEvent(obj)
{
    let eventuri = sessionStorage.getItem('eventuri');
    if (!eventuri)
        eventuri  = []
    else eventuri = JSON.parse(eventuri);
    eventuri.push(JSON.stringify(obj));
    sessionStorage.setItem('eventuri', JSON.stringify(eventuri));
}

function loadEventuri()
{
    let bod = document.getElementsByTagName("body")[0];
    bod.addEventListener("keydown", adaugaKeyDown);
    bod.addEventListener("keyup", adaugaKeyUp);
    bod.addEventListener("click", adaugaClick);
    bod.addEventListener("dblclick", adaugaDblClick);
}

window.onload = loadEventuri();