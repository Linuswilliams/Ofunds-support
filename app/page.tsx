"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Send, CheckCircle, Mail, Phone, Home, MessageSquare, FileText, AlertCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {Switch} from "@/components/ui/switch"

type FormData = {
  email: string
  phone: string
  address: string
  message: string
  category: string
  priority: string
  attachFile: boolean
}

const categories = [
  "Technical Support",
  "Billing Inquiry",
  "Feature Request",
  "General Question",
  "Other",
]

export default function AdvancedSupportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {toast} = useToast()

  const form = useForm<FormData>({
    defaultValues: {
      email: "",
      phone: "",
      address: "",
      message: "",
      attachFile: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    toast({
      title: "Support request submitted",
      description: "We'll get back to you as soon as possible.",
    })
    console.log(data)
  }

  const resetForm = () => {
    form.reset()
    setIsSubmitted(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-green-600 to-indigo-400 text-white">
          <h2 className="text-3xl font-bold mb-2">Contact Support</h2>
          <p className="text-blue-100">We're here to help. Fill out the form below and we'll get back to you as soon as possible.</p>
        </div>
        <div className="p-8">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input className="pl-10" placeholder="your@email.com" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        rules={{
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9-+()]*$/,
                            message: "Invalid phone number",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input className="pl-10" placeholder="(123) 456-7890" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="address"
                      rules={{ required: "Address is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                              <Input className="pl-10" placeholder="123 Main St, City, State, ZIP" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
            
            
                    <FormField
                      control={form.control}
                      name="message"
                      rules={{ required: "Message is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                              <Textarea
                                placeholder="How can we help you?"
                                className="min-h-[100px] pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Support Request
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Request Submitted Successfully!</h3>
                <p className="text-muted-foreground mb-6">
                  We&apos;ve received your request and will get back to you soon.
                </p>
                <Button onClick={resetForm}>Submit Another Request</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

