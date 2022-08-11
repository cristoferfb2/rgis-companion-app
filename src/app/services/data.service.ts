import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { MonthData } from '../class/MonthData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const cordova: any

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userID?: string;
  private data: Array<MonthData> = [];
  private userName!: string;

  constructor(private http: HTTP) { }

  // get user ID from local storage
  public getUserID (): string | null {
    if (this.userID) return this.userID

    this.userID = localStorage.getItem('ETQID') as string;
    return this.userID
  }

  // check for data
  public hasData (): boolean {
    if (this.data.length > 0) return true
    this.data = JSON.parse(localStorage.getItem('data'));
    if(this.data.length > 0) return true
    return false
  }

  public getData(): MonthData[] {
    return this.data;
  }

  public getUserName() {
    if (this.userName)
      return this.userName;

    this.userName = localStorage.getItem('name') as string;
    return this.userName;
  }
  
  // check and save user ID and name to local storage
  public saveUserID (id: number): Observable<void> {
    this.userID = id.toString();
    let lastMonth = moment().subtract(1, 'month').toDate();

    return new Observable(subscriber => {
      this.getMonth(lastMonth.getMonth(), lastMonth.getFullYear()).then(data=> {
        if (data.works.length > 0) {
          localStorage.setItem('name', data.works[0].name);
          if (this.userID)
            localStorage.setItem('ETQID', this.userID);
          subscriber.next();
        } else {
          this.userID = undefined;
          subscriber.error('No se encontraron inventarios');
        }
        subscriber.complete();
      }).catch(err=>console.log(err));
    })
  }

  // save data to local storage
  public setData (data: Array<MonthData>) {
    this.data = data;
    localStorage.setItem('data', JSON.stringify(this.data));
  }

  // get user data from localStorage or remote server
  public getUserData (): Observable<Array<MonthData>> {
    return new Observable(subscriber => {
      this.getUserID();
      if (!this.userID) subscriber.error('No user ID');
      let userData = localStorage.getItem('data');
      if (!userData) {
        let today = new Date();
        let promises: Array<Promise<MonthData>> = [];
        for (let i=0; i<12; i++) {
          let month = today.getMonth() - i;
          let year = today.getFullYear();
          if (month < 1) {
            month = 12 + today.getMonth() - i
            year--;
          }
          promises.push(this.getMonth(month, year));
        }
        Promise.all(promises).then(valArray=>subscriber.next(valArray));
      } else {
        subscriber.next(JSON.parse(userData));
        subscriber.complete();
      }
    });
  }

  // get month data
  public getMonth (month: number, year: number): Promise<MonthData> {
    return new Promise((resolve, reject) => {
      // check for user ID
      let userID = this.getUserID();
      if (!userID) {
        reject();
        return;
      }
      // build form data
      const formData = new cordova.plugin.http.ponyfills.FormData();
    
      formData.append('CBMES', month.toString());
      formData.append('CBANO', year.toString());
      formData.append('ETQID', userID);
      // make the HTTP request
      this.http.setDataSerializer('multipart')
      this.http.post(
        'https://www.rgis.cl/consultas/index.php', 
        formData,
        {
          'enctype': 'multipart/form-data;',
          'Accept': 'plain/text',
          'Access-Control-Allow-Origin': '*',
        }
      ).then(response => {
          console.log(response);
          let data = this.parseMonth(response.data, month, year);
          if (!data) reject(false);
          resolve(data as MonthData);
        }
      ).catch(err=>reject(err));
    })
  }

  // parse month data from html string
  private parseMonth (html: string, month: number, year: number): MonthData | null {
    let monthData = new MonthData()
    monthData.month = month
    monthData.year = year
    // setup parser
    let parser = new DOMParser()
    let htmldoc = parser.parseFromString(html, 'text/html')
    // get works
    let table = htmldoc.getElementsByClassName('tabla01')[0]

    if (!table) return monthData;

    let worksRaw = table.getElementsByTagName('tbody')[0]
      .getElementsByTagName('tr');


    let works = Array.from(worksRaw).map(workRaw => 
      Array.from(workRaw.children).map(el=>el.textContent)
    );
    works.forEach(work => {
      if ( !(!work[3] || !work[4] || !work[5] || !work[6] || !work[8] || 
        !work [10] || !work [11])
      )
        monthData.works.push({
          name: work[3],
          customer: work[4],
          storeNumber: parseInt(work[5]),
          dateIn: moment(work[6] +  work[7], 'DD-MM-YYYYhh:mm:ss').toDate(),
          dateOut: moment(work[8] + work[9], 'DD-MM-YYYYhh:mm:ss').toDate(),
          hours: parseFloat(work[10].replace(',', '.')),
          wageRate: parseFloat(work[11])*1000
        })
    })
    // get totals
    let totalsRaw = htmldoc.getElementsByClassName('tabla02')[0]
        .getElementsByTagName('td')
    let totals = Array.from(totalsRaw).map(el=>el.textContent)
    if (!totals[3] || !totals[1]) return null;
    monthData.hours = parseFloat(totals[1].replace(',', '.'))
    monthData.total = parseFloat(totals[3])*1000
    
    return monthData;
  }
}
