import { env } from 'process'

const urlGitHubRepo = env.URL_GITHUB_PROJECT_REPO
const urlPortfolio = env.URL_PORTFOLIO
const urlAppPage = env.URL_READIT_APP

export function generateEmailBody(username, activation_token) {
  const urlActivateAccount = `${env.URL_READIT_APP}/api/activate-account?activation_token=${activation_token}`
  return `
  <html>
    <head>
      <style>
        .emailContainer {
          display: flex;
          flex-direction: column;
          background-color: #e5e7eb; /* Tailwind class bg-gray-200 */
          width: 100%;
        }
        .emailHeader {
          display: flex;
          align-items: center;
          width: 100%;
          height: 4rem;
          background-color: #3b82f6; /* Tailwind class bg-blue-500 */
        }
        .emailHeaderIco {
          width: 3rem;
          height: 3rem;
          margin-left: 0.5rem;
          border-color: white;
        }
        .emailHeaderTitle {
          margin-left: 0.75rem;
          color: white;
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 600;
        }
        .emailMain {
          display: flex;
          flex-direction: column;
          margin-left: auto;
          margin-right: auto;
          margin-top: 4rem;
          margin-bottom: 2rem;
          padding: 2.5rem;
          width: 480px;
          height: 560px;
          background-color: white;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* Tailwind class shadow-sm */
          border-radius: 0.375rem; /* Tailwind class rounded-md */
        }
        .emailMainTitle {
          margin-bottom: 2rem;
          font-weight: 600;
          font-size: 1.5rem;
          line-height: 2rem;
          text-align: center;
        }
        .emailMainGreetings {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .emailMainText1 {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .emailMainActivationBtn {
          margin-top: 1rem;
          margin-bottom: 1rem;
          padding: 0.5rem;
          width: 11rem;
          height: 2.5rem;
          background-color: #3b82f6; /* Tailwind class bg-blue-500 */
          color: white;
          text-align: center;
          font-weight: 700;
          border-radius: 0.375rem; /* Tailwind class rounded-md */
          cursor: pointer;
        }
        .emailMainActivationBtn:hover {
          background-color: #2563eb; /* Tailwind class hover:bg-blue-600 */
        }
        .emailMainActivationBtn:active {
          background-color: #1d4ed8; /* Tailwind class active:bg-blue-700 */
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05); /* Tailwind class active:shadow-inner */
          transform: scale(0.95); /* Tailwind class active:scale-95 */
        }
        .emailMainText2 {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .emailMainSeparator {
          flex-grow: 1;
        }
        .emailMainText3 {
          margin-bottom: 0.25rem;
        }
        .emailFooter {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-bottom: 3rem;
          color: #6b7280; /* Tailwind class text-gray-500 */
          font-size: 0.875rem; /* Tailwind class text-sm */
        }
        .emailFooterText {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .emailFooterTextContainer {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .emailFooterLink {
          margin-left: 0.25rem;
          text-decoration: underline;
          color: #6b7280; /* Tailwind class hover:text-gray-600 */
        }
        .emailFooterLink:hover {
          text-decoration: underline;
          color: #4b5563; /* Tailwind class hover:text-gray-600 */
        }
        .emailFooterSocials {
          display: flex;
          justify-content: space-between;
          width: 480px;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .emailFooterSocialsLink {
          text-decoration: underline;
          color: #6b7280; /* Tailwind class hover:text-gray-600 */
        }
        .emailFooterSocialsLink:hover {
          text-decoration: underline;
          color: #4b5563; /* Tailwind class hover:text-gray-600 */
        }
        .emailFooterSocialsSeparator {}
      </style>
    </head>
    <body>
      <div class="emailContainer">
        <header class="emailHeader">
          <div class="emailHeaderIco">
            <img src="smiley-face-ico.png" alt="Smiley Face Icon" />
          </div>
          <div class="emailHeaderTitle">
            <h1>ReadIt App</h1>
          </div>
        </header>
        <main class="emailMain">
          <h2 class="emailMainTitle">Activate Your Account</h2>
          <p class="emailMainGreetings">Hello ${username}!</p>
          <p class="emailMainText1">
            Your account has been created but its not active yet. Click button
            below to activate it.
          </p>
          <a
            class="emailMainActivationBtn"
            href="${urlActivateAccount}"
            rel="noreferrer noopener"
            target="_blank"
          >
            Activate Account
          </a>
          <p class="emailMainText2">
            You have 24 hours to activate account. If you did not requested to
            create an account, please ignore this message.
          </p>
          <div class="emailMainSeparator"></div>
          <p class="emailMainText3"> Best regards, </p>
          <p class="emailMainText4"> Ostrowski Dev </p>
        </main>
        <footer class="emailFooter">
          <p class="emailFooterText">
            This is automated message, please do not reply to this email.
          </p>
          <div class="emailFooterTextContainer">
            <p class="emailFooterText">
              Got any problems running this app? Consider opening an issue on
              <a
                class="emailFooterLink"
                target="_blank"
                rel="noreferrer noopener"
                href="${urlGitHubRepo}"
              >
                GitHub
              </a>
              <span>.</span>
            </p>
          </div>
          <div class="emailFooterSocials">
            <a
              class="emailFooterSocialsLink"
              target="_blank"
              rel="noreferrer noopener"
              href="${urlAppPage}"
            >
              ReadIt App Page
            </a>
            <p class="emailFooterSocialsSeparator">I</p>
            <a
              class="emailFooterSocialsLink"
              target="_blank"
              rel="noreferrer noopener"
              href="${urlPortfolio}"
            >
              View My Portfolio
            </a>
            <p class="emailFooterSocialsSeparator">I</p>
            <a
              class="emailFooterSocialsLink"
              target="_blank"
              rel="noreferrer noopener"
              href="${urlGitHubRepo}"
            >
              App's GitHub Repo
            </a>
          </div>
        </footer>
      </div>
    </body>
  </html>
  `
}
