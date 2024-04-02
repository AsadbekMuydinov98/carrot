export interface User{
  name: string
  tel: string
  email: string
  password: string
}
export interface ProductType{
  user: owner
  state: string
  _id: string
  name: string
  brand: string
  price: number
  description: string
  category: string
  images: [string]
  owner: owner,
  isFav: boolean
}

interface owner{
  _id: string
  name: string
  tel: string
}

export interface Token {
  name: string;
  token: string;
}