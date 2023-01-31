
let obj = { test:1};
let test = 1;


function exempel(o,t){
    o.test = 2;
    t = 2;
}

exempel(obj,test);

console.log(obj.test); //???
console.log(test); //???