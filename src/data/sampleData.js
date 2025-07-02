// src/data/sampleData.js

export const ideas = [
  {
    id: "idea1",
    title: "EcoDeliver - Sustainable Food Delivery",
    description: "Revolutionary food delivery service using reusable containers and electric vehicles to reduce environmental impact. Partner with restaurants to create a circular economy model.",
    needs: ["Full Stack Developer", "Investment", "Marketing Expert"],
    category: "Startup",
    tags: ["Sustainability", "FoodTech", "Logistics", "GreenTech"],
    creatorId: "user1",
    createdAt: "2025-01-15",
    fundingRequired: 500000,
    stage: "Idea",
    location: "Mumbai, India"
  },
  {
    id: "idea2",
    title: "SkillBridge - Rural Employment Platform",
    description: "Connecting rural workers with urban opportunities through skill verification and remote work matching. Focus on bridging the digital divide and creating sustainable employment.",
    needs: ["Investment", "HR Specialist", "Community Outreach"],
    category: "Social Impact",
    tags: ["Employment", "Rural Development", "Digital Inclusion", "SocialTech"],
    creatorId: "user3",
    createdAt: "2025-01-10",
    fundingRequired: 200000,
    stage: "MVP",
    location: "Delhi, India"
  },
  {
    id: "idea3",
    title: "MediTrack - Healthcare Analytics",
    description: "Personal health monitoring app that tracks vital signs, medication schedules, and provides predictive health insights using machine learning.",
    needs: ["Data Scientist", "Mobile Developer", "Healthcare Expert"],
    category: "HealthTech",
    tags: ["Healthcare", "AI", "Mobile", "Analytics"],
    creatorId: "user4",
    createdAt: "2025-01-08",
    fundingRequired: 300000,
    stage: "Research",
    location: "Pune, India"
  },
  {
    id: "idea4",
    title: "CryptoLearn - Blockchain Education",
    description: "Interactive platform teaching blockchain technology through gamified lessons and real crypto trading simulations for professionals and enthusiasts.",
    needs: ["Blockchain Developer", "UI/UX Designer", "Investment"],
    category: "Fintech",
    tags: ["Blockchain", "Fintech", "Gamification", "Professional Development"],
    creatorId: "user5",
    createdAt: "2025-01-05",
    fundingRequired: 400000,
    stage: "Beta",
    location: "Hyderabad, India"
  },
  {
    id: "idea5",
    title: "AgriTech Solutions - Smart Farming",
    description: "IoT-based smart farming solutions that help farmers optimize crop yield, monitor soil health, and reduce water consumption through data-driven insights.",
    needs: ["IoT Developer", "Agricultural Expert", "Investment"],
    category: "AgriTech",
    tags: ["Agriculture", "IoT", "Sustainability", "Data Analytics"],
    creatorId: "user2",
    createdAt: "2025-01-12",
    fundingRequired: 350000,
    stage: "Prototype",
    location: "Bangalore, India"
  }
];

export const users = [
  {
    id: "user1",
    name: "Aarav Singh",
    email: "aarav@example.com",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    investment: 0,
    interests: ["Fintech", "Sustainability", "HealthTech"],
    isInvestor: false,
    location: "Mumbai, India",
    experience: "3 years",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "user2", 
    name: "Neha Mehta",
    email: "neha@example.com",
    skills: ["UI/UX Design", "Social Media", "Content Strategy"],
    investment: 100000,
    interests: ["Sustainability", "HealthTech", "AgriTech"],
    isInvestor: true,
    location: "Bangalore, India",
    experience: "5 years",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "user3",
    name: "Rohit Kumar",
    email: "rohit@example.com", 
    skills: ["Python", "Machine Learning", "Data Analysis"],
    investment: 250000,
    interests: ["AI", "HealthTech", "Fintech"],
    isInvestor: true,
    location: "Delhi, India",
    experience: "7 years",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "user4",
    name: "Priya Sharma",
    email: "priya@example.com",
    skills: ["Digital Marketing", "Business Development", "Sales"],
    investment: 150000,
    interests: ["SocialImpact", "HealthTech", "Sustainability"],
    isInvestor: true,
    location: "Pune, India", 
    experience: "4 years",
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "user5",
    name: "Vikram Patel",
    email: "vikram@example.com",
    skills: ["Blockchain", "Smart Contracts", "Solidity"],
    investment: 0,
    interests: ["Fintech", "Blockchain", "DeFi"],
    isInvestor: false,
    location: "Hyderabad, India",
    experience: "6 years",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=150&h=150&fit=crop&crop=face"
  }
];

