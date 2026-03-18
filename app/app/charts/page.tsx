import { redirect } from "next/navigation";

export default function ChartsRootRedirect() {
  redirect("/app/charts/area-chart");
}
