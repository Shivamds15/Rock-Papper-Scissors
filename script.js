const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#result-message");
const userscore = document.querySelector("#user-score");
const compscore = document.querySelector("#computer-score");

compscorecount = 0;
userscorecount = 0;
let gameActive = true;

choices.forEach((choice) => {
    
    choice.addEventListener("click", () => {
        if (!gameActive) {
            return;
        }; 
        choices.forEach(c => c.style.cursor = 'pointer');
        const userChoice = choice.getAttribute("id");
        playgame(userChoice);
    });
});

function playgame(userChoice) {
    const compChoice = getcompChoice();
    const result = determinewinner(userChoice, compChoice);
    updateScoreAndMsg(result, userChoice, compChoice);
}

function getcompChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determinewinner(userChoice, compChoice) {
    if (userChoice === compChoice) {
        return "Draw";
    } else if (
        (userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper")
    ) {
        return "Win";
    } else {
        return "Lose";
    }
}

function updateScoreAndMsg(result, userChoice, compChoice) {
    if (result === "Win") {
        userscorecount++;
        userscore.innerHTML = userscorecount;
        msg.innerHTML = `You Win! Your ${capitalize(userChoice)} Beats ${capitalize(
            compChoice
        )}`;
        msg.style.color = "#4caf50";
    } else if (result === "Lose") {
        compscorecount++;
        compscore.innerHTML = compscorecount;
        msg.innerHTML = `You Lose! ${capitalize(
            compChoice
        )} Beats Your ${capitalize(userChoice)}`;
        msg.style.color = "#f44336";
    } else if (result === "Draw") {
        msg.innerHTML = `It's a draw! You Both Chose ${userChoice}`;
        msg.style.color = "#ffeb3b";
    }
    if (userscorecount === 5 || compscorecount === 5) {
        gameActive = false;  
        const winner = userscorecount > compscorecount ? 'User' : 'Computer';
        msg.innerHTML = `${winner} wins the match! <br> Reset the Game`;
        msg.style.color = '#ffa500';
        choices.forEach(c => c.style.cursor = 'not-allowed');
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

document.querySelector("#resetbtn").addEventListener("click", (e) => {
    e.preventDefault();
    gameActive = true;  
    compscorecount = 0;
    userscorecount = 0;
    userscore.innerHTML = "0";
    compscore.innerHTML = "0";
    msg.innerHTML = "You have 5 Rounds, Make Your Move!";
    msg.style = "";
    choices.forEach(c => c.style.cursor = 'pointer');
});
