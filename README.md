# 🚀 Firebase Demo App (TypeScript)

## 🌟 Features:

✅ Google Authentication  
✅ Firestore for storing notes  
✅ Remote Config for feature flags

---

## 🛠️ Setup:

### 1. **Clone the Repo**

```sh
git clone https://github.com/your-username/firebase-demo.git
cd firebase-demo
```

### 2. **Create `.env` File**

Create a `.env` file in the root directory and add your Firebase credentials (see `.env.sample` for format):

```sh
cp .env.sample .env
```

### 3. **Install Dependencies**

```sh
npm install
```

### 4. **Start Development Server**

```sh
npm run dev
```

---

## 📂 **Folder Structure:**

```
📁 src
├── 📁 components
├── 📁 config
├── 📁 hooks
├── 📁 styles
└── App.tsx
```

---

## 🎯 **How It Works:**

1. **Sign in with Google**
2. **Add notes to Firestore**
3. **Remote Config** controls a feature flag (`showBanner`)

---

## ✅ **Firebase Setup:**

1. Create a new Firebase project
2. Enable Firestore and Authentication (Google)
3. Enable Remote Config
4. Copy the Firebase credentials into `.env`

---

## 💡 **Environment Variables:**

See `.env.sample` for reference.

---

## 🚀 **Happy Coding!** 😎
