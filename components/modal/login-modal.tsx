'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useCallback, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios'
import Link from "next/link";
import useLoginModal from "@/hooks/useLoginModal";
import Modal from "../ui/modal";
import { useRouter } from "next/navigation";
import { baseURL } from '../../lib/config';
import { toast } from 'sonner';


export default function LoginModal() {
  const router = useRouter()
  const loginModal = useLoginModal();
  const [client, setClient] = useState<any>({
    email: '',
    password: ''
  })
  
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setClient({ ...client, [e.target.name]: e.target.value });    
  };
  const onCloseLoginModal = useCallback(() => {
    loginModal.onClose();
  }, [loginModal]);

  const handleSetCookie = () => {
    axios.post(`${baseURL}/auth/login`, client)
    .then(response => {      
        console.log(response.data); // Javobni tekshirish
        Cookies.set('yourCookieKey', JSON.stringify(response.data), { expires: 7 });
        toast.success('Login successful'); // Toast chiqarish
        router.push('/');
        loginModal.onClose();
        window.location.reload();
    })
    .catch(error => {
        console.error(error); 
        toast.error('Error during login, wrong email or password'); 
    });
};
  
  const bodyContent = (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="col-span-3"
          onChange={changeHandler}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="password" className="text-right">
          Password
        </Label>
        <Input
          placeholder="Password"
          type="password"
          name="password"
          className="col-span-3"
          onChange={changeHandler}
        />
      </div>
    </div>
  )

  const footer = (
    <div>
      <div className="flex justify-end"><Button type="submit" onClick={handleSetCookie}>Login</Button></div>
      <h1 className="text-sm text-center underine">Do not yet have an account? <Link href='/register' onClick={onCloseLoginModal}>Register</Link> now</h1>
    </div>
  )

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={footer}
    />
  )
}
