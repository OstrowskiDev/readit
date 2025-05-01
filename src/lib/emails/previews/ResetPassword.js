import { env } from 'process'
import SmileyFaceIco from '@/ui/icons/SmileyFaceIco'

export default function ResetPasswordEmail() {
  const urlGitHubRepo = env.URL_GITHUB_PROJECT_REPO
  const urlPortfolio = env.URL_PORTFOLIO
  const urlAppPage = env.URL_READIT_APP
  const username = 'John Doe' // change to import in HTML string version
  const recoveryToken = '1234567890' // change to import in HTML string version
  const urlActivateAccount = `${env.URL_READIT_APP}/account/reset-password?recovery_token=${recoveryToken}`
  return (
    <div className="email-client-mockup my-40 w-[800px] mx-auto  text-black-900">
      <div className="email-container bg-gray-200 w-full font-sans">
        <header className="email-header w-full h-16 bg-blue-500">
          <table className="email-header-table h-full">
            <tr>
              <td align="center">
                <div className="email-header-ico w-12 h-12 ml-2 border-white">
                  <SmileyFaceIco />
                </div>
              </td>
              <td align="center">
                <div className="email-header-title ml-3 text-white text-2xl font-semibold">
                  <h1>ReadIt App</h1>
                </div>
              </td>
            </tr>
          </table>
        </header>

        <div className="email-main mx-auto mt-16 mb-8 p-10 w-[480px] h-[560px] bg-white shadow-sm rounded-md">
          <h2 className="email-main-title mb-8 font-semibold text-2xl text-center ">
            Reset Your Password
          </h2>
          <p className="email-main-greetings mt-14">{`Hello ${username}!`}</p>
          <p className="email-main-text-1 mt-10">
            The request was send to change your ReadIt account password. Click
            button to create new one.{' '}
          </p>
          <div className="email-main-activation-btn mt-8 p-2 w-44 h-10 bg-blue-500 text-white text-center font-bold rounded-md hover:cursor-pointer hover:bg-blue-600 active:bg-blue-700 active:shadow-inner active:scale-95">
            <a
              className="email-main-activation-anchor underline-none"
              href={urlActivateAccount}
              rel="noreferrer noopener"
              target="_blank"
            >
              Change Password
            </a>
          </div>
          <p className="email-main-text-2 mt-8">
            You have 15 minutes for password change. If you did not requested to
            create an account, please ignore this message.
          </p>
          <p className="email-main-text-3 mt-14"> Best regards, </p>
          <p className="email-main-text-4"> Ostrowski Dev </p>
        </div>

        <footer className="email-footer w-full mb-12 text-gray-500 text-sm">
          <p className="email-footer-text text-center my-2">
            This is automated message, please do not reply to this email.
          </p>
          <div className="email-footer-text-container text-center mt-4">
            <p className="email-footer-text">
              Got any problems running this app? Consider opening an issue on
              <a
                className="email-footer-link ml-1 underline-none hover:underline hover:text-gray-600"
                target="_blank"
                rel="noreferrer noopener"
                href={urlGitHubRepo}
              >
                GitHub
              </a>
              <span>.</span>
            </p>
          </div>

          <div className="email-footer-socials w-[480px] pb-12 mt-4 mx-auto">
            <table className="email-footer-socials-table w-full">
              <tr>
                <td align="center">
                  <a
                    className="email-footer-socials-link underline-none hover:underline hover:text-gray-600"
                    target="_blank"
                    rel="noreferrer noopener"
                    href={urlAppPage}
                  >
                    ReadIt App Page
                  </a>
                </td>
                <td>
                  <p className="email-footer-socials-separator">I</p>
                </td>
                <td align="center">
                  <a
                    className="email-footer-socials-link underline-none hover:underline hover:text-gray-600"
                    target="_blank"
                    rel="noreferrer noopener"
                    href={urlPortfolio}
                  >
                    View My Portfolio
                  </a>
                </td>
                <td>
                  <p className="email-footer-socials-separator">I</p>
                </td>
                <td align="center">
                  <a
                    className="email-footer-socials-link underline-none hover:underline hover:text-gray-600"
                    target="_blank"
                    rel="noreferrer noopener"
                    href={urlGitHubRepo}
                  >
                    App&apos;s GitHub Repo
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </footer>
      </div>
    </div>
  )
}
