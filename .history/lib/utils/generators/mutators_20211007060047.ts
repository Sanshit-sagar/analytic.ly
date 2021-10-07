

const chunkify = function* (itr, size: number) {
    let chunk = [];

    for (const v of itr) {
        chunk.push(v);

        if (chunk.length === size) {
            yield chunk;
            chunk = [];
        }
    }
    if (chunk.length) {
        yield chunk;
    }
};

const unfold = (fn: (arg0: any) => any[], seed: any) => {
    let result = [], val = [null, seed]

    while ((val = fn(val[1]))) {
        result.push(val[0])
    }
    return result;
}

const walkThrough = function* (obj: object) {
    const walk = function* (x, previous = []) {
        for (let key of Object.keys(x)) {
            if (typeof x[key] === 'object') {
                yield* walk(x[key], [...previous, key])
            } else {
                yield [[...previous, key], x[key]];
            }
        }
    }
    yield* walk(obj);
}

const dig = (obj: object, target: keyof object) => {
    return (target in obj ? obj[target]
        : Object.values(obj).reduce((acc, val) => {
            if (acc !== undefined) {
                return acc
            }
            if (typeof val === 'object') {
                return dig(val, target)
            }
        }, undefined)
}
