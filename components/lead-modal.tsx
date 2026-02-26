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
import { Phone, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Strict but flexible email validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Ім'я є обов'язковим.",
    }),
    email: z.string().regex(emailRegex, {
        message: "Будь ласка, введіть коректний email (наприклад, name.surname@domain.com).",
    }),
    phone: z.string().min(10, {
        message: "Будь ласка, введіть коректний номер телефону.",
    }),
})

interface LeadModalProps {
    trigger?: React.ReactNode
    title?: string
    description?: string
    metadata?: Record<string, any>
}

export function LeadModal({
    trigger,
    title = "Отримати консультацію",
    description = "Залиште ваші контакти, і Дмитро зателефонує вам для обговорення деталей.",
    metadata
}: LeadModalProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const { toast } = useToast()

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        if (!newOpen) {
            // Small delay to prevent layout flicker during transition
            setTimeout(() => {
                setSubmitted(false)
                form.reset()
            }, 300)
        }
    }

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

        // Log data for "background processing" simulation
        console.log("Lead captured:", { ...values, ...metadata })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setLoading(false)
        setSubmitted(true)

        toast({
            title: "Дякуємо!",
            description: "Ваша заявка прийнята. Дмитро зателефонує вам найближчим часом.",
        })
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 shadow-[0_0_24px_rgba(255,122,0,0.25)] hover:shadow-[0_0_32px_rgba(255,122,0,0.35)] transition-shadow"
                    >
                        <Phone className="size-4 mr-2" />
                        Отримати консультацію
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-950 border-white/10 rounded-[16px] p-6 overflow-hidden">
                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-white leading-tight">
                                    {title}
                                </DialogTitle>
                                <DialogDescription className="text-slate-400 mt-2">
                                    {description}
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-200 text-sm font-medium">Ім'я</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Ваше ім'я"
                                                        {...field}
                                                        className="h-12 bg-slate-900 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-all"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400 text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-200 text-sm font-medium">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="example@mail.com"
                                                        {...field}
                                                        className="h-12 bg-slate-900 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-all"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400 text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-200 text-sm font-medium">Номер телефону</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="+380 (XX) XXX-XX-XX"
                                                        {...field}
                                                        className="h-12 bg-slate-900 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-all"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400 text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-primary/20 mt-2"
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
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, type: "spring" }}
                            className="flex flex-col items-center text-center py-6"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                                className="size-20 bg-primary/10 rounded-full flex items-center justify-center mb-6"
                            >
                                <CheckCircle2 className="size-10 text-primary" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-white mb-3">Дякуємо за довіру!</h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Ваша заявка успішно прийнята. Дмитро зв'яжеться з вами найближчим часом для обговорення деталей.
                            </p>
                            <Button
                                onClick={() => handleOpenChange(false)}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white border border-white/10 h-12 rounded-xl"
                            >
                                Закрити
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}
