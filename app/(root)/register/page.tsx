'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/interfaces'
import axios from 'axios'
import React, { ChangeEvent, useCallback, useState } from 'react'
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/modal/login-modal'
import useLoginModal from '@/hooks/useLoginModal'
import { baseURL } from '../../../lib/config';
import { toast } from 'sonner';

export default function RegisterPage() {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [client, setClient] = useState<User>({
    name: '',
    email: '',
    password: '',
    tel: ''
  })
  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setClient({ ...client, [e.target.name]: e.target.value });    
  };
  const handleSetCookie = () => {
    setIsLoading(true)
    axios.post(`${baseURL}/auth/signup`, client)
    .then(response => {
      setIsLoading(false)
      Cookies.set('yourCookieKey', JSON.stringify(response.data), { expires: 7 });
      router.push('/');
      toast.success('Registration successful'); 
    }).catch(error => {
      // Handle errors
      setIsLoading(false)
      toast.error('Error during signup, check your data'); 
    });
};
  return (
    <div className='w-[80vw] lg:w-[50vw] h-[80vh] m-auto xl:p-24'>
      <LoginModal />
      <div className="flex flex-col gap-4 border rounded-lg py-12 px-8 lg:px-24">
        <h1 className='text-2xl text-center'>Register</h1>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                placeholder="Your name"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                placeholder="Password, must be min 6 symbol"
                type="password"
                name="password"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tel" className="text-right">
                Phone number
              </Label>
              <Input
                placeholder="Phone number"
                name="tel"
                className="col-span-3"
                onChange={changeHandler}
              />
            </div>
            <div className='self-end'><Button type="submit" onClick={handleSetCookie}>{isLoading ? "Loading...":"Register"}</Button></div>
            <div className='self-center text-muted-foreground font-mono mt-[-25px] flex items-center'>
              Already have an account? <Button variant={'link'} className='mx-0 p-1' onClick={onOpenLoginModal}>Login</Button>  now
            </div>
          </div>
    </div>
  )
}
