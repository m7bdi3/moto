"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
    },
    {
      id: 3,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "Full-time",
    },
    {
      id: 4,
      title: "Customer Support Representative",
      department: "Customer Service",
      location: "Remote",
      type: "Part-time",
    },
    {
      id: 5,
      title: "Data Analyst",
      department: "Analytics",
      location: "Chicago, IL",
      type: "Full-time",
    },
    {
      id: 6,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
    },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/placeholder.svg?height=600&width=800")',
          }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none dark:text-white">
                  Join the Moto Revolution
                </h1>
                <p className="mx-auto max-w-[700px] dark:text-gray-200 text-gray-600 md:text-xl">
                  Be part of the team that&apos;s changing the e-commerce
                  landscape in the motorcycle industry.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Search jobs..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Open Positions
            </h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} {...job} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="engineering">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredJobs
                    .filter((job) => job.department === "Engineering")
                    .map((job) => (
                      <JobCard key={job.id} {...job} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="design">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredJobs
                    .filter((job) => job.department === "Design")
                    .map((job) => (
                      <JobCard key={job.id} {...job} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="marketing">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredJobs
                    .filter((job) => job.department === "Marketing")
                    .map((job) => (
                      <JobCard key={job.id} {...job} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Why Join Moto?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Innovative Environment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Work on cutting-edge technology and shape the future of
                    e-commerce in the motorcycle industry.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Growth Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Continuous learning and development programs to help you
                    grow your skills and career.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Work-Life Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Flexible work hours and remote options to ensure you can
                    work when and where you&apos;re most productive.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Employee Testimonials
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>Frontend Developer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    &quot;Working at Moto has been an incredible journey. The
                    team is supportive, and I&apos;ve grown so much as a
                    developer.&quot;
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Jane Smith</CardTitle>
                  <CardDescription>UX Designer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    &quot;Moto encourages creativity and innovation. It&apos;s a
                    place where your ideas are valued and can make a real
                    impact.&quot;
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Mike Johnson</CardTitle>
                  <CardDescription>Product Manager</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    &quot;The collaborative culture at Moto is unparalleled.
                    We&apos;re not just colleagues, we&apos;re a family working
                    towards a common goal.&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What is the application process like?
                </AccordionTrigger>
                <AccordionContent>
                  Our application process typically involves an initial
                  application review, a phone screen, technical or skills
                  assessments, and interviews with the team. The entire process
                  usually takes 2-3 weeks.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Do you offer remote work options?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer remote work options for many of our positions.
                  Some roles may require occasional on-site presence, which will
                  be specified in the job description.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What benefits do you offer?</AccordionTrigger>
                <AccordionContent>
                  We offer a comprehensive benefits package including health
                  insurance, 401(k) matching, paid time off, professional
                  development stipends, and more. Specific benefits may vary
                  based on position and location.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  );
}

function JobCard({ title, department, location, type }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {department} • {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{type}</p>
      </CardContent>
      <CardFooter>
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>
  );
}

function MotorcycleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.5 9.5-1.5 5h-7.8l-1.2-5" />
      <path d="M3 9.5h3.8l1.2 5" />
      <circle cx="7.5" cy="16.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  );
}
