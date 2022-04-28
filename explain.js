const obj = { page: 1, limit: 2, notName: "s", age: 18 };
const { page, limit, ...filter } = { ...obj };
console.log(page, limit, filter);
