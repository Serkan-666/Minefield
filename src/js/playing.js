import { amount, around, isLeft, isRight } from "./creates";


function openBox(buttonIndex, boxes, bombCount) {
    if (!(buttonIndex.target.classList.contains("click") || buttonIndex.target.classList.contains("flag"))) {
        buttonIndex.target.classList.add("click");
        buttonIndex.target.classList.remove("safe-open");
        const foundBox = boxes.find((box) => box.id == buttonIndex.target.id);
        switch (foundBox.value) {
            case 0:
                for (const x of around) {
                    if (foundBox.id + x <= amount * amount && foundBox.id + x > 0 && (!isRight(foundBox.id, x) && !isLeft(foundBox.id, x))) {
                        setTimeout(() => {
                            document.querySelectorAll('.box')[foundBox.id + x - 1].click();
                        }, 50);
                    }
                }
                break;
            case "bomb":
                alert("Kaybettin!!");
                window.location.reload();
                break;
            default:
                buttonIndex.target.innerHTML = foundBox.value;
                break;
        }


        if (document.querySelectorAll('.click').length + bombCount == amount * amount) {
            alert("Kazandın!!");
            window.location.reload();
        }
    }
}

function flag(e, setFlags, flags) {
    e.preventDefault();
    const buttonIndex = e.target;
    if (!buttonIndex.classList.contains("click")) {
        if (!buttonIndex.classList.contains("flag")) {
            buttonIndex.classList.add("flag");
            setFlags(flags + 1);
        } else {
            buttonIndex.classList.remove("flag");
            setFlags(flags - 1);
        }
    }
}

export { openBox, flag }