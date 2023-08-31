import SwissPost from '../../src';

jest.setTimeout(30000);

describe('SwissPost', () => {
  it('should be defined', () => {
    expect(SwissPost).toBeDefined();
  });

  it('should be a class', () => {
    expect(typeof SwissPost).toBe('function');
  });

  it('should set username and password', () => {
    const swisspost = new SwissPost('username', 'password');
    expect(swisspost).toHaveProperty('username');
    expect(swisspost).toHaveProperty('password');
  });

  it('should yield user and autoComplete api', () => {
    const swisspost = new SwissPost('username', 'password');
    swisspost.init();

    expect(swisspost.user).toBeDefined();
    expect(swisspost.addresses).toBeDefined();
  });
});
