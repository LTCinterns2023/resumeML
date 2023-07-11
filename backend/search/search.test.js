import { searchwithLabel, searchwithKeywords, quickLSearch } from "./search.js"

export class Test {
    
    constructor() {
        this.i = 0;
        console.log("\n");
    }
    // function, condition, ...args
    assert(f, c, ...rest) {
        this.i++;
        return f(...rest).length == c

    }
    f(f, c, ...rest) {
        this.i++;
        console.log(
            `[ t${this.i} ] ${f.name}(${rest}).length == ${c} :: [`, f(...rest).length == c, "]"
        );

    }
    fg(f, c, ...rest) {
        this.i++;
        console.log(
            `[ t${this.i} ] ${f.name}(${rest}).length > ${c} :: [`, f(...rest).length > c, "]"
        );

    }
    logi() {
        console.log(this.i);
    }
}


const assert = new Test()

assert.f(searchwithLabel, 0, "Name", "test")
assert.f(searchwithLabel, 1, "Name", "Afreen Jamadar")
assert.fg(searchwithKeywords, 0, "Abhishek")
assert.fg(searchwithKeywords, 0, "Python")
assert.fg(searchwithKeywords, 0, "JavaScript")


//x.logi()

console.log("\n");