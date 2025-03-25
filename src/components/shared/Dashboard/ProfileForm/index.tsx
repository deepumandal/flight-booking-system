import { useForm } from "react-hook-form";
import { Button, Model } from "@Components/ui";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const ProfileForm = () => {
  const { register, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 890",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile updated:", data);
    // Handle profile update
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <p className="text-sm text-gray-500">Update your personal details</p>
        </div>
        <Model>
          <Model.Trigger asChild>
            <Button>Edit Profile</Button>
          </Model.Trigger>
          <Model.Content>
            <Model.Header>
              <Model.Title>Edit Profile</Model.Title>
            </Model.Header>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    {...register("firstName")}
                    className="rounded-md border p-2"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    {...register("lastName")}
                    className="rounded-md border p-2"
                    placeholder="Enter last name"
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
                  <label htmlFor="phone">Phone</label>
                  <input
                    {...register("phone")}
                    className="rounded-md border p-2"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Model.Content>
        </Model>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <dl className="divide-y divide-gray-200">
          <div className="grid grid-cols-3 py-3">
            <dt className="font-medium text-gray-500">First Name</dt>
            <dd className="col-span-2">John</dd>
          </div>
          <div className="grid grid-cols-3 py-3">
            <dt className="font-medium text-gray-500">Last Name</dt>
            <dd className="col-span-2">Doe</dd>
          </div>
          <div className="grid grid-cols-3 py-3">
            <dt className="font-medium text-gray-500">Email</dt>
            <dd className="col-span-2">john.doe@example.com</dd>
          </div>
          <div className="grid grid-cols-3 py-3">
            <dt className="font-medium text-gray-500">Phone</dt>
            <dd className="col-span-2">+1 234 567 890</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
