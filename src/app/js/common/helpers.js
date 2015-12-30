//
//  Common helpers
//

//
// get random color helper
//
// exports.getRandomColor = () => {
//     const color = '#' + Math.random().toString(16).substr(2, 6);
//     return color;
// };

//
// get random char helper
//
// exports.getRandomChar = () => {
//     const chars = '!#%&^()_=+,.:<>?'; // @ and $ are ugly with Exo. need better font?
//     const randomChar = chars[~~(Math.random() * chars.length)];
//
//     return randomChar;
// };

//
//	Add leading zeroes (0) to string
//
exports.zeroPad = (n, w) => {
    let temp = n;

    while (temp.toString().length < w) {
        temp = '0' + temp;
    }

    return temp;
};

//
//	Basic encode of strings into numbers
//
exports.toNumbers = (str) => {
    let nums = '';
    for (let i = 0; i < str.length; i++) {
        nums += str.charCodeAt(i);
    }

    return nums;
};

//
//	Basic decode of numbers into strings
//
exports.fromNumbers = (nums) => {
    let str = '';
    for (let i = 0; i < nums.length; i += 3) {
        str += String.fromCharCode(nums.substring(i, i + 3));
    }

    return str;
};
