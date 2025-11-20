# คู่มือการติดตั้งและการใช้งาน (Installation and Setup Guide)

คู่มือนี้จะอธิบายขั้นตอนการติดตั้งและตั้งค่า Restaurant POS Application ทั้งในสภาพแวดล้อมการพัฒนา (Local Development) และการเผยแพร่ (Deployment) บน Vercel โดยใช้ Supabase เป็นฐานข้อมูลและ Backend-as-a-Service

## 1. การตั้งค่า Supabase

Supabase เป็นแพลตฟอร์ม Open Source ที่ให้บริการ PostgreSQL Database, Authentication, Storage, และ Realtime Subscriptions

### 1.1 สร้างโปรเจกต์ Supabase

1.  ไปที่ [Supabase Dashboard](https://app.supabase.com/) และเข้าสู่ระบบ
2.  คลิก **"New project"**
3.  ตั้งชื่อโปรเจกต์ (เช่น `restaurant-pos-db`) และเลือก Region ที่ใกล้ที่สุด
4.  ตั้งรหัสผ่านฐานข้อมูล (Database Password) และบันทึกไว้

### 1.2 ตั้งค่า Database Schema

เนื่องจากโปรเจกต์นี้ใช้ฐานข้อมูล PostgreSQL ของ Supabase คุณจะต้องสร้าง Schema สำหรับระบบต่างๆ (Inventory, HRM, CMS)

1.  **ติดตั้ง Supabase CLI**:
    ```bash
    npm install -g supabase
    ```
2.  **เข้าสู่ระบบ Supabase CLI**:
    ```bash
    supabase login
    ```
3.  **เชื่อมต่อโปรเจกต์**:
    ```bash
    cd ros/supabase
    supabase link --project-ref [YOUR_SUPABASE_PROJECT_REF]
    ```
    (คุณสามารถหา `[YOUR_SUPABASE_PROJECT_REF]` ได้จาก URL ของโปรเจกต์ใน Dashboard)
4.  **สร้าง Migration Files**:
    สร้างไฟล์ SQL สำหรับสร้างตารางต่างๆ (เช่น `inventory`, `employees`, `menu_items`) ในโฟลเดอร์ `migrations`
    *ตัวอย่างไฟล์ `supabase/migrations/20231121000000_initial_schema.sql`*:
    ```sql
    -- Table for Inventory Management
    CREATE TABLE inventory (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      category TEXT,
      stock_level INT DEFAULT 0,
      unit TEXT,
      price NUMERIC(10, 2) DEFAULT 0.00,
      low_stock_threshold INT DEFAULT 10,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Table for HRM (Employees)
    CREATE TABLE employees (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      role TEXT,
      hourly_rate NUMERIC(10, 2) DEFAULT 0.00,
      contact_email TEXT UNIQUE,
      hire_date DATE,
      is_active BOOLEAN DEFAULT TRUE
    );

    -- Table for CMS (Menu Items)
    CREATE TABLE menu_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      price NUMERIC(10, 2) DEFAULT 0.00,
      is_active BOOLEAN DEFAULT TRUE,
      image_url TEXT
    );

    -- Table for POS (Orders)
    CREATE TABLE orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      table_number INT,
      total_amount NUMERIC(10, 2) NOT NULL,
      status TEXT DEFAULT 'pending', -- pending, completed, cancelled
      payment_method TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    ```
5.  **รัน Migration**:
    ```bash
    supabase db push
    ```
    คำสั่งนี้จะสร้างตารางทั้งหมดในฐานข้อมูล Supabase ของคุณ

### 1.3 รับ Supabase Keys

1.  ไปที่ Supabase Dashboard ของโปรเจกต์
2.  ไปที่ **Settings** > **API**
3.  คัดลอกค่า **`URL`** และ **`anon public`** key
    -   `VITE_SUPABASE_URL` = URL
    -   `VITE_SUPABASE_ANON_KEY` = anon public key

## 2. การตั้งค่า Local Development (Frontend)

### 2.1 ติดตั้ง Dependencies

1.  เปิด Terminal และไปที่โฟลเดอร์ Frontend:
    ```bash
    cd ros/frontend
    pnpm install
    ```

### 2.2 ตั้งค่า Environment Variables

1.  สร้างไฟล์ `.env` ในโฟลเดอร์ `ros/frontend` โดยคัดลอกจาก `.env.example`:
    ```bash
    cp .env.example .env
    ```
2.  แก้ไขไฟล์ `.env` และใส่ค่า Supabase Keys ที่คุณคัดลอกมา:
    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

### 2.3 รัน Development Server

```bash
pnpm run dev
```
แอปพลิเคชันจะเปิดขึ้นที่ `http://localhost:5173` (หรือพอร์ตอื่นที่ Vite กำหนด)

## 3. การเผยแพร่บน Vercel (Deployment)

Vercel เป็นแพลตฟอร์มที่เหมาะสมสำหรับการเผยแพร่ React Application ที่สร้างด้วย Vite

### 3.1 การตั้งค่า Vercel

1.  **Push Code ไปยัง GitHub**: ตรวจสอบให้แน่ใจว่าโค้ดทั้งหมดถูก Push ไปยัง Repository นี้แล้ว
2.  **เชื่อมต่อ Vercel**:
    -   ไปที่ [Vercel Dashboard](https://vercel.com/) และเข้าสู่ระบบ
    -   คลิก **"Add New..."** > **"Project"**
    -   เลือก Repository **`bank-spn/ros`**
3.  **ตั้งค่า Project**:
    -   **Root Directory**: ตั้งค่าเป็น `frontend` (เนื่องจากโค้ด Frontend อยู่ในโฟลเดอร์นี้)
    -   **Framework Preset**: เลือก **Vite**
    -   **Build Command**: `pnpm run build`
    -   **Output Directory**: `dist`
4.  **ตั้งค่า Environment Variables**:
    -   ไปที่ **Settings** > **Environment Variables**
    -   เพิ่มตัวแปรที่จำเป็น:
        -   `VITE_SUPABASE_URL` (ค่าจาก Supabase API)
        -   `VITE_SUPABASE_ANON_KEY` (ค่าจาก Supabase API)

### 3.2 การ Deploy

1.  คลิก **"Deploy"**
2.  Vercel จะทำการ Build และ Deploy โปรเจกต์ของคุณโดยอัตโนมัติ
3.  เมื่อ Deploy เสร็จสิ้น คุณจะได้รับ URL สาธารณะสำหรับ Restaurant POS Application ของคุณ

## 4. โครงสร้างไฟล์ Supabase

โฟลเดอร์ `supabase` ถูกสร้างขึ้นเพื่อรองรับการจัดการฐานข้อมูลผ่าน Supabase CLI

```
ros/
└── supabase/
    ├── config.toml         # Supabase CLI configuration
    ├── migrations/         # SQL files for database schema changes
    │   └── 20231121000000_initial_schema.sql
    └── seed.sql            # SQL file for initial data (optional)
```

### 4.1 ไฟล์ `supabase/config.toml`
```toml
# This is the configuration file for the Supabase CLI.
# Learn more about the CLI: https://supabase.com/docs/guides/cli/getting-started

[project]
# The project ID from your Supabase Dashboard.
project_id = "YOUR_SUPABASE_PROJECT_REF"

[api]
# The port for the local Supabase API server.
port = 54321

[db]
# The port for the local PostgreSQL database.
port = 54322
# The directory containing your migration files.
migrations_path = "migrations"

[functions]
# The port for the local Supabase Functions server.
port = 54323
# The directory containing your Edge Functions.
functions_path = "functions"
```

### 4.2 ไฟล์ `supabase/migrations/20231121000000_initial_schema.sql`
(เนื้อหาตามที่ระบุในส่วน 1.2)

---
*หากมีข้อสงสัยเพิ่มเติม โปรดติดต่อผู้พัฒนา*
