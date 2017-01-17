var num1 = 2;
var num2: number = 5;
var num3 = num1 + num2;
var string1: string = 'hello, world';

var y : any;

function addNumbers (n1: number, n2: number, n3: number) {
    var result: number = n1 + n2 + n3;
    var msg = 'Sum is ' + result;
    console.log(msg);
}
addNumbers(num1,num2,num3);