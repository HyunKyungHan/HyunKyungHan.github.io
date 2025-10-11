"use client";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ExternalLink, Calendar, MapPin, Sun, Moon, Link as LinkIcon, Building2, BookOpen, Newspaper, Award, GraduationCap, FileDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

/**
 * Academic Personal Website – Single-file React component
 * Tech: React + TailwindCSS + shadcn/ui + framer-motion + lucide-react
 *
 * How to use:
 * 1) Create a new React project (Next.js or Vite). Ensure Tailwind + shadcn/ui are set up.
 * 2) Drop this file in your project (eg. app/page.tsx for Next.js) and export default.
 * 3) Edit the `PROFILE`, `LINKS`, `NEWS`, `PUBLICATIONS`, and `PROJECTS` data below.
 * 4) Add your CV (PDF) to /public/cv.pdf or update the link.
 */

// ---------------------- CONFIGURABLE DATA ----------------------
const micv_link = <Link href="https://micv.yonsei.ac.kr/home" className="text-blue-600 font-semibold hover:underline">MICV Lab</Link>
const prof_link = <Link href="https://micv.yonsei.ac.kr/seongjae" className="text-blue-600 font-semibold hover:underline">Seong Jae Hwang</Link>
const hhk_bold = <strong>Hyunkyung Han</strong>
const PROFILE = {
  name: "Hyunkyung Han",
  title: "M.S. Student @ Yonsei University",
  location: "Seoul, South Korea",
  email: "hhk@yonsei.ac.kr",
  avatar: "/pubs/profile2.jpg",
  about:
    <>
      I am currently pursuing my M.S.at the {micv_link} advised by professor {prof_link}. I&apos;m interested in addressing fundamental challenges in medical imaging through deep learning, with the goal of enhancing the efficiency and accuracy of clinical workflows. My research interests include image registration, domain generalization, and weakly supervised segmentation.
    </>
};

