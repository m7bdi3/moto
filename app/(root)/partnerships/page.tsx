import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  InfoIcon,
  PenToolIcon,
  PowerIcon,
  ReceiptIcon,
  ScalingIcon,
  StoreIcon,
} from "lucide-react";

export default function percentage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
        <div className="container px-4 md:px-6 space-y-6 text-center text-primary-foreground">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Become a Partner
          </h1>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl">
            Join our ecommerce partnership program and unlock new revenue
            streams, marketing support, and exclusive tools to grow your
            business.
          </p>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-neutral-600 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Join the Program
          </Link>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Benefits of Becoming a Partner
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Unlock exclusive perks and support to grow your business with
                our partnership program.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <ReceiptIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Revenue Sharing</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn a percentage of every sale you refer to our store.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <StoreIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Marketing Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Get access to co-branded marketing materials and campaigns.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <PenToolIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Exclusive Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Use our suite of partner-only tools to manage your
                    referrals.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <ScalingIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Business Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Leverage our brand and customer base to grow your business.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <PowerIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Dedicated Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized support from our partnership team.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <InfoIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Advanced Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your referrals and performance with our analytics
                    dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                What Our Partners Say
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from some of our successful partners and how our program
                has helped their business grow.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-center gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="flex flex-col items-center gap-4 text-center">
              <Image
                src="/main/hero2.jpeg"
                width="140"
                height="70"
                alt="Partner Logo"
                className="aspect-[2/1] overflow-hidden rounded-md object-contain object-center"
              />
              <p className="text-sm text-muted-foreground">
                &quot;The partnership program has been a game-changer for our\n
                business. The revenue sharing and marketing support have\n
                helped us reach new customers and grow our sales.&quot;
              </p>
              <p className="text-sm font-medium">- Jane Doe, Moto Inc.</p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <Image
                src="/main/hero2.jpeg"
                width="140"
                height="70"
                alt="Partner Logo"
                className="aspect-[2/1] overflow-hidden rounded-md object-contain object-center"
              />
              <p className="text-sm text-muted-foreground">
                &quot;We&apos;ve been able to leverage the brand recognition
                and\n customer base of this ecommerce store to significantly\n
                increase our own sales. The partnership has been a\n
                win-win.&quot;
              </p>
              <p className="text-sm font-medium">- John Smith, XYZ Corp.</p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <Image
                src="/main/hero2.jpeg"
                width="140"
                height="70"
                alt="Partner Logo"
                className="aspect-[2/1] overflow-hidden rounded-md object-contain object-center"
              />
              <p className="text-sm text-muted-foreground">
                &quot;The exclusive tools and analytics provided by the\n
                partnership program have been invaluable in helping us\n track
                and optimize our referrals. It&apos;s been a game-changer\n for
                our business&quot;
              </p>
              <p className="text-sm font-medium">- Sarah Lee, Widgets Inc.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Apply to Become a Partner
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Fill out the form below to apply for our partnership program and
                start growing your business with us.
              </p>
            </div>
          </div>
          <form className="mx-auto max-w-md space-y-4">
            <Input type="text" placeholder="Name" className="w-full" />
            <Input type="email" placeholder="Email" className="w-full" />
            <Input type="url" placeholder="Website" className="w-full" />
            <Textarea
              placeholder="Tell us about your business"
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Apply Now
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
