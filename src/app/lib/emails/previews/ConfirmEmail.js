import { env } from 'process'
import SmileyFaceIco from '@/app/ui/icons/SmileyFaceIco'

// Here some info to remember in future about email clients limitations:
// 1. flex is not supported, only display: flex works
//    so tables needs to be used instead
// 2. <main> tag is not supported,
//    use <div> instead
// 3. rem units are not behaving as expected,
//    use px instead, conversion rate for this file is 1rem = 16px
// 4. <a> tags are automatically styled with <u> by email clients
//    so use inline styles to remove it
// 5. :hover, :active, and other pseudo-classes are not supported
//    just cry instead
// 6. in some circumstances, email clients will overwrite text color
//    so use inline styles to enforce it

// things to remember to pass to converter:
// 1. Remove email-client-mockup div, it will not be needed
// 2. Tailwind classes need to be converted to inline styles
// 3. underline-none class needs to be converted to inline style
//    text-decoration: none;
// 4. rem needs to be converted to px with 1rem = 16px
// 5. hover:text-gray-600 needs to be converted to inline style
//    onmouseover="this.style.color='#4b5563'"
//    onmouseout="this.style.color='#6b7280'"
// 6. active:bg-blue-700 needs to be converted to inline style
//    also hover:bg-blue-600 needs to be converted to inline style
//    onmouseover="this.style.backgroundColor='#2563eb';"
//    onmouseout="this.style.backgroundColor='#3b82f6';"
//    onmousedown="this.style.backgroundColor='#1d4ed8';"
//    onmouseup="this.style.backgroundColor='#2563eb';"

export default function ConfirmEmail() {
  const urlGitHubRepo = env.URL_GITHUB_PROJECT_REPO
  const urlPortfolio = env.URL_PORTFOLIO
  const urlAppPage = env.URL_READIT_APP
  const username = 'John Doe' // will be imported
  const activation_token = '1234567890' // will be imported
  const urlActivateAccount = `${env.URL_READIT_APP}/api/activate-account?activation_token=${activation_token}`

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
            Activate Your Account
          </h2>
          <p className="email-main-greetings mt-14">{`Hello ${username}!`}</p>
          <p className="email-main-text-1 mt-10">
            Your account has been created but its not active yet. Click button
            below to activate it.{' '}
          </p>
          <div className="email-main-activation-btn mt-8 p-2 w-44 h-10 bg-blue-500 text-white text-center font-bold rounded-md hover:cursor-pointer hover:bg-blue-600 active:bg-blue-700 active:shadow-inner active:scale-95">
            <a
              className="email-main-activation-anchor underline-none"
              href={urlActivateAccount}
              rel="noreferrer noopener"
              target="_blank"
            >
              Activate Account
            </a>
          </div>
          <p className="email-main-text-2 mt-8">
            You have 24 hours to activate account. If you did not requested to
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
