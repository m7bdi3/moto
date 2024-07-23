import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground md:text-5xl lg:text-6xl">
              Huge Summer Sale
            </h1>
            <p className="max-w-[600px] text-primary-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don&apos;t miss out on our biggest sale of the year! Get up to 70%
              off on selected items.
            </p>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Shop Now
            </Link>
          </div>
          <Image
            src="/main/hero2.jpeg"
            width="550"
            height="550"
            alt="Sale Banner"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-6 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Featured Sale Items
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Don&apos;t Miss Out
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out our top picks for the summer sale. Hurry, these deals
                won&apos;t last long!
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="grid gap-4">
              <div className="grid gap-2.5 relative group">
                <Link
                  href="#"
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">View</span>
                </Link>
                <Image
                  src="/main/hero2.jpeg"
                  alt="Summer Dress"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                />
                <div className="grid gap-1">
                  <div className="flex items-center gap-4">
                    <h3 className="font-semibold">Summer Dress</h3>
                    <h4 className="font-semibold ml-auto">$29.99</h4>
                  </div>
                  <p className="text-sm leading-none">
                    Lightweight and Breezy for Hot Days
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Add to Cart
              </Button>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2.5 relative group">
                <Link
                  href="#"
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">View</span>
                </Link>
                <Image
                  src="/main/hero2.jpeg"
                  alt="Beach Towel"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                />
                <div className="grid gap-1">
                  <div className="flex items-center gap-4">
                    <h3 className="font-semibold">Beach Towel</h3>
                    <h4 className="font-semibold ml-auto">$12.99</h4>
                  </div>
                  <p className="text-sm leading-none">
                    Soft and Absorbent for the Beach
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Add to Cart
              </Button>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2.5 relative group">
                <Link
                  href="#"
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">View</span>
                </Link>
                <Image
                  src="/main/hero2.jpeg"
                  alt="Sunglasses"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                />
                <div className="grid gap-1">
                  <div className="flex items-center gap-4">
                    <h3 className="font-semibold">Sunglasses</h3>
                    <h4 className="font-semibold ml-auto">$19.99</h4>
                  </div>
                  <p className="text-sm leading-none">
                    Stylish and Protective for the Sun
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Add to Cart
              </Button>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2.5 relative group">
                <Link
                  href="#"
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">View</span>
                </Link>
                <Image
                  src="/main/hero2.jpeg"
                  alt="Outdoor Chairs"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                />
                <div className="grid gap-1">
                  <div className="flex items-center gap-4">
                    <h3 className="font-semibold">Outdoor Chairs</h3>
                    <h4 className="font-semibold ml-auto">$59.99</h4>
                  </div>
                  <p className="text-sm leading-none">
                    Comfortable and Durable for Outdoor Use
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Sale Terms and Conditions
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Make sure to review the details of our summer sale before
              purchasing.
            </p>
          </div>
          <div className="mx-auto w-full max-w-2xl space-y-4 text-left">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Discount Eligibility</h3>
              <p className="text-muted-foreground">
                The sale discount applies to all regular-priced items. Certain
                exclusions may apply.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Returns and Exchanges</h3>
              <p className="text-muted-foreground">
                All sale items are final and cannot be returned or exchanged.
                Please ensure you are satisfied with your purchase before
                checking out.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Sale Duration</h3>
              <p className="text-muted-foreground">
                The summer sale is valid from June 1st to August 31st. Prices
                are subject to change without notice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
