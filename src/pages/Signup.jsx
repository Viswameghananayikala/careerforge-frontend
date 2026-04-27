import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiSignup } from '../api'
    
export default function Signup({ onSignup, onLogin, users }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0 })
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaError, setCaptchaError] = useState('')

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1
    const num2 = Math.floor(Math.random() * 9) + 1
    setCaptcha({ num1, num2 })
  }

  useEffect(() => { generateCaptcha() }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your full name.'
    if (!form.email.trim()) return 'Please enter your email address.'
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email address.'
    if (form.password.length < 6) return 'Password must be at least 6 characters.'
    if (form.password !== form.confirm) return 'Passwords do not match.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const err = validate()
    if (err) {
      setError(err)
      return
    }

    if (parseInt(captchaInput) !== captcha.num1 + captcha.num2) {
      setCaptchaError('❌ Wrong answer. Try again.')
      generateCaptcha()
      setCaptchaInput('')
      return
    }

    setLoading(true)

    const res = await apiSignup(
      form.name.trim(),
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

    const userData = {
      name: res.name,
      email: res.email,
      role: res.role
    }

    localStorage.setItem("token", res.token)
    localStorage.setItem("user", JSON.stringify(userData))

    onLogin(userData.role, userData.email, userData.name)

    navigate('/dashboard')
  }

  const strength = (() => {
    const p = form.password
    if (!p) return null
    if (p.length < 6) return { label: 'Too short', color: '#ef4444', width: '20%' }
    if (p.length < 8) return { label: 'Weak', color: '#f59e0b', width: '40%' }
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { label: 'Strong', color: '#22c55e', width: '100%' }
    return { label: 'Moderate', color: '#60a5fa', width: '70%' }
  })()

  return (
    <div style={s.page}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />

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

        <h1 style={s.title}>Create Your Account</h1>
        <p style={s.sub}>Join 10,000+ students — it's free forever</p>

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Full Name</label>
            <input
              type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="Your full name" style={s.input} autoComplete="name"
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Email Address</label>
            <input
              type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="you@example.com" style={s.input} autoComplete="email"
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'} name="password" value={form.password}
                onChange={handleChange} placeholder="Min. 6 characters"
                style={{ ...s.input, paddingRight: '48px' }} autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={s.eye}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
            {strength && (
              <div style={{ marginTop: '6px' }}>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: strength.width, height: '100%', background: strength.color, borderRadius: '2px', transition: 'width 0.3s' }} />
                </div>
                <span style={{ fontSize: '0.74rem', color: strength.color, marginTop: '3px', display: 'block' }}>{strength.label}</span>
              </div>
            )}
          </div>

          <div style={s.field}>
            <label style={s.label}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'} name="confirm" value={form.confirm}
                onChange={handleChange} placeholder="Re-enter your password"
                style={{ ...s.input, paddingRight: '48px', borderColor: form.confirm && form.confirm !== form.password ? '#ef4444' : '' }}
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={s.eye}>
                {showConfirm ? '🙈' : '👁️'}
              </button>
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

          {error && (
            <div style={s.error}>⚠️ {error}</div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', borderRadius: '12px', opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Free Account →'}
          </button>

          <p style={s.terms}>
            By signing up, you agree to our{' '}
            <span style={{ color: 'var(--purple-light)', cursor: 'pointer' }}>Terms of Service</span>
            {' '}and{' '}
            <span style={{ color: 'var(--purple-light)', cursor: 'pointer' }}>Privacy Policy</span>.
          </p>
        </form>

        <div style={s.divider}>
          <span style={{ background: 'rgba(19,19,42,0.95)', padding: '0 14px', color: 'var(--muted)', fontSize: '0.82rem' }}>or</span>
        </div>

        <Link to="/login" className="btn-outline" style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: '12px', fontSize: '0.92rem' }}>
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    paddingTop: '88px', paddingBottom: '60px', position: 'relative',
  },
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
  logo: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
    fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: '800',
    color: 'var(--white)', marginBottom: '32px', textDecoration: 'none',
  },
  logoMark: {
    width: '32px', height: '32px', background: 'linear-gradient(135deg, #7c3aed, #9f67ff)',
    borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
  },
  title: {
    fontSize: '1.9rem', fontWeight: '800', color: 'var(--white)',
    textAlign: 'center', marginBottom: '8px', fontFamily: 'Syne, sans-serif',
  },
  sub: { color: 'var(--muted)', textAlign: 'center', marginBottom: '28px', fontSize: '0.92rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  field: { display: 'flex', flexDirection: 'column', gap: '7px' },
  label: { color: 'rgba(248,249,255,0.7)', fontSize: '0.84rem', fontWeight: '600', letterSpacing: '0.03em' },
  input: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px', padding: '13px 16px', color: 'var(--white)',
    fontSize: '0.95rem', outline: 'none', width: '100%',
  },
  eye: {
    position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem',
  },
  error: {
    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '10px', padding: '10px 14px', color: '#fca5a5', fontSize: '0.87rem',
  },
  terms: { color: 'var(--muted)', fontSize: '0.78rem', textAlign: 'center', lineHeight: '1.6' },
  divider: {
    textAlign: 'center', position: 'relative', margin: '20px 0',
    borderTop: '1px solid rgba(255,255,255,0.07)',
  },
}
