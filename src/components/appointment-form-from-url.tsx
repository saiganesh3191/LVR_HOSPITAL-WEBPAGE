"use client";

import { useSearchParams } from "next/navigation";
import { AppointmentForm } from "@/components/appointment-form";
import { departments, doctors } from "@/lib/hospital";

export function AppointmentFormFromUrl() {
  const searchParams = useSearchParams();
  const doctor = doctors.find(item => item.slug === searchParams.get("doctor"));
  const department = doctor?.departmentSlug ?? departments.find(item => item.slug === searchParams.get("department"))?.slug ?? "";

  return <AppointmentForm key={`${department}:${doctor?.slug ?? ""}`} initialDepartment={department} initialDoctor={doctor?.slug ?? ""} />;
}
