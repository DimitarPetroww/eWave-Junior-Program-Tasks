class Fighter {
    #name;
    #damage = 10;
    #defense = 10;
    #hp = 50;

    constructor(name, strength, agility, vitality) {
        this.#name = name;
        if(isNaN(strength) || isNaN(vitality) || isNaN(agility)) {
            throw new Error("Strength, vitality and agility must be numbers!")
        }
        else if (strength > 30 || vitality > 30 || agility > 30) {
            throw new Error("Strength, vitality and agility must be equal or below 30!")
        }

        this.#damage += strength * 5 - agility * 3;
        this.#defense += vitality * 1 + strength * 3 + agility * 5;
        this.#hp += vitality * 10 + strength * 5 + agility * 3;
    }

    getName() {
        return this.#name;
    }
    getHp() {
        return this.#hp;
    }
    takeDamage(damage) {
        let current = this.#hp - damage;
        current < 0 ? current = 0 : current;
        this.#hp = current;
    }
    dealDamage(fighter) {
        fighter.takeDamage(this.#damage);
    }
}
function fight(fighter1, fighter2) {
    while (fighter1.getHp() > 0 && fighter2.getHp() > 0) {
        fighter1.dealDamage(fighter2);
        console.log(`${fighter1.getName()} took damage and his HP now is: ${fighter1.getHp()}`);
        if (fighter2.getHp() > 0) {
            fighter2.dealDamage(fighter1);
            console.log(`${fighter2.getName()} took damage and his HP now is: ${fighter2.getHp()}`);
        }
    }
    if (fighter1.getHp() > 0) {
        console.log(`${fighter1.getName()} is winner!`);
    } else {
        console.log(`${fighter2.getName()} is winner!`);
    }
}

try {
    const foo = new Fighter("asd", "asd", 10, 20);
} catch (error) {
    console.log(error.message);
}

try {
    const foo = new Fighter("asd", 40, 10, 30);
} catch (error) {
    console.log(error.message);
}


const qnko = new Fighter("Qnko", 10, 10, 10);
const gosho = new Fighter("Gosho", 10, 10, 10);

fight(qnko, gosho)
