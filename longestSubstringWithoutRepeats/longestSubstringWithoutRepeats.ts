const lengthOfLongestSubstring = (s:string) => {
    let leftIndex = 0, rightIndex = 0, maxLength = 0;
    const existingChars:Set<string> = new Set();
    while (leftIndex < s.length && rightIndex < s.length) {
        if (!existingChars.has(s[rightIndex])) {
            existingChars.add(s[rightIndex]);
            rightIndex++;
            maxLength = Math.max(maxLength, rightIndex-leftIndex);
        } else {
            // Found a duplicate, remove the left index and the character.
            existingChars.delete(s[leftIndex]);
            leftIndex++;
        }
    }
    return maxLength;
};

console.log(lengthOfLongestSubstring('abcdbc'));
