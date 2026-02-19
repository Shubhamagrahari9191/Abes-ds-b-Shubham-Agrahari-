const fs = require('fs');

fs.readFile('file.txt', (err, data) => {//if we change file name or path then it will give error
  if (err) {
    console.error("File error:", err.message);
    return;
  }
  console.log(data.toString());
});


// function divide(a, b, callback) {

//   setTimeout(() => {

//     if (b === 0) {
//       callback("Cannot divide by zero", null);
//     } else {
//       callback(null, a / b);
//     }

//   }, 1000);

// }
