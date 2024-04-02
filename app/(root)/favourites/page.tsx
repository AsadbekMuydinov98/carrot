"use client";
import Product from "@/components/shared/product";
import { ProductType, Token } from "@/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { baseURL } from '../../../lib/config';

export default function Favourites() {
  const [kuki, setKuki] = useState<string | object | Token>("");
  const [data, setData] = useState<ProductType[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const cookie = Cookies.get("yourCookieKey");
      if (cookie) {
        const parsedClient = JSON.parse(cookie) as Token;
        setKuki(parsedClient.token);
      }
      try {
        const response = await axios.get(`${baseURL}/books/myfavourite`, {
          headers: {Authorization: `Bearer ${kuki}`,}
        });
          setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBooks();
  });
  
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 ">
      <h1 className="text-2xl text-center  md:text-4xl my-10 section-title">
        <span>My Favourites</span>
      </h1>
      <section className="flex flex-col space-y-12">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 relative">
          {
            !data.length ? 
            <div className="flex justify-center absolute w-[100%] h-[50vh] items-center">
              <h1 className="text-3xl text-red-700">There is no product yet</h1>
            </div> : 
            data.map((product) => (
              <Product key={product._id} item={product} page={"favourites"} />
            ))
          }
        </div>
      </section>
    </main>
  );
}
