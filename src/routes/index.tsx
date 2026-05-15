import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback, useMemo } from 'react'

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
  { id: 'sedad', name: 'Sedad', image: '/sedad.png', number: '48263620' },
  { id: 'masrifi', name: 'Masrifi', image: '/masrifi.png', number: '48263620' },
]

const TRUST_CARDS = [
  { icon: '⚡', title: 'شحن سريع', desc: 'تُنجز طلبك خلال دقائق بعد تأكيد الدفع' },
  { icon: '🤝', title: 'دعم حقيقي', desc: 'تواصل مع شخص حقيقي، لا روبوتات' },
  { icon: '💎', title: 'احترام الزبون', desc: 'كل زبون يُعامل باحترام واهتمام كامل' },
  { icon: '🔒', title: 'خدمة آمنة', desc: 'معاملاتك محمية وبياناتك في أمان تام' },
]

const COMMUNITY_PHRASES = [
  { icon: '🌱', text: 'هذا المشروع يبنى معكم — رأيكم يطورنا' },
  { icon: '💬', text: 'ثقتكم هي البداية والأساس الذي نبني عليه' },
  { icon: '🤲', text: 'نحن صادقون: نتعلم ونتطور خطوة بخطوة' },
]

const TESTIMONIALS = [
  {
    stars: '★★★★★',
    text: 'شحنت PUBG وصلت خلال دقيقتين! الخدمة ممتازة والتعامل محترم جداً.',
    author: '— أحمد، نواكشوط',
  },
  {
    stars: '★★★★★',
    text: 'أول مرة أشحن من موقع موريتاني وأحس بثقة حقيقية. شكراً CH7N!',
    author: '— فاطمة، نواذيبو',
  },
]

// ─── Particles ────────────────────────────────────────────────────────────────

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: (i * 5.5 + 3) % 100,
        delay: (i * 0.8) % 15,
        duration: 10 + (i * 1.3) % 15,
        size: 2 + (i % 3),
      })),
    [],
  )

  return (
    <div className="particles-bg" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
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
    <button
      className={`copy-btn ${copied ? 'copy-btn--success' : ''}`}
      onClick={handleCopy}
      title="نسخ"
    >
      {copied ? '✓ تم النسخ' : '⎘ نسخ'}
    </button>
  )
}

// ─── Game Card ────────────────────────────────────────────────────────────────

function GameCard({ game, active, onClick }: { game: Game; active: boolean; onClick: () => void }) {
  return (
    <button className={`game-card ${active ? 'game-card--active' : ''}`} onClick={onClick} aria-pressed={active}>
      <div className="game-card-img-wrap">
        <img src={game.image} alt={game.name} className="game-card-img" />
        {active && <div className="game-card-glow" />}
      </div>
      <span className="game-card-name">{game.name}</span>
      <span className="game-card-currency">{game.currency}</span>
      {active && <div className="game-card-active-indicator" />}
    </button>
  )
}

// ─── Package Card ─────────────────────────────────────────────────────────────

function PackageCard({ pkg, active, onClick }: { pkg: Package; active: boolean; onClick: () => void }) {
  return (
    <button className={`pkg-card ${active ? 'pkg-card--active' : ''}`} onClick={onClick} aria-pressed={active}>
      {pkg.popular && <span className="pkg-popular">الأكثر طلباً</span>}
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
      {active && <div className="pay-card-check">✓</div>}
    </button>
  )
}

// ─── Order Summary ────────────────────────────────────────────────────────────

