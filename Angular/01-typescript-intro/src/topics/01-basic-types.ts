const name: string = "Strider";
const isAlive: boolean = true;
let hpPoints: number | "Full" = 95;
// let hpPoints: number | string = 95;
hpPoints = "Full";

console.log({
  name,
  hpPoints,
  isAlive,
});

export {};
