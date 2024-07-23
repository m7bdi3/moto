import Image from "next/image";
import Link from "next/link";

export default function RecentlyAdded() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:gap-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Recently Added Products
            </h2>
            <p className="text-muted-foreground">
              Check out our latest product releases.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <Image
                src="/placeholder.svg"
                alt="Product 1"
                width={500}
                height={400}
                className="object-cover w-full h-60"
              />
              <div className="absolute top-2 left-2 bg-primary px-3 py-1 rounded-md text-primary-foreground text-xs font-medium">
                New
              </div>
              <div className="p-4 bg-background">
                <h3 className="text-lg font-semibold">Futuristic Lamp</h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <Image
                src="/placeholder.svg"
                alt="Product 2"
                width={500}
                height={400}
                className="object-cover w-full h-60"
              />
              <div className="absolute top-2 left-2 bg-primary px-3 py-1 rounded-md text-primary-foreground text-xs font-medium">
                New
              </div>
              <div className="p-4 bg-background">
                <h3 className="text-lg font-semibold">Smart Thermostat</h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <Image
                src="/placeholder.svg"
                alt="Product 3"
                width={500}
                height={400}
                className="object-cover w-full h-60"
              />
              <div className="absolute top-2 left-2 bg-primary px-3 py-1 rounded-md text-primary-foreground text-xs font-medium">
                New
              </div>
              <div className="p-4 bg-background">
                <h3 className="text-lg font-semibold">Wireless Speakers</h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <Image
                src="/placeholder.svg"
                alt="Product 4"
                width={500}
                height={400}
                className="object-cover w-full h-60"
              />
              <div className="absolute top-2 left-2 bg-primary px-3 py-1 rounded-md text-primary-foreground text-xs font-medium">
                New
              </div>
              <div className="p-4 bg-background">
                <h3 className="text-lg font-semibold">Smart Fitness Tracker</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
