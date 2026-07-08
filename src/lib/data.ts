import { withBasePath } from '@/lib/utils'

export const personalInfo = {
  name: 'Aakash Kharb',
  shortName: 'AK27',
  tagline: 'आकाश : Sky, in the Clouds ?',
  roles: ['Gen AI', 'Software Logics', 'Cloud Engineering', 'Machine Learning'],
  email: 'akharbrtk2@gmail.com',
  phone: '+91 9416167422',
  location: 'Rohtak, Haryana, India',
  birthday: 'November 27, 2004',
  age: 20,
  website: 'aakash-test7.github.io',
  degree: 'BTech. CSE - AI&MLE at Maharshi Dayanand University, Rohtak',
  bio: 'Passionate about leveraging cutting-edge cloud technologies and advanced AI to optimize workflows, drive innovation, and solve real-world problems with impactful, scalable solutions.',
  social: {
    github: 'https://www.github.com/aakash-test7',
    linkedin: 'https://www.linkedin.com/in/aakash-kharb',
    youtube: 'https://www.youtube.com/@aakash.027',
  },
}

export const education = [
  {
    degree: 'Bachelor of Technology',
    field: 'Artificial Intelligence and Machine Learning Engineering',
    institution: 'University Institute of Engineering and Technology, Maharshi Dayanand University',
    location: 'Rohtak, Haryana',
    duration: '2022 - 2026',
    cgpa: 'In Progress',
    activities: [
      'BioTech Researcher',
      'Esports Champion',
      'Mentor - AI StudentTechHub',
      'Member - NSS (National Service Scheme)'
    ],
  },
  {
    degree: 'Senior Secondary',
    field: 'Science, CBSE Board',
    institution: 'Pathania Public School',
    location: 'Rohtak, Haryana',
    duration: '2020 - 2022',
    percentage: '89%',
    activities: [
      'Regional Science & Math Quiz Runner-up',
      'Declamation',
      'National Social Service',
      'Computer Club',
    ],
  },
  {
    degree: 'Secondary',
    field: 'CBSE Board',
    institution: 'Pathania Public School',
    location: 'Rohtak, Haryana',
    duration: '2019 - 2020',
    percentage: '97.6%',
    activities: [
      'English Language Merit Certificate',
      'Science & Math Olympiads',
      'Declamation, Debate',
      {
        main: 'Volunteer',
        sub: ['School Exhibition', 'Annual Sports Meet']
      }
    ],
  },
]

export const skills = {
  development: [
    { name: 'Python', icon: 'FaPython', level: 90 },
    { name: 'C++', icon: 'SiCplusplus', level: 80 },
    { name: 'SQL', icon: 'SiMysql', level: 85 },
    { name: 'R', icon: 'SiR', level: 70 },
    { name: 'MATLAB', icon: 'SiMathworks', level: 75 },
    { name: 'HTML/CSS', icon: 'FaHtml5', level: 90 },
  ],
  cloudDevOps: [
    { name: 'GCP', icon: 'SiGooglecloud', level: 85 },
    { name: 'Azure', icon: 'MdCloud', level: 75 },
    { name: 'Docker', icon: 'FaDocker', level: 85 },
    { name: 'Kubernetes', icon: 'SiKubernetes', level: 75 },
  ],
  aiDataScience: [
    { name: 'TensorFlow', icon: 'SiTensorflow', level: 85 },
    { name: 'PyTorch', icon: 'SiPytorch', level: 85 },
    { name: 'Scikit-learn', icon: 'FaChartLine', level: 85 },
    { name: 'Pandas', icon: 'FaChartLine', level: 90 },
    { name: 'Neural Networks', icon: 'LuBrainCircuit', level: 85 },
    { name: 'Computer Vision', icon: 'MdRemoveRedEye', level: 80 },
    { name: 'NLP', icon: 'FaComments', level: 80 },
    { name: 'Streamlit', icon: 'SiStreamlit', level: 80 },
  ],
  toolsOS: [
    { name: 'Git', icon: 'FaGitAlt', level: 90 },
    { name: 'GitHub', icon: 'FaGitAlt', level: 90 },
    { name: 'VSCode', icon: 'MdCode', level: 95 },
    { name: 'Selenium', icon: 'SiSelenium', level: 75 },
    { name: 'MLOps', icon: 'MdCloud', level: 75 },
    { name: 'Linux', icon: 'FaLinux', level: 85 },
    { name: 'macOS', icon: 'FaApple', level: 90 },
    { name: 'Windows', icon: 'FaWindows', level: 85 },
  ],
}

