export interface Project {
  id: string;
  title: string;
  category: '3d-animasi' | 'desain-grafis' | 'sistem-informasi' | 'organisasi';
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  tools: string[];
  role: string;
  year: string;
  highlights: string[];
  features?: string[];
  has3DViewer?: boolean;
  driveUrl?: string;
  driveEmbedUrl?: string;
  blendFilePath?: string;
  blendFileSize?: string;
  accentColor: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  items: {
    name: string;
    level: string;
    experience: string;
    description: string;
  }[];
}

export interface EducationExperience {
  period: string;
  title: string;
  institution: string;
  type: 'pendidikan' | 'organisasi';
  role?: string;
  description: string;
  achievements: string[];
  badge: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    fullName: "Sahal Arzaka",
    shortName: "Sahal",
    title: "Mahasiswa Sistem Informasi & Kreator Aset 3D / Desain Grafis",
    headline: "Memadukan Logika Sistem Informasi dengan Estetika Visual 3D & Desain Grafis",
    summary:
      "Mahasiswa aktif Program Studi Sistem Informasi di Universitas Komputama dengan fondasi kejuruan Animasi dari SMK Komputama Majenang. Berpengalaman merancang aset 3D dan desain visual kreatif menggunakan Canva, ditopang pemikiran analitis sistem basis data.",
    photoUrl: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_23.27.44_5595aa38.jpeg",
    phone: "085865120332",
    phoneDisplay: "+62 858-6512-0332",
    whatsappUrl: "https://wa.me/6285865120332?text=Halo%20Sahal%20Arzaka%2C%20saya%20tertarik%20dengan%20profil%20dan%20portofolio%20Anda.",
    email: "sahalarz24@gmail.com",
    location: "Majenang, Cilacap, Jawa Tengah, Indonesia",
    statusAvailability: "Terbuka untuk Magang, Proyek Desain/3D, dan Posisi Junior IT",
    educationPrimary: "Universitas Komputama (S1 Sistem Informasi)",
    educationSecondary: "SMK Komputama Majenang (Jurusan Animasi)",
    organization: "Gerakan Pramuka SMK Komputama Majenang"
  },

  kpiStats: [
    {
      value: "SMK",
      unit: "Animasi",
      label: "Latar Belakang Kejuruan",
      detail: "SMK Komputama Majenang"
    },
    {
      value: "S1",
      unit: "Sistem Informasi",
      label: "Pendidikan Tinggi",
      detail: "Universitas Komputama"
    },
    {
      value: "3D & Canva",
      unit: "Tools",
      label: "Spesialisasi Kreatif",
      detail: "Aset 3D, Mockup & Desain"
    },
    {
      value: "Pramuka",
      unit: "Leadership",
      label: "Pengalaman Organisasi",
      detail: "Disiplin & Kerjasama Tim"
    }
  ],

  skillCategories: [
    {
      id: "3d-animasi",
      title: "3D & Animasi",
      iconName: "Box",
      description: "Fondasi kejuruan animasi dalam pemodelan objek 3 dimensi, komposisi ruang, dan pergerakan visual.",
      items: [
        {
          name: "Pembuatan Aset 3D (3D Modeling)",
          level: "Kompeten",
          experience: "SMK & Mandiri",
          description: "Mampu memodelkan prop, geometri low-poly, perabotan, dan elemen dekorasi dengan topologi bersih."
        },
        {
          name: "Shading & Texturing Dasar",
          level: "Menengah",
          experience: "Proyek Animasi",
          description: "Pemberian material warna, pengaturan specular, roughness, dan pencahayaan studio tiga titik."
        },
        {
          name: "Storyboard & Konsep Animasi",
          level: "Kompeten",
          experience: "Jurusan Animasi",
          description: "Menyusun alur cerita visual frame-by-frame, staging kamera, blocking adegan, dan timing karakter."
        },
        {
          name: "Prinsip Dasar Animasi (12 Principles)",
          level: "Fondasional",
          experience: "Akademik SMK",
          description: "Pemahaman timing, spacing, anticipation, squash & stretch, dan ease-in/ease-out dalam gerak."
        }
      ]
    },
    {
      id: "desain-canva",
      title: "Desain Grafis & Canva",
      iconName: "Palette",
      description: "Kemahiran merancang visual promosi, identitas brand, publikasi sosial media, dan layout presentasi.",
      items: [
        {
          name: "Desainer Canva Pro",
          level: "Mahir",
          experience: "Praktik Aktif",
          description: "Pemanfaatan grid sistem, tipografi hierarkis, masking, manipulasi visual, dan pemilihan palet warna yang harmonis."
        },
        {
          name: "Konten Media Sosial & Promo Kit",
          level: "Mahir",
          experience: "Proyek & Organisasi",
          description: "Pembuatan poster feeds Instagram, banner digital, flyer event, dan brosur penawaran informatif."
        },
        {
          name: "Perancangan Presentasi & Pitch Deck",
          level: "Kompeten",
          experience: "Tugas Kuliah & Organisasi",
          description: "Merancang slide presentasi yang terstruktur, rapi, komunikatif, dan mudah dipahami audiens."
        },
        {
          name: "Tipografi & Harmoni Warna",
          level: "Kompeten",
          experience: "Desain Berkelanjutan",
          description: "Pemilihan jenis font (Display, Sans, Serif) dan formula kontras warna agar nyaman dibaca dan bernilai estetis."
        }
      ]
    },
    {
      id: "sistem-informasi",
      title: "Sistem Informasi & IT",
      iconName: "Database",
      description: "Pemahaman akademis dalam menganalisis alur data, kebutuhan sistem komputer, dan implementasi teknologi.",
      items: [
        {
          name: "Analisis Alur Sistem (Flowchart & DFD)",
          level: "Akademik Aktif",
          experience: "Kuliah S1",
          description: "Memetakan proses bisnis, diagram alir dokumen, use-case dasar, dan skema interaksi pengguna."
        },
        {
          name: "Konsep Basis Data (Database Relasional)",
          level: "Dasar - Menengah",
          experience: "Perkuliahan SI",
          description: "Pemahaman normalisasi tabel, Primary Key, relasi entitas (ERD), dan kueri SQL dasar."
        },
        {
          name: "Dasar Pemrograman & Web",
          level: "Fondasional",
          experience: "Kurikulum Kampus",
          description: "Pemahaman struktur HTML/CSS, logika algoritma komputer, dan antarmuka pengguna berbasis web."
        },
        {
          name: "Operasional Komputer & Troubleshooting",
          level: "Mahir",
          experience: "Harian & Praktik",
          description: "Instalasi perangkat lunak, manajemen sistem operasi, pemeliharaan file, dan penggunaan suite produktivitas."
        }
      ]
    },
    {
      id: "soft-skills",
      title: "Karakter & Leadership",
      iconName: "ShieldCheck",
      description: "Karakter mental, kepemimpinan, dan etika kerja yang ditempa melalui kegiatan kepramukaan di SMK.",
      items: [
        {
          name: "Disiplin & Ketepatan Waktu",
          level: "Sangat Tinggi",
          experience: "Gerakan Pramuka",
          description: "Kebiasaan menghargai instruksi kerja, komitmen terhadap tenggat waktu tugas, dan konsistensi."
        },
        {
          name: "Kerjasama Tim & Komunikasi",
          level: "Teruji",
          experience: "Regu Pramuka & Kampus",
          description: "Mampu berkoordinasi dengan rekan setim, menghargai dinamika kelompok, dan menyampaikan ide dengan sopan."
        },
        {
          name: "Kemandirian & Problem Solving Lapangan",
          level: "Tinggi",
          experience: "Kegiatan Luar Ruang",
          description: "Kesiapsiagaan menghadapi kondisi tak terduga, cepat beradaptasi, dan mencari solusi logis yang efisien."
        },
        {
          name: "Rasa Ingin Tahu & Cepat Belajar",
          level: "Sangat Tinggi",
          experience: "Eksplorasi Mandiri",
          description: "Antusias menguasai software baru, metodologi baru, dan terbuka menerima kritik demi perbaikan berkelanjutan."
        }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "project-1",
      title: "Animasi & Pemodelan 3D Mobil (Blender 4.2 - mobil.blend)",
      category: "3d-animasi",
      categoryLabel: "Animasi & Aset 3D",
      shortDesc: "Proyek pemodelan dan animasi 3D kendaraan (mobil) menggunakan Blender versi 4.2 dengan topologi bersih dan perputaran roda.",
      fullDesc:
        "Proyek pembuatan aset dan animasi 3D kendaraan mobil (mobil.blend) menggunakan Blender 4.2. Menggunakan teknik polygonal modeling untuk membentuk body aerodinamis, perakitan sasis, roda animasi dengan poros putar, material cat bodi glossy, dan pencahayaan studio tiga titik. Berkas asli proyek dapat diunduh langsung atau diakses melalui Google Drive.",
      tools: ["Blender 4.2", "mobil.blend", "3D Animation", "Three.js WebGL", "Studio Lighting"],
      role: "3D Modeler & Animator",
      year: "2024",
      highlights: [
        "Pemodelan geometri kendaraan aerodinamis dengan topologi bersih",
        "Animasi perputaran roda dan simulasi pencahayaan bodi mobil",
        "Tersedia penampil 3D interaktif real-time di portofolio dengan rotasi 360°",
        "Berkas proyek Blender asli (mobil.blend - 2.97 MB) tersedia untuk diunduh langsung"
      ],
      features: [
        "Interactive 3D Car Viewport dengan roda berputar",
        "Kontrol rotasi bebas 360 derajat dan mode wireframe",
        "Unduh langsung berkas asli mobil.blend (2.97 MB)",
        "Tautan terverifikasi di Google Drive"
      ],
      has3DViewer: true,
      blendFilePath: "/assets/projects/mobil.blend",
      blendFileSize: "2.97 MB",
      driveUrl: "https://drive.google.com/file/d/1zJvHX_1CMcdH0uO-BASwhU7_yBRLapSQ/view?usp=drivesdk",
      driveEmbedUrl: "https://drive.google.com/file/d/1zJvHX_1CMcdH0uO-BASwhU7_yBRLapSQ/preview",
      accentColor: "#3B82F6"
    },
    {
      id: "project-2",
      title: "Koleksi Desain Branding & Promosi Media Sosial",
      category: "desain-grafis",
      categoryLabel: "Canva Visual Design",
      shortDesc: "Seri materi promosi Instagram feeds, banner hero, dan flyer promosi dengan sistem visual dan tipografi yang terarah.",
      fullDesc:
        "Rangkaian karya desain grafis menggunakan Canva yang dirancang untuk meningkatkan interaksi media sosial dan profesionalisme promosi. Menitikberatkan pada penerapan prinsip 'White Space', hierarki judul-keterangan yang jelas, serta seleksi warna yang selaras dengan pesan promosi.",
      tools: ["Canva Pro", "Tipografi Layout", "Color Palette Theory", "Photo Enhancement"],
      role: "Graphic Designer",
      year: "2024 - 2025",
      highlights: [
        "Penerapan grid harmonis untuk menjaga keseimbangan visual",
        "Pola tipografi mudah dibaca di layar smartphone",
        "Konsistensi branding dari banner header hingga feed carousels",
        "Penyusunan copywriting visual yang ringkas dan padat"
      ],
      features: [
        "Template Instagram Feed & Story",
        "Poster Promosi Acara & Pengumuman",
        "Banner Digital Responsif"
      ],
      accentColor: "#06B6D4"
    },
    {
      id: "project-3",
      title: "Rancangan Alur Sistem Informasi Pendataan Akademik",
      category: "sistem-informasi",
      categoryLabel: "Sistem Informasi",
      shortDesc: "Analisis proses bisnis, diagram alir data (Flowchart/DFD), dan perancangan prototipe antarmuka sistem informasi kampus.",
      fullDesc:
        "Studi kasus perkuliahan Sistem Informasi Universitas Komputama dalam merancang alur pendataan mahasiswa baru dan pelaporan nilai. Meliputi pembuatan flowchart operasional, Entity Relationship Diagram (ERD) untuk struktur database, serta wireframing antarmuka pengguna agar sistem efisien dan mudah dioperasikan staf.",
      tools: ["Draw.io", "Diagram ERD", "Figma Wireframe", "Database Normalization"],
      role: "System Analyst & UI Drafter",
      year: "2025",
      highlights: [
        "Pemetaan diagram alir data langkah demi langkah tanpa redundansi",
        "Rancangan tabel basis data ternormalisasi (1NF, 2NF, 3NF)",
        "Sketsa wireframe UI yang memprioritaskan kemudahan pengguna",
        "Dokumentasi spesifikasi kebutuhan sistem yang terstruktur"
      ],
      features: [
        "Diagram Alur Kerja Sistem",
        "Skema Relasi Database Relasional",
        "Mockup Wireframe Form Input"
      ],
      accentColor: "#10B981"
    },
    {
      id: "project-4",
      title: "Storyboard & Karakter Animasi 2D 'Sahabat Belajar'",
      category: "3d-animasi",
      categoryLabel: "Animasi SMK",
      shortDesc: "Perancangan konsep karakter, lembar ekspresi, dan storyboard sekuensial untuk video animasi edukatif saat masa SMK.",
      fullDesc:
        "Proyek kejuruan Animasi di SMK Komputama Majenang yang mengolah ide cerita menjadi susunan storyboard berdurasi singkat. Memperhitungkan timing pergantian kamera, penentuan pose kunci (key poses), serta ekspresi karakter agar pesan edukasi dapat tersampaikan dengan hangat dan dinamis.",
      tools: ["Drawing Board", "Storyboard Paper", "Digital Ink", "Timing Sheet"],
      role: "Storyboard Artist & Character Designer",
      year: "2023",
      highlights: [
        "Penyusunan 24 panel storyboard berurutan lengkap dengan dialog & catatan kamera",
        "Karakterisasi visual yang ramah anak dan mudah dikenali",
        "Eksplorasi pose kunci mengikuti prinsip Squash & Stretch",
        "Kolaborasi dengan tim pembuat suara dan animator penggerak"
      ],
      features: [
        "Model Sheet Karakter",
        "Sequence Storyboard Panel",
        "Catatan Arahan Kamera & Sound Effect"
      ],
      accentColor: "#F59E0B"
    },
    {
      id: "project-5",
      title: "Publikasi Visual & Identitas Kegiatan Perkemahan Pramuka",
      category: "organisasi",
      categoryLabel: "Organisasi Pramuka",
      shortDesc: "Penyusunan identitas visual materi kemah, poster perlombaan, spanduk kegiatan, dan sertifikat resmi peserta.",
      fullDesc:
        "Sebagai anggota aktif Pramuka di SMK Komputama Majenang, Sahal berkontribusi langsung merancang seluruh kebutuhan publikasi dan materi visual kegiatan perkemahan akbar. Menghasilkan poster acara yang menarik minat peserta, ID badge panitia dengan kode regu, serta sertifikat resmi berformat siap cetak dengan tata letak elegan.",
      tools: ["Canva", "Print Layout Prep", "Typography Alignment", "Brand Assets"],
      role: "Sie Publikasi & Dokumentasi Pramuka",
      year: "2023",
      highlights: [
        "Desain terintegrasi mulai dari spanduk panggung, nomor tenda, hingga flyer kegiatan",
        "Penyelesaian tenggat cetak tepat waktu sebelum hari pelaksanaan kemah",
        "Sertifikat resmi peserta dengan layout rapi dan tanda tangan legal",
        "Mengasah koordinasi antar seksi acara di bawah pengawasan Pembina"
      ],
      features: [
        "Poster Promosi Perkemahan",
        "Layout Sertifikat Kegiatan Resmi",
        "ID Card Panitia & Kartu Kendali Peserta"
      ],
      accentColor: "#EC4899"
    },
    {
      id: "project-6",
      title: "Desain Skema Basis Data Penjualan & Inventaris Usaha",
      category: "sistem-informasi",
      categoryLabel: "Sistem Informasi",
      shortDesc: "Perancangan relasi tabel database inventaris produk dengan query SQL terstruktur untuk mempermudah pencatatan stok.",
      fullDesc:
        "Proyek akademik dalam menyusun skema basis data relasional untuk pencatatan barang masuk, barang keluar, data supplier, dan kalkulasi sisa stok. Mengimplementasikan foreign key, indeks pencarian cepat, serta perancangan laporan ringkasan berkala yang siap dihubungkan ke aplikasi web front-end.",
      tools: ["SQL Workbench", "Relational Database", "Data Modeling", "ER Diagram"],
      role: "Database Designer",
      year: "2024",
      highlights: [
        "Menghindari duplikasi data dengan pemisahan tabel transaksi dan detail transaksi",
        "Query SQL untuk menghasilkan ringkasan stok terlaris dan peringatan stok menipis",
        "Dokumentasi kamus data lengkap untuk setiap kolom tabel",
        "Integrasi konseptual dengan antarmuka front-end responsif"
      ],
      features: [
        "Struktur Tabel Terkoneksi Foreign Key",
        "Kueri Laporan Otomatis",
        "Visualisasi ERD Sistem"
      ],
      accentColor: "#8B5CF6"
    }
  ] as Project[],

  educationHistory: [
    {
      period: "2024 - Sekarang",
      title: "Program Sarjana (S1) Sistem Informasi",
      institution: "Universitas Komputama (UNIKOM)",
      type: "pendidikan",
      role: "Mahasiswa Aktif",
      description:
        "Mendalami integrasi teknologi informasi dengan proses bisnis organisasi. Fokus studi mencakup analisis kebutuhan sistem, pemodelan data, arsitektur perangkat lunak, serta manajemen proyek teknologi digital.",
      achievements: [
        "Mempelajari metodologi rekayasa perangkat lunak dan analisis alur sistem",
        "Praktik perancangan basis data relasional dan diagram alir data bisnis",
        "Mengembangkan pola pikir sistematis dalam memecahkan masalah komputasi",
        "Aktif mengeksplorasi penerapan desain visual pada antarmuka aplikasi modern"
      ],
      badge: "Pendidikan Tinggi"
    },
    {
      period: "2021 - 2024",
      title: "Sekolah Menengah Kejuruan (SMK) - Jurusan Animasi",
      institution: "SMK Komputama Majenang",
      type: "pendidikan",
      role: "Alumni Kejuruan",
      description:
        "Menempuh pendidikan vokasi di bidang seni digital dan animasi. Mempelajari prinsip gerak animasi, pembuatan aset visual 3 dimensi, pembuatan storyboard skenario, serta penguasaan software pengolah grafis.",
      achievements: [
        "Menyelesaikan proyek pembuatan aset 3D dan pemodelan dasar",
        "Menguasai alur kerja produksi animasi mulai dari pra-produksi hingga pasca-produksi",
        "Berpengalaman menyusun storyboard visual untuk video pendek",
        "Membangun kedisiplinan menyelesaikan tugas berstandar industri kreatif"
      ],
      badge: "Vokasi / Kejuruan"
    },
    {
      period: "2022 - 2024",
      title: "Organisasi Gerakan Pramuka",
      institution: "Pangkalan SMK Komputama Majenang",
      type: "organisasi",
      role: "Anggota Aktif & Dewan Ambalan",
      description:
        "Mengikuti pembinaan kepramukaan secara aktif yang menjadi wadah utama pembentukan karakter, kedisiplinan pribadi, daya juang tinggi, kebersamaan regu, serta kepemimpinan dalam kegiatan lapangan maupun sosial.",
      achievements: [
        "Berpartisipasi aktif dalam koordinasi dan kepanitiaan perkemahan tahunan",
        "Melatih kemampuan manajemen waktu, ketahanan mental, dan kepemimpinan",
        "Menjadi bagian dari tim publikasi dan logistik operasional kegiatan",
        "Menjunjung tinggi kode kehormatan Tri Satya dan Dasa Darma Pramuka"
      ],
      badge: "Kepemimpinan & Karakter"
    }
  ] as EducationExperience[],

  whyHireMe: [
    {
      title: "Perpaduan Kreatif & Analitis (Dual Advantage)",
      desc: "Jarang ditemukan kandidat yang memiliki pemahaman logika Sistem Informasi (database, alur sistem) sekaligus sentuhan estetika visual (3D modeling, Canva). Sahal mampu berkomunikasi dengan tim teknis maupun tim kreatif dengan lancar.",
      icon: "Sparkles"
    },
    {
      title: "Etos Kerja & Kedisiplinan Pramuka",
      desc: "Gemblengan organisasi kepramukaan membentuk kepribadian yang tangguh, tepat waktu, bertanggung jawab, menghargai instruksi, dan memiliki etika kerja profesional dalam situasi kerja tim.",
      icon: "ShieldCheck"
    },
    {
      title: "Praktis & Menguasai Tools Modern",
      desc: "Terampil menggunakan Canva untuk produksi konten promosi yang cepat dan eye-catching, serta memahami pembuatan aset 3D untuk kebutuhan visual yang lebih berdimensi dan modern.",
      icon: "Layers"
    },
    {
      title: "Cepat Belajar & Adaptif Terhadap Kebutuhan",
      desc: "Memiliki motivasi belajar yang tinggi, mudah diarahkan, dan haus akan pengalaman baru untuk memberikan kontribusi nyata bagi perusahaan atau tim proyek Anda.",
      icon: "Zap"
    }
  ]
};
