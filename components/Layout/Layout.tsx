// @ts-nocheck
import React, { Suspense } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const rootCategories = children.props.rootCategories;
  const uspContent = children.props.uspContent;
  return (
    <>
      <Navbar rootCategories={rootCategories} uspContent={uspContent} />
      <Suspense fallback={<h1>Loading...</h1>}>
        <div>{children}</div>
      </Suspense>
      <Footer />
    </>
  );
}

export default Layout;
