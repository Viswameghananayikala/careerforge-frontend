import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminLogin({ onLogin, adminCreds }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError('') }

  const handleSubmit = async (e) => {
  e.preventDefault()

  setLoading(true)

  const res = await fetch("http://localhost:8081/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password
    })
  })

  const data = await res.json()
  setLoading(false)

  if (data.error) {
    setError(data.error)
    return
  }

  if (data.role !== "admin" && data.role !== "ADMIN") {
    setError("Not an admin account")
    return
  }

  localStorage.setItem("token", data.token)
  localStorage.setItem("user", JSON.stringify(data))

  onLogin(data.role, data.email, data.name)
  navigate("/admin")
}

  return (
    <div style={s.page}>
      <div className="orb orb-1" /><div className="orb orb-2" />
      <div style={s.card}>
        <Link to="/" style={s.logo}>
          <span style={s.logoMark}>⬡</span>
          <span>Path<span style={{ color: 'var(--purple-light)' }}>Wise</span></span>
        </Link>

        <div style={s.badge}><span>🛡️</span> Admin Portal</div>
        <h1 style={s.title}>Admin Sign In</h1>
        <p style={s.sub}>Restricted access — authorised personnel only</p>

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Admin Email</label>
            <input type="text" name="email" value={form.email} onChange={handleChange}
              placeholder="Enter your admin email" style={s.input} autoComplete="email" />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} name="password" value={form.password}
                onChange={handleChange} placeholder="Enter password"
                style={{ ...s.input, paddingRight: '48px' }} autoComplete="current-password" />
              <button type="button" onClick={() => setShowPass(!showPass)} style={s.eye}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          {error && <div style={s.error}>⚠️ {error}</div>}
          <button type="submit" style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Verifying...' : '🛡️ Sign In as Admin'}
          </button>
        </form>

        <p style={s.foot}>Not an admin? <Link to="/login" style={{ color: 'var(--purple-light)', fontWeight: 600 }}>Student Sign In →</Link></p>
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '88px', paddingBottom: '60px', position: 'relative' },
  card: { background: 'rgba(19,19,42,0.95)', border: '1px solid rgba(244,168,37,0.3)', borderRadius: '24px', padding: '48px 44px', width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1, backdropFilter: 'blur(16px)', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' },
  logo: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: '800', color: 'var(--white)', marginBottom: '24px', textDecoration: 'none' },
  logoMark: { width: '32px', height: '32px', background: 'linear-gradient(135deg, #7c3aed, #9f67ff)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1rem' },
  badge: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(244,168,37,0.1)', border: '1px solid rgba(244,168,37,0.3)', borderRadius: '20px', padding: '6px 18px', width: 'fit-content', margin: '0 auto 20px', fontSize: '0.85rem', fontWeight: '600', color: '#f4a825' },
  title: { fontSize: '1.8rem', fontWeight: '800', color: 'var(--white)', textAlign: 'center', marginBottom: '6px', fontFamily: 'Syne, sans-serif' },
  sub: { color: 'var(--muted)', textAlign: 'center', marginBottom: '28px', fontSize: '0.88rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '7px' },
  label: { color: 'rgba(248,249,255,0.7)', fontSize: '0.84rem', fontWeight: '600', letterSpacing: '0.03em' },
  input: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '13px 16px', color: 'var(--white)', fontSize: '0.95rem', outline: 'none', width: '100%' },
  eye: { position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' },
  error: { background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.25)', borderRadius: '10px', padding: '10px 14px', color: '#ff8080', fontSize: '0.87rem' },
  btn: { width: '100%', padding: '14px', fontSize: '1rem', background: 'linear-gradient(135deg, #f4a825, #e09015)', color: '#0a1628', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: 'opacity 0.2s' },
  foot: { textAlign: 'center', color: 'var(--muted)', fontSize: '0.88rem', marginTop: '24px' },
}
