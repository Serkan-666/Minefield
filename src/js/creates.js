const amount = 25;
const around = [-1, 1, -amount, amount, -amount - 1, -amount + 1, amount - 1, amount + 1];



function createBoxes() {
    const boxes = []
    for (let i = 1; i <= amount * amount; i++) {
        boxes.push(i)
    }
    console.log(boxes)
    return boxes;
}

function createBombs(bombCount) {
    const bombs = []
    while (bombs.length < bombCount) {
        const randomNumber = getRandomNumber();
        if (!bombs.includes(randomNumber)) {
            bombs.push(randomNumber);
        }
    }
    return bombs;
}

function getRandomNumber() {
    return Math.floor(Math.random() * (amount * amount)) + 1;
}



function combineBoxes(bombCount) {
    const boxes = createBoxes();
    const bombs = createBombs(bombCount);
    return (boxes.map((box) => ({
        id: box,
        value: ishave(box, bombs)
    }))
    )
}


function ishave(box, bombs) {
    let haveCount = 0;
    for (const x of around) {
        if (bombs.includes(box)) {
            return "bomb";
        }
        if (bombs.includes(box + x) && !isRight(box, x) && !isLeft(box, x)) {
            haveCount++
        }
    }
    return haveCount;
}
function isRight(box, x) {
    return (box % amount == 1) && ((box + x) % amount == 0);
}
function isLeft(box, x) {
    return (box % amount == 0) && ((box + x) % amount == 1);
}





export { amount, around, combineBoxes, ishave, getRandomNumber, createBoxes, createBombs, isRight, isLeft }