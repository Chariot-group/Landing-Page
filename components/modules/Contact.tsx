"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import z from "zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from 'react-google-recaptcha'
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useToast } from "@/hooks/useToast";

export function Contact() {

    const {success, error} = useToast();

    const [submit, setSubmit] = useState<boolean>(false);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const [reCaptchaError, setReCaptchaError] = useState<string | null>(null);

    const FormSchema = z.object({
        email: z.string()
            .email("Vous devez renseigner un e-mail valide."),
        object: z.string()
            .min(5, { message: "Vous devez renseigner un objet. (5 caractères minimum)" }),
        content: z.string()
            .min(25, { message: "Votre e-mail doit contenir un message. (25 caractères minimum)" })
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            object: "",
            content: ""
        }
    });

    const handleSubmit = async(data: z.infer<typeof FormSchema>) => {
        setSubmit(true);

        const token = recaptchaRef.current?.getValue()
        if (!token) {
            setReCaptchaError("Veuillez valider le reCAPTCHA.");
            setSubmit(false);
            return;
        }
        
        const response = await axios({
            method: "post",
            url: "/api/contact",
            data: {...data, token},
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });

        if(response.data?.success === true){
            success("Je vous recontacte le plus vite possible.");

            form.reset({
                email: "",
                object: "",
                content: ""
            });
        }else{
            error(response.data?.message);
        }

        setReCaptchaError(null);
        setSubmit(false);
    }

    return (
        <section className="container px-6 w-full mx-auto mt-20 mb-20" id="contact">
            <h3 className="text-3xl ">{"Contact"}</h3>
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
                <Card className="w-full h-full bg-background p-6">
                    <div className="flex flex-col gap-3">
                        <h4 className="text-2xl font-medium">{"Nous contacter"}</h4>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid w-full items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>E-mail</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="x@domaine.com" {...field} />
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
                                            <FormLabel>Objet</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Question à propos de ..." {...field} />
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
                                            <FormLabel>Contenu</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Ecrivez votre message ici."
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
                                    {reCaptchaError && (
                                        <p className="text-destructive text-sm">{reCaptchaError}</p>
                                    )}
                                </div>

                                {submit ? 
                                    <Button disabled>
                                        <Loader2 className="animate-spin" />
                                        Envoi en cours
                                    </Button> : 
                                    <Button type="submit">Envoyer</Button>}
                            </form>
                        </Form>
                    </div>
                </Card>
                <div className="flex flex-col gap-6">
                    <Card className="w-full bg-background p-6">
                        <div className="flex flex-col gap-3">
                            <h4 className="text-2xl font-medium">Quoi nous dire ?</h4>
                            <div className="flex flex-col gap-1">
                                <p className="text-md">Vous avez une question, une suggestion ou un retour d'expérience ?</p>
                                <p className="text-md">N'hésitez pas à nous contacter, nous sommes là pour vous aider !</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="w-full bg-background p-6">
                        <div className="flex flex-col gap-3">
                            <h4 className="text-2xl font-medium">Délais de réponse</h4>
                            <div className="flex flex-col gap-1">
                                <p className="text-md">Nous nous efforcons à vous répondre dans les plus bref délais.</p>
                                <p className="text-md">Cependant, notez qu'il se peut que nous mettions du temps à vous répondre.</p>
                                <p className="text-md">Merci de votre patience !</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}