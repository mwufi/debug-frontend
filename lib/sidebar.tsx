import { Command, AudioWaveform } from "lucide-react"

export async function getFavorites() {
    return [
        {
            name: "Project Management & Task Tracking",
            url: "#",
            emoji: "📊",
        },
        {
            name: "Family Recipe Collection & Meal Planning",
            url: "#",
            emoji: "🍳",
        },
        {
            name: "Fitness Tracker & Workout Routines",
            url: "#",
            emoji: "💪",
        },
        {
            name: "Book Notes & Reading List",
            url: "#",
            emoji: "📚",
        },
        {
            name: "Sustainable Gardening Tips & Plant Care",
            url: "#",
            emoji: "🌱",
        },
        {
            name: "Language Learning Progress & Resources",
            url: "#",
            emoji: "🗣️",
        },
        {
            name: "Home Renovation Ideas & Budget Tracker",
            url: "#",
            emoji: "🏠",
        },
        {
            name: "Personal Finance & Investment Portfolio",
            url: "#",
            emoji: "💰",
        },
        {
            name: "Movie & TV Show Watchlist with Reviews",
            url: "#",
            emoji: "🎬",
        },
        {
            name: "Daily Habit Tracker & Goal Setting",
            url: "#",
            emoji: "✅",
        },
    ]
}

export async function getWorkspaces() {
    return [
        {
            name: "Personal Life Management",
            emoji: "🏠",
            pages: [
                {
                    name: "Daily Journal & Reflection",
                    url: "#",
                    emoji: "📔",
                },
                {
                    name: "Health & Wellness Tracker",
                    url: "#",
                    emoji: "🍏",
                },
                {
                    name: "Personal Growth & Learning Goals",
                    url: "#",
                    emoji: "🌟",
                },
            ],
        },
        {
            name: "Professional Development",
            emoji: "💼",
            pages: [
                {
                    name: "Career Objectives & Milestones",
                    url: "#",
                    emoji: "🎯",
                },
                {
                    name: "Skill Acquisition & Training Log",
                    url: "#",
                    emoji: "🧠",
                },
                {
                    name: "Networking Contacts & Events",
                    url: "#",
                    emoji: "🤝",
                },
            ],
        },
        {
            name: "Creative Projects",
            emoji: "🎨",
            pages: [
                {
                    name: "Writing Ideas & Story Outlines",
                    url: "#",
                    emoji: "✍️",
                },
                {
                    name: "Art & Design Portfolio",
                    url: "#",
                    emoji: "🖼️",
                },
                {
                    name: "Music Composition & Practice Log",
                    url: "#",
                    emoji: "🎵",
                },
            ],
        },
        {
            name: "Home Management",
            emoji: "🏡",
            pages: [
                {
                    name: "Household Budget & Expense Tracking",
                    url: "#",
                    emoji: "💰",
                },
                {
                    name: "Home Maintenance Schedule & Tasks",
                    url: "#",
                    emoji: "🔧",
                },
                {
                    name: "Family Calendar & Event Planning",
                    url: "#",
                    emoji: "📅",
                },
            ],
        },
        {
            name: "Travel & Adventure",
            emoji: "🧳",
            pages: [
                {
                    name: "Trip Planning & Itineraries",
                    url: "#",
                    emoji: "🗺️",
                },
                {
                    name: "Travel Bucket List & Inspiration",
                    url: "#",
                    emoji: "🌎",
                },
                {
                    name: "Travel Journal & Photo Gallery",
                    url: "#",
                    emoji: "📸",
                },
            ],
        },
    ]
}

export async function getTeams() {
    return [
        {
            name: "Acme Inc",
            logo: Command,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ]
}

export async function getSidebarData() {
    return {
        favorites: await getFavorites(),
        workspaces: await getWorkspaces(),
        teams: await getTeams(),
    }
}
