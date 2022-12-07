import Day from '../js/Day.js'
import Settings from '../js/Settings.js'
import Labels from '../js/Labels.js'
import HourRange from '../js/HourRange.js'



export class TimeTable {

  constructor (params = {}) {

    this.settings = new Settings(params?.locale, params?.timeZone)

    this.showTitle = params?.showTitle ?? false;
    
    this.labels = new Labels(this.settings.locale)

    this.tableEl = params?.tableEl
    if (this.tableEl == null) {
      throw new Error("HTMLElement for table is not defined.");
    }
    this.statusEl = params?.statusEl;

    this.currentDate = new Date();
    this.currentDay = null;
    this.currentHours = null;

    this.hoursRange = new Array();

    this.days = this.sortDays(params?.days);


    console.log({
      params: params,
      days: this.days,
      settings: this.settings,
      labels: this.labels
    })

    this.displayDays()
    this.displayStatus()

  }


  /**
   * check if the current Datetime match opening hours in days list
   * @returns {Boolean} isOpen
   */
  checkisOpen() {
    let time = this.currentDate.getTime();
    let dayWeek = this.currentDate.getDay();

    let isOpen = false,
      startTime = null,
      endTime = null;

    let currentDayIndex = this.days.findIndex((d) => d.dayWeek == dayWeek);

    this.currentDay = this.days[currentDayIndex];

    if (this.currentDay.hours.length == 0) {
      // this.currentHours 
      return false;
    }

    for (let i = 0; i < this.currentDay?.hours?.length; i++) {

      this.currentHours = this.currentDay?.hours[i];


      startTime = this.setTimeParts(
        new Date(),
        this.currentHours?.start
      ).getTime();

      endTime = this.setTimeParts(new Date(), this.currentHours?.end).getTime();

      if (time >= startTime && time <= endTime) {
        isOpen = true;
        break;
      }
    }

    console.log({
      currentDay: this.currentDay,
      currentHours: this.currentHours,

      isOpen,
      startTime,
      endTime
    });

    return isOpen;
  }

  displayStatus() {
    let message = "";

    let isOpen = this.checkisOpen();
    message += isOpen
      ? `<span class="is-open">&check; ${this.labels?.labels?.open}</span>`
      : `<span class="is-closed">&cross; ${this.labels?.labels?.closed}</span>`;

    let hourRangeIndex = this.getHourRangeIndex();

    console.log({
      hourRangeIndex: hourRangeIndex,
      currentHour: this.hoursRange[hourRangeIndex]
    });

    if (isOpen) {
      let closes_at = this.labels.format(
        this.labels?.labels?.closes_at,
        this.hoursRange[hourRangeIndex].end?.label
      )
      console.log(closes_at)
      message += closes_at

    } else {

      hourRangeIndex = (hourRangeIndex + 1) % this.hoursRange.length;

      for (let i = hourRangeIndex; i < this.hoursRange.length; i++) {

        let hours = this.hoursRange[i];

        if (hours?.start) {

          let day = new Day({ dayWeek: hours?.dayWeek })
          day.setLabel(this.labels.days)

          let dayLabel = day.label

          let opens_at = this.labels.format(
            this.labels?.labels?.opens_at,
            dayLabel,
            this.hoursRange[hourRangeIndex].start?.label
          )
          console.log(opens_at)
          message += opens_at;
          break;

        }

      }
    }

    this.statusEl.innerHTML = message
  }

  displayDays() {
    let html = ''
    if (this.showTitle) {
      html += `<caption>${this.labels?.labels?.title}</caption>`;
    }

    html += '<tbody>';

    this.days.forEach((d) => {

      html += `<tr class="${d.is_closed ? 'is-closed' : 'is-open'}">
        <td class="label__day">${d.label}</td>
        <td class="label__hours">`
      if (d?.hours?.length == 0) {
        // debugger
        html += this.labels?.labels?.closed || 'Closed'
      } else {

        d.hours.forEach(h => {

          html += `
     <div class="timetable__hour_range">
        <time datetime="${h?.start?.label}">${h?.start?.label}</time> - 
        <time datetime="${h?.start?.label}">${h?.end?.label}</time>
     </div>
     `
        })
      }
      html += '</td></tr>'
    })
    html += '</tbody>';


    this.tableEl.style.direction = new Intl.Locale(this.settings.locale).textInfo.direction;
    this.tableEl.innerHTML = html
  }

  sortDays(days = []) {

    let validDays = new Array();

    days.forEach(day => {

      let currentDay = new Day(day, this.settings.locale)

      // console.log({ c: c })

      if (currentDay.is_valid) {
        currentDay.setLabel(this.labels.days)
      }

      let hoursRange = new Array();

      day?.hours?.forEach(h => {
        let range = new HourRange(h, {
          timeZone: this.settings.timeZone,
          clientTimezone: this.settings.clientTimeZone,
          locale: this.settings.locale,
        });
        // console.log({ 'current range': range })

        hoursRange.push(range)


      })

      currentDay.hours = hoursRange
      validDays.push(currentDay)

    })


    let reorder = [6, 0, 1, 2, 3, 4, 5];
    // so Sunday ( dayWeek: 0) will be at 6th pos
    validDays.sort((a, b) => (reorder[a?.dayWeek] > reorder[b?.dayWeek])
      ? 1 : ((reorder[b?.dayWeek] > reorder[a?.dayWeek]) ? -1 : 0))


    var hoursRangeList = this.hoursRange;


    validDays.forEach(d => {
      let hours = d?.hours;

      hours.sort((a, b) =>
        (a?.start.time > b?.start.time) ? 1
          : ((b?.start.time > a?.start.time) ? -1
            : 0))

      console.log({ hoursRangeList: hoursRangeList })

      for (let i = 0; i < hours.length; i++) {
        hoursRangeList.push({
          ...hours[i],
          ...{
            dayWeek: d?.dayWeek,
          }
        })

      }
    })


    return validDays;

  }


  /**
   * get the index of the current hours in hoursRange
   * @returns {Integer} startIndexhoursRange
   */

  getHourRangeIndex() {

    // if (this.currentHours == null || this.currentHours == undefined) {
    //   debugger
    //   throw new Error(
    //     "no hours are not defined. Please check the format of the days Array."
    //   );
    // }

    let startIndex = this.hoursRange.findIndex((h) => {
      console.log({
        dayWeek: h.dayWeek,
        start: h.hours?.start,
        end: h.hours?.end
      });

      if (this.currentHours == null || this.currentHours == undefined) {
        return h?.dayWeek == this.currentDay?.dayWeek
      }

      return (
        h?.dayWeek == this.currentDay?.dayWeek &&
        h?.start == this.currentHours?.start &&
        h?.end === this.currentHours?.end
      );
    });

    return startIndex;
  }




  /**
 * Helper for setting hours & minutes of a Date
 * @param {Date} date - date
 * @param {string} time - a time formatted like 'hh:mm'
 * @returns {Date} with hours & minutes
 */
  setTimeParts(date = new Date(), time = {}) {

    console.log({ "setTimeParts time": time });

    date.setHours(time?.hours, time?.minutes, 0);
    return date;
  }




}

