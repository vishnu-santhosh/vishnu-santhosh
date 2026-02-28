export const siteConfig = {
  name: 'Vishnu Santhosh',
  tagline: "Notes from an engineer who can't stop asking why.",
  username: 'vishnu',
  role: 'Software Engineer',
  currentActivity: 'immersed in Linux kernel and driver development at',
  sitePhilosophy: 'Exploring the questions that code alone can\'t answer.',
  intro: `Hi, I'm Vishnu.

I’ve always been drawn to the thinking part exploring ideas, dissecting systems, mixing philosophy with technology to understand not just what I know, but how I know it.

That curiosity taught me something important:

In complex systems, bugs aren’t created by code.

They’re created by mental models.

Somewhere along the way, I realized I’m a lifelong learner.

And the best way to learn is to teach.

By day, I’m a Senior Software Engineer at Qualcomm, working deep inside the Linux kernel, device drivers, and open-source systems - the kind of places where correctness, concurrency, and clarity truly matter.

By night (and in the quiet gaps between), I distill what I learn into simple thinking tools:

- Mental models for debugging complex systems
- Linux kernel stories and subtle lifetime mysteries
- Practical, real-world ways to use AI beyond tech demos
- Productivity systems designed for messy, modern workflows
- Reflections where technology, life, and philosophy intersect

And sometimes… the small, beautiful corners of the internet worth sharing.

I write weekly posts and in-depth articles that turn tricky engineering concepts into clear, reusable insights.

Because with the right tools and the right mindset - we can transform the way we build, think, and work.

If that sounds like a journey worth taking, stick around.
`,
  
  photoUrl: 'https://github.com/vishnu-santhosh.png',
  
  experience: [
    {
      period: '2022 → Present',
      role: 'Linux Kernel Developer',
      company: 'Qualcomm',
      link: 'https://www.qualcomm.com/',
      description: 'Linux kernel and driver development.'
    },
    {
      period: '2019 → 2022',
      role: 'Engineer',
      company: 'GadgEon Smart Systems',
      link: 'https://www.gadgeon.com/',
      description: 'Boot loaders, kernel and user space application development.'
    }
  ],
  
  otherPursuits: `Outside of work, I'm writing about systems programming, experimenting new tools, exploring different genre of books, mentoring junior engineers.`,
  
  social: {
    github: 'https://github.com/vishnu-santhosh',
    linkedin: 'https://linkedin.com/in/vishsant',
    twitter: 'https://twitter.com/vishnu',
    email: 'vishnu@example.com'
  },

  newsletter: {
    enabled: false,
    provider: 'buttondown',
    url: 'https://buttondown.email/vishnu'
  }
};

export const navigation = [
  { path: '/', label: 'home' },
  { path: '/articles', label: 'articles' },
  { path: '/about', label: 'about' }
];
