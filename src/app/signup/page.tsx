'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Camera, Upload } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export default function SignupPage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            phone: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Account Created (Simulated)",
            description: "You can now log in with your credentials.",
        });
        router.push('/login');
    }

    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
                    <CardDescription>
                        Join the movement. One account per citizen, verified for integrity.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+261 34 00 000 00" {...field} />
                                        </FormControl>
                                        <FormDescription>Used for OTP verification.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Separator className="my-6" />

                            <div className="space-y-2 text-left">
                                <FormLabel>Facial Verification</FormLabel>
                                <FormDescription>
                                    To prevent duplicate accounts, we require a facial scan. Your image is never stored.
                                </FormDescription>
                                <div className="p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center">
                                    <Camera className="w-10 h-10 text-muted-foreground mb-2"/>
                                    <p className="font-semibold mb-2">Upload your photo</p>
                                    <Button type="button" variant="outline">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Choose File
                                    </Button>
                                    <p className="text-xs text-muted-foreground mt-2">This is a simulated step.</p>
                                </div>
                            </div>
                            
                            <Button type="submit" className="w-full mt-4">Create Account</Button>
                        </form>
                    </Form>
                     <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline hover:text-primary">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
