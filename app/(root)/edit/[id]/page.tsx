"use client";
import { Kategoriya } from "@/components/shared/Kategoriya";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductType, Token } from "@/interfaces";
import React, { ChangeEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { baseURL } from '../../../../lib/config';

export default function EditPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [kuki, setKuki] = useState<string | object | Token>("");
  const [product, setProduct] = useState<any>({
    _id: '',
    name: "",
    brand: "",
    price: "",
    description: "",
    category: "",
    images: [""],
    isFav: false,
    state: "For sale",
  }); 
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const storedItem = localStorage.getItem("forEdit");
    if (storedItem) {
      try {
        const parsedProduct: ProductType = JSON.parse(storedItem);
        setProduct(parsedProduct);
      } catch (error) {
        console.error("Error parsing stored product:", error);
      }
    }
    const cookie = Cookies.get("yourCookieKey");
    if (cookie) {
      const parsedClient = JSON.parse(cookie) as Token;
      setKuki(parsedClient.token);
    }
  },[]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      images: e.target.files,
    });
  };

  const voala = () => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("brand", product.brand);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("isFav", product.isFav);
    formData.append("state", product.state);
    formData.append("category", selectedCategory || "Other");

    if(product.images){
      for (const file of product.images) {
        formData.append("images", file);
      }
    }

    const promise = axios
      .patch(`${baseURL}/books/${product._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${kuki}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        toast.promise(promise, {
          loading: 'Loading...',
          success: 'Successfully updated',
          error: 'Something went wrong!',
        })
        router.push('/myproducts')
      }).catch((error) => {
        setIsLoading(false)
        toast.error('Something went wrong!')
      })
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          defaultValue={product?.name}
          placeholder="Product name"
          name="name"
          className="col-span-3"
          onChange={changeHandler}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Brand
        </Label>
        <Input
          defaultValue={product?.brand}
          placeholder="Brand"
          name="brand"
          className="col-span-3"
          onChange={changeHandler}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Price
        </Label>
        <Input
          defaultValue={product?.price}
          placeholder="Price"
          name="price"
          className="col-span-3"
          onChange={changeHandler}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Category
        </Label>
        <Kategoriya
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Description
        </Label>
        <Input
          defaultValue={product?.description}
          name="description"
          placeholder="Description"
          className="col-span-3"
          onChange={changeHandler}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Image
        </Label>
        <Input type="file" className="col-span-3" name="images" multiple onChange={handleFileChange} defaultValue={product?.images}/>
      </div>
      <div className="flex justify-end">
        <Button className="px-10" onClick={voala}>{isLoading ? "Updating..." : "Update"}</Button>
      </div>
    </div>
  )
}
