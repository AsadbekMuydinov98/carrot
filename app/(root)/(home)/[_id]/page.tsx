"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductType, User } from "@/interfaces";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { baseURL } from '../../../../lib/config';

export default function DetailedPage() {
  const { _id } = useParams(); 
  const [product, setProduct] = useState<ProductType>({} as ProductType);

  useEffect(() => {
    const  getData = async () => {
      await axios.get(`${baseURL}/books/${_id}`).then((response) => {
      setProduct(response.data);
    });
    }
    getData()
  });
  
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
  
  return (
    <div className="flex flex-col lg:flex-row p-0 items-center ">
      <div className="flex-1">
        <Carousel className="w-[100%]max-w-sm ">
          <CarouselContent className="-ml-1 ">
          {product.images && product.images.map(image => (
              <CarouselItem key={image} className="pl-1 md:basis-1/1 lg:basis-1/1">
                <div className="p-1">
                  <Card className='w-[100%]'>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image  width={45} height={45} key={image} src={`${baseURL}/${image}`} alt="Products' image" className="m-3 h-[300px]" />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>
      </div>
      <div className="flex-1 mt-6 lg:ml-6 lg:mt-0">
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Name :</span>{product.name}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Price :</span>{USDollar.format(product.price)}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Owner:</span>{product.user?.name}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Contact with owner:</span>{product.user?.tel}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Category :</span>{product.category}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Description: </span>{product.description}</h1>
        <h1 className="h-12 md:text-2xl"><span className="font-bold mr-5">Status: </span>
          <span className={product.state!=="For sale"? "rounded p-1 text-white" : ""} style={{ backgroundColor: product.state === "Reserved" ? "green" : (product.state === "Sold" ? "gray" : "") }}>
            {product.state}
          </span>
        </h1>
      </div>
    </div>
  );
}
