import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { apiLogin } from '../api' 

export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0 })
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaError, setCaptchaError] = useState('')

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1
    const num2 = Math.floor(Math.random() * 9) + 1
    setCaptcha({ num1, num2 })
  }

  useEffect(() => { generateCaptcha() }, [])

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError('') }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }

    if (parseInt(captchaInput) !== captcha.num1 + captcha.num2) {
      setCaptchaError('❌ Wrong answer. Try again.')
      generateCaptcha()
      setCaptchaInput('')
      return
    }

    setLoading(true)

    const res = await apiLogin(
      form.email.trim().toLowerCase(),
      form.password
    )

    setLoading(false)

    if (!res) {
      setError("Backend not reachable")
      return
    }

    if (res.error) {
      setError(res.error)
      return
    }

    localStorage.setItem("token", res.token)

    const userData = {
      name: res.name,
      email: res.email,
      role: res.role
    }

    localStorage.setItem("user", JSON.stringify(userData))

    onLogin(userData.role, userData.email, userData.name)

    if (userData.role === "counselor") {
      navigate("/counselor")
    } else {
      navigate("/dashboard")
    }
  }

  return (
    <div style={s.page}>
      <div className="orb orb-1" /><div className="orb orb-2" />
      <div
        style={s.card}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
          e.currentTarget.style.boxShadow = "0 40px 100px rgba(124,58,237,0.4)";
          e.currentTarget.style.border = "1px solid rgba(124,58,237,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 30px 80px rgba(0,0,0,0.4)";
          e.currentTarget.style.border = "1px solid rgba(124,58,237,0.2)";
        }}
      >
        <Link to="/" style={s.logo}>
          <div style={s.logoMark}>⬡</div>
          <span>Career<span style={{ color: 'var(--purple-light)' }}>Forge</span></span>
        </Link>
        <h1 style={s.title}>Welcome Back</h1>
        <p style={s.subtitle}>Sign in to continue your journey</p>

        {location.state?.from === '/schedule' && (
          <div style={s.hintBox}>
            <span style={{ color: 'var(--purple-light)', fontWeight: 700, fontSize: '0.82rem' }}>🔒 Sign in required </span>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>to book an appointment.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Email Address</label>
            <input type="text" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={s.input} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Your password" style={{ ...s.input, paddingRight: '48px' }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={s.eyeBtn}>{showPass ? '🙈' : '👁️'}</button>
            </div>
          </div>

          {/* CAPTCHA */}
          <div style={s.field}>
            <label style={s.label}>What is {captcha.num1} + {captcha.num2}?</label>
            <input
              type="number"
              value={captchaInput}
              onChange={e => { setCaptchaInput(e.target.value); setCaptchaError('') }}
              placeholder="Enter answer"
              style={s.input}
            />
            {captchaError && <div style={s.error}>{captchaError}</div>}
          </div>

          {error && <div style={s.error}>⚠️ {error}</div>}
          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1rem',
              borderRadius: '12px',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px) scale(1.02)";
              e.target.style.boxShadow = "0 15px 40px rgba(124,58,237,0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "none";
              e.target.style.boxShadow = "none";
            }}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div style={s.divider}><span style={{ background: 'var(--bg)', padding: '0 14px', color: 'var(--muted)', fontSize: '0.82rem' }}>or</span></div>
        <div style={s.signupText}>
          <span style={{ color: 'var(--muted)' }}>
            Don't have an account?{' '}
          </span>
        </div>
        <Link to="/signup" className="btn-outline" style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: '12px', fontSize: '0.92rem' }}>
          Create New Account →
        </Link>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Admin? </span>
          <Link to="/admin-login" style={{ color: 'var(--purple-light)', fontSize: '0.85rem', fontWeight: 700 }}>Admin Login →</Link>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '88px', paddingBottom: '60px', position: 'relative' },
  card: {
    background: 'rgba(19,19,42,0.9)',
    border: '1px solid rgba(124,58,237,0.2)',
    borderRadius: '24px',
    padding: '48px 44px',
    width: '100%',
    maxWidth: '440px',
    position: 'relative',
    zIndex: 1,
    backdropFilter: 'blur(16px)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
    transition: 'all 0.4s ease',
  },
  logo: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: '800', color: 'var(--white)', marginBottom: '32px', textDecoration: 'none' },
  logoMark: { width: '32px', height: '32px', background: 'linear-gradient(135deg, #7c3aed, #9f67ff)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' },
  title: { fontSize: '1.9rem', fontWeight: '800', color: 'var(--white)', textAlign: 'center', marginBottom: '8px', fontFamily: 'Syne, sans-serif' },
  subtitle: { color: 'var(--muted)', textAlign: 'center', marginBottom: '28px', fontSize: '0.92rem' },
  hintBox: { background: 'rgba(159,103,255,0.07)', border: '1px solid rgba(159,103,255,0.25)', borderRadius: '10px', padding: '10px 14px', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '7px' },
  label: { color: 'rgba(248,249,255,0.7)', fontSize: '0.84rem', fontWeight: '600', letterSpacing: '0.03em' },
  input: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '13px 16px',
    color: 'var(--white)',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    transition: 'all 0.3s ease',
  },
  eyeBtn: { position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' },
  error: { background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.25)', borderRadius: '10px', padding: '10px 14px', color: '#ff8080', fontSize: '0.87rem' },
  divider: { textAlign: 'center', position: 'relative', margin: '24px 0', borderTop: '1px solid rgba(255,255,255,0.07)' },
  signupText: {
    marginTop: '18px',
    textAlign: 'center',
    fontSize: '0.88rem',
  },
}
