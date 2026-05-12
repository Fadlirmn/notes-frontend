# NoteFlow 📝

NoteFlow adalah aplikasi manajemen catatan modern yang terinspirasi oleh Google Keep, dibangun dengan **React**, **Vite**, dan **Tailwind CSS**. Aplikasi ini mendukung fitur autentikasi penuh, sinkronisasi data real-time dengan backend, dan desain yang sangat responsif.

## ✨ Fitur Utama

-   **Autentikasi Full-Stack**: Sistem Login dan Registrasi menggunakan JWT (Access & Refresh Tokens).
-   **Sinkronisasi Backend**: Semua catatan disimpan secara aman di database melalui backend API.
-   **Desain Premium**: UI/UX yang bersih, modern, dan familiar dengan Google Keep.
-   **Mode Gelap (Dark Mode)**: Mendukung perpindahan tema yang halus dan persisten.
-   **Manajemen Catatan**:
    -   Membuat catatan dengan judul dan isi.
    -   Kustomisasi warna kartu catatan (12 pilihan warna premium).
    -   Pin catatan penting ke bagian atas.
    -   Hapus dan Arsipkan catatan.
-   **Keamanan**: Menggunakan Axios interceptors untuk menangani refresh token secara otomatis.

## 🚀 Teknologi

-   **Frontend**: React 18, Vite, TypeScript.
-   **State Management**: Zustand (dengan middleware persistensi).
-   **Styling**: Tailwind CSS 4.0.
-   **Icons**: Lucide React.
-   **HTTP Client**: Axios.
-   **Backend**: Node.js, Express, Firestore (Firebase Admin SDK).

## 🛠️ Instalasi & Persiapan

### 1. Prasyarat
Pastikan Anda memiliki [Node.js](https://nodejs.org/) terinstall di sistem Anda.

### 2. Setup Backend
Masuk ke direktori backend dan jalankan:
```bash
npm install
npm run dev
```
*Pastikan file `.env` dan `serviceAccountKey.json` sudah tersedia di folder backend.*

### 3. Setup Frontend
Masuk ke direktori `Note-front` dan jalankan:
```bash
npm install
```

### 4. Konfigurasi Environment
Buat file `.env.local` di root folder `Note-front`:
```env
VITE_API_URL=http://localhost:3000
```

### 5. Menjalankan Aplikasi
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

## 📂 Struktur Folder (Frontend)

-   `src/components`: Komponen UI yang reusable (Layout, Notes, Auth).
-   `src/store`: State management menggunakan Zustand (`useNoteStore`, `useAuthStore`).
-   `src/services`: Konfigurasi API dan Axios.
-   `src/types`: Definisi Type/Interface TypeScript.
-   `src/utils`: Helper functions.

## 📄 Lisensi
Proyek ini dibuat untuk tujuan pembelajaran dan portofolio.
