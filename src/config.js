export const siteConfig = {
  name: 'Your Name',
  tagline: 'Your tagline here.',
  username: 'your-username',
  role: 'Your Role',
  intro: `Hi, I'm Your Name.

I'm a software engineer, systems programmer, and writer.

For the last few years I've been focused on building distributed systems at scale.

Before that, I worked on embedded systems and operating system internals.`,
  
  photoUrl: 'https://github.com/your-username.png',
  
  experience: [
    {
      period: '2024 → Present',
      role: 'Software Engineer',
      company: 'Company Name',
      link: 'https://company.com/',
      description: 'Working on distributed systems and scalable infrastructure.'
    },
    {
      period: '2022 → 2024',
      role: 'Engineer',
      company: 'Previous Company',
      link: 'https://company.com/',
      description: 'Design and implementation of systems software.'
    }
  ],
  
  otherPursuits: `Outside of work, I'm writing about systems programming, operating system internals, and mentoring junior engineers.`,
  
  social: {
    github: 'https://github.com/your-username',
    linkedin: 'https://linkedin.com/in/your-username',
    twitter: 'https://twitter.com/your-username',
    email: 'hello@example.com'
  },

  newsletter: {
    enabled: false,
    provider: 'buttondown',
    url: 'https://buttondown.email/your-username'
  }
};

export const navigation = [
  { path: '/', label: 'home' },
  { path: '/articles', label: 'articles' },
  { path: '/about', label: 'about' }
];
