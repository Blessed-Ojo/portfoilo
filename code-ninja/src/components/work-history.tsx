"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseIcon,
  AcademicCapIcon,
  CalendarIcon,
  MapPinIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import workExperienceData from "@/data/work-experience.json";
import educationData from "@/data/education.json";

const TABS = ["work", "education"] as const;
type Tab = (typeof TABS)[number];

const tabIcons = {
  work: <BriefcaseIcon className="w-4 h-4" />,
  education: <AcademicCapIcon className="w-4 h-4" />,
};

const WorkHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("work");
  const workExperience = workExperienceData.workExperience;
  const education = educationData.education;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Code Ninja Background */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-purple-50/30 to-gray-100/60 dark:from-gray-900/80 dark:via-purple-900/20 dark:to-gray-800/70" />
        
        {/* Animated floating elements */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-2xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Code pattern overlay */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(147, 51, 234, 0.4) 1px, transparent 0)`,
               backgroundSize: '32px 32px'
             }} 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header & Toggle */}
        <div className="mb-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <BriefcaseIcon className="w-4 h-4 text-purple-500" />
              Journey & Growth
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
              Code Ninja Evolution
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              From foundational learning to mastering the art of code, here's my professional journey of growth and impact.
            </p>
          </motion.div>

          {/* Enhanced Toggle with ninja theme */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative inline-flex items-center p-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full shadow-lg">
              {TABS.map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-10 flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                    activeTab === tab
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tabIcons[tab]}
                  {tab === "work" ? "Battle Experience" : "Training Grounds"}
                </motion.button>
              ))}
              {/* Active Tab Background with ninja glow */}
              <motion.div
                className="absolute top-1 bottom-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg"
                initial={false}
                animate={{
                  left: activeTab === "work" ? "4px" : "50%",
                  right: activeTab === "work" ? "50%" : "4px",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              {/* Glow effect */}
              <motion.div
                className="absolute top-1 bottom-1 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-full blur-md -z-10"
                initial={false}
                animate={{
                  left: activeTab === "work" ? "0px" : "46%",
                  right: activeTab === "work" ? "46%" : "0px",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "work" ? (
            <motion.div
              key="work"
              className="space-y-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
            >
              {workExperience.map((job, idx) => (
                <motion.div
                  key={job.id}
                  className="relative flex flex-col sm:flex-row gap-6"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: idx * 0.1,
                    ease: "easeOut" as const 
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {/* Enhanced Timeline Line */}
                  {idx < workExperience.length - 1 && (
                    <div className="absolute left-6 sm:left-6 top-16 w-px h-full bg-gradient-to-b from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 hidden sm:block" />
                  )}
                  
                  {/* Enhanced Timeline Dot */}
                  <motion.div
                    className="relative flex-shrink-0 mx-auto sm:mx-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-700 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                      <BriefcaseIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    {job.current && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-sm"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    {/* Glow effect for current job */}
                    {job.current && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-md -z-10" />
                    )}
                  </motion.div>

                  {/* Enhanced Content Card */}
                  <motion.div 
                    className="flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div>
                          <motion.h3
                            className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {job.position}
                          </motion.h3>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 flex-wrap mt-1">
                            <span className="font-semibold">{job.company}</span>
                            {job.companyUrl && (
                              <motion.a
                                href={job.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
                                whileHover={{ scale: 1.1 }}
                              >
                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                              </motion.a>
                            )}
                          </div>
                        </div>
                        {job.current && (
                          <span className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 rounded-full">
                            Active Mission
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          <span>
                            {new Date(job.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}{" "}
                            - {job.endDate ? new Date(job.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                      {job.description}
                    </p>

                    {/* Achievements */}
                    <div className="mt-6">
                      <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></span>
                        Victory Achievements
                      </h4>
                      <ul className="space-y-2">
                        {job.achievements.map((ach, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {ach}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    {job.technologies && (
                      <div className="mt-6">
                        <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
                          Weapons Arsenal
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech) => (
                            <motion.span
                              key={tech}
                              className="px-3 py-1 text-xs bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 rounded-full font-medium border border-gray-200 dark:border-gray-600"
                              whileHover={{ scale: 1.05, y: -2 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="education"
              className="space-y-12"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
            >
              {education.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  className="relative flex flex-col sm:flex-row gap-6"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: idx * 0.1,
                    ease: "easeOut" as const 
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {/* Enhanced Timeline Line */}
                  {idx < education.length - 1 && (
                    <div className="absolute left-6 sm:left-6 top-16 w-px h-full bg-gradient-to-b from-cyan-200 to-blue-200 dark:from-cyan-800 dark:to-blue-800 hidden sm:block" />
                  )}
                  
                  {/* Enhanced Timeline Dot */}
                  <motion.div
                    className="relative flex-shrink-0 mx-auto sm:mx-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 border-2 border-cyan-200 dark:border-cyan-700 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                      <AcademicCapIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                  </motion.div>

                  {/* Enhanced Content Card */}
                  <motion.div 
                    className="flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div>
                          <motion.h3
                            className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {edu.degree} in {edu.field}
                          </motion.h3>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 flex-wrap mt-1">
                            <span className="font-semibold">{edu.institution}</span>
                            {edu.institutionUrl && (
                              <motion.a
                                href={edu.institutionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
                                whileHover={{ scale: 1.1 }}
                              >
                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                              </motion.a>
                            )}
                          </div>
                        </div>
                        {edu.gpa && (
                          <span className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-200 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300 rounded-full">
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          <span>
                            {new Date(edu.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}{" "}
                            - {new Date(edu.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Honors */}
                    {edu.honors && (
                      <div className="mt-6">
                        <h4 className="text-sm font-bold text-cyan-700 dark:text-cyan-300 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></span>
                          Honor Badges
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.honors.map((honor) => (
                            <motion.span
                              key={honor}
                              className="px-3 py-1 text-xs bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-200 rounded-full font-medium border border-yellow-200 dark:border-yellow-700"
                              whileHover={{ scale: 1.05, y: -2 }}
                            >
                              {honor}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Relevant Courses */}
                    {edu.relevantCourses && (
                      <div className="mt-6">
                        <h4 className="text-sm font-bold text-cyan-700 dark:text-cyan-300 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
                          Training Modules
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {edu.relevantCourses.map((course, i) => (
                            <motion.div
                              key={course}
                              className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              viewport={{ once: true }}
                            >
                              <span className="w-1 h-1 bg-cyan-500 rounded-full flex-shrink-0"></span>
                              {course}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {edu.projects && (
                      <div className="mt-6">
                        <h4 className="text-sm font-bold text-cyan-700 dark:text-cyan-300 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
                          Epic Quests
                        </h4>
                        <ul className="space-y-2">
                          {edu.projects.map((project, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {project}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WorkHistory;