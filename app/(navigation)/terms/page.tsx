import React from "react";

export default function page() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
        Terms of Service
      </h1>
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-bold">User Account Creation</h2>
          <p className="mb-4 text-muted-foreground">
            To use our services, you must create a user account. When creating
            an account, you must provide accurate and complete information. You
            are responsible for maintaining the confidentiality of your account
            and password, and for restricting access to your computer. You agree
            to accept responsibility for all activities that occur under your
            account or password.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">Order Processing</h2>
          <p className="mb-4 text-muted-foreground">
            When you place an order, we will process your order as soon as
            possible. We will send you a confirmation email with the details of
            your order. If we are unable to fulfill your order, we will contact
            you to discuss alternative options.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">Payment</h2>
          <p className="mb-4 text-muted-foreground">
            We accept various payment methods, including credit card, debit
            card, and PayPal. All payments are processed securely through our
            payment processor. You are responsible for ensuring that you have
            sufficient funds or credit available to complete the transaction.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">Shipping</h2>
          <p className="mb-4 text-muted-foreground">
            We use reputable shipping carriers to deliver your orders. Shipping
            times and costs will vary depending on your location and the
            shipping method you choose. We will provide you with tracking
            information so you can monitor the status of your shipment.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">Returns and Refunds</h2>
          <p className="mb-4 text-muted-foreground">
            If you are not satisfied with your purchase, you may return the
            item(s) within 30 days of delivery for a full refund. Items must be
            in their original condition and packaging. Shipping costs are
            non-refundable. We reserve the right to refuse a return or issue a
            partial refund if the item has been used or damaged.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">
            Intellectual Property Rights
          </h2>
          <p className="mb-4 text-muted-foreground">
            All content on our website, including text, images, and logos, is
            the property of our company and is protected by copyright and
            trademark laws. You may not use, copy, or distribute any of this
            content without our prior written permission.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">User Conduct</h2>
          <p className="mb-4 text-muted-foreground">
            You agree to use our services in a lawful and ethical manner. You
            may not engage in any activity that is illegal, harmful, or
            disruptive to our operations. We reserve the right to suspend or
            terminate your account if we believe you have violated these terms.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">Limitation of Liability</h2>
          <p className="mb-4 text-muted-foreground">
            We will not be liable for any indirect, special, incidental, or
            consequential damages arising out of or related to your use of our
            services. Our total liability for any claims related to these terms
            shall not exceed the amount you have paid us in the past 12 months.
          </p>
        </section>
      </div>
    </div>
  );
}
