function isNumber(x: any): x is number {
    return typeof x === "number";
}
   
function isString(x: any): x is string {
    return typeof x === "string";
}

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key];
  }
   