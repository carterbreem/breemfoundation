import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ApplicationForm } from "@/components/apply/application-form";

export const metadata: Metadata = {
  title: "Apply for Assistance",
  description:
    "Apply for financial assistance from Breem Foundation. Free, confidential, and reviewed within 72 hours. Housing, medical, food, education, and emergency support available.",
  openGraph: {
    title: "Apply for Assistance · Breem Foundation",
    description:
      "Free, confidential, and fast. Get the help you need within 72 hours."
  }
};

export default function ApplyPage() {
  return (
    <section className="pb-20 pt-8 lg:pb-28 lg:pt-12">
      <Container size="full">
        <ApplicationForm />
      </Container>
    </section>
  );
}
