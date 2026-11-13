/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LearningTopic } from '../types';

export const MULTIPLICATION_MATERIALS: LearningTopic[] = [
  {
    id: 1,
    title: 'Pengertian Perkalian',
    badge: 'Konsep Dasar',
    subtitle: 'Perkalian adalah Penjumlahan Berulang yang Praktis',
    content: [
      'Halo petualang cilik! Tahukah kamu bahwa perkalian sebenarnya adalah cara cepat melakukan penjumlahan bilangan yang sama secara berulang?',
      'Jika kamu memiliki 4 kantong ajaib, dan masing-masing kantong berisi 6 butir buah beri, kamu bisa menjumlahkannya: 6 + 6 + 6 + 6 = 24.',
      'Dalam bahasa matematika yang lebih singkat dan rapi, kita tuliskan sebagai 4 × 6 = 24 (dibaca "empat kali enam sama dengan dua puluh empat").',
    ],
    examples: [
      {
        problem: '3 × 5 = ...',
        solution: '5 + 5 + 5 = 15',
        step: 'Angka 5 dijumlahkan berulang sebanyak 3 kali.',
      },
      {
        problem: '4 × 7 = ...',
        solution: '7 + 7 + 7 + 7 = 28',
        step: 'Angka 7 dijumlahkan berulang sebanyak 4 kali.',
      },
    ],
    tips: 'Sifat pertukaran (komutatif): 4 × 6 hasilnya sama persis dengan 6 × 4 yaitu 24!',
  },
  {
    id: 2,
    title: 'Perkalian 1 Angka × 2 Angka',
    badge: 'Level 1: Pemula',
    subtitle: 'Teknik Mudah Memecah Puluhan dan Satuan',
    content: [
      'Ketika mengalikan bilangan satu angka dengan dua angka, kita bisa menggunakan cara bersusun atau memecahnya menjadi nilai puluhan dan satuan (sifat distributif).',
      'Mari kita lihat contoh perkalian 24 × 3. Angka 24 terdiri dari 20 (dua puluhan) dan 4 (empat satuan).',
      'Langkah 1: Kalikan puluhannya ➔ 20 × 3 = 60.',
      'Langkah 2: Kalikan satuannya ➔ 4 × 3 = 12.',
      'Langkah 3: Jumlahkan kedua hasilnya ➔ 60 + 12 = 72!',
    ],
    examples: [
      {
        problem: '24 × 3 = ...',
        solution: '72',
        step: '(20 × 3 = 60) + (4 × 3 = 12) ➔ 60 + 12 = 72.',
      },
      {
        problem: '15 × 4 = ...',
        solution: '60',
        step: '(10 × 4 = 40) + (5 × 4 = 20) ➔ 40 + 20 = 60.',
      },
      {
        problem: '21 × 2 = ...',
        solution: '42',
        step: '(20 × 2 = 40) + (1 × 2 = 2) ➔ 40 + 2 = 42.',
      },
    ],
    tips: 'Kamu juga bisa menggunakan cara perkalian bersusun ke bawah dengan menyimpan angka simpanan di atas puluhan.',
  },
  {
    id: 3,
    title: 'Perkalian 2 Angka × 2 Angka',
    badge: 'Level 2: Petualang',
    subtitle: 'Cara Bersusun dan Trik Menjumlahkan Bertahap',
    content: [
      'Untuk mengalikan dua bilangan yang masing-masing dua angka, cara bersusun ke bawah adalah sahabat terbaik kita!',
      'Mari perhatikan contoh 12 × 15. Kita bisa mengalikan 12 dengan satuan (5) terlebih dahulu, kemudian mengalikan 12 dengan puluhan (10).',
      'Baris 1: 12 × 5 = 60.',
      'Baris 2: 12 × 10 = 120 (tulis 12 maju satu kolom ke kiri).',
      'Jumlahkan: 60 + 120 = 180.',
    ],
    examples: [
      {
        problem: '12 × 15 = ...',
        solution: '180',
        step: '(12 × 5 = 60) + (12 × 10 = 120) ➔ 60 + 120 = 180.',
      },
      {
        problem: '12 × 12 = ...',
        solution: '144',
        step: '(12 × 2 = 24) + (12 × 10 = 120) ➔ 24 + 120 = 144.',
      },
      {
        problem: '23 × 11 = ...',
        solution: '253',
        step: 'Trik 11: jumlahkan angka 2 + 3 = 5, letakkan di tengah angka 2 dan 3 ➔ 253.',
      },
    ],
    tips: 'Jangan lupa untuk memberi jarak atau menuliskan angka 0 pada perkalian dengan angka puluhan!',
  },
  {
    id: 4,
    title: 'Perkalian 3 Angka × 1 Angka',
    badge: 'Level 3: Master',
    subtitle: 'Mengalikan Ratusan, Puluhan, dan Satuan',
    content: [
      'Mengalikan bilangan tiga angka dengan satu angka sangat mirip dengan perkalian sebelumnya, hanya saja kita menambahkan nilai ratusan.',
      'Contoh: 125 × 4. Angka 125 terdiri dari 100 + 20 + 5.',
      'Langkah 1: 100 × 4 = 400.',
      'Langkah 2: 20 × 4 = 80.',
      'Langkah 3: 5 × 4 = 20.',
      'Jumlahkan semua: 400 + 80 + 20 = 500!',
    ],
    examples: [
      {
        problem: '125 × 4 = ...',
        solution: '500',
        step: '125 × 2 = 250, lalu 250 × 2 = 500.',
      },
      {
        problem: '150 × 6 = ...',
        solution: '900',
        step: '15 × 6 = 90, tambahkan angka 0 di belakangnya ➔ 900.',
      },
      {
        problem: '215 × 3 = ...',
        solution: '645',
        step: '(200 × 3 = 600) + (15 × 3 = 45) ➔ 645.',
      },
    ],
    tips: 'Jika mengalikan bilangan berakhiran 0, kalikan dulu angka depannya, lalu simpan jumlah nol di akhir jawaban!',
  },
  {
    id: 5,
    title: 'Perkalian Sehari-hari & Trik Cepat',
    badge: 'Trik Jenius',
    subtitle: 'Jurus Cepat Menghitung Tanpa Kertas Cakar',
    content: [
      'Ada banyak trik perkalian ajaib yang bisa membuatmu berhitung secepat kilat:',
      '1. Trik Perkalian 10, 20, 30: Cukup kalikan angka bukan nol, lalu tempelkan angka 0 di belakangnya. Contoh: 35 × 20 = (35 × 2) lalu tambah 0 = 700.',
      '2. Trik Perkalian 25: Ingat bahwa 25 adalah seperempat dari 100. Jadi, 24 × 25 sama dengan 24 dibagi 4 (hasilnya 6) lalu dikalikan 100 = 600!',
      '3. Trik Perkalian 5: Kalikan bilangan dengan 10, lalu bagi 2. Contoh: 16 × 5 ➔ 16 × 10 = 160, bagi 2 = 80.',
    ],
    examples: [
      {
        problem: '24 × 25 = ...',
        solution: '600',
        step: '24 ÷ 4 = 6. Tambahkan dua angka nol ➔ 600.',
      },
      {
        problem: '35 × 16 = ...',
        solution: '560',
        step: 'Gandakan 35 jadi 70, bagi 16 jadi 8 ➔ 70 × 8 = 560.',
      },
    ],
    tips: 'Metode menggandakan dan membagi dua (double and halve) sangat hebat untuk perkalian angka belasan dengan puluhan berakhiran 5.',
  },
  {
    id: 6,
    title: 'Menyelesaikan Soal Cerita Perkalian',
    badge: 'Aplikasi Nyata',
    subtitle: '4 Langkah Sukses Memecahkan Masalah',
    content: [
      'Ketika membaca soal cerita matematika, ikuti 4 jurus petualang ini:',
      '1. DIKETAHUI: Cari informasi dan angka penting dalam cerita (misal: jumlah wadah, isi setiap wadah).',
      '2. DITANYAKAN: Pahami apa yang diminta soal (misal: "Berapa jumlah seluruhnya?").',
      '3. KALIMAT MATEMATIKA: Buat operasi perkaliannya (misal: 12 kotak × 24 pensil).',
      '4. KESIMPULAN: Hitung dengan teliti dan tuliskan jawaban lengkap beserta satuannya.',
    ],
    examples: [
      {
        problem:
          'Ibu membeli 12 kotak pensil. Setiap kotak berisi 24 pensil. Berapa seluruh pensil Ibu?',
        solution: '288 pensil',
        step: 'Kalimat matematika: 12 × 24 = (10 × 24) + (2 × 24) = 240 + 48 = 288 pensil.',
      },
      {
        problem:
          'Sebuah toko memiliki 25 kardus buku. Tiap kardus berisi 36 buku. Berapa jumlah buku seluruhnya?',
        solution: '900 buku',
        step: 'Kalimat matematika: 25 × 36 = 900 buku.',
      },
    ],
    tips: 'Kata kunci soal cerita perkalian: "masing-masing", "setiap", "berisi sama banyak", dan "jumlah seluruhnya".',
  },
];
