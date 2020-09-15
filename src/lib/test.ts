function func( n:string, b?:number):void{
    console.log("func is called", n, b )
}

let myAdd: (x: number, y: number) => number = function(x: number, y: number): number { 
    return x + y; 
};


function identity<T>(arg: T): T {
    return arg;
}

function loggingIdentity<T>(arg: T[]): T[] {
    return arg;
}

function loggingIdentity2<T>(arg: Array<T>): Array<T> {
    return arg;
}
let output = loggingIdentity2<number>([NaN,31])


interface GenericIdentityFn {
    <T>(arg: T): T;
}


let myIdentity: GenericIdentityFn = identity;



console.log("c====",myIdentity);




class GenericNumber<T> {
    zeroValue?: T;
    add?: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
//myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
console.log("myGenericNumber", myGenericNumber)

enum E1 { X, Y, Z }
enum E2 {
    A = 1, B, C
}
console.log('E1',E1, 'E2',E2)


interface Named {
    name: string;
    b?:number
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = { name: 'Alice', location: 'Seattle' };
x = y;
console.log('x=====',x)

let sn: string | null | undefined = "bar";
sn = null; // 可以
sn = undefined


type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;


function pluck(o, names) {
    return names.map(n => o[n]);
}
function pluck2<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
}
console.log("pluck", pluck2)
console.log('pluck...')
console.log( pluck2({a:1},['a','b']))

type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"

export {func, myAdd, };