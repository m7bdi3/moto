import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Page() {
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
              Get answers to your most pressing questions about our ecommerce
              shop.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-lg font-medium">
                What are your shipping options and policies?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We offer a variety of shipping options to meet your needs.
                  Standard shipping is free on all orders over $50 and typically
                  takes 5-7 business days. Expedited shipping is available for
                  an additional fee and arrives in 2-3 business days. We ship to
                  all 50 US states and territories. Please allow 1-2 business
                  days for processing before your order is shipped.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger className="text-lg font-medium">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We want you to be completely satisfied with your purchase. If
                  for any reason you are not happy with your order, you can
                  return it within 30 days for a full refund. Items must be
                  unworn, unwashed, and in their original condition with all
                  tags attached. Shipping costs are non-refundable. Please
                  contact our customer service team to initiate a return.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payments">
              <AccordionTrigger className="text-lg font-medium">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We accept all major credit and debit cards, including Visa,
                  Mastercard, American Express, and Discover. We also accept
                  PayPal, Apple Pay, and Google Pay for a seamless checkout
                  experience. Your payment information is securely encrypted and
                  stored to protect your personal data.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="products">
              <AccordionTrigger className="text-lg font-medium">
                How can I get more information about your products?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  You can find detailed product descriptions, specifications,
                  and images on each product page. If you have any additional
                  questions, please don&apos;t hesitate to contact our customer
                  service team. They&apos;ll be happy to provide more
                  information or assist you with your purchase.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
