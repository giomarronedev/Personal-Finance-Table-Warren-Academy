const fs = require('fs');

const numbers = []

fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });

for (let counter = 1; counter <= 20; counter++) {
  if (counter % 3 === 0 && counter % 5 === 0) {
    numbers.push("FizzBuzz!");
  } else if (counter % 5 === 0) {
    numbers.push("Buzz");
  } else if (counter % 3 === 0) {
    numbers.push("Fizz");
  }
   else numbers.push(counter);
}

fs.writeFile("newFile.txt", numbers, (err) => {
    if (err) {
      console.error(err);
    }
  })


