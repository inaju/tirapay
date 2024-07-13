import { DueForm } from "@/components/due-form";
import MakePayment from "@/components/make-payment";
import { getDue } from "@/services/due.service";
import {
  useQuery
} from "@tanstack/react-query";


export default function Home() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["due"],
    queryFn: getDue,
  });

  return (
    <main
      className={`border border-red-300 rounded-lg flex min-h-screen flex-col items-center justify-between p-10`}
    >
      <div>
        <DueForm />
      </div>
    </main>
  );
}
