export default
  class HourRange {

  constructor (range, intlOptions = {}) {
    console.log({ "HourRange constructor range": range })
    this.intlOptions = {
      ...{
        hour: 'numeric', minute: 'numeric',
        locale: "zh-TW",
        timeZone: 'Australia/Sydney',
        clientTimezone: 'Asia/Dubai',
        // timeZoneName: 'short'
      },
      ...intlOptions
    }

    this.isValid = true

    this.start = this.setTimeParts(range?.start)
    this.end = this.setTimeParts(range?.end)

    // console.log({ intlOptions: this.intlOptions })
  }

  setTimeParts(timeLabel = "12:00") {
    // console.log({ timeLabel: timeLabel })
    // try {

    let parts = timeLabel.split(":");
    let hours = parseInt(parts[0], 10);
    let minutes = parseInt(parts[1], 10);

    let date = new Date()
    date.setHours(hours, minutes, 0);

    let timeInMinutes = hours * 60 + minutes

    let label = new Intl.DateTimeFormat(this.intlOptions.locale, this.intlOptions)
      .format(date);
    // "2:00:00 pm AEDT"

    // console.log({ date: date, label: label })

    return {
      time: timeInMinutes,
      hours: hours,
      minutes: minutes,
      label: label
    };
    // } catch {
    //   this.isValid = false
    // }
  }

}