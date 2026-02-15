# Fintech — Finansal Takip Platformu

Masaüstü öncelikli bir finans platformu. Kullanıcılar finansal hareketlerini, toplam bakiyelerini ve işletme sermayelerini takip edebilir.

**Case Study** · Nodelabs · *Serdar Tuna Boşdurmaz*

---

## Özellikler

### Giriş & Kayıt
- **Sign In / Sign Up** — Sol tarafta form, sağda tanıtım görseli
- Form state yönetimi (React Hook Form) ve validasyon (Zod) — mesaj + kırmızı border
- Başarı ve hata bildirimleri (React Hot Toast)
- Giriş yapmış kullanıcı login/signup sayfasındaysa otomatik Dashboard’a yönlendirme
- Gönderim sırasında input’lar disabled, loading (spinner) gösterimi

### Dashboard
- **Özet kartları** — Toplam bakiye, harcama, birikim (API’den canlı veri)
- **Working Capital** — Gelir/gider çizgi grafiği, tarih aralığı seçici, hover’da tooltip
- **Recent Transactions** — Son işlemler tablosu (tarih ve para formatı uluslararası)
- **Wallet** — Kart önizlemeleri
- **Scheduled Transfers** — Planlanan transferler listesi
- Loading durumunda skeleton + shimmer; hata durumunda SectionError + Retry
- Responsive (mobil, tablet, masaüstü, geniş ekran)

### Genel
- Auth: Context API + RequireAuth (koruma ve yönlendirme tek yerde)
- API: TanStack React Query, merkezi `getResponseData` helper
- Error Boundary (sayfa + global), axios interceptors (429/500, token refresh)
- Anlamsal HTML ve temel erişilebilirlik (aria, role, focus)
- Stil: Tailwind CSS, CVA (class-variance-authority)

---

## Teknoloji

| Alan | Kullanılan |
|------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Form | React Hook Form, Zod, @hookform/resolvers |
| Veri & API | Tanstack React Query, Axios |
| State | React Context (Auth) |
| Grafik | Recharts |
| Bildirim | React Hot Toast |
| Animasyon | Framer Motion |

---

## Proje Yapısı

```
src/
├── app/                    # Next.js sayfaları (route + layout)
├── views/                  # Sayfa görünümleri (login, signup, dashboard, …)
│   └── dashboard/          # constants, useDashboard hooks, bileşenler
├── components/             # Paylaşılan UI (Button, Input, Skeleton, …)
├── layout/                 # BlankLayout, UserLayout, Providers, TopBar, Navigation
├── context/                # AuthContext
├── services/               # API servisleri (Public/Private, tipler)
├── api/                    # Axios instance’lar ve interceptors
├── lib/                    # response-helpers, RequireAuth, auth-routes, react-query, utils
├── utils/                  # formatters, local-storage-helper, api-availability
├── hooks/                  # useApiAvailability
├── navigation/             # Menü tanımları
└── assets/                 # İkonlar
```

---

## Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 20+
- npm veya yarn

### Adımlar

1. **Depoyu klonlayın**
   ```bash
   git clone <repo-url>
   cd nodelabs-fintech-case-study
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Ortam değişkeni (API)**
   Backend API base URL’i tanımlayın. Proje kökünde `.env.local` oluşturun:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-api-base-url.com
   ```
   Tanımlı değilse istekler relative path (`/`) üzerinden gider.

4. **Geliştirme sunucusu**
   ```bash
   npm run dev
   ```
   Tarayıcıda [http://localhost:3000](http://localhost:3000) açın.

5. **Production build**
   ```bash
   npm run build
   npm start
   ```

---

## Canlı Demo

**Canlı demo:** [nodelabs-fintech-case-study.vercel.app](https://nodelabs-fintech-case-study.vercel.app)

---

## Lisans

Private — Nodelabs Fintech Case Study.
