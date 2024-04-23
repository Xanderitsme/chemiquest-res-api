export class Validators {
  static readonly email = (value: string) => {
    return /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/g.test(value)
  }

  static readonly password = (value: string) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/g.test(value)
  }

  static readonly username = (value: string) => {
    return /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{2,29}$/gi.test(value)
  }
}
