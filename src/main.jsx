import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDownRight, ArrowUpRight, Asterisk, Blocks, Command, Dribbble,
  Figma, Github, Layers3, Menu, MousePointer2, Sparkles, X, Zap, Eye,
  CircleDot, Orbit
} from 'lucide-react'
import './styles.css'

// EDIT PROJECT CONTENT HERE: titles, descriptions, tags, outcomes, and steps.
const projects = [
  {
    id: '01', name: 'GreenPlan', type: 'MOBILE APP / UX CASE STUDY',
    tagline: 'Make greener choices feel effortless.',
    desc: 'A sustainability-focused experience that turns everyday eco-actions into approachable habits. Add your user problem, research, and the design decisions you made.',
    tags: ['UX strategy', 'Mobile UI', 'Prototyping'], color: 'mint', glyph: '✳', year: '2026',
    outcome: 'Designed around clarity, small wins, and a low-friction daily loop.',
    screens: ['Discover', 'Take action', 'Track impact'],
  },
  {
    id: '02', name: 'RP-Helper', type: 'PRODUCT CONCEPT / INTERACTION DESIGN',
    tagline: 'Less friction. More flow.',
    desc: 'A utility concept built to make common tasks easier to understand and quicker to complete, with a focus on hierarchy, feedback, and predictable interactions.',
    tags: ['Interaction design', 'Design system', 'Usability'], color: 'violet', glyph: '◈', year: '2026',
    outcome: 'A clear interface model with task-focused flows and responsive feedback.',
    screens: ['Overview', 'Task flow', 'Confirmation'],
  },
  {
    id: '03', name: 'Interface Lab', type: 'CREATIVE CODING / EXPERIMENT',
    tagline: 'Small interactions, big personality.',
    desc: 'A collection of interface experiments exploring motion, hover states, playful feedback, and the relationship between visual language and usability.',
    tags: ['Micro-interactions', 'Motion', 'CSS'], color: 'orange', glyph: '⌁', year: 'ONGOING',
    outcome: 'A reusable playground for testing ideas before they become product patterns.',
    screens: ['Motion', 'Feedback', 'Play'],
  },
]

// Replace with your real email and profile links.
const CONTACT_EMAIL = 'your.email@example.com'
const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'Figma', href: 'https://www.figma.com/' },
  { label: 'Dribbble', href: 'https://dribbble.com/' },
]

