
const reverseString = (str: string) => {
  return str.split('').reverse().join('')
}
export const formatMoney = (amount: number, separator: string = ".") => {
  let ret = "";
  let str = reverseString(amount.toString())
  if(amount < 0){
    str = reverseString(Math.abs(amount).toString())
  }

  for (let i = 0; i < str.length; i += 3) {
    ret += str.substring(i, i + 3)
    ret += (i < str.length - 3) ? separator : ""
  }

  return amount >= 0 ? reverseString(ret) : "-" + reverseString(ret)

}
