
export interface Question {
  id: string;
  category: string;
  text: string;
  options: {
    text: string;
    score: number;
  }[];
}

export const categories = {
  veraenderungsbereitschaft: 'Willingness to Change',
  sicherheitsbeduerfnis: 'Need for Security',
  anpassungsfaehigkeit: 'Adaptability',
  risikobereitschaft: 'Risk Tolerance',
  growth_vs_komfort: 'Growth vs. Comfort Mindset',
  konformitaet_vs_rebell: 'Conformity vs. Rebel',
  finanzielle_situation: 'Financial Situation',
  wertekompass: 'Value Compass'
};

export const questions: Question[] = [
  // Willingness to Change (2 Questions)
  {
    id: 'v1',
    category: 'veraenderungsbereitschaft',
    text: 'How do you typically react to major changes in your life?',
    options: [
      { text: 'I avoid them and stick to what I know', score: 1 },
      { text: 'I am usually skeptical and need a lot of time', score: 2 },
      { text: 'I am neutral, sometimes open, sometimes not', score: 3 },
      { text: 'I am usually open and curious', score: 4 },
      { text: 'I look forward to them and actively seek changes', score: 5 }
    ]
  },
  {
    id: 'v2',
    category: 'veraenderungsbereitschaft',
    text: 'Imagine you had to spontaneously change your entire living environment. How would you react?',
    options: [
      { text: 'It would be a nightmare, I would do everything to avoid it', score: 1 },
      { text: 'Very stressful, I would need a very long time to adapt', score: 2 },
      { text: 'Difficult, but doable with enough preparation', score: 3 },
      { text: 'Challenging, but also exciting', score: 4 },
      { text: 'An exciting adventure that I look forward to', score: 5 }
    ]
  },

  // Need for Security (2 Questions)
  {
    id: 's1',
    category: 'sicherheitsbeduerfnis',
    text: 'How important is a predictable daily routine with fixed patterns to you?',
    options: [
      { text: 'Extremely important, without routines I feel completely lost', score: 1 },
      { text: 'Very important, I need structure and predictability', score: 2 },
      { text: 'Important, but I can also be flexible', score: 3 },
      { text: 'Less important, I also like spontaneous variety', score: 4 },
      { text: 'Unimportant, I love unpredictability and spontaneity', score: 5 }
    ]
  },
  {
    id: 's2',
    category: 'sicherheitsbeduerfnis',
    text: 'How do you handle unknown situations where you don\'t know the "rules of the game"?',
    options: [
      { text: 'I avoid them completely or am very stressed', score: 1 },
      { text: 'I am very insecure and need a lot of support', score: 2 },
      { text: 'I inform myself thoroughly beforehand', score: 3 },
      { text: 'I approach them optimistically and learn along the way', score: 4 },
      { text: 'I dive right in and find it exciting', score: 5 }
    ]
  },

  // Adaptability (2 Questions)
  {
    id: 'a1',
    category: 'anpassungsfaehigkeit',
    text: 'How quickly do you find your way in new social groups?',
    options: [
      { text: 'Very difficult, I need a very long time or never manage it', score: 1 },
      { text: 'Difficult, it takes months before I feel comfortable', score: 2 },
      { text: 'Medium, after a few weeks I find my place', score: 3 },
      { text: 'Relatively quickly, within a few weeks', score: 4 },
      { text: 'Very quickly, I know new people within days', score: 5 }
    ]
  },
  {
    id: 'a2',
    category: 'anpassungsfaehigkeit',
    text: 'How do you handle it when different rules and customs apply in a new country?',
    options: [
      { text: 'It would overwhelm and frustrate me greatly', score: 1 },
      { text: 'I would strongly hold on to my accustomed ways', score: 2 },
      { text: 'I would adapt slowly, but it would be difficult', score: 3 },
      { text: 'I would see it as a learning process and adapt', score: 4 },
      { text: 'I would experience it as an exciting cultural enrichment', score: 5 }
    ]
  },

  // Risk Tolerance (2 Questions)
  {
    id: 'r1',
    category: 'risikobereitschaft',
    text: 'Imagine you have the chance for your dream job abroad, but it means giving up your current security. How do you decide?',
    options: [
      { text: 'Never, security comes above everything', score: 1 },
      { text: 'Only if I have 100% guarantees', score: 2 },
      { text: 'Only after very thorough safeguarding', score: 3 },
      { text: 'I would take the risk if the opportunity is good', score: 4 },
      { text: 'Immediately, such opportunities must be seized', score: 5 }
    ]
  },
  {
    id: 'r2',
    category: 'risikobereitschaft',
    text: 'What is your stance on financial risks when emigrating (e.g., quitting a job without a concrete offer)?',
    options: [
      { text: 'Absolutely impossible, I would never do that', score: 1 },
      { text: 'Only with several years of savings as security', score: 2 },
      { text: 'With sufficient financial security for 6-12 months', score: 3 },
      { text: 'With a few months buffer I would dare it', score: 4 },
      { text: 'Sometimes you have to take risks, even without large reserves', score: 5 }
    ]
  },

  // Growth vs. Comfort Mindset (2 Questions)
  {
    id: 'g1',
    category: 'growth_vs_komfort',
    text: 'Which statement best describes your attitude towards life?',
    options: [
      { text: 'I want to make my life as comfortable and stress-free as possible', score: 1 },
      { text: 'Comfort is important to me, but I am open to gentle challenges', score: 2 },
      { text: 'I seek a balance between comfort and personal growth', score: 3 },
      { text: 'Personal growth is more important to me than convenience', score: 4 },
      { text: 'I consciously seek challenges that help me progress', score: 5 }
    ]
  },
  {
    id: 'g2',
    category: 'growth_vs_komfort',
    text: 'How do you deal with failures and setbacks?',
    options: [
      { text: 'I avoid situations where I might fail', score: 1 },
      { text: 'Setbacks demotivate me strongly and for a long time', score: 2 },
      { text: 'I need time to recover, but then I learn from them', score: 3 },
      { text: 'I see them as learning opportunities and bounce back quickly', score: 4 },
      { text: 'They motivate me even more and make me stronger', score: 5 }
    ]
  },

  // Conformity vs. Rebel (2 Questions)
  {
    id: 'k1',
    category: 'konformitaet_vs_rebell',
    text: 'How important is the opinion and approval of your family and friends for important life decisions?',
    options: [
      { text: 'Extremely important, I never decide against their will', score: 1 },
      { text: 'Very important, I need their approval', score: 2 },
      { text: 'Important, but I ultimately decide for myself', score: 3 },
      { text: 'Less important, I listen but follow my own path', score: 4 },
      { text: 'Unimportant, I make my decisions independently', score: 5 }
    ]
  },
  {
    id: 'k2',
    category: 'konformitaet_vs_rebell',
    text: 'What is your stance on social norms and expectations?',
    options: [
      { text: 'I follow them strictly, they give me orientation', score: 1 },
      { text: 'I orient myself by them, but sometimes deviate', score: 2 },
      { text: 'I respect them, but think independently', score: 3 },
      { text: 'I question them critically and often go my own way', score: 4 },
      { text: 'I define my own rules and values', score: 5 }
    ]
  },

  // Financial Situation (2 Questions)
  {
    id: 'f1',
    category: 'finanzielle_situation',
    text: 'How would you assess your current financial situation for emigration?',
    options: [
      { text: 'Very poor, I live from paycheck to paycheck', score: 1 },
      { text: 'Tight, I have little to no reserves', score: 2 },
      { text: 'Okay, I have a few months buffer', score: 3 },
      { text: 'Good, I have solid reserves for emigration', score: 4 },
      { text: 'Very good, money is not a limiting factor', score: 5 }
    ]
  },
  {
    id: 'f2',
    category: 'finanzielle_situation',
    text: 'How do you handle financial planning?',
    options: [
      { text: 'I don\'t plan and live spontaneously from day to day', score: 1 },
      { text: 'I plan short-term, usually only a few weeks ahead', score: 2 },
      { text: 'I plan medium-term and have a rough overview', score: 3 },
      { text: 'I plan in a structured and long-term manner', score: 4 },
      { text: 'I have detailed financial plans and multiple scenarios', score: 5 }
    ]
  },

  // Value Compass (1 Question)
  {
    id: 'w1',
    category: 'wertekompass',
    text: 'What is most important to you in life?',
    options: [
      { text: 'Security, stability and preserving traditions', score: 1 },
      { text: 'Family, close relationships and harmony', score: 2 },
      { text: 'Work-life balance and personal well-being', score: 3 },
      { text: 'Personal development and new experiences', score: 4 },
      { text: 'Freedom, adventure and self-realization', score: 5 }
    ]
  }
];

