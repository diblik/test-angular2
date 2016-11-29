export class Helper {
  public static Deserialize(data: string): any {
    return JSON.parse(data, Helper.ReviveDateTime);
  }

  private static ReviveDateTime(key: any, value: any): any {
    if (typeof value === 'string') {
      // regex pro 2008-12-25T12:00:00Z - https://msdn.microsoft.com/library/cc836466(v=vs.94).aspx
      let a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
      if (a) {
        let date = new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
        // console.log(key,value, a, date)
        return date;
      }
    }

    return value;
  }
}
