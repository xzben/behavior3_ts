export enum Category{
    COMPOSITE = 'composite',
    DECORATOR = 'decorator',
    ACTION = 'action',
    CONDITION = 'condition',
  }
  
  export enum Status{
    SUCCESS = 1,   // 成功
    FAILURE = 2,   // 失败
    RUNNING = 3,   // 挂起
    ERROR = 4,     // 异常
  }
  
  export function CreateUUID() : string {
    var s : string[] = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    // bits 12-15 of the time_hi_and_version field to 0010
    s[14] = "4";
  
    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[19] = hexDigits.substr((parseInt(s[19]) & 0x3) | 0x8, 1);
  
    s[8] = s[13] = s[18] = s[23] = "-";
  
    var uuid = s.join("");
    return uuid;
  }