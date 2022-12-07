import { TimeTable } from '@/js/Timetable.js'

import './style.css'
import '@/scss/app.scss'


import timetableTemplate from '@/template/timetable.html?raw'

document.querySelector('#app').innerHTML = timetableTemplate

console.log("demo.js mounted")

const tableEl = document.querySelector('#timetable_table')
const statusEl = document.querySelector('#timetable_status')

let table =  new TimeTable({

  tableEl: tableEl,
  statusEl: statusEl,

  showTitle: true,
  locale: 'th-TH',
  // locale: 'fr-FR',
  // locale: 'ar-AR',
  // locale: 'en-US',
  // locale: 'zh-HK',
  // locale: 'ja-JP',

  // // timeZone: 'Asia/Bangkok',
  // timeZone : 'Europe/Paris',

  days: [
    {
      label: 'Lundi', dayWeek: 1, 
      // hours: [
      //   { start: '8:00', end: '11:30' },
      //   { start: '13:30', end: '19:00' },
      // ]
    },


    {
      label: 'Vendredi', dayWeek: 5, hours: [
        { start: '8:00', end: '11:30' },
        { start: '13:30', end: '19:00' },
      ]
    },
    {
      label: 'Mercredi', dayWeek: 3, hours: [
        { start: '8:00', end: '11:30' },
        { start: '13:30', end: '19:00' },
      ]
    },
    {
      label: 'Jeudi', dayWeek: 4, hours: [
        { start: '8:00', end: '11:30' },
        { start: '13:30', end: '19:00' },
      ]
    },
    {
      label: 'Mardi', dayWeek: 2, hours: [
        { start: '8:00', end: '11:30' },
        { start: '13:30', end: '19:00' },
      ]
    },
    {
      label: 'Samedi', dayWeek: 6, hours: [
        { start: '8:00', end: '12:00' },

      ]
    },

    {
      label: 'Dimanche', dayWeek: 0,
      hours: [
        { start: '20:00', end: '21:30' },
        { start: '22:00', end: '23:30' },
      ]
    },
  ],
 
});


 
 

 