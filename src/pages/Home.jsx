import { Link } from 'react-router-dom'

const stats = [
  { value: '500+', label: 'Career Paths Mapped' },
  { value: '50+', label: 'Expert Counselors' },
  { value: '10,000+', label: 'Students Guided' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const features = [
  { icon: '🗺️', title: 'Explore 500+ Careers', desc: 'Discover careers by domain, salary, growth, and B.Tech path — with detailed roadmaps.', link: '/careers' },
  { icon: '👨‍💼', title: 'Expert Counselors', desc: 'Free 1-on-1 sessions with industry veterans. View profiles, ratings, and resumes.', link: '/counselors' },
  { icon: '📅', title: 'Book Free Sessions', desc: 'Schedule career counseling with a 3-step booking system. 100% free.', link: '/schedule' },
  { icon: '📝', title: 'Career Assessments', desc: 'Auto-graded quizzes for each career path to test your readiness.', link: '/careers' },
  { icon: '🎓', title: 'B.Tech Pathways', desc: 'Specialized guidance for CSE, ECE, Mech, Civil, and all engineering branches.', link: '/careers' },
  { icon: '📊', title: 'Personal Dashboard', desc: 'Track sessions, view career matches, and access curated learning resources.', link: '/dashboard' },
]

const testimonials = [
  { name: 'Priya K.', branch: 'CSE Final Year', text: 'CareerForge helped me land my dream role at Infosys. The mock interview prep was excellent!', rating: 5 },
  { name: 'Rahul M.', branch: 'ECE 3rd Year', text: 'Dr. Kavitha\'s session completely changed my perspective on career planning. Highly recommend!', rating: 5 },
  { name: 'Sneha P.', branch: 'MBA Aspirant', text: 'The counselors here actually care. Prof. Rajesh gave me a clear MBA roadmap for free!', rating: 5 },
]

export default function Home() {
  return (
    <div style={{ paddingTop: '70px', position: 'relative', overflowX: 'hidden' }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ── HERO ── */}
      <section style={s.heroStatsWrapper}>
     <section style={s.hero}>

  {/* Background Image */}
  <img
    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    alt=""
    style={s.bgImage}
  />

  {/* Overlay */}
  <div style={s.overlay} />

  {/* GLASS CARD */}
  <div style={s.glassCard}>

    <div style={s.badge}>
      <span style={s.badgeDot} />
      <span style={{ color: 'var(--purple-light)', fontWeight: 700, fontSize: '0.82rem' }}>
        100% Free Career Counseling Platform
      </span>
    </div>

    <h1 style={s.heroTitle}>
      Shape Your Future<br />
      <span style={s.heroAccent}>with Expert Guidance</span>
    </h1>

    <p style={s.heroSub}>
      Discover the right career path, connect with expert counselors, and get personalized guidance — all for free. Trusted by 10,000+ students across India.
    </p>

    <div style={s.heroCta}>
      <Link to="/signup" className="btn-primary" style={{ fontSize: '1rem', padding: '16px 36px' }}>
        Get Started Free →
      </Link>
      <Link to="/careers" className="btn-outline" style={{ fontSize: '1rem', padding: '15px 32px' }}>
        Explore Careers
      </Link>
    </div>

    <div style={s.heroTrust}>
      <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
        Trusted by students from
      </span>
      {['IIT', 'NIT', 'JNTU', 'VIT', 'SRM'].map(inst => (
        <span key={inst} style={s.instBadge}>{inst}</span>
      ))}
    </div>

  </div>
</section>

      {/* ── STATS ── */}
      <section style={s.statsSection}>
        <div className="container">
          
          <div style={s.statsGrid}>
           
            {stats.map((stat, i) => (
              <div
  key={i}
  style={s.statCard}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow = "0 20px 60px rgba(59,130,246,0.5)";
    e.currentTarget.style.border = "1px solid rgba(59,130,246,0.6)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.6)";
    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
  }}
>
 <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle at top left, rgba(59,130,246,0.25), transparent)',
      opacity: 0.6
    }} />

                <div style={s.statLine}></div>
                <div style={{
  fontSize: '1.8rem',
  fontWeight: '800',
  background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}}>
  {stat.value}
</div>

<div style={{
  fontSize: '0.85rem',
  color: 'var(--muted)',
  marginTop: '6px'
}}>
  {stat.label}
</div>
              </div>
            ))}
          </div>
        </div>
      </section>
