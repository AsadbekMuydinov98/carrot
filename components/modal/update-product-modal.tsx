"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { ProductType, Token } from "@/interfaces";
import Modal from "../ui/modal";
import useEditProduct from "@/hooks/useEditProduct";



const UpdateProductModal:FC<{ data: ProductType }> = ( {data} ) => {
  
  const editProductModal = useEditProduct();
  const [product, setProduct] = useState<any>({
    name: "",
    brand: "",
    price: "",
    description: "",
    category: ''
  });
  const [kuki, setKuki] = useState<string | object | Token>("");
  useEffect(() => {
    const cookie = Cookies.get("yourCookieKey");
    if (cookie) {
      const parsedClient = JSON.parse(cookie) as Token;
      setKuki(parsedClient.token);
    }
  }, []);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const voala = () => {
    axios
      .patch(`http://localhost:5000/products/${data._id}`, product, {
        headers: {
          Authorization: `${kuki}`,
        },
      })
      .then((response) => {
        // Handle the response
        console.log(response.data);
      });
  };

  const bodyContent = (
    <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                defaultValue={data.name}
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
                defaultValue={data.brand}
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
                defaultValue={data.price}
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
              <Input
                defaultValue={data.category}
                name="category"
                placeholder="Category"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                defaultValue={data.description}
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
              <Input type="file" className="col-span-3" />
            </div>
          </div>
  )

  const footer = (
    <Button type="submit" onClick={voala}>
      Update
    </Button>
  )

  return (
    <Modal
      isOpen={editProductModal.isOpen}
      onClose={editProductModal.onClose}
      body={bodyContent}
      footer={footer}
    />
  )
}


export default UpdateProductModal