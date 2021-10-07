

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

const unfold = (fn, seed) => {
    let result = [], val = [null, seed]

    while ((val = fn(val[1]))) {
        result.push(val[0])
    }

    return result;
}

const walkThrough = function* (obj: object) {
    const walk: = function* (x, previous = []) {
        for (let key of Object.keys(x)) {
            if (typeof x[key] === 'object') yield* walk(x[key], [...previous, key]);
            else yield [[...previous, key], x[key]];
        }
    };
    yield* walk(obj);
};