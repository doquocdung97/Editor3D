import { ReactNode, useEffect, useState } from "react";
import { ComponetValueCell } from "./common";
import TimeField from 'react-simple-timefield';


class TimeCell extends ComponetValueCell {
  view(): ReactNode {
    if (this.value) {
      let hous = this.value.hour, minute = this.value.minute, second = this.value.second
      if (hous < 10) {
        hous = `0${hous}`
      }
      if (minute < 10) {
        minute = `0${minute}`
      }
      if (second < 10) {
        second = `0${second}`
      }
      return (<p>{`Time(${hous}:${minute}:${second})`}</p>);
    }
  }
  onChange(event: any): void {
    const value = event.target.value
    if (value) {
      const data = value.split(':')
      const val = {
        hour: parseFloat(data[0]),
        minute: parseFloat(data[1]),
        second: parseFloat(data[2]),
      }
      super.onChange(val)
    }
  }
  editer(): ReactNode {
    if (this.value) {
      let hous = this.value.hour, minute = this.value.minute, second = this.value.second
      if (hous < 10) {
        hous = `0${hous}`
      }
      if (minute < 10) {
        minute = `0${minute}`
      }
      if (second < 10) {
        second = `0${second}`
      }
      return <TimeField
        onChange={this.onChange.bind(this)}
        style={{ width: "100%" }}
        value={`${hous}:${minute}:${second}`}
        showSeconds                        // {Boolean}  default: false
      />
    }

  }
}
class DateCell extends ComponetValueCell {
  view(): ReactNode {
    if (this.value) {
      let year = this.value.year, month = this.value.month, day = this.value.day
      if (year < 10) {
        year = `0${year}`
      }
      if (month < 10) {
        month = `0${month}`
      }
      if (day < 10) {
        day = `0${day}`
      }
      return (<p>{`Date(${year}/${month}/${day})`}</p>);
    }
  }
  onChange(event: any): void {
    const value = event.target.value
    if (value) {
      const data = value.split(':')
      const val = {
        hour: parseFloat(data[0]),
        minute: parseFloat(data[1]),
        second: parseFloat(data[2]),
      }
      super.onChange(val)
    }
  }
  editer(): ReactNode {
    if (this.value) {
      let hous = this.value.hour, minute = this.value.minute, second = this.value.second
      if (hous < 10) {
        hous = `0${hous}`
      }
      if (minute < 10) {
        minute = `0${minute}`
      }
      if (second < 10) {
        second = `0${second}`
      }
      return <TimeField
        onChange={this.onChange.bind(this)}
        style={{ width: "100%" }}
        value={`${hous}:${minute}:${second}`}
        showSeconds                        // {Boolean}  default: false
      />
    }

  }
}
class DatetimeCell extends ComponetValueCell {
  view(): ReactNode {
    if (this.value) {
      let year = this.value.year, month = this.value.month, day = this.value.day, 
      hous = this.value.hour, minute = this.value.minute, second = this.value.second
      if (year < 10) {
        year = `0${year}`
      }
      if (month < 10) {
        month = `0${month}`
      }
      if (day < 10) {
        day = `0${day}`
      }
      if (hous < 10) {
        hous = `0${hous}`
      }
      if (minute < 10) {
        minute = `0${minute}`
      }
      if (second < 10) {
        second = `0${second}`
      }
      return (<p>{`Datetime(${year}/${month}/${day} ${hous}:${minute}:${second})`}</p>);
    }
  }
  onChange(event: any): void {
    const value = event.target.value
    if (value) {
      const data = value.split(':')
      const val = {
        hour: parseFloat(data[0]),
        minute: parseFloat(data[1]),
        second: parseFloat(data[2]),
      }
      super.onChange(val)
    }
  }
  editer(): ReactNode {
    return
    // if (this.value) {
    //   let hous = this.value.hour, minute = this.value.minute, second = this.value.second
    //   if (hous < 10) {
    //     hous = `0${hous}`
    //   }
    //   if (minute < 10) {
    //     minute = `0${minute}`
    //   }
    //   if (second < 10) {
    //     second = `0${second}`
    //   }
    //   return <TimeField
    //     onChange={this.onChange.bind(this)}
    //     style={{ width: "100%" }}
    //     value={`${hous}:${minute}:${second}`}
    //     showSeconds                        // {Boolean}  default: false
    //   />
    // }

  }
}
export default {
  "PropertyTime": TimeCell,
  "PropertyDate":DateCell,
  "PropertyDatetime":DatetimeCell,
}