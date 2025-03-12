import { env } from 'process'
import SmileyFaceIco from '@/app/ui/icons/SmileyFaceIco'

const urlGitHubRepo = env.URL_GITHUB_PROJECT_REPO
const urlPortfolio = env.URL_PORTFOLIO
const urlAppPage = env.URL_READIT_APP

export function generateEmailBody(username, activation_token) {
  const urlActivateAccount = `${env.URL_READIT_APP}/api/activate-account?activation_token=${activation_token}`

  return `
      <div style="background-color: #e2e8f0; width: 100%; font-family: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';">
        <header style="width: 100%; height: 64px; background-color: #3b82f6;">
          <table style="height: 100%; role="presentation" cellspacing="0" cellpadding="0" border="0"">
            <tr>
              <td align="center">
                <div style="width: 48px; height: 48px; margin-left: 8px; border-color: white;">
                  ${SmileyFaceIco()}
                </div>
              </td>
              <td align="center">
                <div style="margin-left: 12px;">
                  <h1 style="color: white; font-size: 24px; line-height: 32px; font-weight: 600;">ReadIt App</h1>
                </div>
              </td>
            </tr>
          </table>
        </header>

        <div style="margin-left: auto; margin-right: auto; margin-top: 64px; margin-bottom: 32px; padding: 40px; width: 480px; height: 560px; background-color: white; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-radius: 8px; box-sizing: border-box;">
          <h2 style="margin-bottom: 32px; margin-top: 0px; font-weight: 600; font-size: 24px; line-height: 32px; text-align: center; color: black;">
            Activate Your Account
          </h2>
          <p style="margin-top: 56px; color: black; font-size: 16px;">Hello ${username}!</p>
          <p style="margin-top: 40px; color: black; font-size: 16px; line-height: 24px;">
            Your account has been created but it's not active yet. Click the button below to activate it.
          </p>
          <div style="margin-top: 32px; padding: 8px; width: 176px; height: 40px; background-color: #3b82f6; color: white; text-align: center; border-radius: 6px; cursor: pointer; box-sizing: border-box;">
            <a style="text-decoration: none; color: white; font-weight: bold;  font-size: 16px; line-height: 24px;" href="${urlActivateAccount}" rel="noreferrer noopener" target="_blank">
              Activate Account
            </a>
          </div>
          <p style="margin-top: 32px; color: black; font-size: 16px; line-height: 24px;">
            You have 24 hours to activate your account. If you did not request to create an account, please ignore this message.
          </p>
          <p style="margin-top: 56px; margin-bottom: 0px; color: black; font-size: 16px; line-height: 24px">Best regards,</p>
          <p style="margin-top: 0px; color: black; font-size: 16px; line-height: 24px;">Ostrowski Dev</p>
        </div>

        <footer style="width: 100%; margin-bottom: 48px;">
          <p style="text-align: center; margin-top: 8px; margin-bottom: 8px; color: #6b7280; font-size: 14px; line-height: 20px;">
            This is an automated message, please do not reply to this email.
          </p>
          <div style="text-align: center; margin-top: 16px; margin-bottom: 0px;">
            <p style="margin: 0px; color: #6b7280; font-size: 14px; line-height: 20px;">
              Got any problems running this app? Consider opening an issue on
              <a style="margin-left: 4px; text-decoration: none; color: #6b7280; font-size: 14px; line-height: 20px;" href="${urlGitHubRepo}" target="_blank" rel="noreferrer noopener">
                GitHub
              </a>
              <span style="color: #6b7280;">.</span>
            </p>
          </div>

          <div style="width: 480px; padding-bottom: 48px; margin-top: 0px; margin-left: auto; margin-right: auto;">
            <table style="width: 100%;" role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tbody style="padding: 0; margin: 0; line-height: 1;">
                <tr style="padding: 0; margin: 0; line-height: 1;">
                  <td align="center" style="padding: 0; margin: 0; height: 20px;">
                    <a style="text-decoration: none; color: #6b7280; font-size: 14px; line-height: 20px;" href="${urlAppPage}" target="_blank" rel="noreferrer noopener">
                      ReadIt App Page
                    </a>
                  </td>
                  <td style="padding: 0; margin: 0; height: 20px;">
                    <p style="color: #6b7280; font-size: 14px; line-height: 20px;">I</p>
                  </td>
                  <td align="center" style="padding: 0; margin: 0; height: 20px;">
                    <a style="text-decoration: none; color: #6b7280; font-size: 14px; line-height: 20px;" href="${urlPortfolio}" target="_blank" rel="noreferrer noopener">
                      View My Portfolio
                    </a>
                  </td>
                  <td style="padding: 0; margin: 0; height: 20px;">
                    <p style="font-size: 14px; color: #6b7280; line-height: 20px;">I</p>
                  </td>
                  <td align="center" style="padding: 0; margin: 0; height: 20px;">
                    <a style="text-decoration: none; color: #6b7280;" href="${urlGitHubRepo}" target="_blank" rel="noreferrer noopener">
                      App's GitHub Repo
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </footer>
      </div>
  `
}
