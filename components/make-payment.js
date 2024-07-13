import { Button } from "./ui/button";
import { PaystackButton } from "react-paystack";
import { updateDuewithReceiptNo } from "@/services/due.service";
import { useRouter } from "next/navigation";

const MakePayment = ({ email, amount, metadata, buttonText, receiptNo }) => {
  const router = useRouter();

  const componentProps = {
    email: email,
    amount: amount,
    metadata: {
      ...metadata,
    },
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    text: buttonText,
    onSuccess: (data) => {
      if (data.status == "success") {
        handleSuccess(receiptNo, data);
        toast({
          variant: "success",
          title: "Payment Successful",
          description: `${amount} paid successfully`,
        });
      }
    },
    onClose: () => alert("Wait! Don't leave :("),
  };

  const handleSuccess = async (receiptNo, data) => {
    const response = await updateDuewithReceiptNo({
      receiptNo: receiptNo,
      data: data,
    });
    if (response) {
      router.push(`/download-receipt?receiptNo=${receiptNo}`);
    }
  };

  return (
    <div>
      <Button>
        <PaystackButton className="paystack-button" {...componentProps} />
      </Button>

      {/* <Button onClick={() => payWithMonnify()}>Pay Now</Button> */}
    </div>
  );
};

export default MakePayment;
