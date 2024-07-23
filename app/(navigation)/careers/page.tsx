import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const Jobs = [
  {
    role: "Frontend Developer",
    description:
      "Develop and maintain the user interface of our ecommerce platform.",
  },
  {
    role: "Backend Developer",
    description:
      "Design and implement the server-side logic for our ecommerce platform.",
  },
  {
    role: "Product Manager",
    description:
      "Oversee the development and launch of new products and features.",
  },
  {
    role: "Digital Marketing Specialist",
    description:
      "Develop and execute digital marketing strategies to drive customer acquisition and retention.",
  },
  {
    role: "Data Analyst",
    description:
      "Analyze customer data and provide insights to drive business decisions.",
  },
  {
    role: "Customer Service Representative",
    description: "Provide exceptional customer support and resolve inquiries.",
  },
  {
    role: "Digital Marketing Specialist",
    description:
      "Develop and execute digital marketing strategies to drive customer acquisition and retention.",
  },
  {
    role: "Product Manager",
    description:
      "Oversee the development and launch of new products and features.",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-10 xl:space-y-16">
          <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col h-full w-full justify-center">
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Join our growing team
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                We&apos;re always on the lookout for talented individuals to
                join our dynamic ecommerce company.
              </p>
              <div className="space-x-4 mt-6">
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  View Open Positions
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <Image
                src="/main/hero2.jpeg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Company Culture
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At our ecommerce company, we believe in fostering a
                collaborative and inclusive work environment where everyone can
                thrive. We value innovation, creativity, and a passion for
                delivering exceptional customer experiences.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <Image
              src="/main/hero2.jpeg"
              width="550"
              height="310"
              alt="Company Culture"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Collaborative Mindset</h3>
                    <p className="text-muted-foreground">
                      We believe in the power of teamwork and encourage
                      cross-functional collaboration to drive innovation.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Continuous Learning</h3>
                    <p className="text-muted-foreground">
                      We provide opportunities for professional development and
                      encourage our team to continuously expand their skills.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Work-Life Balance</h3>
                    <p className="text-muted-foreground">
                      We understand the importance of a healthy work-life
                      balance and offer flexible schedules and remote work
                      options.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Benefits and Perks
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer a comprehensive benefits package to support our
                employees&apos; well-being and professional growth.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Competitive Salary</h3>
                    <p className="text-muted-foreground">
                      We offer competitive salaries that are commensurate with
                      experience and industry standards.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Health and Wellness</h3>
                    <p className="text-muted-foreground">
                      We provide comprehensive health insurance coverage and
                      wellness programs to support our employees&apos;
                      well-being.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">
                      Professional Development
                    </h3>
                    <p className="text-muted-foreground">
                      We invest in our employees&apos; growth by offering
                      training opportunities, mentorship programs, and
                      educational assistance.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">
                      Flexible Work Arrangements
                    </h3>
                    <p className="text-muted-foreground">
                      We understand the importance of work-life balance and
                      offer flexible schedules, remote work options, and
                      generous paid time off.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <Image
              src="/main/hero2.jpeg"
              width="550"
              height="310"
              alt="Benefits and Perks"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>
      <section id="jobs" className="w-full py-12 md:py-24 lg:py-32 bg-primary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground">
                Current Job Openings
              </h2>
              <p className="max-w-[900px] text-muted/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our available positions and join our dynamic team.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Jobs.map((job, index) => {
              return (
                <Card
                  className="bg-background rounded-lg shadow-md overflow-hidden w-full h-[300px] flex flex-col justify-between"
                  key={index}
                >
                  <CardContent className="p-6 h-[100px]">
                    <h3 className="text-xl font-bold">{job.role}</h3>
                    <p className="text-muted-foreground mt-2 h-[80px] text-sm md:text-base">
                      {job.description}
                    </p>
                  </CardContent>
                  <CardFooter className="bg-muted px-6 py-4 text-right">
                    <Link
                      href="#"
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Apply
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