const LINKS = [
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=ZXQuyMoAAAAJ", icon: BookOpen },
  { label: "GitHub", href: "https://github.com/HyunKyungHan", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hyunkyunghan", icon: Linkedin },
  { label: "Email", href: `mailto:${PROFILE.email}`, icon: Mail },
];

const EDUCATION = [
  {
    school: "Yonsei University",
    degree: "M.S. in Artificial Intelligence",
    period: "Mar. 2025 – Present",
    details: "Medical Imaging & Computer Vision Lab (MICV) | Advisor: Prof. Seong Jae Hwang",
  },
  {
    school: "Ewha Womans University",
    degree: "B.S. in Computer Science and Engineering",
    period: "Mar. 2021 – Feb. 2025",
  },
];

const EXPERIENCE = [
  {
    company: "NewCureM Inc.",
    role: "Medical AI Researcher",
    period: "Mar. 2023 – Aug. 2025",
    details:
      "I have developed medical imaging solutions focused on PET and MRI analysis, including dose/time reduction for brain PET and AI-guided prostate lesion detection. I also contributed to automated diagnostic report generation and the regulatory approval of medical software devices (K-FDA).",
  }
];

const bold_GAN = <b>&quot;GAN-based Denoising for Scan Time Reduction and Motion Correction of 18F FP-CIT PET/CT: A Multicenter External Validation Study&quot;</b>
const bold_M2M = <b>&quot;Mono-Modalizing Extremely Heterogeneous Multi-Modal Medical Image Registration&quot;</b>
const italic_CNM = <i>Clinical Nuclear Medicine (Impact Factor=10.0)</i>
const italic_MICCAI = <i>MICCAI 2025</i>
const italic_ADT = <i>Alzheimer&apos;s Research & Therapy</i>
const NEWS = [
  { date: "2025.09", text: "MICCAI band debuted at the MICCAI 2025 Gala dinner! I performed as the singer😎.", link: "https://www.atnnews.co.kr/news/articleView.html?idxno=106188" },
  { date: "2025.09", text: <>One paper accepted to {italic_ADT}!🎉</> },
  // {
  //   date: "2025.09",
  //   text: "Our paper on Mono-Modalizing Heterogeneous Multi-Modal Registration was presented as poster at MICCAI 2025.",
  //   // link: "#",
  // },
  { date: "2025.07", text: <>{bold_GAN} was accepted to {italic_CNM}!🎉</> },
  { date: "2025.06", text: <>{bold_M2M} was accepted to {italic_MICCAI}!🎉</> },
  { date: "2025.03", text: "I joined the MICV lab!" },
  { date: "2023.03", text: "I joined NewCureM as the AI/SW R&D Team researcher!" },
];

type BibtexLink = { label: string; kind: "bibtex"; bibtex: string };
type ExternalLink = { label: string; href: string };
type PublicationLink =
  | { label: string; href: string }
  | { label: string; kind: "bibtex"; bibtex: string };

type Publication = {
  year: number;
  title: string;
  authors: string[];
  venue: string;
  tags?: string[];
  links?: PublicationLink[];
  highlight?: boolean;
  thumbnail?: string;
  thumbnailAlt?: string;
};

// PUBLICATIONS를 Publication[]로 선언
const PUBLICATIONS: Publication[] = [
  {
    year: 2025,
    title: "Centiloid values from deep learning-based CT parcellation: a valid alternative to freesurfer",
    authors: ["Yeo Jun Yoon", "Seungbeom Seo", "Sangwon Lee", "Hyunkeong Lim", "Kyobin Choo", "Daesung Kim", "Hyunkyung Han", "Minjae So", "Hosung Kang", "Seongjin Kang", "Dongwoo Kim", "Young-gun Lee", "Dongho Shin", "Tae Joo Jeon", "Mijin Yun*"],
    venue: "Alzheimer's Research & Therapy",
    tags: ["Parcellation", "Freesurfer", "Centiloid"],
    links: [
      { label: "Paper", href: "https://alzres.biomedcentral.com/articles/10.1186/s13195-025-01860-1" },
      // { label: "Code", href: "#" },
      // { label: "BibTeX", kind: "bibtex", bibtex: "@article{...}" },
    ],
    // highlight: true,
    thumbnail: "/pubs/alz_thumbnail.jpg",   ///pubs/… 에 이미지 두기
    thumbnailAlt: "CT parcellation paper thumbnail",
  },
  {
    year: 2025,
    title: "GAN-based Denoising for Scan Time Reduction and Motion Correction of 18F FP-CIT PET/CT: A Multicenter External Validation Study",
    authors: ["Hyunkyung Han", "Kyobin Choo", "Tae Joo Jeon", "Sangwon Lee", "Seungbeom Seo", "Dongwoo Kim", "Sun Jung Kim*", "Suk Hyun Lee*", "Mijin Yun*"],
    venue: "Clinical Nuclear Medicine",
    tags: ["PET", "Denoising", "GAN"],
    links: [
      { label: "Paper", href: "https://journals.lww.com/nuclearmed/abstract/2025/10000/gan_based_denoising_for_scan_time_reduction_and.7.aspx" },
      // { label: "Code", href: "#" },
      // { label: "BibTeX", kind: "bibtex", bibtex: "@article{...}" },
    ],
    // highlight: true,
    thumbnail: "/pubs/CNM_thumbnail.jpg",   ///pubs/… 에 이미지 두기
    thumbnailAlt: "Denoising paper thumbnail",
  },
  {
    year: 2025,
    title: "Mono-Modalizing Extremely Heterogeneous Multi- Modal Medical Image Registration",
    authors: ["Kyobin Choo", "Hyunkyung Han", "Jinyeong Kim", "Chanyong Yoon", "Seong Jae Hwang*"],
    venue: "Medical Image Computing and Computer Assisted Intervention (MICCAI) 2025",
    tags: ["Multi-modal", "Registration", "M2M-Reg"],
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2506.15596" },
      { label: "Code", href: "https://github.com/MICV-yonsei/M2M-Reg" },
      // { label: "BibTeX", kind: "bibtex", bibtex: "@article{...}" },
    ],
    // highlight: true,
    thumbnail: "/pubs/M2M_thumbnail.jpg",   ///public/pubs/… 에 이미지 두기
    thumbnailAlt: "M2M-Reg paper thumbnail",
  },
  {
    year: 2025,
    title: "Striatal dopamine transporter uptake predicts neuronal hypometabolism and visuospatial function in Parkinson’s disease",
    authors: ["Seungbeom Seo¹", "Yeo Jun Yoon¹", "Sangwon Lee", "Hyunkeong Lim", "Kyobin Choo", "Daesung Kim", "Hyunkyung Han", "Seongjin Kang", "Jaekyung Park", "Phil Hyu Lee", "Dongwoo Kim*", "Mijin Yun*"],
    venue: "European Journal of Nuclear Medicine and Molecular Imaging",
    tags: ["Parkinson's disease", "DAT"],
    links: [
      { label: "Paper", href: "https://link.springer.com/article/10.1007/s00259-025-07137-x" },
      // { label: "Code", href: "#" },
      // { label: "BibTeX", kind: "bibtex", bibtex: "@article{...}" },
    ],
    // highlight: true,
    thumbnail: "/pubs/Parkinson_thumbnail.png",   // public/public/pubs/… 에 이미지 두기
    // thumbnailAlt: "M2M-Reg paper thumbnail",
  },
];

