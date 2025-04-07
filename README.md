# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# BacainPuisi - Website Koleksi Puisi

Aplikasi web untuk menampilkan, mencari, dan menyimpan puisi-puisi terkenal. Dibuat dengan React dan Vite untuk UTS.

## Fitur Utama

- Menampilkan koleksi puisi dari API PoetryDB
- Mencari puisi berdasarkan judul atau penulis
- Menyimpan puisi favorit di browser lokal
- Berbagi puisi dengan teman melalui link
- Tampilan responsif dan modern

## Teknologi yang Digunakan

- React 18 dengan Vite
- React Router untuk navigasi
- Context API untuk state management
- Tailwind CSS untuk styling
- Modern JavaScript (ES6+)

## Konsep React yang Diimplementasikan

- Functional Components dengan React Hooks
- Custom Hooks (`useFetchPoems`)
- Context API untuk global state
- Dynamic routing dengan React Router
- Lazy loading komponen
- Memoization dengan useMemo dan useCallback
- PropTypes untuk validasi props

## Cara Menjalankan Aplikasi

1. Clone repository
2. Install dependensi:
   ```bash
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm run dev
   ```

## API yang Digunakan

Aplikasi ini menggunakan [PoetryDB API](https://poetrydb.org) untuk mengambil data puisi.

## Struktur Proyek

- `/src/components`: Komponen UI yang dapat digunakan kembali
- `/src/context`: Konfigurasi Context API
- `/src/hooks`: Custom hooks
- `/src/pages`: Komponen halaman
- `/src/utils`: Utilitas dan helper functions

## Pengembang

- [Nama Mahasiswa] - [NIM]
