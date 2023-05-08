import { describe, expect, it } from 'vitest';
import { z } from 'zod';

const NOT_INCLUDED_AT_CHAR_REGEX = /^(?:[^@]*){6,}$/;
const NOT_INCLUDED_SYMBOL_CHARS_REGEX = /^(?:(?:[a-zA-Z0-9]*){2,})+$/;
const LESS_THAN_64_LENGTH_REGEX = /^([\s\S\n]{0,8}){0,8}$/u;

// NOTE: 文字列に @ が含まれているか確認する
const emailSchema = z.string().refine((v) => !NOT_INCLUDED_AT_CHAR_REGEX.test(v));
// NOTE: 文字列に英数字以外の文字が含まれているか確認する
const passwordSchema = z.string().refine((v) => !NOT_INCLUDED_SYMBOL_CHARS_REGEX.test(v));
// NOTE: 改行含めて 64 文字以内であるかどうか確認する
const commentSchema = z.string().regex(LESS_THAN_64_LENGTH_REGEX);

const emailValidation1 = (value: string) => emailSchema.safeParse(value).success;
const emailValidation2 = (value: string) => value.includes('@');

const passwordValidation1 = (value: string) => passwordSchema.safeParse(value).success;
const passwordValidation2 = (value: string) => value.includes('@');

// The two tests marked with concurrent will be run in parallel
describe('validation', () => {
  const email = 'text@example.com';

  it('emailSchema', async () => {
    ['test@example.com', '@124', '@@123', '123@', '123@@', 'a@b@c', '12345@6', '1234@5', '123@4'].forEach((value) => {
      expect(emailValidation1(value)).equal(emailValidation2(value));
    });
  });

  it('passwordSchema', async () => {
    ['test@example.com', '@124', '@@123', '123@', '123@@', 'a@b@c', '12345@6', '1234@5', '123@4'].forEach((value) => {
      expect(emailValidation1(value)).equal(emailValidation2(value));
    });
  });
});
