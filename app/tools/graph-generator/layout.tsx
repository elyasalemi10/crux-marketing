import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Graph & Chart Generator | Bar, Line, Pie Charts | CruxLogic',
  description: 'Create professional bar charts, line graphs, and pie charts for free. Add custom data, labels, and colors. Download high-quality PNG images. No signup required.',
  keywords: ['graph generator', 'chart maker', 'bar chart', 'line graph', 'pie chart', 'data visualization', 'free chart tool', 'graph creator'],
  openGraph: {
    title: 'Free Graph & Chart Generator - Create Professional Charts',
    description: 'Create bar charts, line graphs, and pie charts with custom data. Download as high-quality PNG. 100% free, no signup required.',
    type: 'website',
    url: 'https://cruxlogic.ai/tools/graph-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Graph & Chart Generator | CruxLogic',
    description: 'Create professional charts and graphs. Download as PNG images.',
  },
  alternates: {
    canonical: 'https://cruxlogic.ai/tools/graph-generator',
  },
}

export default function GraphGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children
}
