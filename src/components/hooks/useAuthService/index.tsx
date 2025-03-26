import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnyType } from "@AppTypes/AnyType";
import { Toaster } from "@Components/ui/Toaster";
import { updateUser } from "@Store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@Store/store";
import {
  CreateUserDto,
  LoginDto,
  UpdateUserDto,
  userControllerCreate,
  userControllerLogin,
  userControllerLogout,
  userControllerUpdate,
} from "src/sdk";

export const useAuthService = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((store) => store.auth);

  const signup = async (body: CreateUserDto) => {
    try {
      const response: AnyType = await userControllerCreate(body);
      Toaster({
        message: response.message ?? "Signup Successful",
        type: "success",
        shouldDismiss: true,
      });
      dispatch(updateUser(response.data));
      navigate.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (body: LoginDto) => {
    try {
      const response: AnyType = await userControllerLogin(body);

      console.log("Login response:", response);

      Toaster({
        message: response.message ?? "Login successfully",
        type: "success",
        shouldDismiss: true,
      });
      dispatch(updateUser(response.data));
      navigate.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await userControllerLogout();
    dispatch(updateUser(null));
  };

  const updateUserProfile = async (body: UpdateUserDto) => {
    if (user?.id) {
      delete body.email;
      delete body.contactNumber;

      setIsUpdating(true);

      try {
        const response: AnyType = await userControllerUpdate(user?.id, body);

        Toaster({
          message: response.message ?? "Update successfully",
          type: "success",
          shouldDismiss: true,
        });
        dispatch(updateUser(response.data));
      } catch (e) {
        console.log(e);
        setIsSuccess(false);
      } finally {
        setIsUpdating(false);
        setIsSuccess(true);
      }
    }
  };

  return {
    signup,
    login,
    logout,
    user,
    isAuthenticated,
    updateUserProfile,
    isUpdating,
    updateSuccess: isSuccess,
  };
};
