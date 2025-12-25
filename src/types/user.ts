export interface User {
  id: string;
  username: string;
  pass: string;
}

export interface JWTpayload {
  userId: string;
  username: string;
}
