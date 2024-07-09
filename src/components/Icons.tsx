import { LucideProps, MessageSquare, User } from 'lucide-react';

export const Icons = {
    user: User,
    logo: (props: LucideProps) => (
        <svg {...props} viewBox="0 0 120 180">
            <path
                fill="url(#paint0_linear_1_12)"
                fillRule="evenodd"
                d="M81.552 5.862c2.023 3.666-.244 11.116-6.071 12.83l-19.943 6.106C8.866 35.858 13.23 77.015 62.097 84.202c71.93 10.579 78.789 71.695 9.626 88.086l-34.865 6.793c-1.088.211-1.694-1.211-.788-1.849 17.82-12.545 42.175-17.444 55.115-34.98 12.092-16.387-.237-38.348-34.697-43.416-71.93-10.579-73.803-68.534-13.385-91.141L67.387.363c6.262-1.485 12.141 1.832 14.165 5.499z"
                clipRule="evenodd"
            ></path>
            <defs>
                <linearGradient
                    id="paint0_linear_1_12"
                    x1="60"
                    x2="59.419"
                    y1="0"
                    y2="180"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#343A40"></stop>
                    <stop offset="0.465" stopColor="#6C757D"></stop>
                    <stop offset="1" stopColor="#212529"></stop>
                </linearGradient>
            </defs>
        </svg>
    ),
    google: (props: LucideProps) => (
        <svg {...props} viewBox="0 0 24 24">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
        </svg>
    ),
    commentReply: MessageSquare,
};
