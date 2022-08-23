let a = 2;
let b = 2;

a = a + b;
b = a + b;

if (a === b) {
  a = a * b;
} else {
  b = 100;
}

console.log(a);
console.log(b);


