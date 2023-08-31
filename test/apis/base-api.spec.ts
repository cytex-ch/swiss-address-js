import {BaseApi} from '../../src/apis/base.api';

jest.setTimeout(30000);

describe('BaseApi', () => {
  it('should be defined', () => {
    expect(BaseApi).toBeDefined();
  });

  it('should be a class', () => {
    expect(typeof BaseApi).toBe('function');
  });

  describe('url builder', () => {
    const api = new BaseApi('username', 'password');

    it('should be defined', () => {
      expect(api.url).toBeDefined();
    });

    it('should build a url', () => {
      const url = api.url('/a', {}, {});
      expect(url).toBe(
        'https://webservices.post.ch:17023/IN_SYNSYN_EXT/REST/v1/a'
      );
    });

    it('should build a url with query params', () => {
      const url = api.url('/a', {foo: 'bar'}, {});
      expect(url).toBe(
        'https://webservices.post.ch:17023/IN_SYNSYN_EXT/REST/v1/a?foo=bar'
      );
    });

    it('should build a url with multiple query params', () => {
      const url = api.url('/a', {foo: 'bar', baz: 'qux'}, {});
      expect(url).toBe(
        'https://webservices.post.ch:17023/IN_SYNSYN_EXT/REST/v1/a?foo=bar&baz=qux'
      );
    });

    it('should build a url with path params', () => {
      const url = api.url('/a/:foo', {}, {foo: 'bar'});
      expect(url).toBe(
        'https://webservices.post.ch:17023/IN_SYNSYN_EXT/REST/v1/a/bar'
      );
    });

    it('should build a url with multiple path params', () => {
      const url = api.url('/a/:foo/:baz', {}, {foo: 'bar', baz: 'qux'});
      expect(url).toBe(
        'https://webservices.post.ch:17023/IN_SYNSYN_EXT/REST/v1/a/bar/qux'
      );
    });
  });
});
