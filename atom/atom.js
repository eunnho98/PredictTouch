import { atom } from 'recoil';
import { uid } from 'uid';

// 테스트 시작 Trigger

export const correct = atom({
  key: 'cor',
  default: 0,
});

export const incorrect = atom({
  key: 'inc',
  default: 0,
});

export const userId = atom({
  key: 'usid',
  default: uid(),
});

export const id = atom({
  key: 'username',
  default: '',
});

export const type = atom({
  key: 'standorwalk',
  default: '',
});

export const count = atom({
  key: 'c',
  default: 0,
});
