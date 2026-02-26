'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useToast } from '@/components/ui/use-toast'
import { Phone } from 'lucide-react'

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Ім'я повинно містити принаймні 2 символи.",
    }),
    email: z.string().email({
        message: "Будь ласка, введіть коректний email.",
    }),
    phone: z.string().min(10, {
        message: "Будь ласка, введіть коректний номер телефону.",
    }),
})

interface ConsultationModalProps {
    trigger?: React.ReactNode
}

export function ConsultationModal({ trigger }: ConsultationModalProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setLoading(false)
        setOpen(false)
        form.reset()

        toast({
            title: "Дякуємо за заявку!",
            description: "Ми зв'яжемося з вами найближчим часом для уточнення деталей.",
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 shadow-[0_0_24px_rgba(255,122,0,0.25)] hover:shadow-[0_0_32px_rgba(255,122,0,0.35)] transition-shadow"
                    >
                        <Phone className="size-4 mr-2" />
                        Безкоштовна консультація
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-950 border-white/10 rounded-[16px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">Отримати консультацію</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Залиште ваші контакти, і ми зателефонуємо вам для обговорення вашого проєкту.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-200">Ім'я</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ваше ім'я"
                                            {...field}
                                            className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-200">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="example@mail.com"
                                            {...field}
                                            className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-200">Номер телефону</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="+380 (XX) XXX-XX-XX"
                                            {...field}
                                            className="bg-slate-900 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-primary/50 focus:ring-primary/20"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-xl transition-all hover:scale-[1.02]"
                        >
                            {loading ? (
                                <>
                                    <Spinner className="mr-2" />
                                    Надсилаємо...
                                </>
                            ) : (
                                "Надіслати"
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
