# Ateji - Japanese Name Converter

A modern web application that transforms names into beautiful Japanese kanji characters using AI technology.

![Ateji Screenshot](https://images.unsplash.com/photo-1505940545481-2cac7ae15782?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2Fuaml8ZW58MHx8MHx8fDA%3D)

## Features

- **Name to Kanji Conversion**: Transform any name into meaningful Japanese kanji characters
- **Detailed Explanations**: Get detailed meanings and explanations for each kanji character
- **Multiple Variations**: Receive multiple kanji combinations for each name
- **User Authentication**: Save favorite translations and maintain search history
- **Cross-Platform UI**: Adaptive design for iOS, Android, and desktop platforms
- **Share Functionality**: Share translations on social media platforms

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **AI Integration**: Groq API for intelligent name translations
- **Email Service**: SendGrid for contact form
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   VITE_GROQ_API_KEY=your_groq_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_SENDGRID_API_KEY=your_sendgrid_api_key
   VITE_CONTACT_EMAIL=your_contact_email
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/        # React components
├── contexts/         # Context providers
├── hooks/           # Custom React hooks
├── services/        # API and external services
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── styles/          # Global styles and CSS
```

## Key Features Explained

### Name Translation
- Uses AI to generate meaningful kanji combinations
- Provides multiple variations with explanations
- Ensures cultural and linguistic accuracy

### User Features
- Save favorite translations
- View and manage search history
- Share translations on social media
- Contact form for support

### Platform-Specific UI
- Adaptive design for different platforms
- iOS-specific UI components
- Android Material Design elements
- Desktop-optimized interface

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or feedback, please use the contact form in the application or create an issue in the repository.
