function createBem() {
    let bem = {
        block: "",
        elements: [], //BEM object can have more than 2 "element" parts
        modifiers: [] //BEM object can have more than 2 "modifier" parts
    };
    return {
        block: function (param) {
            bem.block = param;
            return this;
        },
        element: function (param) {
            bem.elements.push(`__${param}`);
            return this;
        },
        modifier: function (param) {
            bem.modifiers.push(`--${param}`);
            return this;
        },
        build: () => {
            let result = "";
            if (!bem.block) {
                result = 'BEM object needs a "block" part!';
            } else {
                result = bem.block + bem.elements.join("") + bem.modifiers.join("");
            }
            bem = {};
            return result;
        }
    }

}
const bem = createBem();
console.log(bem.block("nav").modifier("active").modifier("red").element("list").element("item").build());