module.exports = function check(str, bracketsConfig) {
    const bracketPairs = {};
    bracketsConfig.forEach(pair => {
        bracketPairs[pair[1]] = pair[0];
    });

    const openBrackets = new Set(bracketsConfig.map(pair => pair[0]));
    const closeBrackets = new Set(bracketsConfig.map(pair => pair[1]));

    const stack = [];

    for (let char of str) {
        if (openBrackets.has(char) && closeBrackets.has(char)) {
            if (stack.length > 0 && stack[stack.length - 1] === char) {
                stack.pop();
            } else {
                stack.push(char);
            }
        } else if (openBrackets.has(char)) {
            stack.push(char);
        } else if (closeBrackets.has(char)) {
            if (stack.length === 0 || stack[stack.length - 1] !== bracketPairs[char]) {
                return false;
            }
            stack.pop();
        }
    }

    return stack.length === 0;
}