export const getResultType = (totalScore: number): string => {
  // Total possible score: 15 questions * 5 points = 75 points
  if (totalScore >= 60) return 'Excellently Prepared';
  if (totalScore >= 45) return 'Well Prepared';
  if (totalScore >= 30) return 'Partially Prepared';
  return 'Not Yet Ready';
};

export const getResultDetails = (resultType: string) => {
  const results = {
    'Excellently Prepared': {
      title: 'Excellently Prepared! 🌟',
      description: 'You are mentally and emotionally excellently prepared for emigration. You bring the perfect mix of courage, flexibility, and realism.',
      color: 'text-green-600'
    },
    'Well Prepared': {
      title: 'Well Prepared! 🚀',
      description: 'You have very good basic prerequisites for emigration. With a little additional preparation, you are ready for the adventure.',
      color: 'text-blue-600'
    },
    'Partially Prepared': {
      title: 'Partially Prepared 🤔',
      description: 'You have a solid foundation, but there are still some areas where you could develop further to be optimally prepared for emigrant life.',
      color: 'text-yellow-600'
    },
    'Not Yet Ready': {
      title: 'Not Yet Ready 🏠',
      description: 'At the moment, you seem to be still strongly tied to your current environment. That\'s completely okay! When the desire for change grows, there are many ways to develop further.',
      color: 'text-red-600'
    }
  };
  return results[resultType as keyof typeof results];
};

