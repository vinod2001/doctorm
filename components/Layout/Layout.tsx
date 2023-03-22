// @ts-nocheck
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const rootCategories = children.props.rootCategories;
  return (
    <>
      <Navbar rootCategories={rootCategories} />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
