// Admin kirish sahifasi — faqat role:"admin" foydalanuvchilar.
import { useState } from "react";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e?.preventDefault();
    if (!email || !password) { setErr("Email va parolni kiriting"); return; }
    setLoading(true); setErr("");
    try {
      await login({ email, password });
    } catch (e2) {
      const map = { "auth/invalid-credential": "Email yoki parol noto'g'ri" };
      setErr(map[e2.code] || e2.message || "Kirishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form className="login__card" onSubmit={submit}>
        <div className="login__brand">
          <span className="login__logo">APEX<span>Admin</span></span>
          <ShieldCheck size={22} />
        </div>
        <p className="login__sub">Boshqaruv paneli — administrator kirishi</p>

        <div className="login__field">
          <Mail size={17} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="login__field">
          <Lock size={17} />
          <input type="password" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {err && <p className="login__err">{err}</p>}

        <button className="login__btn" type="submit" disabled={loading}>
          {loading ? "Kirilmoqda..." : "Kirish"}
        </button>
        <p className="login__hint">Faqat administrator hisobi (Firestore: role = admin) kira oladi.</p>
      </form>
    </div>
  );
}
