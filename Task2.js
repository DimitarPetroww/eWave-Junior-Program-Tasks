function sum(...args) {
    return args.length < 3 ? sum.bind(undefined, ...args) : args[0] + args[1] + args[2];
}
const result = sum(101);
const sum1 = result(202, 303);
console.log(sum1);
