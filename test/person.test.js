import { Person } from '@/js/Person.js'

let child = new Person({
  name: 'Baby',
  age: 5
})

let parent = new Person({
  name: 'Roger',
  age: 35
})

console.log(child, parent)

test('child cannot enter', () => {

  expect(child.canEnter()).toBe(false);
});

test('parent can enter', () => {

  expect(parent.canEnter()).toBe(true);

});