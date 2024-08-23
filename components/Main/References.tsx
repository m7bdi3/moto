import { RefreshCwIcon, ShieldIcon, TruckIcon } from "lucide-react";
import React from "react";

export const References = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 md:px-6 md:flex-row lg:gap-10 w-full h-[50dvh]">
        <div className="space-y-2  text-center md:text-start">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Why Choose Moto Shop?
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Discover the benefits of shopping with us, from free shipping to our
            money-back guarantee.
          </p>
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="flex items-start gap-4">
            <TruckIcon className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-lg font-medium">Free Shipping</h3>
              <p className="text-muted-foreground">
                Enjoy free shipping on all orders over $50.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <RefreshCwIcon className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-lg font-medium">Money-Back Guarantee</h3>
              <p className="text-muted-foreground">
                If you&apos;re not satisfied, we&apos;ll refund your money.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ShieldIcon className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-lg font-medium">Secure Payments</h3>
              <p className="text-muted-foreground">
                Your payment information is safe with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
