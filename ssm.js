const ssm = require('seconds-since-midnight')

console.log(ssm.toSeconds('7', '15', 'AM') + " " + ssm.toSeconds('7', '55', 'AM') + " : 0")
console.log(ssm.toSeconds('8', '00', 'AM') + " " + ssm.toSeconds('8', '40', 'AM') + " : 1")
console.log(ssm.toSeconds('8', '45', 'AM') + " " + ssm.toSeconds('9', '25', 'AM') + " : 2")
console.log(ssm.toSeconds('9', '30', 'AM') + " " + ssm.toSeconds('10', '10', 'AM') + " : 3")
console.log(ssm.toSeconds('10', '15', 'AM') + " " + ssm.toSeconds('10', '55', 'AM') + " : 4")
console.log(ssm.toSeconds('11', '00', 'AM') + " " + ssm.toSeconds('11', '40', 'AM') + " : 5")
console.log(ssm.toSeconds('11', '45', 'AM') + " " + ssm.toSeconds('12', '25', 'PM') + " : 6")
console.log(ssm.toSeconds('12', '30', 'PM') + " " + ssm.toSeconds('1', '10', 'PM') + " : 7")

