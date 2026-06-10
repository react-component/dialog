import { getMotionName, offset } from '../src/util';

describe('Dialog.Util', () => {
  describe('offset', () => {
    it('window do not have size', () => {
      const window = {
        document: {
          documentElement: {
            scrollTop: 1128,
            scrollLeft: 903,
          },
        },
      };

      const element = {
        ownerDocument: {
          parentWindow: window,
        },
        getBoundingClientRect: () => ({ left: 0, top: 0 }),
      } as any;

      expect(offset(element)).toEqual({
        left: 903,
        top: 1128,
      });
    });

    it('window & document do not have size', () => {
      const window = {
        document: {
          documentElement: {},
          body: {
            scrollTop: 1128,
            scrollLeft: 903,
          },
        },
      };

      const element = {
        ownerDocument: {
          parentWindow: window,
        },
        getBoundingClientRect: () => ({ left: 0, top: 0 }),
      } as any;

      expect(offset(element)).toEqual({
        left: 903,
        top: 1128,
      });
    });

    it('returns zero offset when defaultView and parentWindow are missing', () => {
      const element = {
        ownerDocument: {},
        getBoundingClientRect: () => ({ left: 0, top: 0 }),
      } as any;

      expect(offset(element)).toEqual({
        left: 0,
        top: 0,
      });
    });

    it('returns zero offset when defaultView and parentWindow are null or undefined', () => {
      const element = {
        ownerDocument: {
          defaultView: null,
          parentWindow: undefined,
        },
        getBoundingClientRect: () => ({ left: 0, top: 0 }),
      } as any;

      expect(offset(element)).toEqual({
        left: 0,
        top: 0,
      });
    });
  });

  describe('getMotionName', () => {
    it('transitionName', () => {
      expect(getMotionName('test', 'transition', 'animation')).toEqual('transition');
    });

    it('animation', () => {
      expect(getMotionName('test', null, 'animation')).toEqual('test-animation');
    });
  });
});
