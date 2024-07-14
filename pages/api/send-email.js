import MessageUsEmail from "@/components/email-messsage";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export default async function handler(req, res) {
  const { name, email,message } = req.query;
  console.log(req?.query,"email");
  try {
    const data = await resend.emails.send({
      from: "Mitchel <mitchel@mitchelinaju.com>", // your verified domain
      to: `${email}`, // the email address you want to send a message
      subject: `${name} has a made a payment!`,
      text: message,
      //   react: MessageUsEmail({ name, email, message }),
    });
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ message: "There was an error", error: err });
  }
}
