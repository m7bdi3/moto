import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  PackageIcon,
  RecycleIcon,
  SearchIcon,
  ShoppingCartIcon,
  StoreIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col">
      <section className="w-full pt-12 md:pt-24 lg:pt-32">
        <div className="container space-y-10 xl:space-y-16">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Stay Up-to-Date with Our Latest News
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover the latest trends, product updates, and industry
                insights from our ecommerce news blog.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Read More
            </Link>
          </div>
          <Image
            src="/main/hero2.jpeg"
            width="1200"
            height="300"
            alt="Hero"
            className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover object-center"
          />
        </div>
      </section>
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4 py-12 md:py-24">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-md shadow-lg group hover:shadow-xl hover:-translate-y-2">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Article</span>
              </Link>
              <Image
                src="/main/hero2.jpeg"
                alt="Article 1"
                width={500}
                height={300}
                className="object-cover w-full h-48"
              />
              <div className="p-4 bg-background">
                <h3 className="text-xl font-bold">The Future of Ecommerce</h3>
                <p className="text-sm text-muted-foreground">
                  Exploring the latest trends and innovations shaping the
                  ecommerce industry.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-md shadow-lg group hover:shadow-xl hover:-translate-y-2">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Article</span>
              </Link>
              <Image
                src="/main/hero2.jpeg"
                alt="Article 2"
                width={500}
                height={300}
                className="object-cover w-full h-48"
              />
              <div className="p-4 bg-background">
                <h3 className="text-xl font-bold">
                  Optimizing Your Online Store
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tips and strategies to improve your ecommerce website&apos;s
                  performance and conversion rates.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-md shadow-lg group hover:shadow-xl hover:-translate-y-2">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Article</span>
              </Link>
              <Image
                src="/main/hero2.jpeg"
                alt="Article 3"
                width={500}
                height={300}
                className="object-cover w-full h-48"
              />
              <div className="p-4 bg-background">
                <h3 className="text-xl font-bold">
                  Mastering Social Media Marketing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Leverage social platforms to drive traffic and sales for your
                  ecommerce business.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-md shadow-lg group hover:shadow-xl hover:-translate-y-2">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Article</span>
              </Link>
              <Image
                src="/main/hero2.jpeg"
                alt="Article 4"
                width={500}
                height={300}
                className="object-cover w-full h-48"
              />
              <div className="p-4 bg-background">
                <h3 className="text-xl font-bold">
                  Sustainable Ecommerce Practices
                </h3>
                <p className="text-sm text-muted-foreground">
                  Discover eco-friendly strategies to reduce your ecommerce
                  business&apos;s environmental impact.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="grid gap-2">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  <PackageIcon className="h-4 w-4" />
                  Product Updates
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  <TimerIcon className="h-4 w-4" />
                  Industry Trends
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  <ShoppingCartIcon className="h-4 w-4" />
                  Ecommerce Strategies
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  <StoreIcon className="h-4 w-4" />
                  Marketing Tips
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  <RecycleIcon className="h-4 w-4" />
                  Sustainability
                </Link>
              </nav>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search news..."
                    className="w-full bg-background shadow-none appearance-none pl-8"
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