function Header({ time, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = (section) => { setMenuOpen(false); onNavigate(section) }
  return (
    <header className="topbar">
      <a className="wordmark" href="#top" aria-label="Wei Han home">
        <span className="brand-mark">W<span>✳</span></span>
        <span>WEI HAN<small>DESIGNER / THINKER / MAKER</small></span>
      </a>
      <div className="system-status"><span className="status-dot" /> OPEN TO OPPORTUNITIES <span className="status-divider">/</span> {time}</div>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        <button onClick={() => navigate('work')}>WORK <span>01</span></button>
        <button onClick={() => navigate('approach')}>PROCESS <span>02</span></button>
        <button onClick={() => navigate('about')}>ABOUT <span>03</span></button>
        <button className="nav-contact" onClick={() => navigate('contact')}>LET'S TALK <ArrowUpRight size={14}/></button>
      </nav>
      <button className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>
  )
}

function Hero({ onNavigate }) {
  const [playMode, setPlayMode] = useState(false)
  useEffect(() => {
    document.body.classList.toggle('play-mode', playMode)
    return () => document.body.classList.remove('play-mode')
  }, [playMode])
  return (
    <section className="hero section-wrap" id="top">
      <div className="hero-topline"><span><span className="tiny-cross">✳</span> INDEPENDENT UI/UX DESIGNER</span><span className="mono">SINGAPORE · {new Date().getFullYear()}</span></div>
      <div className="hero-layout">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> GOOD DESIGN SHOULD <em>FEEL</em> LIKE SOMETHING.</div>
          <h1>I MAKE<br/><span className="outline-text">DIGITAL</span><br/><span className="accent-text">FEEL ALIVE<span className="period">.</span></span></h1>
          <p className="hero-description">I’m Wei Han — a UI/UX designer shaping useful, expressive digital experiences. I turn messy problems into interfaces people can <i>understand, enjoy, and remember.</i></p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => onNavigate('work')}>EXPLORE SELECTED WORK <ArrowDownRight size={17}/></button>
            <button className="text-button" onClick={() => setPlayMode(!playMode)}><Sparkles size={16}/>{playMode ? 'TURN OFF PLAY MODE' : 'ACTIVATE PLAY MODE'}</button>
          </div>
          <div className="hero-footnote"><span className="scroll-indicator"><span/></span> SCROLL TO EXPLORE <span className="mono">[ NO BORING STUFF ]</span></div>
        </div>
        <div className="hero-art" aria-label="Abstract interface artwork">
          <div className="art-label label-top"><span>FIG. 001</span><span>FORM / FUNCTION</span></div>
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
          <div className="planet planet-main"><div className="planet-shine"/><div className="planet-grid"/></div>
          <div className="planet planet-small"><span>W*</span></div>
          <div className="art-cross cross-a">+</div><div className="art-cross cross-b">✳</div>
          <div className="art-sticker">DESIGN<br/>WITH<br/><b>INTENT.</b></div>
          <div className="art-coordinates mono">01° / UX<br/>02° / UI<br/>03° / FEELING</div>
          <div className="art-label label-bottom"><span>INTERFACE STUDY</span><span className="live-label"><span className="pulse-dot"/> LIVE / 001</span></div>
          <div className="cursor-hint"><MousePointer2 size={15}/> MOVE YOUR CURSOR</div>
        </div>
      </div>
      <div className="ticker"><div className="ticker-track">{Array.from({length:4}).map((_,i)=><span key={i}>THOUGHTFUL BY DESIGN <Asterisk size={18}/> BUILT FOR HUMANS <Asterisk size={18}/> CURIOUS BY DEFAULT <Asterisk size={18}/></span>)}</div></div>
    </section>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <button className={`project-card ${project.color}`} onClick={() => onOpen(project)} aria-label={`Open ${project.name} case study`}>
      <div className="project-visual">
        <div className="project-top"><span>PROJECT_{project.id}</span><span>{project.year}</span></div>
        {project.id === '01' && <div className="greenplan-art"><div className="gp-sun">✳</div><div className="gp-phone"><div className="phone-notch"/><span className="phone-kicker">YOUR DAILY IMPACT</span><strong>Small steps.<br/>Real change.</strong><div className="leaf-orb">✳</div><div className="phone-progress"><span/></div><small>WEEKLY PROGRESS <b>72%</b></small></div><div className="gp-caption">GROW A BETTER<br/>EVERYDAY <ArrowUpRight size={16}/></div></div>}
        {project.id === '02' && <div className="helper-art"><div className="helper-window"><div className="window-head"><i/><i/><i/><span>RP / HELPER</span></div><div className="helper-sidebar"><b>✳</b><span/><span/><span/><span/></div><div className="helper-content"><small>YOUR WORKSPACE</small><strong>What can we<br/>make easier?</strong><div className="helper-task"><span>01</span><b>Quick actions</b><ArrowUpRight size={14}/></div><div className="helper-task"><span>02</span><b>Recent activity</b><ArrowUpRight size={14}/></div></div></div><div className="helper-orb">◈</div><div className="helper-stamp">LESS FRICTION<br/>MORE FLOW</div></div>}
        {project.id === '03' && <div className="lab-art"><div className="lab-ring ring-a"/><div className="lab-ring ring-b"/><div className="lab-shape">✳</div><div className="lab-label">HOVER / FEEDBACK / MOTION</div><div className="lab-cursor"><MousePointer2 size={25}/><span>TRY ME</span></div><div className="lab-number">EX—003</div></div>}
        <div className="project-open"><ArrowUpRight size={20}/></div>
      </div>
      <div className="project-info"><div><span className="project-type">{project.type}</span><h3>{project.name}</h3><p>{project.tagline}</p></div><span className="project-index">{project.id}</span></div>
      <div className="project-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
    </button>
  )
}

