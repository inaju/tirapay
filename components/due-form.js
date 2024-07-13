"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postDue } from "@/services/due.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
 
const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "fullname must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email("This is not a valid email."),
  department: z.string().min(2, {
    message: "department must be at least 2 characters.",
  }),
  level: z.string().min(2, {
    message: "level must be at least 2 characters.",
  }),
  paymentType: z.string().min(2, {
    message: "paymentType must be at least 2 characters.",
  }),
});

export function DueForm() {
  const receiptNo = Date.now();
  const router = useRouter();
  const queryClient = useQueryClient();
  const priceObj = [
    { name: "shirt", amount: 400, label: "Shirt N400" },
    { name: "dues", amount: 600, label: "Dues N600" },
  ];

  const mutation = useMutation({
    mutationFn: postDue,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["due"] });
      if (response.message == "data saved") {
        router.push(`/checkout?receiptNo=${response?.data?.receiptNo}`);
      }
    },
    onError: (err) => {
      console.log(err, "this is the error");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.message,
      });
    },
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values) {
    const { fullname, email, department, level, paymentType } = values;
    const newPaymentType = priceObj.find((item) => item?.name == paymentType);
    try {
      const sendData = mutation.mutate({
        receiptNo: receiptNo,
        fullname: fullname,
        email: email,
        department: department,
        level: level,
        paymentType: newPaymentType?.name,
        amount: newPaymentType?.amount,
        status: "payment pending"
      });
      console.log(sendData, "sendData");
    } catch (err) {
      console.log(err, "err");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[350px] border border-slate-300 rounded-lg p-4"
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Joy Osho" {...field} />
              </FormControl>
              <FormDescription>Enter the name of your portal</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="joy@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Linguistics">Linguistics</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your Level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="300">300</SelectItem>
                  <SelectItem value="400">400</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are you paying for?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Final Year Dues" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {priceObj?.map((item) => (
                    <SelectItem key={item?.name} value={item?.name}>
                      {item?.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {mutation.isPending ? "Submitting" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
