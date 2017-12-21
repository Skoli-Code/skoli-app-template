// took from react-facebook
import debug from 'debug';

const log = debug('skoli-app-template:facebook');

export const LoginStatus = {
  CONNECTED: 'connected',
  NOT_AUTHORIZED: 'not_authorized',
};

export const Method = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
};

export default class Facebook {
  constructor(options = {}) {
    this.options = {
      domain: 'connect.facebook.net',
      version: 'v2.9',
      cookie: false,
      status: false,
      xfbml: false,
      language: 'en_US',
      frictionlessRequests: false,
      ...options,
    };

    if (!this.options.appId) {
      throw new Error('You need to set appId');
    }

    if (!this.options.wait) {
      this.init();
    }
  }

  getAppId() {
    return this.options.appId;
  }

  async init() {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve) => {
      const { options } = this;

      window.fbAsyncInit = () => {
        window.FB.init({
          appId: options.appId,
          version: options.version,
          cookie: options.cookie,
          status: options.status,
          xfbml: options.xfbml,
          frictionlessRequests: this.frictionlessRequests,
        });

        resolve(window.FB);
      };

      const fjs = document.getElementsByTagName('script')[0];
      if (!fjs) {
        log('Script tag does not exists in the DOM');
        return;
      }

      if (document.getElementById('facebook-jssdk')) {
        return;
      }

      const js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.async = true;
      js.src = `//${options.domain}/${options.language}/sdk.js`;

      fjs.parentNode.insertBefore(js, fjs);
    });

    return this.loadingPromise;
  }

  async process(method, before = [], after = []) {
    const fb = await this.init();

    return new Promise((resolve, reject) => {
      fb[method](...before, (response) => {
        if (!response || response.error) {
          reject(new Error((response && response.error) || 'Response is undefined'));
          return;
        }

        resolve(response);
      }, ...after);
    });
  }

  async ui(options) {
    return this.process('ui', [options]);
  }

  async api(path, method = Method.GET, params = {}) {
    return this.process('api', [path, method, params]);
  }

  async login(opts = null) {
    return this.process('login', [], [opts]);
  }

  async logout() {
    return this.process('logout');
  }

  async getLoginStatus() {
    return this.process('getLoginStatus');
  }

  async getAuthResponse() {
    return this.process('getAuthResponse');
  }

  async getTokenDetail() {
    const response = await this.getLoginStatus();
    if (response.status === LoginStatus.CONNECTED && response.authResponse) {
      return response.authResponse;
    }

    throw new Error('Token is undefined');
  }

  async getProfile(params) {
    return this.api('/me', Method.GET, params);
  }

  async getTokenDetailWithProfile(params) {
    const tokenDetail = await this.getTokenDetail();
    const profile = await this.getProfile(params);

    return {
      profile,
      tokenDetail,
    };
  }

  async getToken() {
    const authResponse = await this.getTokenDetail();
    return authResponse.accessToken;
  }

  async getUserId() {
    const authResponse = await this.getTokenDetail();
    return authResponse.userID;
  }

  async sendInvite(to, options) {
    return this.ui({
      to,
      method: 'apprequests',
      ...options,
    });
  }


  async postAction(ogNamespace, ogAction, ogObject, ogObjectUrl, noFeedStory) {
    let url = `/me/${ogNamespace}:${ogAction}?${ogObject}=${encodeURIComponent(ogObjectUrl)}`;

    if (noFeedStory === true) {
      url += '&no_feed_story=true';
    }

    return this.api(url, Method.POST);
  }

  async getPermissions() {
    const response = await this.api('/me/permissions');
    return response.data;
  }

  async hasPermissions(permissions) {
    const usersPermissions = await this.getPermissions();

    const findedPermissions = permissions.filter((p) => {
      return !!usersPermissions.find((row) => {
        const { permission, status } = row;
        return status === 'granted' && permission === p;
      });
    });

    return findedPermissions.length === permissions.length;
  }

  async subscribe(eventName, callback) {
    const fb = await this.init();
    fb.Event.subscribe(eventName, callback);
  }

  async unsubscribe(eventName, callback) {
    const fb = await this.init();
    fb.Event.unsubscribe(eventName, callback);
  }

  async parse(parentNode) {
    const fb = await this.init();

    if (typeof parentNode === 'undefined') {
      fb.XFBML.parse();
    } else {
      fb.XFBML.parse(parentNode);
    }
  }

  async getRequests() {
    return this.api('/me/apprequests');
  }

  async removeRequest(requestID) {
    return this.api(requestID, Method.DELETE);
  }

  async setAutoGrow() {
    const fb = await this.init();
    fb.Canvas.setAutoGrow();
  }

}
