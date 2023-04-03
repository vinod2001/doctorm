// @ts-nocheck
import CheckoutNavbar from "../CheckoutNavbar";

export interface LayoutProps {
  children?: React.ReactNode;
}

export function CheckoutLayout({ children }: LayoutProps) {
  const rootCategories = children.props.rootCategories;
  return (
    <>
      <CheckoutNavbar />
      <div>{children}</div>
    </>
  );
}

export default CheckoutLayout;
