import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Globe,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import { z } from 'zod'
import './App.css'

type ThemeMode = 'light' | 'dark'

type Project = {
  slug: string
  name: string
  tag: string
  summary: string
  description: string
  image: string
  category: string[]
  tech: string[]
  keyFeatures: string[]
  github: string | null
  demo: string | null
  problem: string
  goals: string[]
  architecture: string[]
  userRoles: string[]
  workflows: string[]
  highlights: string[]
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Volunteering', href: '#volunteering' },
  { label: 'Contact', href: '#contact' },
]

const skillGroups = [
  {
    title: 'Backend Development',
    skills: [
      'Laravel',
      'PHP',
      'Node.js',
      'Express.js',
      'REST APIs',
      'API Design',
      'Authentication',
      'Authorization',
      'JWT',
      'RBAC',
      'Socket.IO',
      'MVC',
      'Backend Architecture',
      'Business Logic',
      'Validation',
      'Error Handling',
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      'React',
      'React Native',
      'Vite',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'JavaScript',
      'TypeScript',
      'Responsive Design',
    ],
  },
  {
    title: 'Programming Languages',
    skills: ['PHP', 'JavaScript', 'TypeScript', 'Python', 'SQL'],
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'Prisma ORM', 'Database Design'],
  },
  {
    title: 'Development Tools',
    skills: ['Git', 'GitHub', 'Postman', 'Docker', 'npm', 'Vite', 'VS Code'],
  },
  {
    title: 'Data & Analytics',
    skills: ['Power BI', 'DAX', 'SQL', 'Data Cleaning', 'Data Analysis', 'Dashboard Development'],
  },
  {
    title: 'AI',
    skills: ['Generative AI', 'AI API Integration', 'Gemini API', 'AI-powered Applications', 'AI Agents', 'Machine Learning fundamentals'],
  },
  {
    title: 'Engineering Practices',
    skills: [
      'RESTful API Design',
      'Authentication',
      'Authorization',
      'Role-Based Access Control',
      'Input Validation',
      'Error Handling',
      'Testing',
      'Environment Variables',
      'API Testing',
      'Production-oriented Architecture',
      'Deployment Preparation',
    ],
  },
]

const softSkills = [
  'Problem Solving',
  'Communication',
  'Teamwork',
  'Leadership',
  'Technical Support',
  'Collaboration',
  'Learning Agility',
  'Organization',
  'Responsibility',
]

const experience = [
  {
    company: 'FlyRank',
    role: 'Backend AI Engineering Intern',
    period: 'July 2026 – Present',
    details: [
      'Backend engineering work focused on practical software delivery.',
      'AI engineering workflows, API-driven development, and software problem solving.',
      'Exposure to real engineering collaboration and backend-focused product work.',
    ],
  },
  {
    company: 'Digital Egypt Pioneers Initiative / MCIT',
    role: 'Junior Data Analyst Trainee',
    period: '6 months',
    details: [
      'Training in data analysis, SQL, Power BI, DAX, and dashboard development.',
      'Focused on analytical thinking and data cleaning workflows.',
      'Presented as a training experience rather than a primary career identity.',
    ],
  },
  {
    company: 'CIB',
    role: 'Generative AI Summer Internship',
    period: 'July 2026',
    details: [
      'Worked in a professional banking ecosystem environment.',
      'Explored generative AI use cases and practical AI learning.',
      'Achieved CIB Day 1 Banking Ecosystem score of 10/10.',
    ],
  },
  {
    company: 'NTI – ITIDA',
    role: 'Python Training',
    period: '12 July 2026 – 06 August 2026',
    details: [
      'Completed 120-hour Python training program with strong technical results.',
      'Developed the Eco Reward project as part of the curriculum.',
      'Achieved a score of 94.5%.',
    ],
  },
]

