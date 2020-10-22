let randomNumber=Math.floor(Math.random()*100)+1;
const guesses=document.querySelector('.guesses');
const lastResult=document.querySelector('.lastResult');
const lowOrHi=document.querySelector('.lowOrHigh');
const guessField=document.querySelector('.guessField');
const guessSubmit=document.querySelector('.guessSubmit');
let guessCount=1;
let resetButton;
guessField.focus();

function checkGuess(){
    let userGuess=Number(guessField.value);
    try{
        if(userGuess==' ') throw 'Please enter a guess';
        if(isNaN(userGuess)) throw "Only no's are allowed";
        
        if (guessCount==1){
        guesses.textContent='Guesses: ';
    }    
    guesses.textContent+=userGuess + ' ';
    
    if(userGuess==randomNumber){
        lastResult.textContent='Congratulations! You guess it right';
        lastResult.style.backgroundColor='green';
        lowOrHi.textContent='';
        setGameOver();
    }
    else if(guessCount==10){
        lastResult.textContent='!!!!!!!!GAME OVER!!!!!!!!';
        setGameOver();
    }
    else{
        lastResult.textContent='WRONG!!';
        lastResult.style.backgroundColor='orange';
        if(userGuess<randomNumber){
            lowOrHi.textContent='Last guess was too low!';
        }else{
            lowOrHi.textContent='Last guess was too high!';
        }
    }
    guessCount++;
    guessField.value='';
    guessField.focus();
    }catch(err){
        lastResult.textContent=err;
        lastResult.style.backgroundColor='red';
        setGameOver();
    }
    
}
guessSubmit.addEventListener('click',checkGuess);

function setGameOver(){
    guessField.disabled=true;
    guessSubmit.disabled=true;
    resetButton=document.createElement('button');
    resetButton.textContent='Start new Game';
    document.body.append(resetButton);
    resetButton.addEventListener('click',resetGame);
}

function resetGame(){
    guessCount=1;
    const resetParas=document.querySelectorAll('.resultParas p');
    for(let i=0;i<resetParas.length;i++){
        resetParas[i].textContent='';
    }
    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled=false;
    guessSubmit.disabled=false;
    guessField.value='';
    guessField.focus();
    lastResult.style.backgroundColor='white';
    randomNumber=Math.floor(Math.random()*100)+1;
}