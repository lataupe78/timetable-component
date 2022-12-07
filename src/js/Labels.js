export default class Labels {
  constructor (locale = 'fr') {
    this.locale = locale;
    this.days = this.getDaysLabelsLocalized();

    this.labels = this.getLocalizedLabels()

    // console.log({ 'labels': this.labels })
    // debugger

  }


  getDaysLabelsLocalized(weekday = 'long') {
    const format = new Intl.DateTimeFormat(this.locale, { weekday }).format;
    return [...Array(7).keys()]
      .map((day) => format(new Date(Date.UTC(2022, 11, 4 + day))));
  }

  getLocalizedLabels() {
    const labels = {

      en: {
        open: "Open",
        closed: "Closed",
        title: "opening time",
        opens_at: "Opens {0} at {1}",
        closes_at: "Closes at {0}",
        close_soon: "Close Soon"
      },
      ar: {
        open: "افتح",
        closed: "مغلق",
        title: "وقت مفتوح",
        opens_at: "{1} الساعة {0} الساعة",
        closes_at: "يغلق الساعة {0}",
        close_soon: "يغلق قريبا"
      },
      th: {
        open: "เปิด",
        closed: "ปิด",
        title: "เวลาเปิด",
        opens_at: "เปิด{0} เวลา {1} น",
        close_at: "ปิดเวลา {0} น",
        close_soon: "ปิดเร็ว ๆ นี้"
      },
      fr: {
        open: "Ouvert",
        closed: "Fermé",
        title: "horaires d'ouverture",
        opens_at: "Ouvre {0} à {1}",
        closes_at: "Ferme à {0}",
        close_soon: "Ferme bientôt"
      },
      ja: {
        open: "開いた",
        closed: "開いた",
        title: "開始時間",
        opens_at: "{0}は{1}開店",
        closes_at: "{0}時閉店",
        close_soon: "すぐに閉まります"
      },
      zh: {
        open: "打开",
        closed: "关闭",
        title: "营业时间",
        opens_at: "{0} {1} 开门",
        closes_at: "{0}关门",
        close_soon: "即将关门"
      },
    };

    let localeShort = this.locale.slice(0, 2); // "ar-AR" -> "ar"
    let selectedLang = labels?.[localeShort];
    if (selectedLang == undefined) {
      console.error(`Locale ${localeShort} not found in translations - Default to english.`)
      selectedLang = labels.en
    }

    // console.log({ "selected Lang": selectedLang })
    // debugger
    return selectedLang

  }

  format(str = '', ...args) {



    // "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
    // outputs :
    // ASP is dead, but ASP.NET is alive! ASP { 2 }

    // var args = arguments;

    // console.log({args: args})
    return str.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };
}