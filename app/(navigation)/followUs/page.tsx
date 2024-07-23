import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";

export default function Page() {
  return (
    <div className="w-full h-[85dvh] my-auto flex items-center justify-center max-w-5xl mx-auto py-12 md:py-20 lg:py-24">
      <div className="px-4 md:px-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Follow Us
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Connect with us on social media and stay up to date with the latest
            news and offers.
          </p>
        </div>
        <div className="mt-10 flex justify-center gap-6 md:gap-8">
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary"
            prefetch={false}
          >
            <FacebookIcon className="h-6 w-6 md:h-8 md:w-8" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary"
            prefetch={false}
          >
            <TwitterIcon className="h-6 w-6 md:h-8 md:w-8" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary"
            prefetch={false}
          >
            <InstagramIcon className="h-6 w-6 md:h-8 md:w-8" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary"
            prefetch={false}
          >
            <LinkedinIcon className="h-6 w-6 md:h-8 md:w-8" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 grid-cols-1 bg-orange-400 rounded-md p-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
              Subscribe to our newsletter
            </h2>
            <p className="mt-2 text-neutral-700 md:text-lg">
              Get the latest updates and exclusive offers delivered straight to
              your inbox.
            </p>
          </div>
          <form className="mt-6 flex w-full max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
