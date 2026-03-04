import { type Product, taxCalculation, tax } from "./06-function-destructuring";

const shoppingCart: Product[] = [
  {
    description: "Nokia",
    price: 100,
  },
  {
    description: "iPad",
    price: 150,
  },
];

const [total, totalTax] = taxCalculation({ products: shoppingCart, tax });

console.log(total);
console.log(totalTax);
