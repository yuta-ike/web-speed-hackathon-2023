import { describe, expect, it } from 'vitest';

describe('regexp', () => {
  ['aa', 'jdasoi', '!ppp', 'p!pp', 'pp!p', 'ppp!', 'あいうえお', '漢字'].forEach((value) => {
    it('equal', () => {
      expect(/^(?:(?:[a-zA-Z0-9]*){2,})+$/.test(value)).equal(/^([a-zA-Z0-9]{2,})+$/.test(value));
    });
  });

  it('empty case', () => {
    expect(/^(?:(?:[a-zA-Z0-9]*){2,})+$/.test('')).equal(!/^([a-zA-Z0-9]{2,})+$/.test(''));
  });
});
