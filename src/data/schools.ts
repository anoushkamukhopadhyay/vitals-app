import type { CategoryId } from '../context/types';

export interface School {
  id: string;
  name: string;
  emphasis: CategoryId;
  tagline: string;
  /**
   * Authored "official profile" text — mission, history, and values. This is
   * the ONLY information the AI assistant is allowed to draw from for this
   * school (see api/chat.ts). These are fictional case-study schools, so this
   * stands in for real official-website content rather than being scraped.
   */
  knowledge: string;
}

export const SCHOOLS: School[] = [
  {
    id: 'northfield',
    name: 'Northfield School of Medicine',
    emphasis: 'research',
    tagline: 'Strong NIH-funded research tracks and dedicated research years.',
    knowledge: `Mission: Northfield School of Medicine trains physician-scientists who advance medicine through rigorous inquiry and compassionate care. Founded in 1952 as a research-focused expansion of Northfield University's medical faculty. History: Northfield established one of the first dedicated MD/PhD tracks in the region in 1971 and has graduated over 4,000 physicians, many going on to academic medicine and NIH-funded labs. Curriculum: Students may take a dedicated research year between years 2 and 3; over 60% of students publish at least one first-author paper before graduation. Values: intellectual curiosity, scientific rigor, and mentorship. Admissions philosophy: values sustained, in-depth research experience over breadth of activities.`,
  },
  {
    id: 'cascade',
    name: 'Cascade University College of Medicine',
    emphasis: 'clinicalShadowing',
    tagline: 'Early clinical immersion with longitudinal patient-care rotations.',
    knowledge: `Mission: Cascade University College of Medicine prepares clinically excellent physicians through early, sustained patient contact. Founded in 1968 alongside Cascade University's teaching hospital system. History: Cascade pioneered a "longitudinal integrated clerkship" model in the 1990s, letting students follow the same patient panel across specialties for a full year rather than rotating in short blocks. Curriculum: Clinical exposure begins in the first semester with a weekly continuity clinic. Values: continuity of care, bedside manner, and clinical reasoning developed through repetition. Admissions philosophy: looks for applicants with substantial direct patient-care experience, not just shadowing hours.`,
  },
  {
    id: 'harborview',
    name: 'Harborview School of Medicine',
    emphasis: 'service',
    tagline: 'Community health focus with strong underserved-care partnerships.',
    knowledge: `Mission: Harborview School of Medicine exists to train physicians who serve underserved and safety-net communities. Founded in 1979 out of a coalition of community health centers. History: Harborview has maintained a free clinic staffed by students and faculty continuously since 1981, and requires every student to complete a longitudinal community health practicum. Curriculum: First-year students are paired with a community health worker for a full year. Values: health equity, community partnership, and service as a core clinical skill, not an extracurricular. Admissions philosophy: prioritizes applicants with a demonstrated, sustained record of community service and volunteering.`,
  },
  {
    id: 'wrenfield',
    name: 'Wrenfield College of Medicine',
    emphasis: 'leadership',
    tagline: 'Health-policy and physician-leadership dual-degree pathways.',
    knowledge: `Mission: Wrenfield College of Medicine trains physician-leaders who shape health systems and policy, not only individual patient care. Founded in 1985 with an explicit dual focus on clinical training and health administration. History: Wrenfield launched one of the first MD/MPH-Health Policy dual-degree tracks in 1993 and has an unusually active student government with real budgetary authority over student life funds. Curriculum: A required longitudinal health-systems leadership seminar runs across all four years. Values: physician advocacy, systems thinking, and leadership as a trainable clinical skill. Admissions philosophy: weighs sustained leadership roles (not just membership) heavily, alongside academics.`,
  },
  {
    id: 'ashcombe',
    name: 'Ashcombe University School of Medicine',
    emphasis: 'coursework',
    tagline: 'Rigorous, exam-focused preclinical curriculum with strong board outcomes.',
    knowledge: `Mission: Ashcombe University School of Medicine builds physicians on a foundation of deep, rigorous preclinical mastery. Founded in 1961 as a traditional, exam-driven medical school and has largely kept that identity. History: Ashcombe has consistently ranked among the top programs nationally for first-attempt board exam pass rates for over two decades. Curriculum: Preclinical years remain a structured, lecture- and exam-based two-year block rather than an early-clinical model. Values: academic rigor, depth of foundational science knowledge, and disciplined study habits. Admissions philosophy: places significant weight on GPA trends and coursework rigor, alongside MCAT performance.`,
  },
  {
    id: 'emerson',
    name: 'Emerson College of Medicine',
    emphasis: 'mcat',
    tagline: 'Holistic review known for weighing strong standardized test improvement heavily.',
    knowledge: `Mission: Emerson College of Medicine believes standardized test performance reflects trainable skill, not fixed aptitude, and looks for applicants who have shown they can improve. Founded in 1974. History: Emerson's admissions committee has published its own research on MCAT score-improvement trends and factors that improvement into holistic review more explicitly than most peer schools. Curriculum: Offers an optional pre-matriculation academic bridge program for admitted students who want extra preparation before year one. Values: growth mindset, resilience, and evidence-based self-improvement. Admissions philosophy: an applicant with a lower first attempt and a strong, well-documented retake is viewed favorably, not penalized.`,
  },
];
