const numberClick = (num) => {
    // If no operator has been chosen, we're working with operand1
    if (operator === "") {
        // If adding this number (num) is invalid according to checkComma or checkMinus, exit the function
        if (checkComma(operand1, num) || checkMinus(operand1, num)) {
            return; // Early return to prevent invalid input
        }
        // Otherwise, append the number to operand1
        setOperand1(prevOp => prevOp + num);
    } else {
        // If an operator has been chosen, we're working with operand2
        // If adding this number (num) is invalid according to checkComma or checkMinus, exit the function
        if (checkComma(operand2, num) || checkMinus(operand2, num)) {
            return; // Early return to prevent invalid input
        }
        // Otherwise, append the number to operand2
        setOperand2(prevOp => prevOp + num);
    }

    // Update the current value display
    setCurrentValue(prevValue => prevValue + num);
};

const checkComma = (operand, num) => {
    // Check if the current number is a decimal point and if there is already a decimal point in the operand,
    // or if the operand is empty (preventing starting with a decimal point)
    return (num === "." && operand.includes(".")) || (num === "." && operand === "");
};

const checkMinus = (operand, num) => {
    // Check if the current number is a minus sign and if there is already a minus sign in the operand
    return num === "-" && operand.includes("-");
};
/*

Entering '3.1.5':

First '3' -> numberClick('3') updates operand1 to '3'.
Then '.' -> numberClick('.') checks checkComma which is false, so operand1 becomes '3.'.
Then '1' -> numberClick('1') updates operand1 to '3.1'.
Another '.' -> numberClick('.') checks checkComma which is true (since '3.1' already contains a '.'), 
so the function returns early and doesn't update operand1.

Entering '-3.5-':

First '-' -> numberClick('-') checks checkMinus which is false (since operand1 is empty), so operand1 becomes '-'.
Then '3' -> numberClick('3') updates operand1 to '-3'.
Then '.' -> numberClick('.') checks checkComma which is false, so operand1 becomes '-3.'.
Then '5' -> numberClick('5') updates operand1 to '-3.5'.
Another '-' -> numberClick('-') checks checkMinus which is true (since '-3.5' already contains a '-'), 
so the function returns early and doesn't update operand1.
*/