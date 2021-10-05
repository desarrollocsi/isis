import { ProgrammingStatusPipe } from './programming-status.pipe';

describe('ProgrammingStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new ProgrammingStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
