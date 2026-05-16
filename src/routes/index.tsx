import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback, useMemo } from 'react'
import {
  Zap, Shield, Users, Clock, Copy, Check,
  Gamepad2, Gem, CreditCard, Phone, ChevronRight,
  Star, MessageCircle, Award, TrendingUp
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// ─── Types ────────────────────────────────────────────────────────────────────

type GameId = 'pubg' | 'freefire' | 'tiktok' | 'efootball' | 'codm'
type PaymentId = 'bankily' | 'sedad' | 'masrifi'

interface Package {
  amount: number
  currency: string
  price: number
  popular?: boolean
}

interface Game {
  id: GameId
  name: string
  image: string
  currency: string
  requiresId: boolean
  packages: Package[]
}

interface PaymentMethod {
  id: PaymentId
  name: string
  image: string
  number: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const GAMES: Game[] = [
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    image: '/pubg.png',
    currency: 'UC',
    requiresId: true,
    packages: [
      { amount: 60, currency: 'UC', price: 55 },
      { amount: 325, currency: 'UC', price: 210, popular: true },
      { amount: 660, currency: 'UC', price: 410 },
      { amount: 1800, currency: 'UC', price: 1040 },
      { amount: 3850, currency: 'UC', price: 2200 },
    ],
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    image: '/freefire.png',
    currency: 'Diamond',
    requiresId: true,
    packages: [
      { amount: 110, currency: 'Diamond', price: 48 },
      { amount: 231, currency: 'Diamond', price: 95 },
      { amount: 583, currency: 'Diamond', price: 235, popular: true },
      { amount: 1188, currency: 'Diamond', price: 455 },
      { amount: 2420, currency: 'Diamond', price: 899 },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok Coins',
    image: '/tiktok.png',
    currency: 'Coin',
    requiresId: false,
    packages: [
      { amount: 70, currency: 'Coin', price: 60 },
      { amount: 100, currency: 'Coin', price: 85 },
      { amount: 200, currency: 'Coin', price: 150 },
      { amount: 350, currency: 'Coin', price: 220, popular: true },
    ],
  },
  {
    id: 'efootball',
    name: 'eFootball',
    image: '/pubg.png',
    currency: 'Coin',
    requiresId: true,
    packages: [
      { amount: 100, currency: 'Coin', price: 55 },
      { amount: 300, currency: 'Coin', price: 155, popular: true },
      { amount: 600, currency: 'Coin', price: 295 },
      { amount: 1200, currency: 'Coin', price: 560 },
    ],
  },
  {
    id: 'codm',
    name: 'Call of Duty',
    image: '/freefire.png',
    currency: 'CP',
    requiresId: true,
    packages: [
      { amount: 80, currency: 'CP', price: 50 },
      { amount: 400, currency: 'CP', price: 215, popular: true },
      { amount: 800, currency: 'CP', price: 410 },
      { amount: 2000, currency: 'CP', price: 990 },
    ],
  },
]

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'bankily', name: 'Bankily', image: '/bankily.png', number: '48263620' },
  { id: 'sedad',   name: 'Sedad',   image: '/sedad.png',   number: '48263620' },
  { id: 'masrifi', name: 'Masrifi', image: '/masrifi.png', number: '48263620' },
]

const TRUST_CARDS = [
  { icon: Zap,     title: 'شحن سريع',       desc: 'تُنجز طلبك خلال دقائق بعد تأكيد الدفع' },
  { icon: Users,   title: 'دعم حقيقي',       desc: 'تواصل مع شخص حقيقي، لا روبوتات' },
  { icon: Award,   title: 'احترام الزبون',   desc: 'كل زبون يُعامل باحترام واهتمام كامل' },
  { icon: Shield,  title: 'خدمة آمنة',       desc: 'معاملاتك محمية وبياناتك في أمان تام' },
]

const TESTIMONIALS = [
  {
    text: 'شحنت PUBG وصلت خلال دقيقتين! الخدمة ممتازة والتعامل محترم جداً.',
    author: 'أحمد',
    city: 'نواكشوط',
    rating: 5,
  },
  {
    text: 'أول مرة أشحن من موقع موريتاني وأحس بثقة حقيقية. شكراً CH7N!',
    author: 'فاطمة',
    city: 'نواذيبو',
    rating: 5,
  },
]

// ─── Particles ────────────────────────────────────────────────────────────────

