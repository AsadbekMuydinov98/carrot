"use client";
import ModeToggle from "@/components/shared/mode-toggle";
import Link from "next/link";
import Mobile from "./mobile";
import { useMyContext } from "@/app/userContext";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/modal/login-modal";
import { User } from "lucide-react";
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Token } from "@/interfaces";
import axios from "axios";
import { baseURL } from '../../../lib/config';

function Navbar() {
  const { user, setUser } = useMyContext();
  const loginModal = useLoginModal();
  const [kuki, setKuki] = useState<string | object | Token>("");

  useEffect(() => {
    const fetchUser = async () => {
      const cookie = Cookies.get("yourCookieKey");
      if (cookie) {
        const parsedClient = JSON.parse(cookie) as Token;
        setKuki(parsedClient.token);

        try {
          const response = await axios.post(
            `${baseURL}/auth/profile`, {
              headers: { Authorization: `Bearer ${parsedClient.token}`,},
            }
          );
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUser();
  }, [user]);

  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const removeCookie = () => {
    Cookies.remove("yourCookieKey");
    window.location.reload();
  };

  return (
    <div className="h-[10vh] backdrop-blur-sm border-b sticky top-0 z-40 inset-0 bg-background">
      <LoginModal />
      <div className="container max-w-6xl mx-auto h-[10vh] w-full flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
          <h1 className="text-4xl font-creteRound">Mory</h1>
        </Link>
        {/* Nav links */}
        <div className="gap-2 hidden md:flex">
          <Link
            className="hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors"
            href={"/products"}
          >
            Products
          </Link>
          <Link
            className="hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors"
            href={user ? "/myproducts" : "/register"}
          >
            My Products
          </Link>
          <Link
            className="hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors"
            href={user ? "/favourites" : "/register"}
          >
            My Favourites
          </Link>
          <Link
            className="hover:bg-blue-400/20 py-1 px-3 cursor-pointer rounded-sm transition-colors"
            href={"/contact"}
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-1">
          {user != null ? (
            <div className="flex justify-center items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={removeCookie}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <h1>{user.name}</h1>
            </div>
          ) : (
            <div className="grid">
              <Button onClick={onOpenLoginModal}>Login</Button>
            </div>
          )}
          <ModeToggle />
          <Mobile />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
