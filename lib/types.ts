export type Locale = 'ar' | 'en';

export type Device = {
  id: string;
  brand: string;
  model: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  battery: string;
  price: number;
  os: string;
  image: string;
  buy_link: string;
  tags: string[];
};

export type User = {
  name: string;
  email: string;
  password: string;
  university: string;
  major: string;
};

export type QuizAnswers = {
  major: string;
  budget: string;
  usage: string;
  preference: string;
};
