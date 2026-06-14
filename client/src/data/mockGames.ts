import type { GameRoom } from '../types/GameRoom';

export const mockGames: GameRoom[] = [
  {
    _id: '1',
    title: 'הבריחה מהמעבדה המסתורית',
    storyBackground: 'מצאו את הנוסחה הסודית לפני שהזמן נגמר!',
    category: 'מדע בדיוני',
    imageUrl: 'https://placehold.co/300x200?text=Lab',
  },
  {
    _id: '2',
    title: 'אוצר הפיראטים האבוד',
    storyBackground: 'עקבו אחר המפה ופתרו את חידות קפטן בלאק.',
    category: 'הרפתקאות',
    imageUrl: 'https://placehold.co/300x200?text=Pirates',
  },
  {
    _id: '3',
    title: 'הטירה המכושפת',
    storyBackground: 'האם תצליחו לשבור את הקללה ולברוח מהטירה המסתורית?',
    category: 'אימה',
    imageUrl: 'https://placehold.co/300x200?text=Castle',
  },
  {
    _id: '4',
    title: 'תחנת החלל הנטושה',
    storyBackground: 'הצוות נעלם. רק אתם יכולים לפענח מה קרה כאן.',
    category: 'מדע בדיוני',
    imageUrl: 'https://placehold.co/300x200?text=Space',
  },
  {
    _id: '5',
    title: 'הפירמידה האבודה',
    storyBackground: 'פענחו את כתבי החרטומים ומצאו את דרככם החוצה.',
    category: 'הרפתקאות',
    imageUrl: 'https://placehold.co/300x200?text=Pyramid',
  },
  {
    _id: '6',
    title: 'הבית הנשכח',
    storyBackground: 'קולות מוזרים נשמעים מהקומה השנייה...',
    category: 'אימה',
    imageUrl: 'https://placehold.co/300x200?text=House',
  },
  {
    _id: '7',
    title: 'מעבדת השעון העתיק',
    storyBackground: 'מכונת הזמן מקולקלת - תקנו אותה לפני שיהיה מאוחר מדי.',
    category: 'מדע בדיוני',
    imageUrl: 'https://placehold.co/300x200?text=Time',
  },
  {
    _id: '8',
    title: 'אגדת היער האפל',
    storyBackground: 'תועו ליער ועליכם למצוא את הדרך חזרה לפני רדת החושך.',
    category: 'הרפתקאות',
    imageUrl: 'https://placehold.co/300x200?text=Forest',
  },
];