export const getRecommendations = (categoryScores: Record<string, number>): string[] => {
  const recommendations: string[] = [];
  
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score < 3.5) {
      switch (category) {
        case 'veraenderungsbereitschaft':
          recommendations.push('🔄 Strengthen your willingness to change: Practice small changes - consciously take new routes to work, try new hobbies, or change your routine gradually.');
          break;
        case 'sicherheitsbeduerfnis':
          recommendations.push('🎯 Work on your risk acceptance: Start with small, controlled risks and build confidence in your adaptability. Security is important, but excessive caution can prevent opportunities.');
          break;
        case 'anpassungsfaehigkeit':
          recommendations.push('🌍 Improve your adaptability: Expand your cultural horizon through travel, learn languages, and exchange with people from other cultures.');
          break;
        case 'risikobereitschaft':
          recommendations.push('💪 Increase your risk tolerance: Strengthen your self-confidence by setting small goals outside your comfort zone and celebrating your successes.');
          break;
        case 'growth_vs_komfort':
          recommendations.push('📚 Develop a growth mindset: See challenges as growth opportunities and consciously invest in your personal development instead of just striving for comfort.');
          break;
        case 'konformitaet_vs_rebell':
          recommendations.push('🦋 Strengthen your independence: Practice making your own decisions and standing by your values, even when others disagree.');
          break;
        case 'finanzielle_situation':
          recommendations.push('💰 Improve your financial foundation: Create a concrete savings plan, reduce unnecessary expenses, and systematically build reserves for emigration.');
          break;
        case 'wertekompass':
          recommendations.push('🧭 Reflect on your values: Think carefully about what is really important to you in life and how emigration could support or challenge these values.');
          break;
      }
    }
  });
  
  // Add positive recommendations for high scores
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score >= 4.5) {
      switch (category) {
        case 'veraenderungsbereitschaft':
          recommendations.push('✅ Your willingness to change is excellent - use this strength as a foundation for your emigration plans!');
          break;
        case 'risikobereitschaft':
          recommendations.push('🚀 Your risk tolerance is outstanding - you are ready to seize calculated opportunities!');
          break;
        case 'anpassungsfaehigkeit':
          recommendations.push('🌟 Your adaptability is excellent - you will quickly find your way in new environments!');
          break;
      }
    }
  });
  
  if (recommendations.length === 0) {
    recommendations.push('🎉 You are already very well positioned! Use your balanced skills and trust in your strengths for your emigration plans.');
  }
  
  return recommendations;
};