</section>
      {/* ── FEATURES ── */}
      <section style={s.section}>
        <div className="container">
          <p style={s.eyebrow}>EVERYTHING YOU NEED</p>
          <h2 className="section-title">Why Students Choose CareerForge</h2>
          <p className="section-subtitle">A complete platform built for students — from career discovery to counselor booking, all in one place.</p>
          <div className="grid-3">
            {features.map((f, i) => (
              <Link to={f.link} key={i} style={{ textDecoration: 'none' }}>
                <div className="card fade-up" style={{ cursor: 'pointer', animationDelay: `${i * 0.08}s` }}>
                  <div style={{ fontSize: '2.4rem', marginBottom: '16px' }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: 'var(--white)' }}>{f.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.65' }}>{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ ...s.section, background: 'rgba(13,25,48,0.5)' }}>
        <div className="container">
          <p style={s.eyebrow}>SIMPLE PROCESS</p>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get career clarity in 3 simple steps — no fees, no commitment.</p>
          <div style={s.steps}>
            {[
              { num: '01', title: 'Create Your Account', desc: 'Sign up for free. No credit card needed. Set up your profile in under 2 minutes.' },
              { num: '02', title: 'Explore & Assess', desc: 'Browse 500+ career paths, take quizzes, and find your best-fit options.' },
              { num: '03', title: 'Book a Free Session', desc: 'Schedule a 1-on-1 with an expert counselor and get your personalized roadmap.' },
            ].map((step, i) => (
              <div
  key={i}
  style={s.stepCard}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.border = "1px solid rgba(124,58,237,0.6)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
  }}
>
                <div style={s.stepNum}>{step.num}</div>
                
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.65' }}>{step.desc}</p>
                {i < 2 && <div style={s.stepArrow}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={s.section}>
        <div className="container">
          <p style={s.eyebrow}>STUDENT STORIES</p>
          <h2 className="section-title">What Students Say</h2>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="card">
                <div style={{ marginBottom: '12px' }}>
                  {[1,2,3,4,5].map(star => (
                    <span key={star} style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span>
                  ))}
                </div>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7', marginBottom: '16px', fontSize: '0.92rem' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={s.testAvatar}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{t.branch}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.ctaSection}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '16px' }}>
            Ready to Find Your Path?
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
            Join 10,000+ students who have already discovered their ideal career with CareerForge.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" className="btn-primary" style={{ fontSize: '1rem', padding: '16px 36px' }}>
              Start for Free →
            </Link>
            <Link to="/counselors" className="btn-outline" style={{ fontSize: '1rem', padding: '15px 32px' }}>
              Meet Our Counselors
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const s = {
  hero: {
  height: '100vh',              // ✅ full screen
  display: 'flex',
  alignItems: 'center',         // ✅ vertical center
  justifyContent: 'center',     // ✅ horizontal center
  position: 'relative',
  overflow: 'hidden',
  padding: '0 16px'             // ✅ mobile safe
},
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(29,78,216,0.1)', border: '1px solid rgba(29,78,216,0.3)',
    borderRadius: '50px', padding: '7px 18px', marginBottom: '28px',
  },
  badgeDot: {
    width: '8px', height: '8px', borderRadius: '50%',
    background: 'var(--purple-light)', display: 'inline-block',
    boxShadow: '0 0 8px var(--purple-light)', animation: 'glow 2s ease-in-out infinite',
  },
  heroTitle: {
  fontFamily: 'Syne, sans-serif',
  fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', // ↓ reduced
  fontWeight: '800',
  lineHeight: '1.15',
  marginBottom: '18px', // ↓ tighter
  color: 'var(--white)',
},
  heroAccent: {
    background: 'linear-gradient(135deg, var(--purple-light), var(--cyan))',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSub: {
  color: 'var(--muted)',
  fontSize: '1.05rem', // ↓ reduced
  lineHeight: '1.7',
  maxWidth: '520px',
  margin: '0 auto 26px', // 🔥 center align feel
},
heroCta: {
  display: 'flex',
  gap: '14px',
  flexWrap: 'wrap',
  marginBottom: '36px',
  justifyContent: 'center',   // ✅ center horizontally
  alignItems: 'center'        // ✅ center vertically
},
  heroTrust: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' },
  instBadge: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px', padding: '4px 12px', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: '600',
  },
  statsSection: {
  marginTop: '80px',
  padding: '60px 0 80px',
  background: 'transparent',

  // dark premium gradient

  position: 'relative',
  zIndex: 3,
},

statsGrid: {
   display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  justifyContent: 'center',
  gap: '22px',
  flexWrap: 'wrap',
},

statCard: {
  position: 'relative',
  padding: '26px 28px',
  minWidth: '190px',
  borderRadius: '16px',

  background: 'linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9))',
  backdropFilter: 'blur(10px)',

  border: '1px solid rgba(255,255,255,0.06)',
  boxShadow: '0 15px 40px rgba(0,0,0,0.7)',

  textAlign: 'center',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
},
statLine: {
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  width: '3px',
  background: 'linear-gradient(to bottom, #7c3aed, #3b82f6)',
  borderRadius: '2px',
  opacity: 0.8,
},
  section: { padding: '100px 0' },
  eyebrow: {
    fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.18em',
    color: 'var(--purple-light)', textTransform: 'uppercase', marginBottom: '12px',
  },
  steps: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '30px',
},stepTopLine: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '3px',
  background: 'linear-gradient(to right, #7c3aed, #3b82f6)',
  borderRadius: '3px',
},
  stepCard: {
  position: 'relative',
  padding: '28px',
  borderRadius: '16px',

  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(10px)',

  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',

  transition: 'all 0.3s ease',
},
  stepNum: {
  fontSize: '2.6rem',
  fontWeight: '800',
  color: '#3b82f6',
  marginBottom: '12px',
},
  stepArrow: {
    position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
    fontSize: '1.5rem', color: 'var(--purple-light)', zIndex: 2,
    display: 'none',
  },
  testAvatar: {
    width: '40px', height: '40px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #1d4ed8, #60a5fa)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: '700', fontSize: '0.9rem', flexShrink: 0,
  },
  ctaSection: {
    padding: '100px 0',
    background: 'linear-gradient(180deg, transparent, rgba(29,78,216,0.07), transparent)',
    borderTop: '1px solid var(--border-light)',
  },
  bgImage: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  top: 0,
  left: 0,
  zIndex: 0,
},

overlay: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.65)',
  zIndex: 1,
},

glassCard: {
  position: 'relative',
  zIndex: 2,
  maxWidth: '640px', // ↓ smaller = more premium
  padding: '34px 36px', // ↓ tighter
  borderRadius: '18px',

  background: 'rgba(255,255,255,0.06)', // ↓ softer glass
  backdropFilter: 'blur(14px)', // ↓ less blur
  WebkitBackdropFilter: 'blur(14px)',

  border: '1px solid rgba(255,255,255,0.08)', // 🔥 clean edge
  boxShadow: '0 25px 70px rgba(0,0,0,0.7)', // 🔥 depth

  textAlign: 'center',
},
heroStatsWrapper: {
  position: 'relative',
  overflow: 'hidden',

  background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), #020617)',

},
}
 