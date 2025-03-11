import { env } from 'process'
import SmileyFaceIco from '@/app/ui/icons/SmileyFaceIco'

export default function ConfirmEmail() {
  const urlGitHubRepo = env.URL_GITHUB_PROJECT_REPO
  const urlPortfolio = env.URL_PORTFOLIO
  const urlAppPage = env.URL_READIT_APP
  const activation_token = '1234567890' // These needs to be imported
  const urlActivateAccount = `${env.URL_READIT_APP}/api/activate-account?activation_token=${activation_token}`
  const username = 'John Doe'

  return (
    <div className="email-client-mockup my-40 w-[800px] mx-auto font-sans">
      <div className="email-container flex flex-col bg-gray-200 w-full">
        <header className="email-header flex items-center w-full h-16 bg-blue-500">
          <div className="email-header-ico w-12 h-12 ml-2 border-white">
            <SmileyFaceIco />
          </div>
          <div className="email-header-title ml-3 text-white text-2xl font-semibold">
            <h1>ReadIt App</h1>
          </div>
        </header>

        <main className="email-main flex flex-col mx-auto mt-16 mb-8 p-10 w-[480px] h-[560px] bg-white shadow-sm rounded-md">
          <h2 className="email-main-title mb-8 font-semibold text-2xl text-center ">
            Activate Your Account
          </h2>
          <p className="email-main-greetings my-6">{`Hello ${username}!`}</p>
          <p className="email-main-text-1 my-2">
            Your account has been created but its not active yet. Click button
            below to activate it.{' '}
          </p>
          <a
            className="email-main-activation-btn my-4 p-2 w-44 h-10 bg-blue-500 text-white text-center font-bold rounded-md hover:cursor-pointer hover:bg-blue-600 active:bg-blue-700 active:shadow-inner active:scale-95"
            href={urlActivateAccount}
            rel="noreferrer noopener"
            target="_blank"
          >
            Activate Account
          </a>
          <p className="email-main-text-2 my-2">
            You have 24 hours to activate account. If you did not requested to
            create an account, please ignore this message.
          </p>
          <div className="email-main-separator flex grow"></div>
          <p className="email-main-text-3 mb-1"> Best regards, </p>
          <p className="email-main-text-4"> Ostrowski Dev </p>
        </main>

        <footer className="email-footer flex flex-col items-center justify-center w-full mb-12 text-gray-500 text-sm">
          <p className="email-footer-text my-2">
            This is automated message, please do not reply to this email.
          </p>
          <div className="email-footer-text-container flex flex-row items-center">
            <p className="email-footer-text my-2">
              Got any problems running this app? Consider opening an issue on
              <a
                className="email-footer-link ml-1 hover:underline hover:text-gray-600"
                target="_blank"
                rel="noreferrer noopener"
                href={urlGitHubRepo}
              >
                GitHub
              </a>
              <span>.</span>
            </p>
          </div>

          <div className="email-footer-socials flex justify-between w-[480px] my-2">
            <a
              className="email-footer-socials-link hover:underline hover:text-gray-600"
              target="_blank"
              rel="noreferrer noopener"
              href={urlAppPage}
            >
              ReadIt App Page
            </a>
            <p className="email-footer-socials-separator">I</p>
            <a
              className="email-footer-socials-link hover:underline hover:text-gray-600"
              target="_blank"
              rel="noreferrer noopener"
              href={urlPortfolio}
            >
              View My Portfolio
            </a>
            <p className="email-footer-socials-separator">I</p>
            <a
              className="email-footer-socials-link hover:underline hover:text-gray-600"
              target="_blank"
              rel="noreferrer noopener"
              href={urlGitHubRepo}
            >
              App's GitHub Repo
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