const education = [
  {
    institution: 'Helwan University',
    degree: 'Bachelor of Computer Science',
    faculty: 'Faculty of Computers and Artificial Intelligence',
    period: '2025 – 2029',
    level: 'Second Year',
    gpa: '3.42 / 4.00',
    location: 'Cairo, Egypt',
    areas: ['Programming', 'Computer Science', 'Databases', 'Algorithms', 'Web Development', 'Software Engineering', 'Problem Solving'],
  },
]

const projects: Project[] = [
  {
    slug: 'e-commerce-platform',
    name: 'E-commerce Platform',
    tag: 'Full-stack commerce platform',
    summary: 'Production-oriented e-commerce system with authentication, orders, reviews, admin flows, and API validation.',
    description: 'A full-stack commerce platform focused on practical backend architecture, clean workflows, and business logic.',
    image: '/images/projects/project-placeholder-1.svg',
    category: ['Full Stack', 'Backend', 'API'],
    tech: ['React', 'Vite', 'TypeScript', 'Express.js', 'Prisma', 'PostgreSQL', 'JWT', 'bcrypt', 'Zod'],
    keyFeatures: ['Authentication', 'Categories', 'Products', 'Cart', 'Orders', 'Reviews', 'Admin management', 'API health endpoint', 'Backend validation'],
    github: 'https://github.com/MostafaGadallah',
    demo: null,
    problem: 'Many student projects stop at a simple storefront. This project focuses on production-oriented backend structure, validation, and role-aware workflows.',
    goals: ['Implement secure authentication and authorization', 'Create maintainable backend APIs for commerce workflows', 'Model core business logic for carts, orders, and reviews'],
    architecture: ['React frontend with Vite', 'Express.js backend', 'Prisma data layer', 'PostgreSQL database', 'JWT-based authentication'],
    userRoles: ['Customer', 'Admin'],
    workflows: ['Browse catalog', 'Manage cart and orders', 'Review products', 'Handle admin operations'],
    highlights: ['Backend validation using Zod', 'JWT auth flow', 'Production-minded architecture', 'Database-driven commerce logic'],
  },
  {
    slug: 'api-monitoring-platform',
    name: 'API Monitoring Platform',
    tag: 'Production backend monitoring',
    summary: 'API monitoring dashboard with server testing, database integration, Dockerized PostgreSQL, and live operational visibility.',
    description: 'An API monitoring platform for tracking service health, dashboards, and backend reliability workflows.',
    image: '/images/projects/project-placeholder-2.svg',
    category: ['Backend', 'API', 'Full Stack'],
    tech: ['React', 'Express.js', 'PostgreSQL', 'Prisma', 'Docker'],
    keyFeatures: ['Dashboard', 'Server tests', 'Database integration', 'Dockerized PostgreSQL', 'Health monitoring'],
    github: 'https://github.com/MostafaGadallah',
    demo: null,
    problem: 'Production APIs need better visibility into health, errors, and service behavior. This project emphasizes monitoring and operational awareness.',
    goals: ['Track backend health', 'Build a dashboard for visibility', 'Prepare a realistic monitoring workflow'],
    architecture: ['React dashboard', 'Express.js services', 'PostgreSQL persistence', 'Prisma ORM', 'Docker environment'],
    userRoles: ['Admin', 'Operations'],
    workflows: ['Review service health', 'Inspect monitoring data', 'Check backend readiness', 'Validate environment setup'],
    highlights: ['13 tests passed', 'Dashboard build passed', 'Docker PostgreSQL setup', 'Backend monitoring milestone'],
  },
  {
    slug: 'delivery-tracking-app',
    name: 'Delivery Tracking App',
    tag: 'Real-time logistics platform',
    summary: 'Real-time delivery tracking system with customer, driver, and admin flows, JWT auth, RBAC, and Socket.IO.',
    description: 'A distributed logistics platform built around tracking numbers, delivery state transitions, and real-time communication.',
    image: '/images/projects/project-placeholder-3.svg',
    category: ['Real-Time', 'Mobile', 'Backend'],
    tech: ['Node.js', 'Express.js', 'Prisma', 'PostgreSQL', 'JWT', 'Zod', 'Socket.IO', 'React Native', 'Expo'],
    keyFeatures: ['Customer role', 'Driver role', 'Admin role', 'JWT authentication', 'RBAC', 'Tracking numbers', 'Delivery lifecycle', 'Socket.IO communication'],
    github: 'https://github.com/MostafaGadallah',
    demo: null,
    problem: 'Delivery systems depend on reliable state transitions and fast coordination. This project models those workflows in a practical backend and mobile architecture.',
    goals: ['Model delivery state transitions', 'Support multi-role access', 'Deliver live communication between actors'],
    architecture: ['Node.js backend', 'Prisma + PostgreSQL', 'Socket.IO real-time layer', 'React Native client'],
    userRoles: ['Customer', 'Driver', 'Admin'],
    workflows: ['Track shipment status', 'Assign drivers', 'Manage delivery events', 'Monitor role-based actions'],
    highlights: ['Typecheck completed', 'Build verification completed', '10/10 tests passed'],
  },
  {
    slug: 'ai-resume-analyzer',
    name: 'AI Resume Analyzer',
    tag: 'AI-powered application',
    summary: 'Resume analysis platform that combines frontend app flow with AI-generated feedback and PostgreSQL-backed storage.',
    description: 'A full-stack AI project that focuses on applying generative AI to practical resume review workflows.',
    image: '/images/projects/project-placeholder-4.svg',
    category: ['AI', 'Full Stack', 'Backend'],
    tech: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'AI / Gemini API'],
    keyFeatures: ['Resume analysis', 'AI-generated feedback', 'Full-stack architecture', 'PostgreSQL integration'],
    github: 'https://github.com/MostafaGadallah/ai-resume-analyzer',
    demo: null,
    problem: 'Manual resume review is slow and inconsistent. This project explores how AI can support structured feedback in a real product workflow.',
    goals: ['Build a usable AI-assisted review flow', 'Integrate model outputs into an app workflow', 'Keep architecture production-oriented'],
    architecture: ['React interface', 'Express.js backend', 'PostgreSQL storage', 'Gemini API integration'],
    userRoles: ['User', 'System'],
    workflows: ['Upload resume', 'Receive AI feedback', 'Review recommendations'],
    highlights: ['Gemini-powered analysis', 'Full-stack architecture', 'AI application with practical workflow'],
  },
  {
    slug: 'internship-hub',
    name: 'Internship Hub',
    tag: 'Internship discovery platform',
    summary: 'A full-stack platform for discovering, reviewing, and managing internships with admin moderation and lifecycle tools.',
    description: 'A student-focused internship platform designed to gather internship reviews and support discovery workflows.',
    image: '/images/projects/project-placeholder-5.svg',
    category: ['Full Stack', 'Backend', 'React'],
    tech: ['React', 'Vite', 'Express.js', 'Prisma', 'MySQL'],
    keyFeatures: ['Public internship reviews', 'Admin authentication', 'Blacklisting', 'Reports', 'Categories', 'Skills', 'CRUD management', 'Administrative dashboard'],
    github: 'https://github.com/MostafaGadallah',
    demo: null,
    problem: 'Students need a useful place to discover and review internship opportunities without relying on scattered sources.',
    goals: ['Create an internship discovery platform', 'Support review and moderation workflows', 'Build admin tools for management'],
    architecture: ['React dashboard UI', 'Express.js APIs', 'Prisma + MySQL', 'Admin auth and moderation layer'],
    userRoles: ['Student', 'Admin'],
    workflows: ['Browse internships', 'Post reports and reviews', 'Moderate content', 'Manage categories and skills'],
    highlights: ['Review-driven community platform', 'Admin moderation workflows', 'Structured CRUD system'],
  },
]

