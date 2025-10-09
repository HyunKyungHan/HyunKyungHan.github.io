"use client";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ExternalLink, Calendar, MapPin, Sun, Moon, Link as LinkIcon, Building2, BookOpen, Newspaper, Award, GraduationCap, FileDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// ---------------------- CONFIGURABLE DATA ----------------------
const micv_link = <a href="https://micv.yonsei.ac.kr/home" className="text-blue-600 font-semibold hover:underline">MICV lab</a>
const prof_link = <a href="https://micv.yonsei.ac.kr/seongjae" className="text-blue-600 font-semibold hover:underline">Seong Jae Hwang</a>
const hhk_bold = <strong>Hyunkyung Han</strong>
const PROFILE = {
    name: "Hyunkyung Han",
    title: "M.S. Student @ Yonsei University",
    location: "Seoul, South Korea",
    email: "hhk@yonsei.ac.kr",
    avatar: "/pubs/profile.png",
    about:
        <>
            I am a M.S. student at {micv_link} advised by professor {prof_link}.I&apos; m interested in addressing fundamental challenges in medical imaging through deep learning, with the goal of enhancing the efficiency and accuracy of clinical workflows. My research interests include image registration, domain generalization, and weakly supervised segmentation.
        </>
};

const photos = [
    // public/misc/ 폴더에 이미지 넣고 아래 경로만 바꿔줘
    { src: "/misc/micv_band_practice.jpg", alt: "band practice", caption: "During MICCAI band practice, 2025" },
    { src: "/misc/price_tag.png", alt: "MICCAI 2025 band performance", caption: "Performing @MICCAI2025 Gala Dinner, 2025" },
    { src: "/misc/apt.png", alt: "MICCAI 2025 band performance", caption: "Performing @MICCAI2025 Gala Dinner, 2025" },
    { src: "/misc/newcurem.jpg", alt: "at Korean Dementia Conference", caption: "Promoting NewCureM's software at  Korean Dementia Conference, 2025" },
    { src: "/misc/pentaport.jpg", alt: "at PENTAPORT rock festival", caption: "PENAPORT, 2025" },
    { src: "/misc/nell.jpg", alt: "Me at a NELL concert", caption: "NELL concert, 2024" },
];

const funFacts = [
    "I take photos on film once a month.",
    "I keep a log of the coffee beans I try.",
    "I can read papers faster with instrumental music on loop.",
    // 원하는 만큼 추가!
];

export default function MiscPage() {
    return (

        <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
                <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
                    <a href="../#top" className="text-lg md:text-xl font-semibold tracking-tight">{PROFILE.name}</a>
                    <nav className="hidden md:flex gap-10 text-base md:text-[15px]">
                        <a href="../#about" className="hover:opacity-70">About Me</a>
                        <a href="../#news" className="hover:opacity-70">News</a>
                        <a href="../#publications" className="hover:opacity-70">Papers</a>
                        {/* <a href="#projects" className="hover:opacity-70">Projects</a> */}
                        <a href="../#contact" className="hover:opacity-70">Contact</a>
                        <a href="/misc" className="hover:opacity-70">Misc</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        {/* <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={() => setDark(!dark)}>
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button> */}
                        <Button size="sm" className="rounded-xl">
                            <a href="/pubs/hhk_cv.pdf" target="_blank" rel="noreferrer">
                                <FileDown className="size-4 mr-1" /> CV
                            </a>
                        </Button>
                    </div>
                </div>
            </header>

            {/* 사진 그리드 */}
            <section className="mb-8 mx-auto max-w-5xl px-8 md:px-8 py-10">
                {/* <h2 className="text-lg md:text-xl font-semibold mb-3">Photos</h2> */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {photos.map((p, i) => (
                        <figure key={i} className="group relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                            {/* 4:3 비율 placeholder, 다른 비율 이미지는 object-cover로 트림 */}
                            <div className="relative w-full aspect-[4/3]">
                                <img
                                    src={p.src}
                                    alt={p.alt}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                                />
                            </div>
                            {p.caption && (
                                <figcaption className="px-3 py-2 text-xs text-neutral-600 dark:text-neutral-300">
                                    {p.caption}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
                {/* 메모: 이미지들은 프로젝트 루트의 /public/misc/ 에 두면 /misc/photo-01.jpg 식으로 접근 가능 */}
            </section>

            {/* Fun facts */}
            <section className="mb-10 mx-auto max-w-5xl px-8 md:px-8 py-10">
                {/* <h2 className="text-lg md:text-xl font-semibold mb-2">Fun facts about me</h2> */}
                {/* <ul className="list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
                    {funFacts.map((f, i) => (
                        <li key={i}>{f}</li>
                    ))}
                </ul> */}
                <p className="mx-auto w-fit mb-4">
                    I spend most of my free time listening to rock music 🎸—I love its energy and spirit.
                    I&apos;m also a huge fan of <a href="https://youtu.be/1rv_UzdOhac?si=VFP_CSK01ZAI8Pui" target="_blank" rel="noreferrer" className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >NELL</a>.
                    Recently, I got the chance to join the MICCAI band and perform live!
                    I&apos;m also interested in learning new languages and am currently studying Spanish with Duo 🦉.
                </p>

                {/* <p className="mx-auto w-fit mb-4">
                    I&apos;m also interested in learning new languages and am currently studying Spanish with Duo 🦉.
                </p> */}
            </section>

            <div className="flex justify-center">
                <a href='https://mapmyvisitors.com/web/1bzw2' title='Visit tracker' target="_blank" rel="noopener noreferrer">
                    <img src="https://mapmyvisitors.com/map.png?cl=080808&w=360&t=n&d=Tg7X1cEwPlaFAkWfckH1-FuxVtECThI1cqYImMqoZBE&co=ffffff&ct=808080"
                        alt="Visit tracker"
                        width={300}
                        height={90} />
                </a>
            </div>

            {/* Footer */}
            <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 mt-8">
                <div className="mx-auto max-w-5xl px-4 flex flex-col items-center justify-between gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>

                </div>
            </footer>
        </div>


    );
}