function Projects({ onOpen }) {
  return (
    <section className="work-section section-wrap" id="work">
      <div className="section-heading"><div><div className="section-index">01 / SELECTED WORK</div><h2>Proof of <span className="accent-text">curiosity.</span></h2></div><p>Not just pretty screens. Each project starts with a question, moves through a process, and ends with a more considered experience.</p></div>
      <div className="project-grid">{projects.map(project=><ProjectCard key={project.id} project={project} onOpen={onOpen}/>)}</div>
      <div className="work-bottom"><span className="mono">03 PROJECTS / 03 DIFFERENT QUESTIONS</span><span>MORE EXPERIMENTS LOADING <span className="loading-bars"><i/><i/><i/></span></span></div>
    </section>
  )
}

function Process() {
  const steps = [
    {number:'01',icon:<Eye size={23}/>,title:'OBSERVE',desc:'Understand the person, the context, and the real problem before jumping into screens.',label:'RESEARCH / DISCOVERY'},
    {number:'02',icon:<Blocks size={23}/>,title:'STRUCTURE',desc:'Build a clear information hierarchy and flows that make the next step feel natural.',label:'IA / WIREFRAMES'},
    {number:'03',icon:<Orbit size={23}/>,title:'MAKE IT FEEL',desc:'Use visual systems, interaction, and motion to guide attention and create feedback.',label:'UI / PROTOTYPING'},
    {number:'04',icon:<Zap size={23}/>,title:'REFINE',desc:'Test assumptions, notice friction, and iterate until the experience feels right.',label:'TEST / ITERATE'},
  ]
  return <section className="approach-section" id="approach"><div className="section-wrap approach-inner">
    <div className="section-index">02 / HOW I THINK</div>
    <div className="approach-title"><h2>Good UX is<br/>a <span className="scribble">feeling.</span><br/>Backed by a <span className="accent-text">reason.</span></h2><p>I care about the tiny details that make an interface feel obvious, the systems that keep it consistent, and the moments that make it memorable.</p></div>
    <div className="process-grid">{steps.map(step=><article className="process-item" key={step.number}><div className="process-number">{step.number}</div><div className="process-icon">{step.icon}</div><h3>{step.title}</h3><p>{step.desc}</p><span>{step.label}</span></article>)}</div>
  </div></section>
}

function About() {
  const skills = [
    {label:'FIGMA',icon:<Figma size={15}/>},{label:'PROTOTYPING',icon:<Layers3 size={15}/>},
    {label:'DESIGN SYSTEMS',icon:<Command size={15}/>},{label:'WIREFRAMING',icon:<Blocks size={15}/>},
    {label:'USABILITY',icon:<CircleDot size={15}/>},{label:'INTERACTION',icon:<Zap size={15}/>}
  ]
  return <section className="about-section section-wrap" id="about">
    <div className="section-index">03 / A LITTLE ABOUT ME</div>
    <div className="about-layout"><div className="about-big"><span className="about-star">✳</span><h2>Curious<br/>by <span className="accent-text">nature.</span><br/>Intentional<br/>by <span className="outline-text">design.</span></h2></div>
      <div className="about-copy"><div className="about-card"><span className="mono">A NOTE FROM THE DESIGNER ↘</span><p>I’m interested in the space between how something looks and how it works. I like exploring visual ideas, asking why a flow feels confusing, and turning those discoveries into interfaces with personality.</p><p>My goal is simple: make digital products feel a little more human.</p></div>
        <div className="skill-block"><span className="mono">CURRENT TOOLKIT</span><div className="skill-list">{skills.map(skill=><span key={skill.label}>{skill.icon} {skill.label}</span>)}</div></div>
        <div className="about-note"><span className="note-star">✳</span><span>ALWAYS LEARNING.<br/>ALWAYS MAKING.</span></div>
      </div>
    </div>
  </section>
}