export const projects = [
  // Row 1: 2 cards (large + small)
  {
    title: "Chickpea Omics Explorer",
    description: "Interdisciplinary research project focused on Chickpea Transcriptome Analysis using AI/ML to uncover patterns in gene expression and assist with biological data interpretation.",
    image: withBasePath('/images/demo-1.png'),
    link: "https://www.chickpea.mdu.ac.in",
    tags: ["Python", "Selenium", "Streamlit", "MySQL"],
    category: "research",
    colSpan: 2,
    rowSpan: 1
  },
  {
    title: "Game Recommendation System",
    description: "Content-based recommendation system using KNN and cosine similarity with feature engineering, MinMaxScaler and one-hot encoding.",
    image: withBasePath('/images/demo-2.png'),
    link: "https://aakash-game.streamlit.app",
    tags: ["Python", "GCP", "ML"],
    category: "mle",
    colSpan: 1,
    rowSpan: 1
  },
  // Row 2: 2 cards (small + large)
  {
    title: "Web Terminal",
    description: "macOS Terminal inspired Web App - A browser-based terminal emulator with interactive functionality, file system simulation, light/dark mode, and realistic macOS UI with traffic light controls.",
    image: withBasePath('/images/demo-3.png'),
    link: "https://aakash-terminal.vercel.app",
    tags: ["JavaScript", "CSS", "Terminal"],
    category: "sw",
    colSpan: 1,
    rowSpan: 1
  },
  {
    title: "TechWill x Olympics",
    description: "Cloud-integrated web application for Paris 2024 Olympics data with real-time exploration, medal prediction using simulation logic, and intelligent chatbot for event insights. Built with Python and Streamlit, hosted on GCP.",
    image: withBasePath('/images/demo-5.png'),
    link: "https://aakash-olympics.streamlit.app",
    tags: ["GCP", "Python", "Streamlit", "ML"],
    category: "mle",
    colSpan: 2,
    rowSpan: 1
  },
  // Row 3: 2 cards (large + small)
  {
    title: "Docx PDF Summarizer",
    description: "Intelligent PDF summarization tool powered by Google's Gemini API. Extracts, analyzes, and simplifies PDF content with interactive visualizations, conversational Q&A, and cloud integration for researchers and professionals.",
    image: withBasePath('/images/demo-6.png'),
    link: "https://aakash-docx.streamlit.app",
    tags: ["GCP", "Gemini API", "Streamlit"],
    category: "mle",
    colSpan: 2,
    rowSpan: 1
  },
  {
    title: "WeatherWill",
    description: "Responsive weather application providing current weather conditions, astronomical data (sunrise/sunset, moon phase), air quality metrics (CO, NO₂, O₃, PM2.5), and detailed forecasts for locations worldwide.",
    image: withBasePath('/images/demo-4.png'),
    link: "https://aakash-test7.github.io/WeatherWill/",
    tags: ["JavaScript", "API", "CSS"],
    category: "sw",
    colSpan: 1,
    rowSpan: 1
  },
  // Row 4: 1 large centered card
  {
    title: "Bank Database Management System",
    description: "Python x MySQL tutorial project for managing customer records with database creation, table operations, passbook management, and user-friendly interface via Streamlit for learning DBMS concepts.",
    image: withBasePath('/images/demo.png'),
    link: "https://aakash-dbms.streamlit.app",
    tags: ["Python", "MySQL", "Streamlit"],
    category: "sw",
    colSpan: 2,
    rowSpan: 1
  }
];

export const stats = [
  {
    icon: 'FaProjectDiagram',
    count: 15,
    label: 'Projects Completed',
  },
  {
    icon: 'FaAward',
    count: 5,
    label: 'Awards & Certificates',
  },
  {
    icon: 'FaCode',
    count: 10000,
    label: 'Lines of Code',
  },
  {
    icon: 'FaCoffee',
    count: 500,
    label: 'Cups of Coffee',
  },
]