const certifications = [
  { title: 'NTI – ITIDA', subtitle: 'Python Training', detail: '120 hours • Score: 94.5%', date: '12 July 2026 – 06 August 2026' },
  { title: 'CIB', subtitle: 'Generative AI Summer Internship', detail: 'July 2026', date: 'Professional AI learning' },
  { title: 'CIB', subtitle: 'Banking Ecosystem Training', detail: '10/10', date: 'CIB Day 1 Banking Ecosystem' },
  { title: 'DECI', subtitle: 'Level 2', detail: 'November 2023', date: 'Training participation' },
  { title: 'DECI', subtitle: 'Level 3 – Web Development', detail: 'October 2024', date: 'Web development training' },
  { title: 'Cisco Networking Academy', subtitle: 'Cybersecurity Essentials', detail: 'Training participation', date: 'Cybersecurity' },
  { title: 'Phronesis', subtitle: 'Generative AI Cohort 01', detail: 'AI cohort', date: 'Generative AI learning' },
  { title: 'CodeMZ', subtitle: 'Python & AI Agents', detail: 'AI agents learning', date: 'Technical training' },
  { title: 'Creativa', subtitle: 'Machine Learning', detail: 'ML fundamentals', date: 'Machine learning track' },
  { title: 'ITIDA / eYouth', subtitle: 'Freelancing', detail: 'Career training', date: 'Professional skills' },
  { title: 'Code Plus', subtitle: '.NET', detail: 'Programming training', date: 'Technical program' },
  { title: 'HumaVolve', subtitle: 'Backend PHP Laravel', detail: 'Backend training', date: 'Laravel learning' },
]

