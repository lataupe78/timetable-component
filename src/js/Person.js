export default class Person {

  constructor (params = { name: 'John', age: 0 }) {
    this.name = params?.name
    this.age = params?.age

    this.is_adult = this.isAdult()
  }


  isAdult() {
    return this.age >= 18
  }

  canEnter() {
    return this.is_adult == true
  }

}
