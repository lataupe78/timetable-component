export default class Settings {

  constructor (locale = 'fr', timeZone = '') {

    this.timeZoneFallBack = 'Europe/Paris';

    this.clientTimeZone = this.getClientTimeZoneFromBrowser()
    this.locale = locale ?? this.getNavigatorLanguage()
    this.timeZone = timeZone ?? this.getClientTimeZoneFromBrowser()
    this.checkTimeZoneIsValid()
  }

  checkTimeZoneIsValid() {

    try {
      let now = new Intl.DateTimeFormat(this.locale, {
        timeZone: this.timeZone
      }).format(new Date());

    } catch (error) {
      // throw new Error(error)
      console.error(error + " - Switching to " + this.timeZoneFallBack)
      this.timeZone = this.timeZoneFallBack
    }
  }

  getClientTimeZoneFromBrowser() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz
  }

  getNavigatorLanguage() {
    return Intl.DateTimeFormat().resolvedOptions().locale || 'en';
  }


}