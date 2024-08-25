# Moto

Moto is a comprehensive e-commerce platform for apparel and shoes, equipped with a Content Management System (CMS) dashboard. The platform allows for efficient management of sales, products, and categories. The project is built using Next.js, Tailwind CSS, and ShadCN UI for the frontend, providing a modern and responsive user interface.

<img src="https://utfs.io/f/d320b872-caf9-4331-bea6-351855d33bfe-3e8keg.png" alt="Sample Image" width="100%" style="border-radius: 20%" height= "500"/>

<img src="https://utfs.io/f/1b711efc-324a-4728-8b92-3a3735d52a54-pfftlc.png" alt="Sample Image" width="100%" style="border-radius: 20%; margin-top: 10px;" height= "500" />


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Scripts](#scripts)
- [Usage](#usage)
- [CMS Dashboard](#cms-dashboard)
- [License](LICENSE)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive Design:** Optimized for both desktop and mobile views.
- **Product Management:** Add, edit, and delete products with detailed information.
- **Category Management:** Organize products into categories with nested subcategories.
- **Sales Management:** Track and manage sales through an integrated dashboard.
- **Favorites:** Users can favorite products, which are tracked by user ID.
- **Filtering:** Advanced filtering by categories, sizes, and colors.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) - A React framework for production.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
  - [ShadCN UI](https://shadcn.dev/) - A component library for React.
  - [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale.
- **Backend:**
  - [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.
  - [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js.
  - [Zustand](https://github.com/pmndrs/zustand) - Bear necessities for state management.
- **Miscellaneous:**
  - [Stripe](https://stripe.com/) - Online payment processing for internet businesses.
  - [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React.

## Setup and Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (for the database)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/m7bdi3/moto.git
   cd moto

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install

3. **Configure environment variables:**

   Create a `.env` file in the root of the project and add your environment variables as needed. Refer to `.env.example` for the necessary variables.

4. **Setup the database:**

   ```bash
   npx prisma migrate dev --name init

5. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   
   The application should now be running at `http://localhost:3000`.

## Scripts

- **`npm run dev`** - Start the development server.
- **`npm run build`** - Build the application for production.
- **`npm run start`** - Start the production server.

## Usage

- **Frontend:** Accessible at `http://localhost:3000`.
- **CMS Dashboard:** Accessible at `http://localhost:3000/admin`.

### CMS Dashboard

The CMS dashboard allows admins to manage products, categories, and sales efficiently. Admin users can:

- **Add/Edit/Delete Products:** Manage product details, including name, description, price, and images.
- **Organize Categories:** Create and manage nested categories for better product organization.
- **Track Sales:** View and manage sales, with insights into performance metrics.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or enhancements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
