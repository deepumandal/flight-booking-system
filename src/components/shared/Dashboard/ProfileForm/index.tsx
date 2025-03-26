"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthService } from "@Components/hooks/useAuthService";
import { Button, Model } from "@Components/ui";

interface ProfileFormData {
  name: string;
  lastName?: string;
  email: string;
  contactNumber: string;
}

export const ProfileForm = () => {
  const { user, updateUserProfile, isUpdating, updateSuccess } =
    useAuthService();

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      contactNumber: user?.contactNumber || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    await updateUserProfile(data);
  };

  // ✅ Close modal on successful update
  useEffect(() => {
    if (updateSuccess) {
      setIsOpen(false);
      reset(); // optional: reset with latest user data if needed
    }
  }, [updateSuccess, reset]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <p className="text-sm text-gray-500">Update your personal details</p>
        </div>

        <Model open={isOpen} onOpenChange={setIsOpen}>
          <Model.Trigger asChild>
            <Button>Edit Profile</Button>
          </Model.Trigger>
          <Model.Content className="bg-white">
            <Model.Header>
              <Model.Title>Edit Profile</Model.Title>
            </Model.Header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name">Name</label>
                  <input
                    {...register("name")}
                    className="rounded-md border p-2"
                    placeholder="Enter name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="rounded-md border p-2"
                    placeholder="Enter email"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="contactNumber">Contact</label>
                  <input
                    {...register("contactNumber")}
                    className="rounded-md border p-2"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting || isUpdating}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Model.Content>
        </Model>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <dl className="divide-y divide-gray-200">
          <div className="grid grid-cols-3 py-3">
            <dt className="font-medium text-gray-500">Name</dt>
            <dd className="col-span-2">{user?.name}</dd>
          </div>
          <div className="grid grid-cols-3 py-3">
            <dt className="font-medium text-gray-500">Email</dt>
            <dd className="col-span-2">{user?.email}</dd>
          </div>
          <div className="grid grid-cols-3 py-3">
            <dt className="font-medium text-gray-500">Contact Number</dt>
            <dd className="col-span-2">{user?.contactNumber}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