function OrderSummary({
  game,
  pkg,
  payment,
  playerId,
}: {
  game: Game | null
  pkg: Package | null
  payment: PaymentMethod | null
  playerId: string
}) {
  if (!game || !pkg) return null

  return (
    <div className="summary-card">
      <h3 className="summary-title">ملخص الطلب</h3>
      <div className="summary-rows">
        <div className="summary-row">
          <span className="summary-label">اللعبة</span>
          <span className="summary-value">{game.name}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">الباقة</span>
          <span className="summary-value">
            {pkg.amount.toLocaleString('en-US')} {pkg.currency}
          </span>
        </div>
        {playerId && (
          <div className="summary-row">
            <span className="summary-label">معرف اللاعب</span>
            <span className="summary-value">{playerId}</span>
          </div>
        )}
        <div className="summary-row">
          <span className="summary-label">السعر</span>
          <span className="summary-value summary-price">
            {pkg.price.toLocaleString('en-US')} MRU
          </span>
        </div>
        {payment && (
          <div className="summary-row">
            <span className="summary-label">طريقة الدفع</span>
            <span className="summary-value">{payment.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage() {
  const [selectedGame, setSelectedGame] = useState<Game>(GAMES[0])
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null)
  const [playerId, setPlayerId] = useState('')
  const [senderNumber, setSenderNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGameChange = useCallback((game: Game) => {
    setSelectedGame(game)
    setSelectedPkg(null)
    setPlayerId('')
  }, [])

  const idRequired = selectedGame.requiresId
  const idValid = !idRequired || playerId.trim().length > 0

  const canOrder =
    selectedPkg !== null &&
    idValid &&
    selectedPayment !== null &&
    senderNumber.trim().length > 4

  const handleWhatsApp = useCallback(() => {
    if (!canOrder || !selectedPkg || !selectedPayment) return

    setIsLoading(true)

    const lines = [
      '🎮 طلب شحن جديد - CH7N',
      '',
      `🕹️ اللعبة: ${selectedGame.name}`,
      `💎 الباقة: ${selectedPkg.amount.toLocaleString('en-US')} ${selectedPkg.currency}`,
      `💰 السعر: ${selectedPkg.price.toLocaleString('en-US')} MRU`,
    ]

    if (playerId.trim()) {
      lines.push(`🆔 معرف اللاعب: ${playerId.trim()}`)
    }

    lines.push(
      `💳 طريقة الدفع: ${selectedPayment.name}`,
      `📲 رقم المحول: ${senderNumber.trim()}`,
    )

    const url = `https://wa.me/33775202?text=${encodeURIComponent(lines.join('\n'))}`

    setTimeout(() => {
      setIsLoading(false)
      window.open(url, '_blank', 'noopener,noreferrer')
    }, 600)
  }, [canOrder, selectedGame, selectedPkg, selectedPayment, playerId, senderNumber])

  const scrollToOrder = () => {
    document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Particles />

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-brand">
            <div className="header-logo-wrap">
              <img src="/logo.png" alt="CH7N Logo" className="header-logo" />
            </div>
            <div>
              <div className="header-title">CH7N</div>
              <div className="header-subtitle">شحن ألعاب فوري وآمن</div>
            </div>
          </div>
          <div className="header-badge">
            <span className="badge-dot" />
            <span>متاح 24/7</span>
          </div>
        </div>
      </header>

      <main className="main">

        {/* Hero Section */}
        <section className="hero fade-in-up">
          <div className="hero-glow-1" />
          <div className="hero-glow-2" />

          <div className="hero-mascot-wrap">
            <img src="/mascot-welcome.png" alt="Mascot" className="hero-mascot" />
            <div className="hero-mascot-ring" />
          </div>

          <h1 className="hero-tagline">
            متاجر الشحن كثيرة...<br />
            <span>لكن الفرق بالتعامل</span>
          </h1>
          <p className="hero-sub">نبني هذا المشروع معكم خطوة بخطوة</p>

          <div className="hero-buttons">
            <button className="hero-btn-primary" onClick={scrollToOrder}>
              🎮 ابدأ الشحن
            </button>
            <a
              href="https://wa.me/33775202"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-secondary"
            >
              💬 تواصل معنا
            </a>
          </div>
        </section>

        {/* Trust Section */}
        <section className="trust-section fade-in-up delay-1">
          <div className="trust-grid">
            {TRUST_CARDS.map((card) => (
              <div key={card.title} className="trust-card">
                <span className="trust-icon">{card.icon}</span>
                <div className="trust-title">{card.title}</div>
                <div className="trust-desc">{card.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ORDER FLOW ─────────────────────────────────────────────────────── */}
        <div id="order-section">

          {/* Step 1 — Select Game */}
          <section className="section fade-in-up delay-2">
            <h2 className="section-title">
              <span className="section-icon">🎮</span>
              اختر اللعبة
            </h2>
            <div className="games-grid">
              {GAMES.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  active={selectedGame.id === game.id}
                  onClick={() => handleGameChange(game)}
                />
              ))}
            </div>
          </section>

          {/* Step 2 — Select Package */}
          <section className="section fade-in-up delay-3">
            <h2 className="section-title">
              <span className="section-icon">💎</span>
              اختر الباقة
            </h2>
            <div className="packages-grid">
              {selectedGame.packages.map((pkg, idx) => (
                <PackageCard
                  key={idx}
                  pkg={pkg}
                  active={selectedPkg === pkg}
                  onClick={() => setSelectedPkg(pkg)}
                />
              ))}
            </div>
          </section>

          {/* Step 3 — Player ID */}
          <section className="section fade-in-up delay-3">
            <h2 className="section-title">
              <span className="section-icon">🆔</span>
              معرف اللاعب
              {!idRequired && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: '#f59e0b',
                    fontWeight: 600,
                    marginRight: '6px',
                  }}
                >
                  (اختياري)
                </span>
              )}
            </h2>
            <div className="input-wrap">
              <input
                type="text"
                inputMode="numeric"
                className="player-input"
                placeholder={
                  idRequired
                    ? 'أدخل معرف اللاعب (مطلوب)'
                    : 'أدخل معرف اللاعب (اختياري)'
                }
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                dir="ltr"
              />
              <span className="input-icon">👤</span>
            </div>
            {idRequired ? (
              <p className="input-hint">أدخل معرفك الرقمي داخل اللعبة</p>
            ) : (
              <p className="input-hint optional">
                ⚠️ TikTok Coins — المعرف اختياري، يمكنك تركه فارغاً
              </p>
            )}
          </section>

          {/* Step 4 — Payment */}
          <section className="section fade-in-up delay-4">
            <h2 className="section-title">
              <span className="section-icon">💳</span>
              طريقة الدفع
            </h2>
            <div className="payment-grid">
              {PAYMENT_METHODS.map((method) => (
                <PaymentCard
                  key={method.id}
                  method={method}
                  active={selectedPayment?.id === method.id}
                  onClick={() => setSelectedPayment(method)}
                />
              ))}
            </div>

            {selectedPayment && (
              <div className="transfer-box">
                <div className="transfer-label">رقم التحويل ({selectedPayment.name})</div>
                <div className="transfer-number-row">
                  <span className="transfer-number" dir="ltr">
                    {selectedPayment.number}
                  </span>
                  <CopyButton text={selectedPayment.number} />
                </div>

                {selectedPkg && (
                  <div className="amount-copy-row">
                    <span className="amount-label-text">المبلغ الإجمالي</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="amount-value" dir="ltr">
                        {selectedPkg.price.toLocaleString('en-US')} MRU
                      </span>
                      <CopyButton text={selectedPkg.price.toString()} />
                    </div>
                  </div>
                )}

                <p className="transfer-note" style={{ marginTop: '10px' }}>
                  📎 الرجاء إرسال إيصال التحويل مع الطلب
                </p>
              </div>
            )}

            <div className="sender-input-wrap">
              <label className="input-label" htmlFor="sender-number">
                رقم المحول (الرقم الذي أرسلت منه)
              </label>
              <input
                id="sender-number"
                type="text"
                inputMode="numeric"
                className="player-input"
                placeholder="أدخل رقم الهاتف المحول منه"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                dir="ltr"
              />
            </div>
          </section>

          {/* Order Summary */}
          {selectedPkg && (
            <div className="section fade-in-up">
              <OrderSummary
                game={selectedGame}
                pkg={selectedPkg}
                payment={selectedPayment}
                playerId={playerId}
              />
            </div>
          )}

          {/* Step 5 — WhatsApp */}
          <section className="section fade-in-up delay-5">
            <button
              className={`whatsapp-btn ${!canOrder ? 'whatsapp-btn--disabled' : ''} ${isLoading ? 'whatsapp-btn--loading' : ''}`}
              onClick={handleWhatsApp}
              disabled={!canOrder || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="btn-spinner" />
                  <span>جارٍ الإرسال...</span>
                </>
              ) : (
                <>
                  <span className="whatsapp-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.856L.057 23.215a.75.75 0 00.928.928l5.359-1.475A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.497-5.223-1.367l-.374-.214-3.882 1.068 1.068-3.882-.214-.374A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                  </span>
                  <span>اطلب عبر واتساب</span>
                </>
              )}
            </button>

            {!canOrder && (
              <p className="btn-hint">
                {!selectedPkg
                  ? 'الرجاء اختيار باقة أولاً'
                  : idRequired && !playerId.trim()
                    ? 'الرجاء إدخال معرف اللاعب'
                    : !selectedPayment
                      ? 'الرجاء اختيار طريقة الدفع'
                      : 'الرجاء إدخال رقم المحول'}
              </p>
            )}
          </section>

        </div>

        {/* Community Section */}
        <section className="community-section fade-in-up delay-6">
          <div className="community-banner">
            <img src="/mascot-point.png" alt="Mascot" className="community-mascot" />

            <h2 className="community-title">
              نحن <span>نبني معاً</span>
            </h2>
            <p className="community-sub">
              CH7N مشروع جديد في السوق، ونؤمن بالصدق مع زبائننا.
              <br />
              أنتم الشركاء الحقيقيون في نجاحنا.
            </p>

            <div className="community-phrases">
              {COMMUNITY_PHRASES.map((p) => (
                <div key={p.text} className="community-phrase">
                  <span className="phrase-icon">{p.icon}</span>
                  <span className="phrase-text">{p.text}</span>
                </div>
              ))}
            </div>

            <div className="community-stats">
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-label">طلب مكتمل</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5★</div>
                <div className="stat-label">تقييم الزبائن</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">دعم مستمر</div>
              </div>
            </div>

            <div className="testimonials">
              {TESTIMONIALS.map((t) => (
                <div key={t.author} className="testimonial-card">
                  <div className="testimonial-stars">{t.stars}</div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">{t.author}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <img src="/logo.png" alt="CH7N" className="footer-logo" />
          <div className="footer-brand">CH7N</div>
          <p className="footer-msg">شحن سريع، تعامل صادق، ثقة حقيقية</p>

          <div className="footer-socials">
            <a
              href="https://wa.me/33775202"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              💬 واتساب
            </a>
            <a
              href="#order-section"
              className="footer-social-link"
              onClick={(e) => {
                e.preventDefault()
                scrollToOrder()
              }}
            >
              🎮 اشحن الآن
            </a>
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} CH7N — جميع الحقوق محفوظة
          </p>
        </footer>

      </main>
    </div>
  )
}
