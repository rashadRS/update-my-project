import { devices } from '@/data/devices';
import { Device, QuizAnswers } from '@/lib/types';

const ruleMap: Record<string, string[]> = {
  cs: ['cs'],
  engineering: ['engineering'],
  design: ['design'],
  business: ['business'],
  medicine: ['medicine'],
  architecture: ['architecture']
};

export const getRecommendationReason = (major: string, device: Device, locale: 'ar' | 'en') => {
  const ar = `تم اختيار ${device.brand} ${device.model} لأنه يوازن بين احتياجات تخصص ${major} والأداء والسعر.`;
  const en = `${device.brand} ${device.model} fits ${major} with strong performance and student value.`;
  return locale === 'ar' ? ar : en;
};

export const recommendDevices = (answers: QuizAnswers): Device[] => {
  const normalizedMajor = answers.major.toLowerCase();
  const matchTags = ruleMap[normalizedMajor] || ['business', 'medicine'];
  const filtered = devices.filter((device) => device.tags.some((tag) => matchTags.includes(tag)));
  const budgetCap = Number.parseInt(answers.budget.replace(/[^\d]/g, ''), 10);
  const budgeted = Number.isNaN(budgetCap) ? filtered : filtered.filter((device) => device.price <= budgetCap + 2500);
  return (budgeted.length ? budgeted : filtered).slice(0, 3);
};