function Particles() {
  const particles = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: (i * 6.2 + 2) % 100,
      delay: (i * 0.9) % 14,
      duration: 12 + (i * 1.1) % 12,
      size: 2 + (i % 2),
    })),
    [],
  )
  return (
    <div className="particles-bg" aria-hidden="true">
      {particles.map((p) => (
        <div key={p.id} className="particle" style={{
          left: `${p.left}%`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          width: `${p.size}px`,
          height: `${p.size}px`,
        }} />
      ))}
    </div>
  )
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [text])
  return (
    <button className={`copy-btn ${copied ? 'copy-btn--success' : ''}`} onClick={handleCopy}>
      {copied
        ? <><Check size={13} /> تم النسخ</>
        : <><Copy size={13} /> نسخ</>}
    </button>
  )
}

// ─── Step Badge ───────────────────────────────────────────────────────────────

function StepBadge({ number, label }: { number: number; label: string }) {
  return (
    <div className="step-badge">
      <span className="step-number">{number}</span>
      <span className="step-label">{label}</span>
    </div>
  )
}

// ─── Game Card ────────────────────────────────────────────────────────────────

function GameCard({ game, active, onClick }: { game: Game; active: boolean; onClick: () => void }) {
  return (
    <button className={`game-card ${active ? 'game-card--active' : ''}`} onClick={onClick} aria-pressed={active}>
      <div className="game-card-img-wrap">
        <img src={game.image} alt={game.name} className="game-card-img" />
        {active && <div className="game-card-overlay" />}
      </div>
      <span className="game-card-name">{game.name}</span>
      <span className="game-card-currency">{game.currency}</span>
      {active && <div className="game-card-bar" />}
    </button>
  )
}

// ─── Package Card ─────────────────────────────────────────────────────────────

function PackageCard({ pkg, active, onClick }: { pkg: Package; active: boolean; onClick: () => void }) {
  return (
    <button className={`pkg-card ${active ? 'pkg-card--active' : ''} ${pkg.popular ? 'pkg-card--popular' : ''}`} onClick={onClick} aria-pressed={active}>
      {pkg.popular && <span className="pkg-popular-badge">الأكثر طلباً</span>}
      {active && <div className="pkg-check"><Check size={10} /></div>}
      <div className="pkg-amount">
        {pkg.amount.toLocaleString('en-US')}
        <span className="pkg-currency"> {pkg.currency}</span>
      </div>
      <div className="pkg-price">
        {pkg.price.toLocaleString('en-US')}
        <span className="pkg-mru"> MRU</span>
      </div>
    </button>
  )
}

// ─── Payment Card ─────────────────────────────────────────────────────────────

