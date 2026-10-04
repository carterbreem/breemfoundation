// Force every /portal/* page to render dynamically.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PortalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
