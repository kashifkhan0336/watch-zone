import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import * as SuperTokensConfig from '../../../config';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import EmailVerification from "supertokens-node/recipe/emailverification";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { UserService } from "../../user/user.service";
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private UserService: UserService,
    private readonly mailService: MailerService
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        UserMetadata.init(),
        EmailVerification.init({
          mode: "OPTIONAL",
          emailDelivery: {
            override: (originalImplementation) => {
              return {
                ...originalImplementation,
                sendEmail(input) {
                  return originalImplementation.sendEmail({
                    ...input,
                    emailVerifyLink: input.emailVerifyLink.replace(
                      // This is: `${websiteDomain}${websiteBasePath}/verify-email`
                      "http://localhost:3000/api/v1/users/verify-email",
                      "http://localhost:3000/api/v1/verification/email"
                    )
                  }
                  )
                },
              }
            }
          }
        }),
        ThirdPartyEmailPassword.init({
          emailDelivery: {
            override: (originalImplementation) => {
              return {
                ...originalImplementation,
                sendEmail: async function (input) {
                  if (input.type === "PASSWORD_RESET") {
                    // You can change the path, domain of the reset password link,
                    // or even deep link it to your mobile app
                    return originalImplementation.sendEmail({
                      ...input,
                      passwordResetLink: input.passwordResetLink.replace(
                        // This is: `${websiteDomain}${websiteBasePath}/reset-password`
                        "http://localhost:3000/api/v1/reset-password",
                        "http://localhost:3000/api/v1/verification/reset"
                      )
                    })
                  }
                  return originalImplementation.sendEmail(input);
                }
              }
            }
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,

                // override the email password sign up API
                emailPasswordSignUpPOST: async function (input) {
                  if (originalImplementation.emailPasswordSignUpPOST === undefined) {
                    throw Error("Should never come here");
                  }

                  // TODO: some pre sign up logic

                  let response = await originalImplementation.emailPasswordSignUpPOST(input);

                  if (response.status === "OK") {
                    UserService.create(response.user.id, response.user.email)
                    console.log(response.user)
                    const token = await EmailVerification.createEmailVerificationToken(response.user.id)
                    if (token.status == 'OK') {
                      await mailService
                        .sendMail({
                          to: response.user.email, // list of receivers
                          from: 'kashifkhan0336@gmail.com', // sender address
                          subject: 'Email verification', // Subject line
                          template: 'emailVerification',
                          context: {
                            verificationUrl: "http://localhost:3000/api/v1/verification/email?token=" + token.token
                          }
                        })
                        .then(() => {
                          console.log("verification mail sent!")
                        })
                        .catch((err) => { console.log(err) });
                    }

                  }

                  return response;
                },

                // override the email password sign in API
                // emailPasswordSignInPOST: async function (input) {
                //   if (originalImplementation.emailPasswordSignInPOST === undefined) {
                //     throw Error("Should never come here");
                //   }

                //   // TODO: some pre sign in logic

                //   let response = await originalImplementation.emailPasswordSignInPOST(input);

                //   if (response.status === "OK") {
                //     // TODO: some post sign in logic
                //   }

                //   return response;
                // },

                // override the thirdparty sign in / up API
                thirdPartySignInUpPOST: async function (input) {
                  if (originalImplementation.thirdPartySignInUpPOST === undefined) {
                    throw Error("Should never come here");
                  }

                  // TODO: Some pre sign in / up logic

                  let response = await originalImplementation.thirdPartySignInUpPOST(input);

                  if (response.status === "OK") {
                    if (response.createdNewUser) {
                      // TODO: some post sign up logic
                    } else {
                      // TODO: some post sign in logic
                    }
                  }

                  return response;
                }
              }
            }
          },
          providers: [
            // We have provided you with development keys which you can use for testing.
            // IMPORTANT: Please replace them with your own OAuth keys for production use.
            ThirdPartyEmailPassword.Google({
              clientId:
                '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
              clientSecret: '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',
            }),
            ThirdPartyEmailPassword.Github({
              clientSecret: 'e97051221f4b6426e8fe8d51486396703012f5bd',
              clientId: '467101b197249757c71f',
            }),
            ThirdPartyEmailPassword.Apple({
              clientId: '4398792-io.supertokens.example.service',
              clientSecret: {
                keyId: '7M48Y4RYDL',
                privateKey:
                  '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----',
                teamId: 'YWQCXGJRJL',
              },
            }),
          ],
        },),
        Session.init(),
        Dashboard.init(),
      ],
    });
  }
}
