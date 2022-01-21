function createColorManager (defaultColor) {
    const colors = ["blue", "red", "green", "purple"];
    let index = 0;

    if(defaultColor) {
        colors.unshift(defaultColor)
    }

    let current = colors[index]; 

    return {
        get: () => {
            return current;
        },
        next: () => {
            index++;

            if(index >= colors.length) {
                index = 0
            }
            current = colors[index];
        },
        previous: () => {
            index--;

            if(index < 0) {
                index = colors.length - 1;
            }
            current = colors[index];
        },
        reset: () => {
            index = colors.indexOf(defaultColor);
            current = colors[index];
        }
    }
}

const colorManager = createColorManager("pink");
console.log(colorManager.get());
colorManager.next();
console.log(colorManager.get());
colorManager.reset();
console.log(colorManager.get());
colorManager.previous();
console.log(colorManager.get());
