import { Button } from "./ui/button";
import { PaystackButton } from "react-paystack";
import { updateDuewithReceiptNo } from "@/services/due.service";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/services/sendemail.service";

const MakePayment = ({fullname, email, amount, metadata, buttonText, receiptNo }) => {
  const router = useRouter();

  const componentProps = {
    email: email,
    amount: amount * 100,
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
    sendEmail({
      name: fullname,
      email: "mitchelinajuo@gmail.com",
      message: `${fullname} has made a payment of N${amount} with Receipt No: ${receiptNo} here is the link to download the receipt https://tirapay.mitchelinaju.com/sample-pdf-file.pdf`,
    });
    sendEmail({
      name: fullname,
      email: "joy.osho.t@gmail.com",
      message: `${fullname} has made a payment of N${amount} with Receipt No: ${receiptNo} here is the link to download the receipt https://tirapay.mitchelinaju.com/sample-pdf-file.pdf`,
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
