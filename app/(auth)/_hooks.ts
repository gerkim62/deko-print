import { useSearchParams } from "next/navigation";

export function useAfterAuth() {
  const search = useSearchParams();

  return search.get("next") ?? "/";
}
