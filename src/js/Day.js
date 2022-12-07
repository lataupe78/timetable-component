export default class Day {
  static label;
  static dayWeek;
  static is_valid;
  static hours;

  constructor (day = {}) {

    this.dayWeek = parseInt(day?.dayWeek, 10);

    this.is_valid = this.dayWeek >= 0 && this.dayWeek <= 6

    this.hours = day?.hours || [];
    this.is_closed = this.hours.length;
    
    this.label = 'Day';
    console.log({
      "Day constructor": day,
      "dayWeek": this.dayWeek
    })
  }

  setLabel(labels = []) {
    if (!this.is_valid) {
      this.label = 'Invalid Day'
    }

    this.label = labels[this.dayWeek]
    console.log({ "Day setLabel": this.label })
  }


}