//const names = [];
const previous = [];

document.getElementById('random').disabled = true;

let btnAdd = document.getElementById('buttonplayername');
let inputplayer = document.getElementById('playername');
let inputsave = document.getElementById('savename');

btnAdd.addEventListener('click', () =>{
    if (inputplayer != "" && inputsave.value != "") {
    	//names.push(inputplayer.value);
        previous.push({name:inputplayer.value, save:inputsave.value})
        document.getElementById('old').innerHTML += '<tr><td>' + inputplayer.value + '</td><td>' + inputsave.value + '</td></tr>'
        document.getElementById('savename').value = ""
        document.getElementById('playername').value = ""
      if (document.getElementById('random').disabled == true && previous.length > 2) {
      	document.getElementById('random').removeAttribute("disabled")
        document.getElementById('random').setAttribute('class', 'btn btn-primary');
      }
    }
});

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
	const result = randomise(previous)
    document.getElementById('output').innerHTML = "<tr><th>Spieler</th><th>Speicherstand</th></tr>"
	result.forEach(element => document.getElementById('output').innerHTML += '<tr><td>' + element.name + '</td><td>' + element.save + '</td></tr>')
});