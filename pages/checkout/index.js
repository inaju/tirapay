"use client";

import MakePayment from "@/components/make-payment";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { getDue, getDuewithReceiptNo } from "@/services/due.service";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CheckoutPage = () => {
  const router = useRouter();
  const query = useSearchParams();
  const receiptNoFromParams = query.get("receiptNo");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentReceiptData();
  }, []);

  const getCurrentReceiptData = async () => {
    const data = await getDuewithReceiptNo({ receiptNo: receiptNoFromParams });
    setData(data);
    setIsLoading(false);
  };

  const showPaymentDetails =
    !isLoading && data?.length && data[0]?.status != "success";
  return (
    <main
      className={`  rounded-lg flex min-h-screen flex-col items-center justify-between p-10 pt-24`}
    >
      <div className="space-y-4 w-[350px] border border-slate-300 rounded-lg p-4">
        {isLoading && <Spinner />}
        {showPaymentDetails ? (
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
