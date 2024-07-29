import { defineAuth, secret } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    externalProviders: {
      // google: {
      //   clientId: secret('758591777639-89undttj8gl26b15iod56igfd8p3nrpb.apps.googleusercontent.com'),
      //   clientSecret: secret('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')
      // },
      // facebook: {
      //   clientId: secret('1000878068206499'),
      //   clientSecret: secret('569e130d74079b7e3dae9da20eddef11')
      // },
      callbackUrls: [
        'http://localhost:3000/profile',
        'https://mywebsite.com/profile'
      ],
      logoutUrls: ['http://localhost:3000/', 'https://mywebsite.com'],
    }
  }
});