import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { consumptionMethod } = await searchParams;

  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  if (!restaurant) {
    return notFound();
  }

  return <RestaurantHeader restaurant={restaurant} />;
};

export default RestaurantMenuPage;
