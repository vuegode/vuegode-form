# vuegode-form

**vuegode-form** is a dynamic and reusable form generator built with Vue 3 and TypeScript. It's designed to simplify and accelerate the creation of customizable forms in Vue applications.

## 🚀 Features

- 🧩 Declarative schema-based field definition
- 🔧 Support for multiple input types (`text`, `email`, `select`, etc.)
- ⚙️ Built-in and custom validation support
- 🎨 Seamless integration with Tailwind CSS
- 📤 Data submission via `@submit` event
- ♻️ Fully reusable component
- 🔒 Zod integration for schema validation

## 📦 Installation

```bash
git clone https://github.com/vuegode/vuegode-form.git
cd vuegode-form
npm install
npm run dev
```

> This project uses [Vite](https://vitejs.dev/) as its development environment.

## 🧠 Basic Usage

```vue
<script setup lang="ts">
import VuegodeForm from "@/components/VuegodeForm.vue";

const formSchema = [
  { type: "text", name: "nombre", label: "Nombre", required: true },
  { type: "email", name: "correo", label: "Correo electrónico" },
  {
    type: "select",
    name: "pais",
    label: "País",
    options: ["Perú", "México", "Colombia"],
  },
];

const handleSubmit = (data: Record<string, any>) => {
  console.log("Form submitted:", data);
};
</script>

<template>
  <VuegodeForm :schema="formSchema" @submit="handleSubmit" />
</template>
```

## 📁 Project Structure

```
src/
├── components/
│   ├── VuegodeForm.vue
│   └── fields/
│       ├── TextField.vue
│       ├── SelectField.vue
│       └── ...
├── composables/
│   └── useForm.ts
├── utils/
│   └── validators.ts
├── App.vue
└── main.ts
```

## ✅ Supported Field Types

- `text`
- `email`
- `number`
- `password`
- `textarea`
- `select`
- `checkbox`
- ...and more coming soon

## 🔒 Validation

Each field can include validation rules:

```ts
{
  type: 'text',
  name: 'usuario',
  label: 'Usuario',
  required: true,
  rules: [
    { type: 'minLength', value: 4, message: 'Minimum 4 characters' },
    { type: 'pattern', value: /^[a-z0-9]+$/, message: 'Lowercase letters and numbers only' }
  ]
}
```

## 💡 Future Plans

- Nested field support
- Custom field components
- Publish as an NPM package (`npm install vuegode-form`)

## 🤝 Contributions

All contributions are welcome! You can:

- Report bugs
- Suggest improvements
- Submit pull requests
- Help maintain or expand the project

## 📄 License

MIT License

---

Made with ❤️ by [Griego Code](https://github.com/grigode)
