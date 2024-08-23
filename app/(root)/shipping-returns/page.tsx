import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold text-center">Shipping & Returns</h1>
      </header>
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-4">Shipping Policy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Delivery Times</h3>
              <p className="text-muted-foreground">
                We offer standard shipping with delivery in 5-7 business days.
                For faster delivery, you can choose our expedited shipping
                option which will arrive in 2-3 business days.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Shipping Rates</h3>
              <p className="text-muted-foreground">
                Standard shipping is a flat rate of $5.99. Expedited shipping is
                $9.99. Orders over $50 qualify for free standard shipping.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Shipping Locations</h3>
              <p className="text-muted-foreground">
                We ship to all 50 U.S. states, as well as Puerto Rico and
                Canada. Unfortunately, we do not ship internationally at this
                time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Tracking</h3>
              <p className="text-muted-foreground">
                You will receive a tracking number for your order once it has
                been shipped. You can use this to track the status of your
                delivery.
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold mb-4">Returns & Refunds</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Return Policy</h3>
              <p className="text-muted-foreground">
                We accept returns within 30 days of delivery. Items must be
                unworn, unwashed, and in original condition with all tags
                attached.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Refund Process</h3>
              <p className="text-muted-foreground">
                Once we receive your return, we will process a full refund to
                the original payment method. Please allow 5-7 business days for
                the refund to appear in your account.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Exchanges</h3>
              <p className="text-muted-foreground">
                If you&apos;d like to exchange an item, please return the
                original item and place a new order for the desired item. We do
                not offer direct exchanges at this time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Damaged/Defective Items
              </h3>
              <p className="text-muted-foreground">
                If you receive a damaged or defective item, please contact our
                customer support team within 7 days of delivery. We will arrange
                a free return and issue a full refund.
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold mb-4">FAQs</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-xl font-semibold">
                How long does shipping take?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We offer standard shipping with delivery in 5-7 business days,
                  or expedited shipping in 2-3 business days.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger className="text-xl font-semibold">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We accept returns within 30 days of delivery. Items must be
                  unworn, unwashed, and in original condition with all tags
                  attached.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="refunds">
              <AccordionTrigger className="text-xl font-semibold">
                How do I get a refund?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Once we receive your return, we will process a full refund to
                  the original payment method. Please allow 5-7 business days
                  for the refund to appear in your account.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="damaged">
              <AccordionTrigger className="text-xl font-semibold">
                What if my item is damaged or defective?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  If you receive a damaged or defective item, please contact our
                  customer support team within 7 days of delivery. We will
                  arrange a free return and issue a full refund.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
      <footer className="bg-muted text-muted-foreground py-4 px-6 text-sm">
        <p>&copy; 2023 Moto Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