export const workspaces = [
  {
    id: "workspace1",
    name: "EcoDeliver Development Hub",
    description: "Collaborative workspace for developing the sustainable food delivery platform",
    ideaId: "idea1",
    ownerId: "user1",
    members: ["user1", "user2"],
    status: "Active",
    createdAt: "2025-01-16",
    milestones: [
      {
        id: "milestone1",
        title: "MVP Development",
        description: "Complete the minimum viable product",
        dueDate: "2025-03-01",
        status: "In Progress",
        progress: 65
      },
      {
        id: "milestone2",
        title: "Beta Testing",
        description: "Launch beta version with select restaurants",
        dueDate: "2025-04-15",
        status: "Planned",
        progress: 0
      }
    ],
    tasks: [
      {
        id: "task1",
        title: "Design reusable container system",
        description: "Create specifications for eco-friendly containers",
        assignedTo: "user2",
        status: "In Progress",
        priority: "High",
        dueDate: "2025-01-25",
        estimatedHours: 40,
        actualHours: 25,
        milestoneId: "milestone1"
      },
      {
        id: "task2", 
        title: "Develop mobile app MVP",
        description: "Build core features for customer app",
        assignedTo: "user1",
        status: "Todo",
        priority: "High",
        dueDate: "2025-02-01",
        estimatedHours: 120,
        actualHours: 0,
        milestoneId: "milestone1"
      },
      {
        id: "task3",
        title: "Restaurant partnership outreach",
        description: "Contact and onboard initial restaurant partners",
        assignedTo: "user2",
        status: "Completed",
        priority: "Medium",
        dueDate: "2025-01-20",
        estimatedHours: 30,
        actualHours: 35,
        milestoneId: "milestone1"
      }
    ],
    resources: [
      {
        id: "resource1",
        name: "Market Research Report",
        type: "document",
        url: "#",
        uploadedBy: "user1",
        uploadedAt: "2025-01-16"
      },
      {
        id: "resource2",
        name: "Container Design Mockups",
        type: "design",
        url: "#",
        uploadedBy: "user2",
        uploadedAt: "2025-01-18"
      }
    ],
    timeline: [
      {
        id: "event1",
        title: "Project Kickoff",
        description: "Initial team meeting and project planning",
        date: "2025-01-16",
        type: "meeting",
        participants: ["user1", "user2"]
      },
      {
        id: "event2",
        title: "First Restaurant Partnership",
        description: "Signed agreement with Green Bites Restaurant",
        date: "2025-01-20",
        type: "milestone",
        participants: ["user2"]
      }
    ]
  },
  {
    id: "workspace2",
    name: "SkillBridge Planning Room",
    description: "Strategic planning and development workspace for rural employment platform",
    ideaId: "idea2",
    ownerId: "user3",
    members: ["user3", "user4"],
    status: "Active",
    createdAt: "2025-01-12",
    milestones: [
      {
        id: "milestone3",
        title: "Platform Launch",
        description: "Launch the platform in 3 rural districts",
        dueDate: "2025-05-01",
        status: "In Progress",
        progress: 30
      }
    ],
    tasks: [
      {
        id: "task4",
        title: "Conduct rural community outreach",
        description: "Visit villages and understand employment needs",
        assignedTo: "user4",
        status: "In Progress",
        priority: "Medium",
        dueDate: "2025-01-30",
        estimatedHours: 60,
        actualHours: 20,
        milestoneId: "milestone3"
      },
      {
        id: "task5",
        title: "Develop skill verification system",
        description: "Create system to verify and rate worker skills",
        assignedTo: "user3",
        status: "Todo",
        priority: "High",
        dueDate: "2025-02-15",
        estimatedHours: 80,
        actualHours: 0,
        milestoneId: "milestone3"
      }
    ],
    resources: [
      {
        id: "resource3",
        name: "Rural Employment Survey",
        type: "document",
        url: "#",
        uploadedBy: "user4",
        uploadedAt: "2025-01-14"
      }
    ],
    timeline: [
      {
        id: "event3",
        title: "Project Planning Session",
        description: "Defined project scope and timeline",
        date: "2025-01-12",
        type: "meeting",
        participants: ["user3", "user4"]
      }
    ]
  },
  {
    id: "workspace3",
    name: "MediTrack Innovation Lab",
    description: "Healthcare analytics development workspace",
    ideaId: "idea3",
    ownerId: "user4",
    members: ["user4", "user3", "user1"],
    status: "Planning",
    createdAt: "2025-01-10",
    milestones: [
      {
        id: "milestone4",
        title: "Research Phase Completion",
        description: "Complete market research and technical feasibility study",
        dueDate: "2025-02-28",
        status: "In Progress",
        progress: 45
      }
    ],
    tasks: [
      {
        id: "task6",
        title: "Healthcare regulations research",
        description: "Study compliance requirements for health data",
        assignedTo: "user4",
        status: "In Progress",
        priority: "High",
        dueDate: "2025-02-01",
        estimatedHours: 50,
        actualHours: 20,
        milestoneId: "milestone4"
      },
      {
        id: "task7",
        title: "ML model architecture design",
        description: "Design machine learning models for health predictions",
        assignedTo: "user3",
        status: "Todo",
        priority: "High",
        dueDate: "2025-02-15",
        estimatedHours: 70,
        actualHours: 0,
        milestoneId: "milestone4"
      }
    ],
    resources: [],
    timeline: [
      {
        id: "event4",
        title: "Team Formation",
        description: "Assembled core development team",
        date: "2025-01-10",
        type: "milestone",
        participants: ["user4", "user3", "user1"]
      }
    ]
  }
];

