function makeObjectDeepCopy(obj) {
    if (obj === null) {
        return null;
    }

    const clone = Object.assign({}, obj);

    Object.keys(clone).forEach(
        key =>
            (clone[key] =
                typeof obj[key] === 'object' 
                ? makeObjectDeepCopy(obj[key]) 
                : obj[key])
    );

    return Array.isArray(obj) && obj.length
        ? (clone.length = obj.length) && Array.from(clone)
        : Array.isArray(obj)
        ? Array.from(obj)
        : clone;
};

function selectFromInterval(arr, a, b) {
    const arrCheck = !Array.isArray(arr) || (arr.length === 0) || arr.some(isNaN);
    const paramsCheck = isNaN(a) || isNaN(b);

    if (arrCheck || paramsCheck) {
        throw new Error('Ошибка!');
    }

    else if (a > b) {
        return arr.filter(item => (a >= item && item >= b));
    } 
    
    else { 
        return arr.filter(item => (a <= item && item <= b));
    }
}

const myIterable = {
    [Symbol.iterator]() {
        return {
            from: 1,
            to: 4,
            next() {
                const itemsCheck = typeof this.from === 'undefined' 
                                || typeof this.to === 'undefined' 
                                || isNaN(this.from) 
                                || isNaN(this.to) 
                                || this.to < (this.from - 1);

                if (itemsCheck) {
                    throw new Error('Ошибка!');
                }

                else if (this.from <= this.to) {
                    return { 
                        value: this.from++, 
                        done: false 
                    };
                }

                return { 
                    done: true 
                };
            }
        };
    }
};

for (const item of myIterable) {
    console.log(item);
}