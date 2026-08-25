import { useQuery } from "@tanstack/react-query";
import { getAllStatisticsService } from "../_services/products-statistics.service";

// custom hook
export function useGetStatistics() {
  // get all statistics
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "statistics"],
    queryFn: getAllStatisticsService,
  });
  return { statistics: data?.statistics, isLoading };
}
