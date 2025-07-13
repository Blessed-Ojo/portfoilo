"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent pb-2">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have a project in mind, a question, or just want to say hi? I&apos;d love to hear from you.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800/50 p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700/50"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Send a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <Input id="name" placeholder="Your Name" className="dark:bg-gray-700" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="you@example.com" className="dark:bg-gray-700" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <Textarea id="message" placeholder="How can I help you?" rows={6} className="dark:bg-gray-700" />
              </div>
              <Button type="submit" className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold rounded-lg transition-transform transform hover:scale-105">
                Send Message <ArrowRight className="ml-2" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700/50"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Information</h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <a href="mailto:hello@blessedojo.com" className="flex items-center space-x-4 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <Mail className="w-6 h-6 text-blue-500" />
                  <span>hello@blessedojo.com</span>
                </a>
                <a href="tel:+1234567890" className="flex items-center space-x-4 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <Phone className="w-6 h-6 text-blue-500" />
                  <span>+1 (234) 567-890</span>
                </a>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-blue-500" />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700/50"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Office Hours</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monday - Friday: 9:00 AM - 6:00 PM
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                (I might be building something cool outside these hours too!)
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
