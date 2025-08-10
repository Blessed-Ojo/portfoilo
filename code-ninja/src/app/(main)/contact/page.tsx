"use client";

import React, { useState, useTransition, useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendEmail } from "@/app/actions/sendEmail";
import { Mail, MessageSquare, User, Send } from "lucide-react";

// Animation Variants
const float3D: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60, 
    rotateX: 20,
    scale: 0.8,
    z: -200
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    z: 0,
    transition: { 
      duration: 1,
      ease: "easeOut",
      type: "spring",
      stiffness: 80,
      damping: 20
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { 
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.3 
    } 
  },
};

// Background Component
const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <>
      {/* Grid Pattern */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.gray.200)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.200)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,theme(colors.gray.800)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.800)_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-30"
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotateZ: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotateZ: [0, -5, 5, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotateZ: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-40 left-1/3 w-40 h-40 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
      </div>
      
      {/* Gradient Overlay */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20"
      />
    </>
  );
};

// 3D Card Component
const Card3D = ({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 100, rotateX: 45, scale: 0.8 }}
    whileInView={{ 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }}
    whileHover={{ 
      y: -10, 
      rotateX: -2,
      scale: 1.01,
      transition: { duration: 0.3 }
    }}
    viewport={{ once: true }}
    className={`transform-gpu perspective-1000 ${className}`}
    style={{
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden"
    }}
  >
    {children}
  </motion.div>
);

// Type definitions for better type safety
interface IconProps {
  className?: string;
  [key: string]: unknown;
}

// Animated Icon Component
const AnimatedIcon = ({ 
  Icon, 
  className = "",
  gradientFrom = "blue-500",
  gradientTo = "purple-500"
}: { 
  Icon: React.ComponentType<IconProps>;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}) => (
  <motion.div 
    whileHover={{ rotateY: 360, scale: 1.1 }}
    transition={{ duration: 0.6 }}
    className={`p-3 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-2xl shadow-lg ${className}`}
  >
    <Icon className="w-6 h-6 text-white" />
  </motion.div>
);

// Enhanced Form Field Component
interface FormFieldType {
  label: string;
  name: string;
  type: string;
  value: string;
  error?: string;
  placeholder: string;
}

const FormField = ({ 
  field, 
  onChange, 
  icon: Icon,
  gradientFrom,
  gradientTo 
}: {
  field: FormFieldType;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  icon: React.ComponentType<IconProps>;
  gradientFrom: string;
  gradientTo: string;
}) => (
  <Card3D>
    <div className="space-y-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:bg-white/80 dark:hover:bg-gray-800/80">
      <div className="flex items-center gap-3">
        <AnimatedIcon 
          Icon={Icon} 
          gradientFrom={gradientFrom} 
          gradientTo={gradientTo}
        />
        <label
          htmlFor={field.name}
          className="text-lg font-semibold text-gray-800 dark:text-white"
        >
          {field.label}
        </label>
      </div>
      
      {field.name === 'message' ? (
        <Textarea
          id={field.name}
          name={field.name}
          value={field.value}
          onChange={onChange}
          placeholder={field.placeholder}
          rows={6}
          className={`w-full bg-white/50 dark:bg-gray-700/50 border-2 ${
            field.error 
              ? "border-red-400 focus:border-red-500" 
              : "border-gray-200/50 dark:border-gray-600/50 focus:border-blue-400"
          } rounded-2xl px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 backdrop-blur-sm`}
          aria-describedby={field.error ? `${field.name}-error` : undefined}
        />
      ) : (
        <Input
          id={field.name}
          name={field.name}
          type={field.type}
          value={field.value}
          onChange={onChange}
          placeholder={field.placeholder}
          className={`w-full bg-white/50 dark:bg-gray-700/50 border-2 ${
            field.error 
              ? "border-red-400 focus:border-red-500" 
              : "border-gray-200/50 dark:border-gray-600/50 focus:border-blue-400"
          } rounded-2xl px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 backdrop-blur-sm`}
          aria-describedby={field.error ? `${field.name}-error` : undefined}
        />
      )}
      
      {field.error && (
        <motion.p 
          id={`${field.name}-error`} 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm font-medium flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          {field.error}
        </motion.p>
      )}
    </div>
  </Card3D>
);

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function validate() {
    const e: { [k: string]: string } = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((err) => ({ ...err, [e.target.name]: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    startTransition(async () => {
      const result = await sendEmail(new FormData(formRef.current!));
      if (result.success) {
        toast.success(result.message);
        setForm(initialForm);
        formRef.current?.reset();
      } else {
        toast.error(
          result.message || "Failed to send message. Please try again."
        );
      }
    });
  }

  const formFields: Array<{
    label: string;
    name: string;
    type: string;
    value: string;
    error?: string;
    placeholder: string;
    icon: React.ComponentType<IconProps>;
    gradientFrom: string;
    gradientTo: string;
  }> = [
    {
      label: "Your Name",
      name: "name",
      type: "text",
      value: form.name,
      error: errors.name,
      placeholder: "What should I call you?",
      icon: User,
      gradientFrom: "blue-500",
      gradientTo: "purple-500"
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      value: form.email,
      error: errors.email,
      placeholder: "your.email@example.com",
      icon: Mail,
      gradientFrom: "purple-500",
      gradientTo: "pink-500"
    },
    {
      label: "Subject",
      name: "subject",
      type: "text",
      value: form.subject,
      error: undefined,
      placeholder: "What is this about?",
      icon: MessageSquare,
      gradientFrom: "pink-500",
      gradientTo: "orange-500"
    },
    {
      label: "Your Message",
      name: "message",
      type: "text",
      value: form.message,
      error: errors.message,
      placeholder: "Tell me about your project, ideas, or how I can help you...",
      icon: MessageSquare,
      gradientFrom: "green-500",
      gradientTo: "blue-500"
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white min-h-screen pt-24 relative overflow-hidden transition-colors duration-300">
      <AnimatedBackground />
      
      <section className="relative z-10 py-20">
        <div className="max-w-screen-lg mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-16"
          >
            {/* Hero Section */}
            <div className="text-center space-y-8">
              <motion.h1
                variants={float3D}
                className="text-5xl sm:text-7xl font-bold relative perspective-1000"
                style={{
                  textShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  transform: "translateZ(100px)"
                }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Let&apos;s Connect
                </span>
                <motion.div 
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl"
                />
              </motion.h1>
              
              <motion.p
                variants={float3D}
                className="text-xl leading-relaxed max-w-3xl mx-auto text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20"
                style={{
                  textShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  transform: "translateZ(20px)"
                }}
              >
                Have a project in mind or want to collaborate? I&apos;d love to hear from you. 
                Let&apos;s discuss how we can bring your ideas to life and create something amazing together.
              </motion.p>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <motion.form
                ref={formRef}
                initial="hidden"
                animate="visible"
                variants={stagger}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {formFields.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    onChange={handleChange}
                    icon={field.icon}
                    gradientFrom={field.gradientFrom}
                    gradientTo={field.gradientTo}
                  />
                ))}

                {/* Submit Button */}
                <Card3D>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:bg-white/80 dark:hover:bg-gray-800/80"
                  >
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isPending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          Send Message
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </Card3D>
              </motion.form>
            </div>

            {/* Additional Info */}
            <motion.div
              variants={float3D}
              className="text-center space-y-6"
            >
              <Card3D>
                <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-xl max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Let&apos;s Build Something Amazing
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Whether you need help with development, SEO optimization, or infrastructure, 
                    I&apos;m here to help turn your vision into reality. Every project is an opportunity 
                    to create something exceptional.
                  </p>
                </div>
              </Card3D>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}