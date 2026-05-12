# Design Document: NoteFlow Frontend Architecture

## 1. System Overview
NoteFlow adalah aplikasi catatan yang mengutamakan kecepatan entri data. Arsitektur frontend dirancang dengan prinsip **State-First**, di mana UI tidak pernah diblokir oleh proses jaringan.

## 2. Technical Stack
* **Core:** React 18+ dengan TypeScript.
* **Build Tool:** Vite (untuk HMR yang instan).
* **State Management:** Zustand (dipilih karena footprint kecil dan performa tinggi).
* **Data Fetching:** TanStack Query (untuk manajemen cache dan background synchronization).
* **Styling:** Tailwind CSS.

## 3. Frontend Architecture (State Management Flow)

### 3.1. Local State Sync Logic
Frontend akan mengelola state dalam tiga lapisan:
1.  **Component State:** UI feedback langsung (misal: cursor position).
2.  **Global Store (Zustand):** Truth source untuk UI yang sedang aktif.
3.  **Persisted Cache (IndexedDB):** Backup data lokal agar aplikasi bisa dibuka secara instan tanpa fetch ulang.

### 3.2. Debounced API Strategy
Setiap perubahan pada `NoteStore` akan memicu fungsi `syncWithBackend`.
* Fungsi ini dibungkus dengan `debounce(1000ms)`.
* Jika user mengetik terus menerus, API call ditunda.
* Setelah user berhenti selama 1 detik, payload dikirim ke backend secara asinkron.

## 4. Folder Structure (React + TypeScript)
Berikut adalah struktur folder yang diimplementasikan:

```text
src/
├── assets/          # Static files (icons, images)
├── components/      # UI Components
│   ├── ui/          # Shadcn/UI or custom atomic components
│   ├── layout/      # Navbar, MasonryGrid wrapper
│   └── notes/       # NoteCard, NoteEditor, ColorPalette
├── hooks/           # useNotes, useDebounce, useOfflineStatus
├── services/        # api.ts (Axios instance), auth.ts
├── store/           # useNoteStore.ts (Zustand)
├── types/           # notes.d.ts, api.d.ts
├── utils/           # helpers.ts, constants.ts
├── pages/           # Home, Archive, Trash
└── App.tsx          # Main Entry & Router
```

## 5. Component Design
### 5.1. Masonry Grid Implementation
Menggunakan CSS Grid dengan `grid-template-rows: masonry` (jika didukung) atau library `react-masonry-css` untuk layout kartu yang tidak seragam tingginya.

### 5.2. NoteCard Component
Mendukung interaksi:
* **Hover:** Menampilkan toolbar (color, archive, delete).
* **Click:** Membuka dialog/modal untuk edit detail.
* **Checklist Mode:** Render baris teks sebagai checkbox item.

## 6. Performance Optimization
* **Memoization:** Menggunakan `React.memo` pada kartu catatan untuk mencegah re-render yang tidak perlu saat satu catatan diupdate.
* **Lazy Loading:** Komponen modal dan editor berat dimuat secara dinamis (Code Splitting).
* **Optimistic UI:** Saat menghapus catatan, kartu langsung hilang dari layar; jika API gagal, kartu dikembalikan dengan notifikasi error.

## 7. Security (Frontend)
* **XSS Protection:** Sanitasi input HTML jika fitur rich-text diaktifkan.
* **JWT Storage:** Disimpan di `httpOnly` cookie (atau Memory State jika menggunakan Refresh Token flow).

## 8. Testing Strategy

Strategi pengujian NoteFlow difokuskan pada keandalan sinkronisasi state dan integritas UI pada berbagai perangkat.

### 8.1. Unit Testing (Vitest + React Testing Library)
*   **Store Logic:** Menguji fungsi `useNoteStore` untuk memastikan state berubah dengan benar saat aksi (add, edit, delete, change color) dipicu.
*   **Utility Functions:** Validasi fungsi helper seperti `dateFormatter` dan logika pembersihan HTML (sanitasi XSS).
*   **Component Rendering:** Memastikan komponen UI (Button, Card, Input) merender state awal dengan benar sesuai props.

### 8.2. Integration Testing
*   **Debounce Sync:** Menguji apakah API call benar-benar tertunda selama 1000ms saat input dilakukan terus-menerus dan hanya mengirim payload terakhir.
*   **Local Storage Persistence:** Memastikan data yang ada di global state tetap bertahan (persisted) saat halaman di-refresh dengan mensimulasikan `IndexedDB`.
*   **Checklist Logic:** Memverifikasi bahwa mencentang item dalam list memindahkan item tersebut ke kategori "Completed" secara instan di UI.

### 8.3. End-to-End (E2E) Testing (Playwright / Cypress)
*   **Critical Path:** Skenario login -> membuat catatan -> mengubah warna -> mengarsipkan -> logout.
*   **Offline Mode Simulation:** Menggunakan Playwright untuk memutus koneksi jaringan, melakukan edit catatan, menyambungkan kembali koneksi, dan memverifikasi data tersinkron ke backend.
*   **Responsive Design Test:** Memastikan layout Masonry Grid tetap rapi pada resolusi mobile (375px), tablet (768px), dan desktop (1440px).

### 8.4. Visual Regression Testing
*   Menggunakan tools (seperti Chromatic atau Storybook) untuk memastikan perubahan kode CSS/Tailwind tidak merusak tampilan kartu catatan di berbagai tema (Light/Dark mode).

### 8.5. Performance Testing (Lighthouse)
*   Target skor minimal 90 untuk **Performance** dan **Accessibility**.
*   Memastikan tidak ada *layout shift* (CLS) yang signifikan saat gambar atau kartu catatan baru dimuat secara dinamis.
