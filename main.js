previous = [];
result = []
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
const currentDate = new Date();
date = formatDate(currentDate);

document.getElementById('random').disabled = true;
document.getElementById('download').disabled = true;

let btnAdd = document.getElementById('buttonplayername');
let inputplayer = document.getElementById('playername');
let inputsave = document.getElementById('savename');

btnAdd.addEventListener('click', () =>{
    if (inputplayer != "" && inputsave.value != "") {
    	//names.push(inputplayer.value);
        playerstr = encodeURI(inputplayer.value)
        savestr = encodeURI(inputsave.value)
        previous.push({name:playerstr, save: savestr})
        document.getElementById('old').innerHTML += '<tr><td>' + inputplayer.value + '</td><td>' + inputsave.value + '</td></tr>'
        document.getElementById('savename').value = ""
        document.getElementById('playername').value = ""
      if (document.getElementById('random').disabled == true && previous.length > 2) {
      	document.getElementById('random').removeAttribute("disabled")
        document.getElementById('random').setAttribute('class', 'btn btn-primary');
      }
    }
});

let upload = document.getElementById('upload')
upload.addEventListener('click', openDialog);
function openDialog() {
  document.getElementById('file').click();
}

(function(){
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    var obj = JSON.parse(event.target.result)
    previous = previous.concat(obj)
    console.log(previous)
    document.getElementById('old').innerHTML = "<tr><th>Spieler</th><th>Speicherstand</th></tr>"
    previous.forEach(element => document.getElementById('old').innerHTML += '<tr><td>' + decodeURI(element.name) + '</td><td>' + decodeURI(element.save) + '</td></tr>')
    if (document.getElementById('random').disabled == true && previous.length > 2) {
        document.getElementById('random').removeAttribute("disabled")
        document.getElementById('random').setAttribute('class', 'btn btn-primary position-absolute start-50 translate-middle-x')
    }
}
document.getElementById('file').addEventListener('change', onChange);
}());

function getRndInteger(min, max) {
    return (Math.floor(Math.pow(10,14)*Math.random()*Math.random())%(max-min+1))+min;
}

function randomise(PreviousNames) {
    const pool = [] 
    PreviousNames.forEach(element => pool.push(element.save));
    const output = [];
    for (i=0; i<PreviousNames.length; i++) {
        j = getRndInteger(0, pool.length-1)
        if (pool[j].toLowerCase() != PreviousNames[i].save.toLowerCase()){
            output.push({name:PreviousNames[i].name, save:pool[j]})
            pool.splice(j,1)
        }        
    }
    if (output.length == PreviousNames.length) {
    	return output
    }
		else {
    	return randomise(PreviousNames)
    }
}

let random = document.getElementById('random');
random.addEventListener('click', () =>{
	result = randomise(previous)
    document.getElementById('output').innerHTML = "<tr><th>Spieler</th><th>Speicherstand</th></tr>"
	result.forEach(element => document.getElementById('output').innerHTML += '<tr><td>' + decodeURI(element.name) + '</td><td>' + decodeURI(element.save) + '</td></tr>')
    document.getElementById('download').removeAttribute("disabled")
    document.getElementById('download').setAttribute('class', 'btn btn-primary position-absolute start-50 translate-middle-x');
});

download = document.getElementById('download');
download.addEventListener('click', () =>{
    console.log(result)
    const filename = 'Auslosung '+date+'.json';
    const jsonStr = JSON.stringify(result);

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
});