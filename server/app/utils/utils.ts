export const enum RandomType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  MIXIN = 'MIXIN'
}
export const formatData = (fmt, d = Date.now()): string => {
  const date = new Date(d);

  const map = {
    "y+": date.getFullYear(),
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for(const k in map) {
    const reg: RegExp = new RegExp("(" + k + ")");
    const value = map[k];
    const matched = fmt.match(reg);
    if(matched) {
      fmt = fmt.replace(matched[1], value.toString().padStart(RegExp.$1.length, "0"));
    }
  }

  return fmt;
}
