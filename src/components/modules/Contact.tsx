"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useToast } from "@/hooks/useToast";
import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("contact");

  const { success, error } = useToast();

  const [submit, setSubmit] = useState<boolean>(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [reCaptchaError, setReCaptchaError] = useState<string | null>(null);

  const FormSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("errors.emailRequired") })
      .email(t("errors.emailInvalid")),
    object: z.string().min(5, { message: t("errors.objectRequired") }),
    content: z.string().min(25, { message: t("errors.contentRequired") }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      object: "",
      content: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmit(true);

    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setReCaptchaError(t("errors.reCaptchaRequired"));
      setSubmit(false);
      return;
    }

    const response = await axios({
      method: "post",
      url: "/api/contact",
      data: { ...data, token },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    if (response.data?.success === true) {
      success(t("success"));

      form.reset({
        email: "",
        object: "",
        content: "",
      });
    } else {
      error(t(`errors.${response.data?.message}`));
    }

    setReCaptchaError(null);
    setSubmit(false);
  };

  return (
    <section
      className="container px-6 w-full mx-auto mt-20 mb-20"
      id="contact">
      <h3 className="text-3xl ">{t("title")}</h3>
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <Card className="w-full h-full bg-background p-6">
          <div className="flex flex-col gap-3">
            <h4 className="text-2xl font-medium">{t("contactUs")}</h4>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.email")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("form.placeholders.email")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="object"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.object")}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={t("form.placeholders.email")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.content")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("form.placeholders.content")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    size="normal"
                    ref={recaptchaRef}
                  />
                  {reCaptchaError && <p className="text-destructive text-sm">{reCaptchaError}</p>}
                </div>

                {submit ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    {t("form.submitLoading")}
                  </Button>
                ) : (
                  <Button type="submit">{t("form.submit")}</Button>
                )}
              </form>
            </Form>
          </div>
        </Card>
        <div className="flex flex-col gap-6">
          <Card className="w-full bg-background p-6">
            <div className="flex flex-col gap-3">
              <h4 className="text-2xl font-medium">{t("whatToSay")}</h4>
              <div className="flex flex-col gap-1">
                {(t.raw("whatToSayContent") as string[]).map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </Card>
          <Card className="w-full bg-background p-6">
            <div className="flex flex-col gap-3">
              <h4 className="text-2xl font-medium">{t("responseTime")}</h4>
              <div className="flex flex-col gap-1">
                {(t.raw("responseTimeContent") as string[]).map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
