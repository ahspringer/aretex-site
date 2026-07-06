import { redirect } from "next/navigation";

export const metadata = {
  title: "Aretex Labs | About",
  description: "Redirecting to About.",
};

export default function TeamPage() {
  redirect("/about");
}
