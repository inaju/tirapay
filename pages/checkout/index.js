"use client";

import MakePayment from "@/components/make-payment";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { getDuewithReceiptNo } from "@/services/due.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CheckoutPage = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [receiptNo, setReceiptNo] = useState();
  useEffect(() => {
    getCurrentReceiptData();
  }, []);

  const getCurrentReceiptData = async () => {
    if (typeof window != undefined) {
      var urlParams = new URLSearchParams(window.location.search);
      var receiptNo = urlParams.get("receiptNo");
      setReceiptNo(receiptNo);
      const data = await getDuewithReceiptNo({ receiptNo: receiptNo });
      setData(data);
      setIsLoading(false);
    }
  };
  console.log(receiptNo, "receiptNoreceiptNo");
  const showPaymentDetails =
    !isLoading && data?.length && data[0]?.status != "success";
  return (
    <main
      className={`  rounded-lg flex min-h-screen flex-col items-center justify-between p-10 pt-24`}
    >
      <div className="space-y-4 w-[350px] border border-slate-300 rounded-lg p-4">
        {isLoading && <Spinner />}
        {!isLoading && showPaymentDetails ? (
          <div className="flex flex-col space-y-2">
            <h1>Please confirm your details</h1>
            <div className="flex gap-2 items-end">
              <TextLabel item={"Email: "} />
              <TextItem item={data[0]?.email} />
            </div>
            <div className="flex gap-2 items-end">
              <TextLabel item={"Receipt No: "} />
              <TextItem item={data[0]?.receiptNo} />
            </div>
            <div className="flex gap-2 items-end">
              <TextLabel item={"Full Name: "} />
              <TextItem item={data[0]?.fullname} />
            </div>
            <div className="flex gap-2 items-end">
              <TextLabel item={"Level: "} />
              <TextItem item={data[0]?.level} />
            </div>
            <div className="flex gap-2 items-end">
              <TextLabel item={"Category: "} />
              <TextItem item={data[0]?.paymentType} />
            </div>
            <div className="flex gap-2 items-end">
              <TextLabel item={"Amount: "} />
              <TextItem item={data[0]?.amount} />
            </div>

            <MakePayment
              buttonText={`Pay N${data[0]?.amount} Now`}
              email={data[0]?.email}
              fullname={data[0]?.fullname}
              amount={data[0]?.amount}
              metadata={data[0]}
              receiptNo={data[0]?.receiptNo}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <TextLabel item="This link is invalid, please navigate back to the home page as the due has already been paid" />
            <Button onClick={() => router.push("/")}> Go Home</Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CheckoutPage;

const TextItem = ({ item }) => {
  return <p className="text-sm text-slate-500"> {item} </p>;
};
const TextLabel = ({ item }) => {
  return <p className="text-sm text-slate-800"> {item} </p>;
};
