# 📊 API Integration Dashboard

A modern, responsive, and high-performance Web Dashboard built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. This application consumes a REST API using **Axios** and encapsulates all network logic inside a custom reusable React hook (`useFetch`).

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Axios](https://img.shields.io/badge/Axios-1.6-5A29E4?style=flat-square&logo=axios)

---

## ✨ Features

- **Custom Hook Architecture (`useFetch`):** Total separation of concerns—UI components do not handle HTTP calls directly.
- **Complete Lifecycle Handling:**
  - ⏳ **Loading State:** Smooth spinner animations while fetching remote data.
  - ⚠️ **Error State:** User-friendly error messaging with a functional "Retry Request" trigger.
  - 📭 **Empty State:** Clean fallback state for empty dataset payloads.
- **Real-Time Client Search:** Instant client-side search filtering across user name, email, and company fields.
- **Analytics Metrics:** Top summary cards displaying key metric calculations (Users, Companies, Locations).
- **Enterprise Dark UI:** Styled with high-contrast Tailwind CSS, gradient initial badges, and Lucide React icons.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **API Source:** [JSONPlaceholder Users REST API](https://jsonplaceholder.typicode.com/users)

---

## 📁 Project Structure

```text
my-next-app/
├── app/
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard Main UI Component
│   ├── layout.tsx           # Global App Layout
│   └── page.tsx             # Entry Point (Renders Dashboard)
├── hooks/
│   └── useFetch.ts          # Encapsulated Custom Axios Hook
├── public/                  # Static Assets
└── package.json             # Project Dependencies
