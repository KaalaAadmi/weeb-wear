"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconArrowLeft, IconPaperBag, IconUserBolt } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";
// import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { User } from "@/payload-types";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { user } = useAuth();
  //   const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("profile");
  const links = [
    {
      label: "Profile",
      section: "profile",
      icon: <IconUserBolt className="h-5 w-5" />,
    },
    {
      label: "Orders",
      section: "orders",
      icon: <IconPaperBag className="h-5 w-5" />,
    },
    { label: "Logout", href: "#", icon: <IconArrowLeft className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen w-full border border-neutral-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col gap-4 p-4">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                name={link.label.toLowerCase()}
                link={link}
                // active={active}
                setActive={setActive}
              />
            ))}
          </nav>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 p-4">
        {active === "orders" ? (
          <Orders user={user} />
        ) : (
          <Dashboard user={user} />
        )}
      </main>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        {/* Acet Labs */}
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = ({ user }: { user: User | null | undefined }) => {
  if (!user) return <Skeleton className="h-40 w-full" />;
  return <Profile user={user} />;
};

const Orders = ({ user }: { user: User | undefined | null }) => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/orders?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [user]);

  return (
    <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Order ID: {order.id}</p>
              <p className="text-lg font-medium">
                Amount: ${order.amount / 100} {order.currency.toUpperCase()}
              </p>
              <p className="text-sm">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Address: {JSON.parse(order.address).line1},{" "}
                {JSON.parse(order.address).city},{" "}
                {JSON.parse(order.address).country}
              </p>
              <a
                href={order.receipt_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Receipt
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Profile = ({ user }: { user: User | undefined | null }) => {
  const [editedData, setEditedData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
    //   role: user?.role || "",
  });
  const [editing, setEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setEditing(true);
  };

  const handleSave = () => {
    console.log("Saved data", editedData);
    setEditing(false);
  };

  return (
    <div className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={editedData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={editedData.email}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={editedData.password}
            onChange={handleChange}
            disabled
          />
        </div>
        {editing && (
          <div className="flex gap-2">
            <Button
              variant={"secondary"}
              className="btn-save"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant={"destructive"}
              className="btn-cancel"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
