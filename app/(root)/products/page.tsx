'use client'
import Product from "@/components/shared/product";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/interfaces";
import axios from "axios";
import {  useEffect, useState } from "react";
import { baseURL } from '../../../lib/config';

interface PriceState {
  min_price: number;
  max_price: number;
}

export default function ProductsPage() {
  const [term, setTerm] = useState<string>('')
  const [price, setPrice] = useState<PriceState>({
    min_price: 0,
    max_price: 0
  });
	const [data, setData] = useState<ProductType[]>([]);
  useEffect(()=>{
    axios.get(`${baseURL}/books/all`)
    .then(response => {
      setData(response.data)
    })
  })
    
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrice({ ...price, [name]: value });
  };

  const filterHandler = (arr: ProductType[], price: PriceState): ProductType[] => {
    if(price.max_price!==0 && price.min_price!==0){
      return arr.filter(item => {
        return item.price >= price.min_price && item.price <= price.max_price;
      });
    }else{
      return arr
    }
  };

  const searchHandler = (arr: ProductType[], term: string) =>{
    if(term.length===0) return arr;
    return arr.filter(item => item.name.toLowerCase().includes(term));
  }

  const visibleData = filterHandler(searchHandler(data, term), price)  
  
  return (
    <main className='min-h-screen max-w-7xl mx-auto px-8 xl:px-0 '>
      <h1 className="text-2xl text-center  md:text-4xl my-10 section-title"><span>All Products</span></h1>
      <Input placeholder="Search" value={term} name="term" className="my-3"  onChange={e=>setTerm(e.target.value)}/> 
      <div className="flex my-5">
        <Input placeholder="min price"  type="number" name="min_price" onChange={changeHandler}/>
        <Input placeholder="max price"  type="number" name="max_price" className="ml-6" onChange={changeHandler} />
      </div>
			<section className='flex flex-col space-y-12'>
				<div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
					{visibleData.map(product => (
						<Product key={product._id} item={product} page={'products'} />						
					))}
				</div>
			</section>
		</main>
  )
}
