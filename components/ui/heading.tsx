import React from "react";

interface Props {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const Heading = ({ title, description, children }: Props) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight ">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
};
