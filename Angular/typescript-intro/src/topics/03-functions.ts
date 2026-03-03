function addNumbers(a: number, b: number): number {
  return a + b;
}

const addNumbersArrow = (a: number, b: number): string => `${a + b}`;

function multiply(
  firstNumber: number,
  secondNumber?: number,
  base: number = 1,
) {
  return firstNumber * base;
}

// const result: number = addNumbers(1, 2);
// const result2: string = addNumbersArrow(2, 4);
// const multiplyResult: number = multiply(5);

// console.log({ result, result2, multiplyResult });

interface Character {
  name: string;
  hp: number;
  showHp: () => void;
}

const healCharacter = (character: Character, amount: number) => {
  character.hp += amount;
};

const strider: Character = {
  name: "Strider",
  hp: 50,
  showHp() {
    console.log(`Puntos de vida: ${this.hp}`);
  },
};

healCharacter(strider, 25);

strider.showHp();

export {};
