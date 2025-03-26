"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthService } from "@Components/hooks/useAuthService";
import { Button, Tabs } from "@Components/ui";
import { Input } from "@Components/ui/input";
import { authLoginPath, authSignupPath, AuthTabs } from "@Utils/auth/constants";
import { getAuthSchema } from "./utils/get-auth-schema";

type Mode = typeof authLoginPath | typeof authSignupPath;

const AuthPage = () => {
  const [mode, setMode] = useState<Mode>(authLoginPath);

  const schema = getAuthSchema(mode);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
    name?: string;
    contactNumber?: string;
  }>({ resolver: zodResolver(schema) });

  const { signup, login } = useAuthService();

  const onLogin = (data: any) => {
    login(data);
  };

  const onSignup = async (data: any) => {
    signup(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Airplane"
            width={400}
            height={300}
            className="rounded-lg"
          />
          <p className="text-center text-gray-600 text-sm mt-4">
            Book affordable and reliable flights with SkyFly — your sky
            companion.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Welcome to SkyFly
          </h2>
          <Tabs
            onValueChange={(val) => setMode(val as Mode)}
            defaultValue={mode}
            className="w-full"
          >
            <Tabs.List className="grid grid-cols-2 mb-6 bg-blue-100">
              {AuthTabs.map((path) => (
                <Tabs.Trigger value={path} key={path}>
                  {path}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <Tabs.Content value={authLoginPath}>
              <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
                <div>
                  <Input
                    {...register("email")}
                    placeholder="Email"
                    className="h-12 text-base"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="h-12 text-base"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base">
                  Login
                </Button>
              </form>
            </Tabs.Content>

            <Tabs.Content value={authSignupPath}>
              <form onSubmit={handleSubmit(onSignup)} className="space-y-5">
                {mode == "signup" ? (
                  <div>
                    <Input
                      {...register("name")}
                      placeholder="Full Name"
                      className="h-12 text-base"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                ) : null}
                <div>
                  <Input
                    {...register("email")}
                    placeholder="Email"
                    className="h-12 text-base"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="h-12 text-base"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("contactNumber")}
                    placeholder="Contact Number"
                    className="h-12 text-base"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base">
                  Sign Up
                </Button>
              </form>
            </Tabs.Content>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