function PaymentCard({ method, active, onClick }: { method: PaymentMethod; active: boolean; onClick: () => void }) {
  return (
    <button className={`pay-card ${active ? 'pay-card--active' : ''}`} onClick={onClick} aria-pressed={active}>
      <div className="pay-card-img-wrap">
        <img src={method.image} alt={method.name} className="pay-card-img" />
      </div>
      <span className="pay-card-name">{method.name}</span>
      {active && <div className="pay-card-check"><Check size={9} /></div>}
    </button>
  )
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

function HomePage() {
  const [selectedGame, setSelectedGame]       = useState<Game>(GAMES[0])
  const [selectedPkg, setSelectedPkg]         = useState<Package | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null)
  const [playerId, setPlayerId]               = useState('')
  const [senderNumber, setSenderNumber]       = useState('')
  const [isLoading, setIsLoading]             = useState(false)

  const handleGameChange = useCallback((game: Game) => {
    setSelectedGame(game)
    setSelectedPkg(null)
    setPlayerId('')
  }, [])

  const idRequired = selectedGame.requiresId
  const idValid    = !idRequired || playerId.trim().length > 0
  const canOrder   = selectedPkg !== null && idValid && selectedPayment !== null && senderNumber.trim().length > 4

  const handleWhatsApp = useCallback(() => {
    if (!canOrder || !selectedPkg || !selectedPayment) return
    setIsLoading(true)
    const lines = [
      '🎮 طلب شحن جديد — CH7N',
      '',
      `🕹️ اللعبة: ${selectedGame.name}`,
      `💎 الباقة: ${selectedPkg.amount.toLocaleString('en-US')} ${selectedPkg.currency}`,
      `💰 السعر: ${selectedPkg.price.toLocaleString('en-US')} MRU`,
      ...(playerId.trim() ? [`🆔 معرف اللاعب: ${playerId.trim()}`] : []),
      `💳 طريقة الدفع: ${selectedPayment.name}`,
      `📲 رقم المحول: ${senderNumber.trim()}`,
    ]
    setTimeout(() => {
      setIsLoading(false)
      window.open(`https://wa.me/33775202?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer')
    }, 500)
  }, [canOrder, selectedGame, selectedPkg, selectedPayment, playerId, senderNumber])

  return (
    <div className="app">
      <Particles />

      {/* ── Header ── */}
      <header className="header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="header-logo-wrap">
              <img src="/logo.png" alt="CH7N" className="header-logo" />
            </div>
            <div>
              <div className="header-title">CH7N</div>
              <div className="header-sub">شحن ألعاب فوري وآمن</div>
            </div>
          </div>
          <div className="header-live">
            <span className="live-dot" />
            متاح 24/7
          </div>
        </div>
      </header>

      <main className="main">

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-bg-glow" />
          <div className="hero-mascot-wrap">
            <div className="hero-mascot-ring" />
            <img src="/mascot-welcome.png" alt="mascot" className="hero-mascot" />
          </div>
          <h1 className="hero-title">
            متاجر الشحن كثيرة...<br />
            <span>لكن الفرق بالتعامل</span>
          </h1>
          <p className="hero-desc">نبني هذا المشروع معكم خطوة بخطوة</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' })}>
              <Gamepad2 size={18} />
              ابدأ الشحن
            </button>
            <a href="https://wa.me/33775202" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <MessageCircle size={18} />
              تواصل معنا
            </a>
          </div>
        </section>

        {/* ── Trust Cards ── */}
        <section className="trust-section">
          <div className="trust-grid">
            {TRUST_CARDS.map((c) => (
              <div key={c.title} className="trust-card">
                <div className="trust-icon-wrap">
                  <c.icon size={20} strokeWidth={1.8} />
                </div>
                <div className="trust-title">{c.title}</div>
                <div className="trust-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ORDER FLOW ── */}
        <div id="order-section" className="order-flow">

          {/* Step 1 */}
          <section className="section">
            <StepBadge number={1} label="اختر اللعبة" />
            <div className="games-grid">
              {GAMES.map((g) => (
                <GameCard key={g.id} game={g} active={selectedGame.id === g.id} onClick={() => handleGameChange(g)} />
              ))}
            </div>
          </section>

          {/* Step 2 */}
          <section className="section">
            <StepBadge number={2} label="اختر الباقة" />
            <div className="packages-grid">
              {selectedGame.packages.map((pkg, i) => (
                <PackageCard key={i} pkg={pkg} active={selectedPkg === pkg} onClick={() => setSelectedPkg(pkg)} />
              ))}
            </div>
          </section>

          {/* Step 3 */}
          <section className="section">
            <StepBadge number={3} label={`معرف اللاعب${!idRequired ? ' (اختياري)' : ''}`} />
            <div className="input-wrap">
              <Gamepad2 size={16} className="input-icon" />
              <input
                type="text"
                inputMode="numeric"
                className="field"
                placeholder={idRequired ? 'أدخل معرف اللاعب (مطلوب)' : 'أدخل معرف اللاعب (اختياري)'}
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                dir="ltr"
              />
            </div>
            {!idRequired && <p className="field-hint">TikTok Coins — المعرف اختياري</p>}
          </section>

          {/* Step 4 */}
          <section className="section">
            <StepBadge number={4} label="طريقة الدفع" />
            <div className="payment-grid">
              {PAYMENT_METHODS.map((m) => (
                <PaymentCard key={m.id} method={m} active={selectedPayment?.id === m.id} onClick={() => setSelectedPayment(m)} />
              ))}
            </div>

            {selectedPayment && (
              <div className="transfer-box">
                <div className="transfer-row">
                  <span className="transfer-label">رقم التحويل — {selectedPayment.name}</span>
                  <CopyButton text={selectedPayment.number} />
                </div>
                <div className="transfer-number" dir="ltr">{selectedPayment.number}</div>
                {selectedPkg && (
                  <div className="transfer-amount-row">
                    <span className="transfer-label">المبلغ الإجمالي</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="transfer-amount" dir="ltr">{selectedPkg.price.toLocaleString('en-US')} MRU</span>
                      <CopyButton text={selectedPkg.price.toString()} />
                    </div>
                  </div>
                )}
                <p className="transfer-note">
                  <Clock size={12} style={{ display: 'inline', marginLeft: 4 }} />
                  أرسل إيصال التحويل مع الطلب
                </p>
              </div>
            )}

            <div className="sender-wrap">
              <label className="field-label" htmlFor="sender">
                <Phone size={14} />
                رقم المحول (الرقم الذي أرسلت منه)
              </label>
              <div className="input-wrap">
                <Phone size={16} className="input-icon" />
                <input
                  id="sender"
                  type="text"
                  inputMode="numeric"
                  className="field"
                  placeholder="أدخل رقم الهاتف المحول منه"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  dir="ltr"
                />
              </div>
            </div>
          </section>

          {/* Summary */}
          {selectedPkg && (
            <section className="section">
              <div className="summary-card">
                <div className="summary-header">
                  <TrendingUp size={16} />
                  ملخص الطلب
                </div>
                <div className="summary-rows">
                  {[
                    { label: 'اللعبة',    value: selectedGame.name },
                    { label: 'الباقة',    value: `${selectedPkg.amount.toLocaleString('en-US')} ${selectedPkg.currency}` },
                    ...(playerId ? [{ label: 'معرف اللاعب', value: playerId }] : []),
                    { label: 'السعر',     value: `${selectedPkg.price.toLocaleString('en-US')} MRU`, highlight: true },
                    ...(selectedPayment ? [{ label: 'طريقة الدفع', value: selectedPayment.name }] : []),
                  ].map((row, i) => (
                    <div key={i} className="summary-row">
                      <span className="summary-label">{row.label}</span>
                      <span className={`summary-value ${(row as any).highlight ? 'summary-value--green' : ''}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Step 5 — WhatsApp */}
          <section className="section">
            <button
              className={`whatsapp-btn ${!canOrder ? 'whatsapp-btn--disabled' : ''}`}
              onClick={handleWhatsApp}
              disabled={!canOrder || isLoading}
            >
              {isLoading ? (
                <><span className="spinner" /> جارٍ الإرسال...</>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.856L.057 23.215a.75.75 0 00.928.928l5.359-1.475A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                  {canOrder ? `اطلب الآن — ${selectedPkg?.price.toLocaleString('en-US')} MRU` : 'أكمل البيانات للمتابعة'}
                </>
              )}
            </button>
            {!canOrder && (
              <p className="field-hint" style={{ textAlign: 'center', marginTop: 8 }}>
                <ChevronRight size={12} style={{ display: 'inline' }} />
                اختر باقة، أدخل المعرف، وحدد طريقة الدفع
              </p>
            )}
          </section>
        </div>

        {/* ── Community ── */}
        <section className="community-section">
          <div className="community-banner">
            <img src="/mascot-welcome.png" alt="" className="community-mascot" />
            <h2 className="community-title">نحن <span>نبني معاً</span></h2>
            <p className="community-desc">
              CH7N مشروع جديد في السوق، ونؤمن بالصدق مع زبائننا.<br />
              أنتم الشركاء الحقيقيون في نجاحنا.
            </p>
            <div className="community-phrases">
              {[
                { Icon: TrendingUp, text: 'هذا المشروع يبنى معكم — رأيكم يطورنا' },
                { Icon: MessageCircle, text: 'ثقتكم هي البداية والأساس الذي نبني عليه' },
                { Icon: Users, text: 'نحن صادقون: نتعلم ونتطور خطوة بخطوة' },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="community-phrase">
                  <Icon size={16} style={{ flexShrink: 0, color: 'var(--green)' }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div className="stats-grid">
              {[
                { value: '24/7', label: 'دعم مستمر' },
                { value: '5★',   label: 'تقييم الزبائن' },
                { value: '+100', label: 'طلب مكتمل' },
              ].map((s, i) => (
                <div key={i} className="stat-item">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="testimonials-section">
          <StepBadge number={0} label="ماذا قال زبائننا" />
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={13} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <span>{t.author}</span>
                  <span className="testimonial-city">{t.city}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <img src="/logo.png" alt="CH7N" className="footer-logo" />
          <p className="footer-text">
            <strong>CH7N</strong> — شحن سريع، تعامل صادق، ثقة حقيقية
          </p>
          <p className="footer-copy">© CH7N 2026 — جميع الحقوق محفوظة</p>
        </footer>

      </main>
    </div>
  )
}