Runware Image Generator

This is a Next.js application that uses the Runware API to generate images based on user input. The application provides a user-friendly interface for configuring various parameters for image generation.

Features

Input for Runware API key
Text prompts for image description
Negative prompts for excluding unwanted elements
Adjustable image dimensions
Configurable inference steps and guidance scale
Seed input for reproducible results
Batch size and number of results options
Scheduler selection
Options for using LCM, XL, Refiner, and ControlNet
Model selection
Output type and format selection
Real-time image preview

Prerequisites

Before you begin, ensure you have met the following requirements:

Node.js (v14.0.0 or later)
npm (v6.0.0 or later)
A Runware API key

Installation

Clone the repository:
git clone [https://github.com/yourusername/runware-image-generator.git](https://github.com/yourusername/runware-image-generator.git)

```plaintext

2. Navigate to the project directory:
```

cd runware-image-generator

```plaintext

3. Install the dependencies:
```

npm install

```plaintext

## Usage

1. Start the development server:
```

npm run dev

```plaintext

2. Open your browser and visit `http://localhost:3000`

3. Enter your Runware API key and configure the image generation parameters

4. Click the "Generate Image" button to create your image

## Configuration

The application uses Next.js 13 with the App Router. The main component is located in `components/RunwareApp.tsx`. You can modify this file to add or remove features as needed.

Here's the file structure for the Runware Image Generator project:

```plaintext
runware-image-generator/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   └── switch.tsx
│   └── RunwareApp.tsx
├── styles/
│   └── globals.css
├── public/
│   └── favicon.ico
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tailwind.config.js
```

Let's break down the structure:

1. `app/`: This directory contains the main application files for Next.js 13 with App Router.

1. `layout.tsx`: The root layout component.
2. `page.tsx`: The main page component that renders the RunwareApp.



2. `components/`: This directory contains all the React components used in the application.

1. `ui/`: This subdirectory contains the shadcn/ui components.

1. `button.tsx`: The Button component.
2. `card.tsx`: The Card component.
3. `input.tsx`: The Input component.
4. `select.tsx`: The Select component.
5. `slider.tsx`: The Slider component.
6. `switch.tsx`: The Switch component.



2. `RunwareApp.tsx`: The main component for the Runware Image Generator.



3. `styles/`: This directory contains global styles.

1. `globals.css`: Global CSS file, including Tailwind directives.



4. `public/`: This directory is for static assets.

1. `favicon.ico`: The favicon for the website.



5. `.gitignore`: Specifies which files Git should ignore.
6. `next.config.js`: Configuration file for Next.js.
7. `package.json`: Defines the project dependencies and scripts.
8. `README.md`: Contains information about the project, how to set it up, and how to use it.
9. `tailwind.config.js`: Configuration file for Tailwind CSS.

## Contributing

Contributions to the Runware Image Generator are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Runware API](https://runware.ai/)
```