import { Button } from "@/components/ui/button";
import { useForm, useStore } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import InputWithLabel from "./InputWithLabel";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const quoteFormSchema = z.object({
  endpoints: z.number().min(1, "At least 1 endpoint is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
});

const QuoteDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      setQuoteSubmitted(false);
    }, 300);
  };

  const form = useForm({
    defaultValues: {
      endpoints: 1,
      name: "",
      companyName: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:", value);
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
          {
            topic: "Pricing quote",
            company_name: value.companyName || "N/A",
            email: value.email || "N/A",
            endpoints: value.endpoints ?? "N/A",
            name: value.name || "N/A",
            message: "N/A",
            phone: "N/A",
          }
        );

        console.log("SUCCESS!");

        setQuoteSubmitted(true);
      } catch (error) {
        console.log("error", error);
        toast.error("Failed to send email");
      }

      form.reset();
    },
  });

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-4 lg:p-10 pt-14 border border-primary/50 rounded-[40px] w-[474px] bg-accent-dark">
        {quoteSubmitted ? (
          <>
            <div className="flex flex-col gap-5 mt-5">
              <p className="mx-auto max-w-[322px] font-semibold text-xl text-center leading-8">
                Thanks! Your pricing request has been received. Our team will
                contact you shortly.
              </p>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                variant={"default"}
                className="mx-auto mt-1 w-[82px] h-12! font-medium text-lg! leading-5!"
                onClick={onClose}
              >
                OK
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-bold text-[40px] leading-[130%]">
                Request a quote
              </DialogTitle>
            </DialogHeader>
            <div className="relative">
              <form
                onSubmit={(e) => {
                  if (form.state.isSubmitting) return;
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="space-y-4"
              >
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        quoteFormSchema.shape.name.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <InputWithLabel
                        label="Full Name"
                        value={field.state.value}
                        onChange={field.handleChange}
                        placeholder="ex. John Newman"
                      />
                      {field.state.meta.errors && (
                        <p className="text-destructive text-sm">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        quoteFormSchema.shape.email.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <InputWithLabel
                        label="Company email"
                        value={field.state.value}
                        onChange={field.handleChange}
                        placeholder="ex. john@company.com"
                      />
                      {field.state.meta.errors && (
                        <p className="text-destructive text-sm">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
                <form.Field
                  name="companyName"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        quoteFormSchema.shape.companyName.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <InputWithLabel
                        label="Company name"
                        value={field.state.value}
                        onChange={field.handleChange}
                        placeholder="ex. Company Inc."
                      />
                      {field.state.meta.errors && (
                        <p className="text-destructive text-sm">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <DialogFooter className="pt-4 w-full">
                  <Button
                    type="submit"
                    variant={"default"}
                    className="mx-auto border-2 border-white! rounded-full w-1/2 min-w-fit h-14 font-semibold text-xl bg-accent-pink!"
                    disabled={form.state.isSubmitting}
                  >
                    {form.state.isSubmitting ? "Sending..." : "Send request"}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </>
        )}
        {isSubmitting && (
          <div className="z-10 absolute inset-0 flex justify-center items-center bg-black/10">
            <div className="mx-auto border-primary border-b-2 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
