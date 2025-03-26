"use client";

import { Plane, User } from "lucide-react";
import { BookingsList } from "@Components/shared/Dashboard/BookingLists";
import { ProfileForm } from "@Components/shared/Dashboard/ProfileForm";
import { Layout } from "@Components/shared/Layout";
import { Tabs } from "@Components/ui";

const Page = () => (
  <Layout>
    <div className="w-full min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <Tabs
            defaultValue="profile"
            className="flex h-[calc(100vh-5rem)] w-full gap-6"
          >
            <Tabs.List className="w-64">
              <Tabs.Trigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Tabs.Trigger>
              <Tabs.Trigger
                value="bookings"
                className="flex items-center gap-2"
              >
                <Plane className="h-4 w-4" />
                My Bookings
              </Tabs.Trigger>
            </Tabs.List>

            <div className="flex-1 rounded-lg bg-white p-8">
              <Tabs.Content value="profile" className="mt-0">
                <ProfileForm />
              </Tabs.Content>

              <Tabs.Content value="bookings" className="mt-0">
                <BookingsList />
              </Tabs.Content>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  </Layout>
);

export default Page;