const volunteerActivities = [
  {
    org: 'Resala Charity Market',
    role: 'Volunteer & community support',
    description: 'Community service and support-oriented involvement with a focus on teamwork and responsibility.',
  },
  {
    org: 'Egyptian Red Crescent',
    role: 'Volunteer participation',
    description: 'Community engagement and service-oriented involvement in humanitarian activities.',
  },
  {
    org: '180 Daraga',
    role: 'Technical and logistics involvement',
    description: 'Support around technical coordination, logistics, team collaboration, and practical problem solving.',
  },
  {
    org: 'GDG / GDGoC Helwan',
    role: 'Community support and event participation',
    description: 'Developer community involvement through events, technical support, and community activities.',
  },
]

const achievements = [
  'NTI Python training score: 94.5%',
  'CIB Banking Ecosystem score: 10/10',
  'Helwan University GPA: 3.42/4.00',
  'Multiple technical training programs completed',
  'Production-oriented portfolio development',
  'Backend AI Engineering Internship',
  'Full-stack application development',
  'Real-time application development',
  'API and backend engineering projects',
]

const services = [
  'Backend Development',
  'REST API Development',
  'Full Stack Development',
  'Laravel / PHP Development',
  'Node.js / Express Development',
  'Database Development',
  'AI Integration',
  'Real-Time Applications',
]

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(3, 'Please add a subject.'),
  message: z.string().min(12, 'Please share a few more details.'),
})

type ContactFormValues = z.infer<typeof contactSchema>

