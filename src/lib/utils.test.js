import { partial, pipe } from './utils';

const add = (a, b) => a + b;
const inc = num => num + 1;
const db1 = num => num * 2;
test('partial applies the first argument ahead of the time ', () => {
  const inc = partial(add, 1);
  const result = inc(2);
  expect(result).toBe(3);
});

test('pipe passes the result of inc to db1', () => {
  const pipeline = pipe(inc, db1); // => db1(inc(2)) or g(f(...args))
  const result = pipeline(2);
  expect(result).toBe(6);
});

test('pipe passes the result of db1 to inc', () => {
  const pipeline = pipe(db1, inc); // => db1(inc(2)) or g(f(...args))
  const result = pipeline(2);
  expect(result).toBe(5);
});

test('pipe works more than 2 functions', () => {
  const pipeline = pipe(add,inc, db1);
  const result = pipeline(1, 2);
  expect(result).toBe(8)
})
