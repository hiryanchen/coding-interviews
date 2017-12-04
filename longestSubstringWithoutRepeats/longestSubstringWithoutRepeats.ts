const lengthOfLongestSubstring = (s:string) => {
    let i = 0, j = 0, maxLength = 0;
    const existingChars:Set<string> = new Set();
    while (i < s.length && j < s.length) {
        if (!existingChars.has(s[j])) {
            existingChars.add(s[j]);
            j++;
            maxLength = Math.max(maxLength, j-i);
        } else {
            existingChars.delete(s[i]);
            i++;
        }
    }
    return maxLength;
};

console.log(lengthOfLongestSubstring('abcdbc'));
