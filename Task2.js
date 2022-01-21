function sum(...args) {
    if (args.length < 3) {
        return sum.bind(undefined, ...args)
    } else {
        return args[0] + args[1] + args[2];
    }
}
const result = sum(101);
const sum1 = result(202, 303);
console.log(sum1);