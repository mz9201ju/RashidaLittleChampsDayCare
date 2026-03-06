export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
]

export const PAGE_CONTENT = {
  home: {
    eyebrow: 'Rashida Little Champs Daycare',
    title: 'A Bright Start For Every Little Learner',
    intro:
      'We create a safe, playful space where children build confidence, curiosity, and joyful routines every day.',
    cards: [
      {
        title: 'Warm Classrooms',
        text: 'Caring teachers and small groups that help each child feel seen and supported.',
      },
      {
        title: 'Creative Learning',
        text: 'Hands-on activities, songs, stories, and discovery centers designed for growing minds.',
      },
      {
        title: 'Family Partnership',
        text: 'Clear updates and open communication so families always feel connected.',
      },
    ],
  },
  about: {
    title: 'About Us',
    intro:
      'Rashida Little Champs Daycare is built on kindness, structure, and joyful learning. Our team nurtures social growth, language development, and healthy routines in a welcoming environment.',
    bullets: [
      'Experienced early childhood educators',
      'Age-appropriate daily schedules',
      'A values-driven, inclusive environment',
    ],
  },
  services: {
    title: 'Services',
    intro:
      'Our programs support children throughout the day with learning, movement, and care balanced in a fun, child-friendly rhythm.',
    bullets: [
      'Full-day and half-day childcare options',
      'Early learning activities and guided play',
      'Story time, music, arts, and movement',
      'Nutritious snack and meal guidance',
    ],
  },
  contact: {
    title: 'Contact',
    intro:
      'We would love to meet your family and answer your questions. Reach out anytime to schedule a tour.',
    info: [
      { label: 'Phone', value: '(555) 123-4567' },
      { label: 'Email', value: 'hello@littlechampsdaycare.com' },
      { label: 'Hours', value: 'Mon-Fri, 7:30 AM - 5:30 PM' },
      { label: 'Address', value: '123 Sunshine Lane, Your City, ST 00000' },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        q: 'What ages do you accept?',
        a: 'We welcome infants, toddlers, and preschool-age children. Contact us for current classroom availability.',
      },
      {
        q: 'Do you provide meals?',
        a: 'We provide guidance and support for healthy meals and snacks, with allergy-aware policies in place.',
      },
      {
        q: 'How do I schedule a tour?',
        a: 'Call or email us and we will set up a visit at a convenient time for your family.',
      },
      {
        q: 'How do you share daily updates?',
        a: 'Families receive regular updates about activities, learning moments, and classroom highlights.',
      },
    ],
  },
}