function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const saved = window.localStorage.getItem('portfolio-theme') as ThemeMode | null
    if (saved === 'light' || saved === 'dark') {
      return saved
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="section-header">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const hasGithub = Boolean(project.github)
  const hasDemo = Boolean(project.demo)

  return (
    <article className="project-card">
      <div className="project-image-wrap">
        <img src={project.image} alt={`${project.name} preview`} className="project-image" />
      </div>
      <div className="project-content">
        <span className="project-tag">{project.tag}</span>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>

        <div className="project-tech-list">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <ul className="feature-bullets">
          {project.keyFeatures.slice(0, 3).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="card-actions">
          {hasGithub ? (
            <a href={project.github!} target="_blank" rel="noreferrer" className="btn btn-secondary">
              GitHub <ExternalLink size={15} />
            </a>
          ) : (
            <span className="inline-placeholder">GitHub coming soon</span>
          )}
          {hasDemo ? (
            <a href={project.demo!} target="_blank" rel="noreferrer" className="btn btn-primary">
              Live Demo <ArrowRight size={15} />
            </a>
          ) : (
            <Link to={`/projects/${project.slug}`} className="btn btn-primary">
              Case Study <ChevronRight size={15} />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="Mostafa Mahmoud home">
          <span className="brand-mark">MM</span>
          <span className="brand-text">Mostafa Mahmoud</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={`nav-panel ${isOpen ? 'is-open' : ''}`}>
          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <ThemeToggle />
            <a href="#projects" className="btn btn-primary nav-cta">
              View My Work
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = () => {
    setSubmitted(true)
    reset()
  }

  return (
    <div className="contact-box">
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
        <div className="field-row">
          <label>
            <span>Name</span>
            <input type="text" {...register('name')} placeholder="Your name" aria-invalid={Boolean(errors.name)} />
            {errors.name && <small>{errors.name.message}</small>}
          </label>
          <label>
            <span>Email</span>
            <input type="email" {...register('email')} placeholder="your@email.com" aria-invalid={Boolean(errors.email)} />
            {errors.email && <small>{errors.email.message}</small>}
          </label>
        </div>

        <label>
          <span>Subject</span>
          <input type="text" {...register('subject')} placeholder="Project inquiry" aria-invalid={Boolean(errors.subject)} />
          {errors.subject && <small>{errors.subject.message}</small>}
        </label>

        <label>
          <span>Message</span>
          <textarea {...register('message')} placeholder="Tell me about your project, internship, or opportunity..." aria-invalid={Boolean(errors.message)} />
          {errors.message && <small>{errors.message.message}</small>}
        </label>

        <button type="submit" className="btn btn-primary submit-btn">
          Send Message <ArrowRight size={15} />
        </button>
        {submitted && <p className="form-success">Thanks! This frontend form is ready for email integration with your preferred backend or email provider.</p>}
      </form>
    </div>
  )
}

function HomePage() {
  const [filter, setFilter] = useState('All')
  const projectFilters = ['All', 'Backend', 'Full Stack', 'Mobile', 'AI', 'APIs', 'Real-Time', 'Laravel', 'Node.js', 'React']

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category.includes(filter) || project.tech.includes(filter))

  return (
    <>
      <Navbar />

      <main>
        <section className="hero-section container" id="home">
          <div className="hero-copy">
            <span className="eyebrow">Computer Science Student | Backend Developer | Full Stack Developer</span>
            <h1>Mostafa Mahmoud</h1>
            <p className="hero-summary">
              Building production-oriented backend and full-stack applications with real-world business logic, APIs, databases, authentication, and modern technologies.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View My Projects <ArrowRight size={16} />
              </a>
              <a href="mailto:m.mahmoud10907@gmail.com?subject=CV%20Request" className="btn btn-secondary">
                Download CV
              </a>
              <a href="#contact" className="btn btn-ghost">
                Let&apos;s Talk
              </a>
            </div>

            <div className="social-row" aria-label="Social links">
              <a href="https://github.com/MostafaGadallah" target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <Globe size={18} />
              </a>
              <a href="https://www.linkedin.com/in/mostafa-gadallah/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                <Globe size={18} />
              </a>
              <a href="mailto:m.mahmoud10907@gmail.com" aria-label="Email Mostafa Mahmoud">
                <Mail size={18} />
              </a>
            </div>

            <div className="tech-indicators" aria-label="Technology stack overview">
              <span>Laravel</span>
              <span>Node.js</span>
              <span>Prisma</span>
              <span>PostgreSQL</span>
              <span>React</span>
            </div>
          </div>

          <div className="profile-panel" aria-label="Profile card">
            <div className="profile-avatar">
              <img src="/images/profile/profile.jpg" alt="Mostafa Mahmoud placeholder profile illustration" />
            </div>
            <div className="profile-meta">
              <span className="availability">Available for internship opportunities</span>
              <h3>Backend-focused software engineer in training</h3>
              <ul>
                <li>
                  <MapPin size={16} /> Cairo / Giza, Egypt
                </li>
                <li>
                  <Globe size={16} /> github.com/MostafaGadallah
                </li>
                <li>
                  <Mail size={16} /> m.mahmoud10907@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="about" className="section container">
          <SectionHeader
            eyebrow="About"
            title="Software engineering student with a backend-first mindset"
            description="Mostafa Mahmoud is a second-year Computer Science student at Helwan University, with a strong interest in software engineering, backend systems, APIs, database design, authentication, and real-world product logic."
          />

          <div className="about-grid">
            <div className="about-copy">
              <p>
                He enjoys solving backend problems, designing APIs, building authentication and authorization layers, and creating applications grounded in real business logic.
              </p>
              <p>
                Mostafa’s strongest interests include backend architecture, REST APIs, database design, authorization, business logic, AI integration, real-time systems, and problem solving. He prefers engineering challenges that involve reliability, maintainability, and production-minded implementation.
              </p>
              <p>
                He chose Laravel because of his familiarity with PHP and because it provides a strong ecosystem for building structured backend applications, APIs, Blade and Livewire experiences, and integrations with modern frontend technologies. He is also expanding his experience with Node.js and Express.js for backend services.
              </p>
            </div>

            <aside className="info-panel">
              <h3>Profile Information</h3>
              <dl>
                <div>
                  <dt>Name</dt>
                  <dd>Mostafa Mahmoud</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>Computer Science Student / Backend Developer / Full Stack Developer</dd>
                </div>
                <div>
                  <dt>University</dt>
                  <dd>Helwan University</dd>
                </div>
                <div>
                  <dt>Faculty</dt>
                  <dd>Computers and Artificial Intelligence</dd>
                </div>
                <div>
                  <dt>Academic Level</dt>
                  <dd>2nd Year</dd>
                </div>
                <div>
                  <dt>Expected Graduation</dt>
                  <dd>2029</dd>
                </div>
                <div>
                  <dt>GPA</dt>
                  <dd>3.42 / 4.00</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>Cairo / Giza, Egypt</dd>
                </div>
                <div>
                  <dt>Primary Track</dt>
                  <dd>Software Engineering / Backend Development</dd>
                </div>
                <div>
                  <dt>Additional Areas</dt>
                  <dd>Data Analysis / AI / Python</dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>Arabic / English</dd>
                </div>
                <div>
                  <dt>English Level</dt>
                  <dd>B1</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd><a href="mailto:m.mahmoud10907@gmail.com">m.mahmoud10907@gmail.com</a></dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd><a href="tel:+201024355185">+201024355185</a></dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section id="skills" className="section container">
          <SectionHeader
            eyebrow="Skills"
            title="Technical strengths across backend, full-stack, data, and AI"
            description="The focus stays on software engineering and backend development, with additional experience in data analysis, Python, Power BI, and AI-powered application design."
          />

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-card">
                <h3>{group.title}</h3>
                <div className="badge-wrap">
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="soft-skills-block">
            <h3>Soft Skills</h3>
            <div className="badge-wrap">
              {softSkills.map((skill) => (
                <span key={skill} className="skill-badge alt-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section container">
          <SectionHeader
            eyebrow="Experience"
            title="Practical development experience and technical training"
            description="Mostafa’s experience spans backend work, AI engineering, and data-focused training, while staying centered on software engineering and backend development."
          />

          <div className="timeline">
            {experience.map((item) => (
              <article key={`${item.company}-${item.role}`} className="timeline-item">
                <div className="timeline-dot" aria-hidden="true" />
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3>{item.company}</h3>
                      <p>{item.role}</p>
                    </div>
                    <span>{item.period}</span>
                  </div>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section container">
          <SectionHeader
            eyebrow="Education"
            title="Helwan University — Computer Science"
            description="Academic work grounded in problem solving, programming, databases, algorithms, software engineering, and modern web technologies."
          />

          <div className="education-card">
            <div className="education-header">
              <div>
                <span className="eyebrow">Bachelor of Computer Science</span>
                <h3>{education[0].institution}</h3>
              </div>
              <div className="education-badges">
                <span>{education[0].level}</span>
                <span>{education[0].gpa}</span>
              </div>
            </div>
            <div className="education-details">
              <div>
                <Building2 size={18} /> <span>Faculty: {education[0].faculty}</span>
              </div>
              <div>
                <CalendarIcon /> <span>Period: {education[0].period}</span>
              </div>
              <div>
                <MapPin size={18} /> <span>Location: {education[0].location}</span>
              </div>
            </div>
            <div className="badge-wrap">
              {education[0].areas.map((item) => (
                <span key={item} className="skill-badge">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section container">
          <SectionHeader
            eyebrow="Projects"
            title="Strong portfolio projects built around backend logic and product thinking"
            description="Each project focuses on production-minded architecture, database design, authentication, validation, real-time behavior, or AI application workflows."
          />

          <div className="filter-row" aria-label="Project filters">
            {projectFilters.map((filterName) => (
              <button
                key={filterName}
                type="button"
                className={filter === filterName ? 'filter-chip active' : 'filter-chip'}
                onClick={() => setFilter(filterName)}
              >
                {filterName}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="section container">
          <SectionHeader
            eyebrow="Services"
            title="Backend and full-stack services aligned with real product work"
            description="Mostafa focuses on practical software engineering work across backend systems, API design, databases, and AI-enabled product experiences."
          />

          <div className="service-grid">
            {services.map((service) => (
              <article key={service} className="service-card">
                <CheckCircle2 size={18} />
                <span>{service}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section container">
          <SectionHeader
            eyebrow="Certifications & Training"
            title="Technical growth through hands-on learning and industry-oriented programs"
            description="The training record reflects a combination of backend, data, AI, programming, and professional development work."
          />

          <div className="cert-grid">
            {certifications.map((cert) => (
              <article key={`${cert.title}-${cert.subtitle}`} className="cert-card">
                <div className="cert-mark">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3>{cert.title}</h3>
                  <p className="cert-subtitle">{cert.subtitle}</p>
                  <p>{cert.detail}</p>
                  <span>{cert.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="volunteering" className="section container">
          <SectionHeader
            eyebrow="Volunteering & Leadership"
            title="Community involvement and team-oriented responsibility"
            description="Mostafa’s community work reflects technical support, logistics coordination, leadership development, and a willingness to contribute beyond individual coding work."
          />

          <div className="vol-grid">
            {volunteerActivities.map((item) => (
              <article key={item.org} className="vol-card">
                <HeartHandshake size={20} />
                <h3>{item.org}</h3>
                <p className="vol-role">{item.role}</p>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section container">
          <SectionHeader
            eyebrow="Achievements"
            title="Verified milestones and technical momentum"
            description="These accomplishments reflect consistent learning, strong performance, and practical software engineering progress."
          />

          <div className="achievement-grid">
            {achievements.map((item) => (
              <div key={item} className="achievement-item">
                <Sparkles size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section container contact-section">
          <SectionHeader
            eyebrow="Contact"
            title="Let’s build something useful"
            description="Whether it’s an internship opportunity, a backend role, a full-stack project, or a technical conversation, Mostafa is open to discussing opportunities."
          />

          <div className="contact-layout">
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={18} />
                <div>
                  <span>Email</span>
                  <a href="mailto:m.mahmoud10907@gmail.com">m.mahmoud10907@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <div>
                  <span>Phone</span>
                  <a href="tel:+201024355185">+201024355185</a>
                </div>
              </div>
              <div className="contact-item">
                <Globe size={18} />
                <div>
                  <span>GitHub</span>
                  <a href="https://github.com/MostafaGadallah" target="_blank" rel="noreferrer">github.com/MostafaGadallah</a>
                </div>
              </div>
              <div className="contact-item">
                <BriefcaseBusiness size={18} />
                <div>
                  <span>LinkedIn</span>
                  <a href="https://www.linkedin.com/in/mostafa-gadallah/" target="_blank" rel="noreferrer">linkedin.com/in/mostafa-gadallah</a>
                </div>
              </div>
              <div className="contact-item">
                <BriefcaseBusiness size={18} />
                <div>
                  <span>Portfolio</span>
                  <a href="https://mostafa-gadallah.lovable.app" target="_blank" rel="noreferrer">mostafa-gadallah.lovable.app</a>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h3>Mostafa Mahmoud</h3>
            <p>Computer Science Student | Backend Developer | Full Stack Developer</p>
            <p className="footer-copy">Focused on backend systems, production-ready APIs, data-driven products, and practical software engineering.</p>
          </div>

          <div>
            <h4>Navigation</h4>
            <div className="footer-links">
              {navItems.map((item) => (
                <a key={item.label} href={item.href}>{item.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4>Connect</h4>
            <div className="footer-links">
              <a href="https://github.com/MostafaGadallah" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/mostafa-gadallah/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:m.mahmoud10907@gmail.com">Email</a>
              <a href="tel:+201024355185">Phone</a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Mostafa Mahmoud. All rights reserved.</span>
          <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top
          </button>
        </div>
      </footer>
    </>
  )
}

function ProjectDetailsPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (!project) {
    return (
      <div className="page-shell container not-found">
        <h1>Project not found</h1>
        <Link to="/" className="btn btn-primary">
          Return home
        </Link>
      </div>
    )
  }

  return (
    <div className="page-shell">
      <Navbar />
      <main className="project-detail container">
        <div className="detail-hero">
          <div>
            <span className="eyebrow">Project case study</span>
            <h1>{project.name}</h1>
            <p>{project.summary}</p>
            <div className="project-tech-list detail-tech">
              {project.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="card-actions detail-actions">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  GitHub <ExternalLink size={15} />
                </a>
              )}
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Live Demo <ArrowRight size={15} />
                </a>
              ) : (
                <span className="inline-placeholder">Demo coming soon</span>
              )}
            </div>
          </div>
          <img src={project.image} alt={`${project.name} project visual`} />
        </div>

        <section className="detail-section">
          <h2>Overview</h2>
          <p>{project.description}</p>
        </section>

        <section className="detail-section two-col">
          <div>
            <h3>Problem</h3>
            <p>{project.problem}</p>
          </div>
          <div>
            <h3>Goals</h3>
            <ul>
              {project.goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="detail-section two-col">
          <div>
            <h3>Architecture</h3>
            <ul>
              {project.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>User roles</h3>
            <ul>
              {project.userRoles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="detail-section">
          <h3>Core workflows</h3>
          <ul>
            {project.workflows.map((workflow) => (
              <li key={workflow}>{workflow}</li>
            ))}
          </ul>
        </section>

        <section className="detail-section">
          <h3>Key highlights</h3>
          <div className="achievement-grid">
            {project.highlights.map((highlight) => (
              <div key={highlight} className="achievement-item">
                <CheckCircle2 size={16} />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="detail-nav">
          <Link to="/" className="btn btn-secondary">
            <ChevronRight size={15} className="chevron-back" /> Back to portfolio
          </Link>
          <Link to="/#projects" className="btn btn-primary">
            Explore more projects
          </Link>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function CalendarIcon() {
  return (
    <span className="calendar-icon" aria-hidden="true">
      <span className="calendar-top" />
      <span className="calendar-line" />
    </span>
  )
}

export default App
