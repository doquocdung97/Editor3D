export class Variables{
  static readonly MAIN = ""
  static readonly TOKEN_KEY = "user_token"
}
export default class Constants {
  static MOBILE_SIZE = 997;
  static NAME = "Test";
}
export class Config{
  static readonly MIDDLEWARE_HOST = process.env.REACT_APP_ENDPOINT
  static readonly MIDDLEWARE_ENDPOINT = `http://` + Config.MIDDLEWARE_HOST 
}