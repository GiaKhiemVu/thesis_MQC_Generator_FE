# 🧠 MQC Generator – Thesis Project Frontend

This is the frontend application for the MQC (Multiple-choice Question) Generator, developed as part of a thesis project. It provides an interactive interface for generating fill-in-the-blank questions, extracting answers, and creating distractors using AI models.

## 🚀 Features

- **Blank Question Generator**: Transform sentences into fill-in-the-blank questions.
- **Answer Extraction**: Automatically extract answers from given sentences.
- **Distractor Generation**: Generate plausible distractors for multiple-choice questions.
- **Process Visualization**: View the step-by-step process from input to final question generation.
- **Model Selection**: Choose different AI models for extraction and distractor generation.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) with App Router
- **UI Library**: [Material-UI (MUI)](https://mui.com/) for responsive and accessible components
- **Language**: TypeScript

## 📦 Installation

1. **Clone the repository**:

```bash
git clone https://github.com/GiaKhiemVu/thesis_MQC_Generator_FE.git
cd thesis_MQC_Generator_FE
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
```

## 🚴‍♂️ Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🧪 Usage

1. **Home Page**: Generate blank questions by entering a sentence.
2. **Extract Answer**: Input a sentence to extract the answer using selected AI models.
3. **Distractors Generator**: Provide a question and answer to generate distractors.
4. **Process Details**: Visualize the entire process from input to final question, including intermediate steps and model outputs.

## 🧩 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js pages and routing
│   ├── components/         # Reusable UI components
│   ├── api/                # API service functions
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).