// const PROJECTS = [
//   {
//     title: "NCM-PSMA: Prostate Imaging Toolkit",
//     summary:
//       "A comprehensive pipeline for PET/MR/CT registration, lesion detection, and reporting. Includes nnUNet, ICON-based registration, and PDF reporting.",
//     roles: ["Lead", "Engineer"],
//     links: [
//       { label: "Code", href: "#" },
//       { label: "Docs", href: "#" },
//     ],
//   },
//   {
//     title: "Diffusion Transformer for PET Synthesis (DiT-PET)",
//     summary:
//       "2.5D DiT conditioned on clinical text for PET image synthesis and domain harmonization.",
//     roles: ["Research"],
//     links: [{ label: "Preprint", href: "#" }],
//   },
// ];

// ---------------------- UTILITIES ----------------------
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};
const item = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
};

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("prefers-dark");
    const prefersDark = saved ? saved === "true" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("prefers-dark", String(dark));
  }, [dark]);
  return { dark, setDark } as const;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full border border-neutral-300 dark:border-neutral-700">
      {children}
    </span>
  );
}

function Anchor({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-4 hover:decoration-solid"
    >
      {children}
      <ExternalLink className="size-3" />
    </a>
  );
}

function isExternalLink(
  x: PublicationLink
): x is { label: string; href: string } {
  return "href" in x;
}

