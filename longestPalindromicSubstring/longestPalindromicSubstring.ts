/**
 * Returns the longest substring that is a Palindrom.
 * @param str The requested string.
 */
function longestPalindromicSubstring(str:string):string {
  // Current start and end index of the longest Palindrom.
  let start:number = 0, end:number = 0;
  for (let i:number = 0; i < str.length; i++) {
    // Odd length case: longest palindrom length expanded from the indexed
    // character as center.
    let len:number = findLongestPadlindromExpandedFrom(str, i, i);
    // Even length case: longest palindrom length expanded from indexed and +1
    // character.
    len = Math.max(len, findLongestPadlindromExpandedFrom(str, i, i+1));
    // Calculate the new start/end of the longest palindrom.
    if (len > end - start) {
      start = i - Math.floor(((len - 1) / 2));
      end = i + Math.floor((len / 2));
    }
  }
  return str.substr(start, end - start + 1);
}

/**
 * Returns the length of the longest palindrom expanded from the requested left
 * and right index within the string.
 * @param str The palindrom string.
 * @param left The left index to expand from within the string.
 * @param right The right index to expand from within the string.
 * @returns The length of the longest palindrom.
 */
function findLongestPadlindromExpandedFrom(
    str:string, left:number, right:number):number {
  while (left >= 0 && right < str.length && str[left] == str[right]) {
    left--;
    right++;
  }
  // Subtract 1 as last failing case went beyond the "while" bound.
  return right - left - 1;
}

// Test cases:
console.log(longestPalindromicSubstring('cbbd'));
console.log(longestPalindromicSubstring('babad'));
