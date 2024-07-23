import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Cookies Policy
          </h1>
          <p className="mt-4 text-muted-foreground">
            At our ecommerce shop, we use cookies to enhance your browsing
            experience and provide you with personalized content. This Cookies
            Policy explains what cookies are, the different types of cookies we
            use, and how you can manage your cookie preferences.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            What are Cookies?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cookies are small text files that are stored on your device when you
            visit a website. They help the website remember your actions and
            preferences, such as your login details, shopping cart contents, and
            other settings. Cookies are essential for the proper functioning of
            many websites, including ours.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Types of Cookies We Use
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Essential Cookies
              </h3>
              <p className="mt-2 text-muted-foreground">
                These cookies are necessary for the website to function
                properly. They enable you to navigate the site, use its
                features, and access secure areas. Without these cookies, the
                website would not work as intended.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Analytics Cookies
              </h3>
              <p className="mt-2 text-muted-foreground">
                These cookies help us understand how visitors interact with our
                website, such as which pages are visited most often and where
                users are located. This information is used to improve the
                website&apos;s performance and user experience.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Marketing Cookies
              </h3>
              <p className="mt-2 text-muted-foreground">
                These cookies are used to deliver advertisements that are more
                relevant to you and your interests. They are also used to limit
                the number of times you see an advertisement and to measure the
                effectiveness of advertising campaigns.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Managing Your Cookie Preferences
          </h2>
          <p className="mt-4 text-muted-foreground">
            You can manage your cookie preferences by adjusting your browser
            settings. Most browsers allow you to accept or reject cookies, as
            well as to delete existing cookies. However, please note that
            disabling essential cookies may affect the functionality of our
            website.
          </p>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              Learn More
            </Button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Our Cookie Practices
          </h2>
          <p className="mt-4 text-muted-foreground">
            We are committed to using cookies responsibly and transparently. We
            will never use cookies to collect personal information without your
            consent, and we will always strive to protect your privacy. If you
            have any questions or concerns about our use of cookies, please
            don&apos;t hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
