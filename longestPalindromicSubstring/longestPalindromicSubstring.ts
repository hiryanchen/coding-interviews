function longestPalindromicSubstring(str:string):string {
  let start:number = 0, end:number = 0;
  for (let i:number = 0; i < str.length; i++) {
    let len:number = findLongestPadlindromFrom(str, i, i);
    len = Math.max(len, findLongestPadlindromFrom(str, i, i+1));
    if (len > end - start) {
      start = i - Math.floor(((len - 1) / 2));
      end = i + Math.floor((len / 2));
    }
  }
  return str.substr(start, end - start + 1);
}

function findLongestPadlindromFrom(
    str:string, left:number, right:number):number {
  while (left >= 0 && right < str.length && str[left] == str[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}

console.log(longestPalindromicSubstring('cbbd'));
console.log(longestPalindromicSubstring('babad'));
