let roulette = document.getElementById("roulette-btn");
let participant = document.getElementById("Participants");
let eliminated = document.getElementById("Eliminated");
let song = document.getElementById("song");
let participants = [];
const colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
let lastColor = '';
let rotation = 0;
let spin;

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

function getColor()
{
    let col = '#';
    for(let x = 0; x < 6; ++x)
        col += colors[getRandomInt(0, colors.length)];
    if(col != lastColor)
    {
        lastColor = col;
        return col;
    }
    else
        return getColor();
}

function drawRoulette(extrarotation = 0)
{
    const center = roulette.offsetWidth / 4;
    let canvas = roulette.getContext("2d");
    canvas.clearRect(0, 0, roulette.offsetWidth, roulette.offsetHeight);
    if(participants.length)
    {
        canvas.beginPath();
        canvas.moveTo(center, center);
        canvas.arc(center, center, center - 15, 0, 2 * Math.PI);
        canvas.lineTo(center, center);
        canvas.fillStyle = getColor();
        canvas.fill();
        for(let x = 0; x < participants.length; ++x)
        {
            canvas.beginPath();
            canvas.moveTo(center, center);
            canvas.arc(center, center, center - 20, (x * 2 * Math.PI / participants.length) + extrarotation, ((x + 1) * 2 * Math.PI / participants.length) + extrarotation);
            canvas.lineTo(center, center);
            canvas.fillStyle = getColor();
            canvas.fill();
            canvas.save();
            canvas.translate(center, center);
            canvas.rotate((6 * Math.PI / (5 * participants.length) + x * 2 * Math.PI / participants.length) + extrarotation);
            canvas.translate(-center, -center);
            canvas.font = "Fredoka";
            canvas.textAlign = "right";
            canvas.fillStyle = getColor();
            canvas.fillText(participants[x], center * 2 - center / 3, center);
            canvas.restore();
        }
    }
}

participant.addEventListener("keyup", function()
{
    participants = participant.value.match(/[^\n ,.]+/g);
    drawRoulette();
});

song.onended = function()
{
    clearInterval(spin);
    const winner = getRandomInt(0, participants.length);
    alert(participants[winner]);
    eliminated.value += '\n' + participants[winner];
    participants.splice(winner, 1);
    drawRoulette();
}

roulette.addEventListener("click", e =>
{
    if(song.paused && participants.length)
    {
        song.play();
        spin = setInterval(function()
        {
            rotation += getRandomInt(1, 5);
            if(rotation > 360)
                rotation -= 360;
            drawRoulette(rotation);
        }, getRandomInt(100, 140));
    }
});
