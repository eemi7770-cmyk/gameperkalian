/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from '../types';

export const MULTIPLICATION_QUESTIONS: Question[] = [
  // ==========================================
  // LEVEL 1: Perkalian Satu Angka dengan Dua Angka
  // ==========================================
  {
    id: 1,
    level: 1,
    type: 'single_by_double',
    question: 'Hasil dari 25 × 4 adalah ...',
    options: ['90', '100', '110', '120'],
    correctAnswer: 1,
    explanation: '25 × 4 = 25 + 25 + 25 + 25 = 100.',
    hint: 'Pikirkan uang logam 25 rupiah sebanyak 4 keping, atau hitung 4 × 20 = 80 ditambah 4 × 5 = 20.',
  },
  {
    id: 2,
    level: 1,
    type: 'single_by_double',
    question: 'Hasil dari 24 × 3 adalah ...',
    options: ['68', '72', '76', '82'],
    correctAnswer: 1,
    explanation: '24 × 3: (20 × 3 = 60) + (4 × 3 = 12) = 72.',
    hint: 'Kalikan puluhan (20 × 3) lalu tambahkan satuan (4 × 3).',
  },
  {
    id: 3,
    level: 1,
    type: 'single_by_double',
    question: 'Hasil dari 12 × 3 adalah ...',
    options: ['34', '36', '38', '40'],
    correctAnswer: 1,
    explanation: '12 × 3 = 12 + 12 + 12 = 36.',
    hint: '3 × 10 = 30, lalu tambahkan 3 × 2 = 6.',
  },
  {
    id: 4,
    level: 1,
    type: 'single_by_double',
    question: 'Hasil dari 15 × 4 adalah ...',
    options: ['50', '55', '60', '65'],
    correctAnswer: 2,
    explanation: '15 × 4 = (15 × 2) × 2 = 30 × 2 = 60.',
    hint: 'Gunakan trik menggandakan: dua kali 15 adalah 30, gandakan lagi!',
  },
  {
    id: 5,
    level: 1,
    type: 'single_by_double',
    question: 'Hasil dari 21 × 2 adalah ...',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1,
    explanation: '21 × 2 = 21 + 21 = 42.',
    hint: 'Kalikan 2 dengan 20, lalu kalikan 2 dengan 1.',
  },
  {
    id: 6,
    level: 1,
    type: 'single_by_double',
    question: 'Hasil dari 16 × 5 adalah ...',
    options: ['75', '80', '85', '90'],
    correctAnswer: 1,
    explanation: '16 × 5 = 80. (Trik perkalian 5: 16 × 10 = 160, bagi 2 = 80).',
    hint: 'Perkalian 5 bisa dihitung dengan mengalikan 10 lalu dibagi 2.',
  },
  {
    id: 7,
    level: 1,
    type: 'single_by_double',
    question: 'Hasil dari 18 × 4 adalah ...',
    options: ['64', '68', '72', '76'],
    correctAnswer: 2,
    explanation: '18 × 4 = (10 × 4) + (8 × 4) = 40 + 32 = 72.',
    hint: '18 × 2 = 36, lalu 36 × 2 = 72.',
  },
  {
    id: 8,
    level: 1,
    type: 'single_by_double',
    question: 'Hasil dari 32 × 3 adalah ...',
    options: ['92', '94', '96', '98'],
    correctAnswer: 2,
    explanation: '32 × 3 = (30 × 3) + (2 × 3) = 90 + 6 = 96.',
    hint: 'Hitung 30 × 3 terlebih dahulu, lalu tambahkan 2 × 3.',
  },
  {
    id: 9,
    level: 1,
    type: 'single_by_double',
    question: 'Hasil dari 45 × 2 adalah ...',
    options: ['80', '85', '90', '95'],
    correctAnswer: 2,
    explanation: '45 × 2 = 45 + 45 = 90.',
    hint: 'Menjumlahkan 45 sebanyak dua kali.',
  },
  {
    id: 10,
    level: 1,
    type: 'single_by_double',
    question: 'Hasil dari 14 × 6 adalah ...',
    options: ['78', '84', '88', '94'],
    correctAnswer: 1,
    explanation: '14 × 6 = (10 × 6) + (4 × 6) = 60 + 24 = 84.',
    hint: '6 × 10 = 60, dan 6 × 4 = 24. Jumlahkan keduanya.',
  },

  // ==========================================
  // LEVEL 2: Perkalian Dua Angka dengan Dua Angka
  // ==========================================
  {
    id: 11,
    level: 2,
    type: 'double_by_double',
    question: 'Hasil dari 12 × 15 adalah ...',
    options: ['160', '170', '180', '190'],
    correctAnswer: 2,
    explanation: '12 × 15 = 12 × (10 + 5) = 120 + 60 = 180.',
    hint: 'Hitung 12 × 10 = 120, lalu tambahkan setengahnya (60).',
  },
  {
    id: 12,
    level: 2,
    type: 'double_by_double',
    question: 'Hasil dari 12 × 12 adalah ...',
    options: ['124', '134', '144', '154'],
    correctAnswer: 2,
    explanation: '12 × 12 = 144.',
    hint: 'Ini adalah perkalian kuadrat 12: 12 × 10 = 120, ditambah 12 × 2 = 24.',
  },
  {
    id: 13,
    level: 2,
    type: 'double_by_double',
    question: 'Hasil dari 15 × 14 adalah ...',
    options: ['200', '210', '220', '230'],
    correctAnswer: 1,
    explanation: '15 × 14 = 15 × 2 × 7 = 30 × 7 = 210.',
    hint: 'Ubah 14 menjadi 2 × 7: kalikan 15 × 2 = 30, lalu 30 × 7 = 210.',
  },
  {
    id: 14,
    level: 2,
    type: 'double_by_double',
    question: 'Hasil dari 23 × 11 adalah ...',
    options: ['243', '253', '263', '273'],
    correctAnswer: 1,
    explanation: 'Trik perkalian 11: sisipkan jumlah angka (2 + 3 = 5) di tengah 2 dan 3, menjadi 253.',
    hint: '23 × 10 = 230, lalu tambahkan 23 × 1 = 23.',
  },
  {
    id: 15,
    level: 2,
    type: 'double_by_double',
    question: 'Hasil dari 25 × 12 adalah ...',
    options: ['280', '300', '320', '340'],
    correctAnswer: 1,
    explanation: '25 × 12 = 25 × 4 × 3 = 100 × 3 = 300.',
    hint: 'Setiap 4 kali 25 bernilai 100. Angka 12 memiliki tiga kali 4.',
  },
  {
    id: 16,
    level: 2,
    type: 'double_by_double',
    question: 'Hasil dari 20 × 35 adalah ...',
    options: ['650', '700', '750', '800'],
    correctAnswer: 1,
    explanation: '20 × 35 = 2 × 35 × 10 = 70 × 10 = 700.',
    hint: 'Kalikan 2 × 35 = 70, lalu tambahkan angka nol di belakangnya.',
  },
  {
    id: 17,
    level: 2,
    type: 'double_by_double',
    question: 'Hasil dari 16 × 15 adalah ...',
    options: ['220', '230', '240', '250'],
    correctAnswer: 2,
    explanation: '16 × 15 = 16 × 10 (160) + 16 × 5 (80) = 240.',
    hint: '16 × 10 = 160. Tambahkan setengah dari 160 yaitu 80.',
  },
  {
    id: 18,
    level: 2,
    type: 'double_by_double',
    question: 'Hasil dari 24 × 15 adalah ...',
    options: ['340', '350', '360', '370'],
    correctAnswer: 2,
    explanation: '24 × 15 = 24 × 10 (240) + 24 × 5 (120) = 360.',
    hint: '24 × 10 = 240. Tambahkan 120 (setengah dari 240).',
  },
  {
    id: 19,
    level: 2,
    type: 'double_by_double',
    question: 'Hasil dari 18 × 15 adalah ...',
    options: ['260', '270', '280', '290'],
    correctAnswer: 1,
    explanation: '18 × 15 = 18 × 10 (180) + 18 × 5 (90) = 270.',
    hint: '180 + 90 = 270.',
  },
  {
    id: 20,
    level: 2,
    type: 'double_by_double',
    question: 'Hasil dari 30 × 24 adalah ...',
    options: ['680', '700', '720', '740'],
    correctAnswer: 2,
    explanation: '30 × 24 = 3 × 24 × 10 = 72 × 10 = 720.',
    hint: 'Kalikan 3 dengan 24 (72), lalu tambahkan 0 di belakangnya.',
  },

  // ==========================================
  // LEVEL 3: Tiga Angka x Satu Angka, Dua Angka Lanjut & Soal Cerita
  // ==========================================
  {
    id: 21,
    level: 3,
    type: 'three_by_one',
    question: 'Hasil dari 125 × 4 adalah ...',
    options: ['400', '450', '500', '550'],
    correctAnswer: 2,
    explanation: '125 × 4 = 125 + 125 + 125 + 125 = 250 + 250 = 500.',
    hint: '125 × 2 = 250. Gandakan sekali lagi menjadi 500.',
  },
  {
    id: 22,
    level: 3,
    type: 'double_by_double',
    question: 'Hasil dari 24 × 25 adalah ...',
    options: ['560', '580', '600', '620'],
    correctAnswer: 2,
    explanation: '24 × 25 = (24 ÷ 4) × 100 = 6 × 100 = 600.',
    hint: 'Trik perkalian 25: bagi bilangan dengan 4 (24 ÷ 4 = 6) lalu kalikan 100.',
  },
  {
    id: 23,
    level: 3,
    type: 'double_by_double',
    question: 'Hasil dari 35 × 16 adalah ...',
    options: ['520', '540', '560', '580'],
    correctAnswer: 2,
    explanation: '35 × 16 = (35 × 2) × 8 = 70 × 8 = 560.',
    hint: 'Gandakan 35 menjadi 70, lalu kalikan dengan 8 (karena 16 = 2 × 8).',
  },
  {
    id: 24,
    level: 3,
    type: 'three_by_one',
    question: 'Hasil dari 150 × 6 adalah ...',
    options: ['800', '850', '900', '950'],
    correctAnswer: 2,
    explanation: '150 × 6 = 15 × 6 × 10 = 90 × 10 = 900.',
    hint: '15 × 6 = 90, tambahkan 0 di belakangnya.',
  },
  {
    id: 25,
    level: 3,
    type: 'three_by_one',
    question: 'Hasil dari 215 × 3 adalah ...',
    options: ['635', '645', '655', '665'],
    correctAnswer: 1,
    explanation: '215 × 3: (200 × 3 = 600) + (15 × 3 = 45) = 645.',
    hint: 'Kalikan ratusan (200 × 3 = 600) lalu tambahkan 15 × 3 = 45.',
  },
  {
    id: 26,
    level: 3,
    type: 'word_problem',
    question:
      'Ibu membeli 12 kotak pensil. Setiap kotak berisi 24 pensil. Berapa jumlah seluruh pensil yang dibeli Ibu?',
    options: ['268', '278', '288', '298'],
    correctAnswer: 2,
    explanation:
      'Kalimat matematika: 12 × 24. Cara: 10 × 24 = 240, dan 2 × 24 = 48. Jumlahkan: 240 + 48 = 288 pensil.',
    hint: 'Hitung perkalian 12 × 24 dengan cara susun atau distributif.',
  },
  {
    id: 27,
    level: 3,
    type: 'word_problem',
    question:
      'Sebuah toko memiliki 25 kardus. Setiap kardus berisi 36 buku tulis. Berapa jumlah seluruh buku di toko tersebut?',
    options: ['800', '850', '900', '950'],
    correctAnswer: 2,
    explanation:
      'Kalimat matematika: 25 × 36. Trik perkalian 25: 36 ÷ 4 = 9. Lalu 9 × 100 = 900 buku.',
    hint: 'Kalikan 25 dengan 36. Ingat bahwa 25 × 4 = 100.',
  },
  {
    id: 28,
    level: 3,
    type: 'word_problem',
    question:
      'Paman memiliki 15 pohon mangga di kebunnya. Setiap pohon rata-rata menghasilkan 40 buah mangga. Berapa total buah mangga yang dipanen Paman?',
    options: ['500', '550', '600', '650'],
    correctAnswer: 2,
    explanation: 'Kalimat matematika: 15 × 40 = 15 × 4 × 10 = 60 × 10 = 600 buah mangga.',
    hint: '15 × 4 = 60, lalu tambahkan angka 0.',
  },
  {
    id: 29,
    level: 3,
    type: 'word_problem',
    question:
      'Koperasi sekolah menerima bantuan 18 karung beras. Jika setiap karung memiliki berat 25 kg, berapakah total berat seluruh beras?',
    options: ['420 kg', '435 kg', '450 kg', '465 kg'],
    correctAnswer: 2,
    explanation:
      'Kalimat matematika: 18 × 25 kg. Cara: (18 ÷ 2) × 50 = 9 × 50 = 450 kg.',
    hint: '18 × 25 = (18 × 100) ÷ 4 = 1800 ÷ 4 = 450 kg.',
  },
  {
    id: 30,
    level: 3,
    type: 'word_problem',
    question:
      'Pak Budi memelihara 24 kolam ikan. Setiap kolam diisi dengan 125 ekor bibit ikan nila. Berapa total bibit ikan nila seluruhnya?',
    options: ['2.800 ekor', '2.900 ekor', '3.000 ekor', '3.200 ekor'],
    correctAnswer: 2,
    explanation:
      'Kalimat matematika: 24 × 125. Trik: 125 × 8 = 1.000. Karena 24 = 3 × 8, maka 3 × 1.000 = 3.000 ekor.',
    hint: 'Gunakan sifat asosiatif: 125 × 8 = 1.000. Berapa 3 × 1.000?',
  },
  {
    id: 31,
    level: 3,
    type: 'three_by_one',
    question: 'Hasil dari 124 × 5 adalah ...',
    options: ['600', '610', '620', '630'],
    correctAnswer: 2,
    explanation: '124 × 5: 124 × 10 = 1.240, lalu dibagi 2 = 620.',
    hint: 'Kalikan dengan 10 lalu bagi dengan 2.',
  },
  {
    id: 32,
    level: 3,
    type: 'word_problem',
    question:
      'Dalam perayaan hari kemerdekaan, panitia menyiapkan 16 toples permen. Setiap toples berisi 35 butir permen. Berapa total permen yang disiapkan?',
    options: ['520', '540', '560', '580'],
    correctAnswer: 2,
    explanation: '16 × 35 = 8 × 70 = 560 butir permen.',
    hint: 'Ubah perkalian menjadi 8 × 70 (bagi 16 dengan 2, dan kalikan 35 dengan 2).',
  },
];

/**
 * Fisher-Yates array shuffle
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Returns a question with shuffled options and updated correctAnswer index
 */
export function getShuffledQuestion(originalQuestion: Question): Question {
  const optionsWithMeta = originalQuestion.options.map((opt, idx) => ({
    text: opt,
    isCorrect: idx === originalQuestion.correctAnswer,
  }));

  const shuffledOptions = shuffleArray(optionsWithMeta);
  const newCorrectAnswer = shuffledOptions.findIndex((o) => o.isCorrect);

  return {
    ...originalQuestion,
    options: shuffledOptions.map((o) => o.text),
    correctAnswer: newCorrectAnswer,
  };
}

/**
 * Get questions filtered by level and shuffled
 */
export function getQuestionsForLevel(level: 1 | 2 | 3): Question[] {
  const filtered = MULTIPLICATION_QUESTIONS.filter((q) => q.level === level);
  return shuffleArray(filtered).map((q) => getShuffledQuestion(q));
}
