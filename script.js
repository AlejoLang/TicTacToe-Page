let tableItems = document.querySelectorAll('.gameTable-sq');
let playingDiv = document.querySelector('.playing span');
let xWins = document.querySelector('.wins-X span');
let oWins = document.querySelector('.wins-O span');

let playing = 'X';
let resultDisplayed = false;
let tableArr = [,,,,,,,,,];
const winnerComb = [
    [1, 2, 3], [4, 5, 6], [7 ,8 ,9], 
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
];


Object.values(tableItems).forEach(item => {
    item.addEventListener('click', (event) => {
        if(event.target.textContent != '' || resultDisplayed){return;}
        event.target.textContent = playing;
        tableArr[event.target.getAttribute('value') - 1] = playing;
        if (playing == 'X'){
            event.target.style.color = 'rgb(165, 26, 26)';
            playing = 'O';
        } else {
            event.target.style.color = 'rgb(26, 26, 165)';
            playing = 'X'
        }
        playingDiv.textContent = playing;
        analizeTable(tableArr);
    })
});

const reset = () => {
    playing = 'X';
    resultDisplayed = false;
    tableArr = [,,,,,,,,,];
    Object.values(tableItems).forEach(item => {item.textContent = '';});
    playingDiv.textContent = playing;
    document.querySelector('.winnerDialog-msg').innerHTML = 'Winner: <span></span>';
}

const analizeTable = (arr) => {
    let con = false;
    winnerComb.forEach(comb => {

        let an = arr[comb[0] - 1] === arr[comb[1] - 1] && arr[comb[0] - 1] === arr[comb[2] - 1] && arr[comb[0] - 1];
        if(an){
            
            if(arr[comb[0] -1] == 'X') {
                document.querySelector('.winnerDialog-msg span').textContent = 'X';
                document.querySelector('.winnerDialog-msg span').style.color = 'rgb(165, 26, 26)';
                document.querySelector('.winnerDialog').showModal();
                xWins.textContent = parseInt(xWins.textContent, 10) + 1;
            } else {
                document.querySelector('.winnerDialog-msg span').textContent = 'O';
                document.querySelector('.winnerDialog-msg span').style.color = 'rgb(26, 26, 165)';
                document.querySelector('.winnerDialog').showModal();
                oWins.textContent = parseInt(oWins.textContent, 10) + 1;
            }
            
            resultDisplayed = true;
            con = true;
            return;
        } 
    })
    if(!con) {
        for(let i = 0; i < 9; i++){
            if(arr[i] == undefined){return;}
        }
        
        document.querySelector('.winnerDialog-msg').textContent = 'Draw';
        document.querySelector('.winnerDialog').showModal();
        resultDisplayed = true;
        return;
        
    }   
}

const closeModal = () => {
    dialog = document.querySelector('.winnerDialog');
    dialog.classList.add('hide');
    dialog.addEventListener('webkitAnimationEnd', function(){
        dialog.classList.remove('hide');
        dialog.close();
        dialog.removeEventListener('webkitAnimationEnd',  arguments.callee, false);
    }, false);
    reset();
}
