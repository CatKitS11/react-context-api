# 📋 React Context API Workflow Documentation

## 🎯 Project Overview
โปรเจคนี้เป็นตัวอย่างการใช้งาน **React Context API** เพื่อส่งผ่านข้อมูล User ระหว่าง Components โดยไม่ต้องใช้ Props Drilling

## 🏗️ Project Structure
```
client/src/
├── context/
│   └── UserContext.jsx     # Context Definition
├── components/
│   └── AppHeader.jsx       # Consumer Component
├── pages/
│   ├── HomePage.jsx        # Consumer Component  
│   └── ViewProductPage.jsx # Consumer Component
├── App.jsx                 # Provider Component
└── main.jsx               # Root Component
```

## 🔧 Context API Workflow

### **Step 1: สร้าง Context (UserContext.jsx)**
```jsx
// context/UserContext.jsx
import { createContext } from "react";

const UserContext = createContext(null);

export default UserContext;
```

**เหตุผลที่ต้องสร้างก่อน:**
- Context คือ **"ตัวกลาง"** ที่ใช้ส่งข้อมูลผ่าน Component Tree
- เหมือนกับ **"ช่องทาง"** ที่ต้องสร้างก่อนจะส่งข้อมูลได้
- `createContext(null)` สร้าง Context พร้อม default value

---

### **Step 2: Provider ส่งข้อมูล (App.jsx)**
```jsx
// App.jsx
import UserContext from "./context/UserContext";

function App() {
  // 📦 เตรียมข้อมูลที่จะส่ง
  const userData = {
    username: "John",
    avatar: "https://placedog.net/100/100",
    level: "platinum",
  };

  return (
    <div className="App">
      {/* 🎯 ส่งข้อมูลผ่าน Provider */}
      <UserContext.Provider value={userData}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ViewProductPage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}
```

**หน้าที่ของ Provider:**
- ใส่ข้อมูล `userData` ลงใน Context
- ทำให้ Component ลูกทั้งหมดเข้าถึงข้อมูลได้
- เป็น **"แหล่งจ่ายไฟ"** ของระบบ

---

### **Step 3: Consumer รับข้อมูล (AppHeader.jsx)**
```jsx
// components/AppHeader.jsx
import { useContext } from "react";
import UserContext from "../context/UserContext";

function AppHeader() {
  // 📥 รับข้อมูลทั้งหมดจาก Context
  const user = useContext(UserContext);

  return (
    <div className="app-header-container">
      <h1 className="app-title">Products</h1>
      <h2>สวัสดีคุณ {user.username}</h2> {/* 👋 แสดง username */}
    </div>
  );
}
```

---

### **Step 4: Consumer รับข้อมูลแบบ Destructuring (ViewProductPage.jsx)**
```jsx
// pages/ViewProductPage.jsx
import { useContext } from "react";
import UserContext from "../context/UserContext";

function ViewProductPage() {
  // 📥 รับเฉพาะข้อมูลที่ต้องการ (Destructuring)
  const { level, username } = useContext(UserContext);

  return (
    <div>
      <div className="product-promotion-box">
        <h2>คุณคือสมาชิกในระดับ {level}</h2>
        <button 
          onClick={() => alert(`🥳🥳 ยินดีด้วยคุณ ${username} คุณได้รับสิทธิพิเศษ 🥳🥳`)}>
          กดรับสิทธิ
        </button>
      </div>
    </div>
  );
}
```

---

## 🌊 Data Flow Diagram

```
[App.jsx] 
    ↓ Provider ส่งข้อมูล
    ↓ value={userData}
[UserContext] ← ตัวกลาง (Channel)
    ↓ useContext รับข้อมูล
    ↓
┌─────────────────┬─────────────────┐
│ [AppHeader.jsx] │ [ViewProductPage.jsx] │
│ user.username   │ {level, username}     │
└─────────────────┴─────────────────┘
```

## 🔄 ขั้นตอนการทำงาน

1. **App.jsx** สร้าง `userData` และใส่ใน `UserContext.Provider`
2. **UserContext** ทำหน้าที่เป็นตัวกลางส่งข้อมูล
3. **AppHeader.jsx** ใช้ `useContext(UserContext)` ดึง `username`
4. **ViewProductPage.jsx** ใช้ `useContext(UserContext)` ดึง `username` และ `level`

## 🤔 เปรียบเทียบ: มี Context vs ไม่มี Context

### **❌ ไม่มี Context (Props Drilling)**
```jsx
<App userData={userData}>
  <Router>
    <HomePage userData={userData}>
      <AppHeader userData={userData} /> 
    </HomePage>
  </Router>
</App>
```

### **✅ มี Context API**
```jsx
<UserContext.Provider value={userData}>
  <Router>
    <HomePage> {/* ไม่ต้องส่ง props */}
      <AppHeader /> {/* ใช้ useContext ดึงได้เลย */}
    </HomePage>
  </Router>
</UserContext.Provider>
```

## ✨ ข้อดีของ Context API

1. **ลด Props Drilling** - ไม่ต้องส่ง props ผ่านหลายชั้น
2. **Global State** - เข้าถึงข้อมูลได้จากทุก Component 
3. **Clean Code** - โค้ดสะอาด อ่านง่าย
4. **Performance** - Re-render เฉพาะ Component ที่ใช้ Context

## 🏠 เปรียบเทียบกับระบบไฟฟ้าในบ้าน

- **Context** = สายไฟหลัก (Main Cable)
- **Provider** = แหล่งจ่ายไฟ (Power Source)
- **useContext** = ปลั๊กไฟ (Socket) ที่เสียบใช้ได้ทุกห้อง

## 🚀 การรันโปรเจค

```bash
cd client
npm install
npm run dev
```

เปิดเบราว์เซอร์ไปที่: `http://localhost:5173/`

## 📁 ไฟล์สำคัญ

| ไฟล์ | หน้าที่ | Context Role |
|------|---------|--------------|
| `context/UserContext.jsx` | สร้าง Context | **Definition** |
| `App.jsx` | ส่งข้อมูล | **Provider** |
| `components/AppHeader.jsx` | รับข้อมูล | **Consumer** |
| `pages/ViewProductPage.jsx` | รับข้อมูล | **Consumer** |

---

**หมายเหตุ:** Context API เหมาะสำหรับข้อมูลที่ไม่เปลี่ยนแปลงบ่อย หากต้องการ State Management ที่ซับซ้อนกว่า ควรใช้ Redux หรือ Zustand