// ---------------------- MAIN PAGE ----------------------
export default function AcademicSite() {
  const { dark, setDark } = useDarkMode();
  const [query, setQuery] = useState("");

  const filteredPubs = useMemo(() => {
    if (!query) return PUBLICATIONS;
    const q = query.toLowerCase();
    return PUBLICATIONS.filter((p) =>
      [p.title, p.venue, ...(p.authors || []), ...(p.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link href="#top" className="text-lg md:text-xl font-semibold tracking-tight">{PROFILE.name}</Link>
          <nav className="hidden md:flex gap-10 text-base md:text-[15px]">
            <Link href="#about" className="hover:opacity-70">About Me</Link>
            <Link href="#news" className="hover:opacity-70">News</Link>
            <Link href="#publications" className="hover:opacity-70">Papers</Link>
            {/* <a href="#projects" className="hover:opacity-70">Projects</Link> */}
            <Link href="#contact" className="hover:opacity-70">Contact</Link>
            <Link href="/misc" className="hover:opacity-70">Misc</Link>
          </nav>
          <div className="flex items-center gap-2">
            {/* <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={() => setDark(!dark)}>
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button> */}
            <Button size="sm" className="rounded-xl">
              <Link href="/pubs/hhk_cv.pdf" target="_blank" rel="noreferrer">
                <FileDown className="size-4 mr-1" /> CV
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="about" className="mx-auto max-w-5xl px-8 py-17 md:py-16">
        <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-[220px_1fr] gap-6 items-start">
          <motion.img
            alt={PROFILE.name}
            src={PROFILE.avatar}
            className="w-[280px] h-[280px] md:w-[280px] md:h-[280px] object-cover shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.div variants={item} className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{PROFILE.name}</h1>
            <p className="text-base text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
              <GraduationCap className="size-4" /> {PROFILE.title}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 flex items-center gap-1">
              <MapPin className="size-4" /> {PROFILE.location}
            </p>
            <p className="leading-relaxed">{PROFILE.about}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {LINKS.map((l) => (
                <Button key={l.label} size="sm" className="rounded-xl">
                  <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                    <l.icon className="size-4" /> {l.label}
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="education" className="mx-auto max-w-5xl px-4 py-1 md:py-1">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <GraduationCap className="size-6" /> Education
        </h2>
        <div className="space-y-4">
          {EDUCATION.map((edu, idx) => (
            <Card key={idx} className="rounded-2xl">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h3 className="text-lg font-semibold">{edu.school}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{edu.period}</p>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 italic">{edu.degree}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">{edu.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-5xl px-4 py-4 md:py-6">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <Building2 className="size-5" /> Experience
        </h2>
        <div className="space-y-4">
          {EXPERIENCE.map((exp, idx) => (
            <Card key={idx} className="rounded-2xl">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{exp.period}</p>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 italic">{exp.role}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">{exp.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* News */}
      <section id="news" className="mx-auto max-w-5xl px-4 py-4 md:py-4">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2 mb-3">
          <Newspaper className="size-5" /> News
        </h2>

        <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
          {NEWS.map((n, idx) => (
            <motion.div
              key={idx}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <p className="text-base leading-relaxed">
                <span className="font-mono text-neutral-500 dark:text-neutral-400">
                  [{n.date}]
                </span>{" "}
                {n.text}
                {n.link && (
                  <>
                    {" "}
                    (<Anchor href={n.link}>
                      <span className="underline hover:text-blue-500">More</span>
                    </Anchor>)
                  </>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="mx-auto max-w-5xl px-4 py-4 md:py-6">
        {/* 헤더: 모바일에서 줄바꿈 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Award className="size-5" /> Papers
          </h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search title, author, venue, tag…"
              className="w-full sm:w-64"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredPubs.map((p, idx) => (
            <motion.div
              key={idx}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`group rounded-2xl border ${p.highlight
                ? "border-amber-400/60 dark:border-amber-300/50"
                : "border-neutral-200 dark:border-neutral-800"
                }`}
            >
              {/* ✅ 모바일: 세로 / 데스크탑: 가로 */}
              <div className="p-4 md:p-5 flex flex-col md:flex-row items-start gap-4 md:gap-5">
                {/* Thumbnail */}
                {p.thumbnail ? (
                  <div className="relative w-full md:w-60 aspect-[4/3] overflow-hidden border border-neutral-200 dark:border-neutral-800">
                    <img
                      src={p.thumbnail}
                      alt={p.thumbnailAlt ?? p.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : null}

                {/* Text content */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">{p.year}</div>
                    <div className="flex flex-wrap gap-2">
                      {(p.tags || []).map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg font-semibold mt-1 leading-snug line-clamp-2">
                    {p.title}
                  </h3>

                  {/* 저자 */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                    {p.authors.map((a, i) => (
                      <span key={i} className={a.includes("Hyunkyung Han") ? "font-semibold" : undefined}>
                        {a}
                        {i < p.authors.length - 1 && ", "}
                      </span>
                    ))}
                  </p>

                  {/* 학회/저널 */}
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 italic mt-0.5">
                    {p.venue}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-3">
                    {p.links?.map((l, i) => {
                      if ("kind" in l && l.kind === "bibtex") {
                        const blob = new Blob([l.bibtex], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        return (
                          <a
                            key={i}
                            href={url}
                            download={slugify(p.title) + ".bib"}
                            className="text-sm inline-flex items-center gap-1 underline decoration-dotted underline-offset-4"
                          >
                            <FileText className="size-4" /> {l.label}
                          </a>
                        );
                      }
                      if (isExternalLink(l)) {
                        return (
                          <Anchor key={i} href={l.href}>
                            {l.label}
                          </Anchor>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects
      <section id="projects" className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
          <LinkIcon className="size-5" /> Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((proj, idx) => (
            <motion.div key={idx} variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Card className="rounded-2xl h-full">
                <CardContent className="p-5 h-full flex flex-col">
                  <h3 className="text-base md:text-lg font-semibold">{proj.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 flex-1 leading-relaxed">{proj.summary}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2 flex-wrap">
                      {proj.roles?.map((r) => (
                        <Tag key={r}>{r}</Tag>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {proj.links?.map((l, i) => (
                        <Anchor key={i} href={l.href}>{l.label}</Anchor>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-4 py-4 md:py-6">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
          <Mail className="size-5" /> Contact
        </h2>
        <div className="w-full rounded-2xl">
          <Card className="rounded-2xl">
            <CardContent className="p-5 space-y-2">
              <p>
                For collaboration, reviewing, or talks, please reach out via <a className="underline decoration-dotted underline-offset-4" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </p>
              {/* <p className="text-sm text-neutral-600 dark:text-neutral-300">I’m especially interested in PET harmonization, multi-modal registration, and diffusion-based generation.</p> */}
            </CardContent>
          </Card>
          {/* <Card className="rounded-2xl">
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold">Quick Links</h3>
              <div className="flex flex-wrap gap-2">
                {LINKS.map((l) => (
                  <Button key={l.label} size="md" variant="secondary" className="rounded-2xl">
                    <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                      <l.icon className="size-4" /> {l.label}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 mt-8">
        <div className="mx-auto max-w-5xl px-4 flex flex-col items-center justify-between gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>

        </div>
      </footer>
    </div>
  );
}

// ---------------------- HELPERS ----------------------
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
