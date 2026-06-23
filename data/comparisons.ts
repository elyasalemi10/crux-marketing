export type ComparisonData = {
  slug: string
  name: string
  logo: string
  tagline: string
  description: string
  heroTitle: string
  features: {
    category: string
    items: {
      feature: string
      cruxlogic: string | boolean
      competitor: string | boolean
      highlight?: boolean
    }[]
  }[]
  summary: {
    cruxlogic: string[]
    competitor: string[]
  }
  ctaTitle: string
  ctaDescription: string
  metaTitle: string
  metaDescription: string
}

export const comparisons: Record<string, ComparisonData> = {
  'twin-so': {
    slug: 'twin-so',
    name: 'Twin.so',
    logo: '/logos/twin-so-logo.webp',
    tagline: 'AI Agents for Business Automation',
    description: 'See why an always-on personal assistant beats on-demand workflow agents for everyday productivity.',
    heroTitle: 'CruxLogic vs Twin.so',
    features: [
      {
        category: 'Always Available',
        items: [
          { feature: 'Works while you sleep', cruxlogic: true, competitor: false, highlight: true },
          { feature: 'Instant response to messages', cruxlogic: true, competitor: 'Requires trigger' },
          { feature: 'Remembers your preferences', cruxlogic: true, competitor: 'Session-based', highlight: true },
          { feature: 'Learns from your behavior', cruxlogic: true, competitor: false },
        ]
      },
      {
        category: 'Ease of Use',
        items: [
          { feature: 'Just talk naturally', cruxlogic: true, competitor: 'Build workflows', highlight: true },
          { feature: 'No setup or configuration', cruxlogic: true, competitor: 'Requires workflow design' },
          { feature: 'Works immediately after signup', cruxlogic: true, competitor: 'Setup required' },
          { feature: 'Mobile access via Telegram', cruxlogic: true, competitor: false, highlight: true },
        ]
      },
      {
        category: 'What You Can Do',
        items: [
          { feature: 'Read & send emails', cruxlogic: true, competitor: true },
          { feature: 'Manage your calendar', cruxlogic: true, competitor: true },
          { feature: 'Organize tasks & to-dos', cruxlogic: true, competitor: 'Limited' },
          { feature: 'Voice messages & notes', cruxlogic: true, competitor: false },
          { feature: 'File search & management', cruxlogic: true, competitor: 'Limited' },
        ]
      },
      {
        category: 'Security & Control',
        items: [
          { feature: 'Emergency kill switch', cruxlogic: true, competitor: false, highlight: true },
          { feature: 'Your data stays private', cruxlogic: true, competitor: true },
          { feature: 'Revoke access anytime', cruxlogic: true, competitor: true },
        ]
      },
    ],
    summary: {
      cruxlogic: [
        'Always on - working for you 24/7',
        'No workflow building - just natural conversation',
        'Message your assistant from Telegram',
        'Kill switch for instant access revocation',
      ],
      competitor: [
        'Runs only when triggered',
        'Requires workflow configuration',
        'Enterprise-focused automation',
      ],
    },
    ctaTitle: 'Want an assistant that\'s always there?',
    ctaDescription: 'CruxLogic is ready when you are - no setup, no workflows, just ask.',
    metaTitle: 'CruxLogic vs Twin.so - Always-On AI Assistant Comparison 2026',
    metaDescription: 'Compare CruxLogic and Twin.so. See why an always-on AI assistant beats on-demand workflow agents for personal productivity.',
  },
  'n8n': {
    slug: 'n8n',
    name: 'n8n',
    logo: '/logos/n8n-logo.webp',
    tagline: 'Workflow Automation Platform',
    description: 'Stop building workflows. Start having conversations. See why talking to AI beats dragging nodes.',
    heroTitle: 'CruxLogic vs n8n',
    features: [
      {
        category: 'Getting Started',
        items: [
          { feature: 'Ready in 5 minutes', cruxlogic: true, competitor: 'Hours to set up', highlight: true },
          { feature: 'No technical knowledge needed', cruxlogic: true, competitor: false, highlight: true },
          { feature: 'No servers to manage', cruxlogic: true, competitor: 'Self-host required' },
          { feature: 'Updates automatically', cruxlogic: true, competitor: 'Manual updates' },
        ]
      },
      {
        category: 'Daily Use',
        items: [
          { feature: 'Ask in plain English', cruxlogic: true, competitor: false, highlight: true },
          { feature: 'Handles new requests instantly', cruxlogic: true, competitor: 'Build new workflow' },
          { feature: 'Works from your phone', cruxlogic: 'Telegram', competitor: 'Limited' },
          { feature: 'Understands context', cruxlogic: true, competitor: false },
        ]
      },
      {
        category: 'Maintenance',
        items: [
          { feature: 'Nothing to debug', cruxlogic: true, competitor: 'Workflow debugging', highlight: true },
          { feature: 'Nothing to update', cruxlogic: true, competitor: 'Node updates' },
          { feature: 'Nothing breaks', cruxlogic: true, competitor: 'API changes break flows' },
        ]
      },
    ],
    summary: {
      cruxlogic: [
        'Talk to it - no workflow building',
        'Zero maintenance or debugging',
        'Works on mobile via Telegram',
        'Understands what you actually mean',
      ],
      competitor: [
        'Powerful for developers',
        'Hundreds of integrations',
        'Requires technical setup',
        'Ongoing maintenance needed',
      ],
    },
    ctaTitle: 'Tired of building automations?',
    ctaDescription: 'Just tell CruxLogic what you need. No nodes, no connections, no debugging.',
    metaTitle: 'CruxLogic vs n8n - Talk to AI vs Build Workflows 2026',
    metaDescription: 'Compare CruxLogic AI assistant with n8n workflow automation. Why talking to AI beats building visual workflows.',
  },
  'zapier': {
    slug: 'zapier',
    name: 'Zapier',
    logo: '/logos/zapier-logo.webp',
    tagline: 'Automation for Everyone',
    description: 'Stop configuring Zaps. Start having conversations. See why AI assistance beats trigger-action automation.',
    heroTitle: 'CruxLogic vs Zapier',
    features: [
      {
        category: 'How It Works',
        items: [
          { feature: 'Just ask what you need', cruxlogic: true, competitor: 'Build a Zap', highlight: true },
          { feature: 'AI decides how to help', cruxlogic: true, competitor: 'You configure triggers', highlight: true },
          { feature: 'Handles complex requests', cruxlogic: true, competitor: 'Multi-step Zaps (paid)' },
          { feature: 'Changes on the fly', cruxlogic: true, competitor: 'Edit Zap manually' },
        ]
      },
      {
        category: 'What You Can Do',
        items: [
          { feature: 'Draft and send emails', cruxlogic: true, competitor: 'Triggered templates' },
          { feature: 'Schedule meetings for you', cruxlogic: true, competitor: 'Limited' },
          { feature: 'Manage your tasks', cruxlogic: true, competitor: 'Via Zaps' },
          { feature: 'Answer questions about your data', cruxlogic: true, competitor: false, highlight: true },
          { feature: 'Voice messages', cruxlogic: true, competitor: false },
        ]
      },
      {
        category: 'Cost & Limits',
        items: [
          { feature: 'No task limits', cruxlogic: 'Fair usage', competitor: 'Strict tiers', highlight: true },
          { feature: 'No hidden upgrade walls', cruxlogic: true, competitor: 'Features locked' },
          { feature: 'Predictable pricing', cruxlogic: true, competitor: 'Task-based billing' },
        ]
      },
    ],
    summary: {
      cruxlogic: [
        'Just ask in plain English',
        'AI handles the complexity',
        'No Zap limits or tiers',
        'Works from Telegram on mobile',
      ],
      competitor: [
        'Massive integration library',
        'Proven automation platform',
        'Task-based pricing can add up',
        'Learning curve for complex flows',
      ],
    },
    ctaTitle: 'Ready to stop building Zaps?',
    ctaDescription: 'CruxLogic understands what you need and does it. No configuration required.',
    metaTitle: 'CruxLogic vs Zapier - AI Assistant vs Zaps 2026',
    metaDescription: 'Compare CruxLogic AI assistant with Zapier. See why AI conversation beats trigger-action workflows for productivity.',
  },
  'openclaw': {
    slug: 'openclaw',
    name: 'OpenClaw',
    logo: '/logos/openclaw-logo.webp',
    tagline: 'Open Source AI Agent Framework',
    description: 'Enterprise-grade security meets ease of use. See how CruxLogic protects your data.',
    heroTitle: 'CruxLogic vs OpenClaw',
    features: [
      {
        category: 'Security & Privacy',
        items: [
          { feature: 'SOC 2 Type II compliant infrastructure', cruxlogic: true, competitor: 'You implement it' },
          { feature: 'End-to-end encryption', cruxlogic: true, competitor: 'You configure it' },
          { feature: 'Data never used for training', cruxlogic: true, competitor: 'Depends on your setup' },
          { feature: 'Emergency kill switch', cruxlogic: true, competitor: 'Build it yourself' },
          { feature: 'Isolated user environments', cruxlogic: true, competitor: 'You design it' },
          { feature: 'Regular security audits', cruxlogic: true, competitor: 'Your responsibility' },
          { feature: 'GDPR compliant data handling', cruxlogic: true, competitor: 'You ensure it' },
          { feature: 'OAuth 2.0 secure authentication', cruxlogic: true, competitor: true },
          { feature: 'No credential storage', cruxlogic: 'Tokens only', competitor: 'Depends on implementation' },
          { feature: 'Revoke access anytime', cruxlogic: 'One click', competitor: 'Manual process' },
        ]
      },
      {
        category: 'Data Protection',
        items: [
          { feature: 'Your data stays private', cruxlogic: true, competitor: 'Self-hosted option' },
          { feature: 'Automatic data backups', cruxlogic: true, competitor: 'You manage it' },
          { feature: 'Data residency options', cruxlogic: 'EU/US regions', competitor: 'Your infrastructure' },
          { feature: 'Audit logs available', cruxlogic: true, competitor: 'You implement it' },
        ]
      },
      {
        category: 'Enterprise Ready',
        items: [
          { feature: 'Professional support', cruxlogic: '24/7 available', competitor: 'Community forums' },
          { feature: 'SLA guarantees', cruxlogic: '99.9% uptime', competitor: 'None' },
          { feature: 'Security documentation', cruxlogic: 'Available on request', competitor: 'You create it' },
          { feature: 'Compliance certifications', cruxlogic: 'In progress', competitor: 'Your responsibility' },
        ]
      },
    ],
    summary: {
      cruxlogic: [
        'Enterprise-grade security built-in',
        'SOC 2 compliant infrastructure',
        'Emergency kill switch for instant access revocation',
        'Data never used for AI training',
        'GDPR compliant data handling',
        '24/7 professional support',
      ],
      competitor: [
        'Self-hosted for maximum control',
        'Open source transparency',
        'Security is your responsibility',
        'No compliance certifications provided',
      ],
    },
    ctaTitle: 'Want enterprise security without the setup?',
    ctaDescription: 'CruxLogic provides enterprise-grade security out of the box. Your data stays private, protected, and under your control.',
    metaTitle: 'CruxLogic vs OpenClaw - Enterprise Security Comparison 2026',
    metaDescription: 'Compare CruxLogic enterprise security with OpenClaw. SOC 2 compliance, end-to-end encryption, and GDPR compliance built-in.',
  },
  'motion': {
    slug: 'motion',
    name: 'Motion',
    logo: '/logos/motion.webp',
    tagline: 'AI Calendar & Project Management',
    description: 'More than just calendar management. CruxLogic handles your emails, files, and tasks too.',
    heroTitle: 'CruxLogic vs Motion',
    features: [
      {
        category: 'What It Can Do',
        items: [
          { feature: 'Full email management', cruxlogic: true, competitor: false, highlight: true },
          { feature: 'Calendar scheduling', cruxlogic: true, competitor: true },
          { feature: 'Task management', cruxlogic: true, competitor: true },
          { feature: 'File search & organization', cruxlogic: true, competitor: false, highlight: true },
          { feature: 'Voice messages', cruxlogic: true, competitor: false },
        ]
      },
      {
        category: 'How You Interact',
        items: [
          { feature: 'Natural conversation', cruxlogic: true, competitor: 'Limited AI', highlight: true },
          { feature: 'Ask anything about your data', cruxlogic: true, competitor: false },
          { feature: 'Message from Telegram', cruxlogic: true, competitor: false },
          { feature: 'Draft emails for you', cruxlogic: true, competitor: false, highlight: true },
        ]
      },
      {
        category: 'Your Apps Connected',
        items: [
          { feature: 'Gmail & Outlook', cruxlogic: true, competitor: false },
          { feature: 'Google Drive & OneDrive', cruxlogic: true, competitor: false },
          { feature: 'Google Tasks & Microsoft To Do', cruxlogic: true, competitor: 'Own system' },
          { feature: 'Google & Outlook Calendar', cruxlogic: true, competitor: true },
        ]
      },
    ],
    summary: {
      cruxlogic: [
        'Email, calendar, tasks, AND files',
        'True conversational AI',
        'Works across Google & Microsoft',
        'Telegram for on-the-go access',
      ],
      competitor: [
        'Great auto-scheduling',
        'Focused on calendar/tasks',
        'Limited to scheduling use case',
        'No email or file management',
      ],
    },
    ctaTitle: 'Need more than a smart calendar?',
    ctaDescription: 'CruxLogic manages your entire digital life - email, files, calendar, and tasks in one place.',
    metaTitle: 'CruxLogic vs Motion - Full AI Assistant vs Smart Calendar 2026',
    metaDescription: 'Compare CruxLogic AI assistant with Motion. See why a complete productivity assistant beats calendar-only AI.',
  },
}

export function getComparison(slug: string): ComparisonData | undefined {
  return comparisons[slug]
}

export function getAllComparisonSlugs(): string[] {
  return Object.keys(comparisons)
}
