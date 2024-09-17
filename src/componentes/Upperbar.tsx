"use client"
import { UserButton, useUser } from "@clerk/nextjs";

const Upperbar = () => {
const { user } = useUser();

console.log(user);

return (
    <div>
      <UserButton />
    </div>
  );
};

export default Upperbar;