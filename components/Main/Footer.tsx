"use client";
import Image from "next/image";
import { Logo } from "../logo";
import { TransitionLink } from "../LinkTransition";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/store/use-store";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import { useRef } from "react";

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxWord({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const smoothVelocity = useSpring(10, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(0, 100, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    directionFactor.current = 2;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });
  return (
    <div className="overflow-hidden flex-nowrap w-full h-fit py-2 flex">
      <motion.div className="flex w-full flex-nowrap " style={{ x }}>
        <span className="flex w-full h-full">{children} </span>
      </motion.div>
    </div>
  );
}
const LinkFooter = ({ href, text }: { href: string; text: string }) => {
  return (
    <TransitionLink
      href={href}
      className="hover:underline transition-colors duration-200 text-white/70 hover:text-primary-foreground"
    >
      {text}
    </TransitionLink>
  );
};

export const Footer = () => {
  const { Categories } = useStore();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className={cn("w-full", isHome && "bg-muted")}>
      <div className="bg-primary md:rounded-tr-full relative">
        <Image
          src={"/cloths-sipping-van.svg"}
          alt="van"
          width={120}
          height={40}
          className="absolute md:top-[45px] lg:top-[70px] right-40 rotate-[35deg] hidden md:block"
        />
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8">
            <div className="md:col-span-4 mb-8">
              <Logo spanClassName="text-primary-foreground" isfooter />
              <p className="mt-4 text-sm text-white/70  max-w-md">
                Moto Shop is your one-stop destination for high-quality Apparel
                and shoes. Go with confidence and style.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-primary-foreground ">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <LinkFooter href="/about" text="About us" />
                </li>
                <li>
                  <LinkFooter href="/careers" text="Careers" />
                </li>
                <li>
                  <LinkFooter href="/news" text="News" />
                </li>
                <li>
                  <LinkFooter href="/newsletter" text="Newsletter" />
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-primary-foreground ">
                Products
              </h3>
              <ul className="space-y-2">
                {Categories?.filter((category) => category.parentId === null)
                  .map((category) => (
                    <li key={category.id}>
                      <LinkFooter
                        href={`/shop/${category.id}`}
                        text={category.name}
                      />
                    </li>
                  ))
                  .slice(0, 4)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-primary-foreground ">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <LinkFooter href="/blog" text="Blog" />
                </li>
                <li>
                  <LinkFooter href="/faqs" text="FAQs" />
                </li>
                <li>
                  <LinkFooter
                    href="/shipping-returns"
                    text="Shipping & Returns"
                  />
                </li>
                <li>
                  <LinkFooter href="/partnerships" text="Partnerships" />
                </li>
              </ul>
            </div>
            <div className="md:w-20 ">
              <h3 className="font-semibold text-lg mb-4 text-primary-foreground ">
                Connect
              </h3>
              <div className="flex md:flex-col md:space-y-4 space-x-4 md:space-x-0 items-center">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-white/70 hover:text-primary-foreground transition-colors duration-200"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-white/70 hover:text-primary-foreground transition-colors duration-200"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-white/70 hover:text-primary-foreground transition-colors duration-200"
                >
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
          <Separator className=" max-w-[80%] mt-8 mx-auto" />
          <div className="pt-8">
            <nav className="flex flex-wrap justify-center gap-4 mb-4">
              <LinkFooter href="/terms" text="Terms of Service" />
              <LinkFooter href="/policy" text="Privacy Policy" />
              <LinkFooter href="/contact" text="Contact Us" />
              <LinkFooter href="/cookies" text="Cookies Policy" />
            </nav>
            <p className="text-xs text-center text-primary-foreground/60">
              &copy; {new Date().getFullYear()} Moto Shop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <ParallaxWord baseVelocity={12}>
        <p className="text-xl font-bold tracking-tighter">
          Free shipping on orders over $100 | Easy returns
        </p>
      </ParallaxWord>
    </footer>
  );
};
