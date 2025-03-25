import { CreateUserDto, userControllerCreate } from "src/sdk";

export const useSignup = () => {
  const signup = (body: CreateUserDto) =>
    userControllerCreate(body).then((res) => {
      console.log("res", res);
    });

  return { signup };
};