function Contact({ year }) {
  const [copied,setCopied] = useState(false)
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(CONTACT_EMAIL); setCopied(true); window.setTimeout(()=>setCopied(false),1800) }
    catch { window.location.href = `mailto:${CONTACT_EMAIL}` }
  }
  return <section className="contact-section" id="contact"><div className="section-wrap contact-inner">
    <div className="contact-top"><span className="section-index">04 / YOUR TURN</span><span className="mono">HAVE A GOOD ONE IN MIND?</span></div>
    <h2>Let's make<br/><span className="outline-text">something</span><br/><span className="accent-text">matter.</span></h2>
    <div className="contact-bottom"><p>Have a project, an opportunity, or a weird idea worth exploring? My inbox is open.</p><button className="contact-button" onClick={copyEmail}>{copied?'EMAIL COPIED ✓':'COPY MY EMAIL'} {copied?<CircleDot size={17}/>:<ArrowUpRight size={18}/>}</button></div>
    <div className="footer-line"><a href="#top" className="footer-logo">W<span>✳</span> / WEI HAN</a><span>DESIGNED WITH INTENT, BUILT WITH CURIOSITY.</span><div className="socials">{SOCIAL_LINKS.map(link=><a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>{link.label==='GitHub'?<Github size={17}/>:link.label==='Figma'?<Figma size={17}/>:<Dribbble size={17}/>}</a>)}</div><span className="mono">© {year}</span></div>
  </div></section>
}

function ProjectModal({project,onClose}) {
  useEffect(()=>{
    if(!project)return
    const onKeyDown=event=>{if(event.key==='Escape')onClose()}
    document.addEventListener('keydown',onKeyDown)
    document.body.style.overflow='hidden'
    return ()=>{document.removeEventListener('keydown',onKeyDown);document.body.style.overflow=''}
  },[project,onClose])
  if(!project)return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}>
    <section className={`project-modal ${project.color}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="modal-close" onClick={onClose} aria-label="Close case study"><X/></button>
      <div className="modal-kicker">CASE STUDY / {project.id} / {project.type}</div>
      <div className="modal-hero"><span className="modal-glyph">{project.glyph}</span><div><h2 id="modal-title">{project.name}</h2><p>{project.tagline}</p></div></div>
      <div className="modal-content">
        <div><span className="mono">THE CHALLENGE</span><p>{project.desc}</p></div>
        <div><span className="mono">DESIGN INTENT</span><p>{project.outcome}</p></div>
        <div className="modal-wide"><span className="mono">EXPERIENCE BREAKDOWN</span><div className="modal-steps">{project.screens.map((screen,i)=><div key={screen}><span>0{i+1}</span><b>{screen}</b><ArrowUpRight size={15}/></div>)}</div></div>
        <div className="modal-wide"><span className="mono">FOCUS AREAS</span><div className="modal-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div>
        <p className="modal-disclaimer">Portfolio concept preview. Replace this overview with your final research, process artifacts, prototypes, and verified project outcomes.</p>
      </div>
    </section>
  </div>
}

function App() {
  const [activeProject,setActiveProject] = useState(null)
  const [time,setTime] = useState(()=>new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:false}))
  const year = new Date().getFullYear()
  useEffect(()=>{
    const timer=window.setInterval(()=>setTime(new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:false})),30000)
    return ()=>window.clearInterval(timer)
  },[])
  const navigate=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
  return <div className="site-shell">
    <div className="grain" aria-hidden="true"/>
    <Header time={time} onNavigate={navigate}/>
    <main><Hero onNavigate={navigate}/><Projects onOpen={setActiveProject}/><Process/><About/><Contact year={year}/></main>
    <div className="corner-index">WH—001 <span/> INTERFACE EXPLORER</div>
    <ProjectModal project={activeProject} onClose={()=>setActiveProject(null)}/>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>)
