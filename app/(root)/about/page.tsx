import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import {
  GiftIcon,
  MountainIcon,
  PowerIcon,
  QrCodeIcon,
  ShipIcon,
  ShirtIcon,
  SofaIcon,
} from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-8 md:space-y-12">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8">
              <div className="flex flex-col items-center h-full gap-4 justify-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Welcome to Moto Shop
                </h1>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  We are a family-owned e-commerce business dedicated to
                  providing high-quality products and exceptional customer
                  service. Our mission is to make shopping a delightful
                  experience for everyone.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/main/hero2.jpeg"
                  width="400"
                  height="400"
                  alt="About Us"
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 space-y-8 md:space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Meet Our Team
              </h2>
              <p className="mt-4 text-muted-foreground dark:text-zinc-300 md:text-xl">
                Our dedicated team of experts is passionate about delivering the
                best shopping experience.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-muted-foreground dark:text-zinc-300">
                    Co-Founder, CEO
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-neutral-400">
                    John has over 15 years of experience in e-commerce and
                    retail management.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-muted-foreground dark:text-zinc-300">
                    Co-Founder, CEO
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-neutral-400">
                    John has over 15 years of experience in e-commerce and
                    retail management.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-muted-foreground dark:text-zinc-300">
                    Co-Founder, CEO
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-neutral-400">
                    John has over 15 years of experience in e-commerce and
                    retail management.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-muted-foreground dark:text-zinc-300">
                    Co-Founder, CEO
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-neutral-400">
                    John has over 15 years of experience in e-commerce and
                    retail management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-8 md:space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Products and Services
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Discover our wide range of high-quality products and exceptional
                customer support.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="bg-muted rounded-md p-6 flex flex-col gap-4 h-80 justify-between">
                <div className="flex items-center justify-center bg-primary rounded-full w-12 h-12">
                  <ShirtIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Apparel</h3>
                <p className="text-muted-foreground dark:text-neutral-300">
                  Browse our collection of stylish and comfortable clothing for
                  men, women, and children.
                </p>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 "
                  prefetch={false}
                >
                  Shop Apparel
                </Link>
              </div>
              <div className="bg-muted rounded-md p-6 flex flex-col gap-4 h-80 justify-between">
                <div className="flex items-center justify-center bg-primary rounded-full w-12 h-12">
                  <ShirtIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Apparel</h3>
                <p className="text-muted-foreground dark:text-neutral-300">
                  Browse our collection of stylish and comfortable clothing for
                  men, women, and children.
                </p>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 "
                  prefetch={false}
                >
                  Shop Apparel
                </Link>
              </div>
              <div className="bg-muted rounded-md p-6 flex flex-col gap-4 h-80 justify-between">
                <div className="flex items-center justify-center bg-primary rounded-full w-12 h-12">
                  <ShirtIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Apparel</h3>
                <p className="text-muted-foreground dark:text-neutral-300">
                  Browse our collection of stylish and comfortable clothing for
                  men, women, and children.
                </p>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 "
                  prefetch={false}
                >
                  Shop Apparel
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 space-y-8 md:space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose Moto Shop?
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Discover the benefits of shopping with us.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="bg-background rounded-md p-6 flex flex-col gap-4">
                <div className="flex items-center justify-center bg-primary rounded-full w-12 h-12">
                  <QrCodeIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">High-Quality Products</h3>
                <p className="text-muted-foreground">
                  We carefully curate our product selection to ensure
                  exceptional quality and durability.
                </p>
              </div>
              <div className="bg-background rounded-md p-6 flex flex-col gap-4">
                <div className="flex items-center justify-center bg-primary rounded-full w-12 h-12">
                  <ShipIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">
                  Fast and Reliable Shipping
                </h3>
                <p className="text-muted-foreground">
                  We offer fast and reliable shipping to ensure your purchases
                  arrive quickly and safely.
                </p>
              </div>
              <div className="bg-background rounded-md p-6 flex flex-col gap-4">
                <div className="flex items-center justify-center bg-primary rounded-full w-12 h-12">
                  <PowerIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">
                  Exceptional Customer Support
                </h3>
                <p className="text-muted-foreground">
                  Our dedicated customer support team is here to assist you with
                  any questions or concerns.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-8 md:space-y-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore Our Shop
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Browse our wide selection of high-quality products and find the
              perfect items for your needs.
            </p>
            <Link
              href="/shop"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Visit Our Shop
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
