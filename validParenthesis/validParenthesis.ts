function validParenthesis(s: string): boolean {
    const stack: string[] = [];
    const map: { [key: string]: string } = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    for (const char of s) {
        if (char in map) {
            stack.push(char);
        } else {
            // If the stack's pop element matches the current character, we continue; otherwise, we return false.
            if (stack.length !== 0 && stack[stack.length - 1] in map && map[stack[stack.length - 1]] === char) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
}

