
export const convertToCSV = (objArray: any[], headerList: string[]) => {

  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  let row = '';

  for (let index in headerList) { row += headerList[index] + ','; }

  row = row.slice(0, -1);
  str += row + '\r\n';
  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (let index in headerList) {
      let head = headerList[index];
      line += array[i][head] + ',';
    }
    str += line.slice(0, -1) + '\r\n';
  }

  return str;
}