export const messages = [
  {
    id: "msg1",
    senderId: "user1",
    receiverId: "user2", 
    content: "Hey Neha, I saw your interest in AgriTech. I'm working on EcoDeliver and would love to discuss potential collaboration!",
    createdAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "msg2", 
    senderId: "user2",
    receiverId: "user1",
    content: "Hi Aarav! That sounds fantastic. I've been looking for sustainable projects to invest in. Can you tell me more about your user acquisition strategy?",
    createdAt: "2025-01-15T10:05:00Z"
  },
  {
    id: "msg3",
    senderId: "user1", 
    receiverId: "user2",
    content: "Absolutely! We're planning to start with 5 restaurants in Mumbai and use a referral system. Customers earn points for using reusable containers.",
    createdAt: "2025-01-15T10:10:00Z"
  },
  {
    id: "msg4",
    senderId: "user2",
    receiverId: "user1", 
    content: "Interesting approach! Have you considered partnerships with environmental organizations? I have connections at several NGOs.",
    createdAt: "2025-01-15T10:15:00Z"
  },
  {
    id: "msg5",
    senderId: "user3",
    receiverId: "user4",
    content: "Hi Priya, I noticed your interest in social impact projects. Would you like to discuss SkillBridge?",
    createdAt: "2025-01-14T14:30:00Z"
  },
  {
    id: "msg6",
    senderId: "user4", 
    receiverId: "user3",
    content: "Hello Rohit! Yes, I'm very interested in rural development initiatives. How can I help with SkillBridge?",
    createdAt: "2025-01-14T14:45:00Z"
  }
];

export const categories = [
  "All",
  "Startup", 
  "Social Impact",
  "HealthTech",
  "Fintech",
  "GreenTech",
  "AgriTech"
];

export const skillCategories = [
  "Development",
  "Design", 
  "Marketing",
  "Business",
  "Investment",
  "Other"
];

export const currentUser = {
  id: "user1",
  name: "Aarav Singh",
  email: "aarav@example.com"
};