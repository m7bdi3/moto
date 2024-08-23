import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">
        <div className="container px-4 md:px-6 grid gap-6 md:grid-cols-2 md:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl xl:text-6xl">
              Stay up to date with our latest news and offers.
            </h1>
            <p className="max-w-[600px] text-white/90 md:text-xl">
              Sign up for our newsletter and be the first to know about our
              latest products, sales, and exclusive promotions.
            </p>
            <form className="flex gap-2 justify-center ">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1 bg-white text-foreground"
              />
              <Button
                type="submit"
                className="bg-[#1d4ed8] text-white hover:bg-[#1e40af] transition-colors"
              >
                Subscribe
              </Button>
            </form>
          </div>
          <div className="flex justify-center">
            <Image
              src="/main/hero2.jpeg"
              width="500"
              height="400"
              alt="Newsletter"
              className="mx-auto aspect-[5/4] overflow-hidden rounded-md object-cover"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="inline-block rounded-md bg-muted px-3 py-1 text-sm text-primary">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Subscribers Say
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our happy customers about how our newsletter has helped
              them stay informed and save money.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <Card className="p-6 bg-muted rounded-md">
              <blockquote className="flex flex-col gap-4">
                <div className="text-lg font-medium leading-relaxed">
                  &quot;I look forward to your newsletter every week. The deals
                  and new product announcements are always so helpful!&quot;
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <div className="text-sm font-medium">Jessica Davis</div>
                    <div className="text-sm text-muted-foreground">
                      Loyal Customer
                    </div>
                  </div>
                </div>
              </blockquote>
            </Card>
            <Card className="p-6 bg-muted rounded-md">
              <blockquote className="flex flex-col gap-4">
                <div className="text-lg font-medium leading-relaxed">
                  &quot;I&apos;ve been a subscriber for years and your
                  newsletter has always been a valuable resource. Keep up the
                  great work!&quot;
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <div className="text-sm font-medium">Michael Johnson</div>
                    <div className="text-sm text-muted-foreground">
                      Longtime Subscriber
                    </div>
                  </div>
                </div>
              </blockquote>
            </Card>
            <Card className="p-6 bg-muted rounded-md">
              <blockquote className="flex flex-col gap-4">
                <div className="text-lg font-medium leading-relaxed">
                  &quot;I always find something new and exciting in your
                  newsletter. It&apos;s a great way to stay connected with your
                  brand.&quot;
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <div className="text-sm font-medium">Sarah Anderson</div>
                    <div className="text-sm text-muted-foreground">
                      Engaged Subscriber
                    </div>
                  </div>
                </div>
              </blockquote>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
