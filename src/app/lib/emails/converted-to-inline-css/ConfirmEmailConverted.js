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
    <div style={styles.emailClientMockup}>
      <div style={styles.emailContainer}>
        <header style={styles.emailHeader}>
          <div style={styles.emailHeaderIco}>
            <SmileyFaceIco />
          </div>
          <div style={styles.emailHeaderTitle}>
            <h1>ReadIt App</h1>
          </div>
        </header>

        <main style={styles.emailMain}>
          <h2 style={styles.emailMainTitle}>Activate Your Account</h2>
          <p style={styles.emailMainGreetings}>{`Hello ${username}!`}</p>
          <p style={styles.emailMainText1}>
            Your account has been created but its not active yet. Click button
            below to activate it.{' '}
          </p>
          <a
            style={styles.emailMainActivationBtn}
            href={urlActivateAccount}
            rel="noreferrer noopener"
            target="_blank"
          >
            Activate Account
          </a>
          <p style={styles.emailMainText2}>
            You have 24 hours to activate account. If you did not requested to
            create an account, please ignore this message.
          </p>
          <div style={styles.emailMainSeparator}></div>
          <p style={styles.emailMainText3}> Best regards, </p>
          <p style={styles.emailMainText4}> Ostrowski Dev </p>
        </main>

        <footer style={styles.emailFooter}>
          <p style={styles.emailFooterText}>
            This is automated message, please do not reply to this email.
          </p>
          <div style={styles.emailFooterTextContainer}>
            <p style={styles.emailFooterText}>
              Got any problems running this app? Consider opening an issue on
              <a
                style={styles.emailFooterLink}
                target="_blank"
                rel="noreferrer noopener"
                href={urlGitHubRepo}
              >
                GitHub
              </a>
              <span>.</span>
            </p>
          </div>

          <div style={styles.emailFooterSocials}>
            <a
              style={styles.emailFooterSocialsLink}
              target="_blank"
              rel="noreferrer noopener"
              href={urlAppPage}
            >
              ReadIt App Page
            </a>
            <p style={styles.emailFooterSocialsSeparator}>I</p>
            <a
              style={styles.emailFooterSocialsLink}
              target="_blank"
              rel="noreferrer noopener"
              href={urlPortfolio}
            >
              View My Portfolio
            </a>
            <p style={styles.emailFooterSocialsSeparator}>I</p>
            <a
              style={styles.emailFooterSocialsLink}
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

const styles = {
  emailClientMockup: {
    marginTop: '10rem',
    width: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'sans-serif',
  },
  emailContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e5e7eb', // Tailwind class bg-gray-200
    width: '100%',
  },
  emailHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '4rem',
    backgroundColor: '#3b82f6', // Tailwind class bg-blue-500
  },
  emailHeaderIco: {
    width: '3rem',
    height: '3rem',
    marginLeft: '0.5rem',
    borderColor: 'white',
  },
  emailHeaderTitle: {
    marginLeft: '0.75rem',
    color: 'white',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: '600',
  },
  emailMain: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '4rem',
    marginBottom: '2rem',
    padding: '2.5rem',
    width: '480px',
    height: '560px',
    backgroundColor: 'white',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', // Tailwind class shadow-sm
    borderRadius: '0.375rem', // Tailwind class rounded-md
  },
  emailMainTitle: {
    marginBottom: '2rem',
    fontWeight: '600',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    textAlign: 'center',
  },
  emailMainGreetings: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
  },
  emailMainText1: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  emailMainActivationBtn: {
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '0.5rem',
    width: '11rem',
    height: '2.5rem',
    backgroundColor: '#3b82f6', // Tailwind class bg-blue-500
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    borderRadius: '0.375rem', // Tailwind class rounded-md
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#2563eb', // Tailwind class hover:bg-blue-600
    },
    ':active': {
      backgroundColor: '#1d4ed8', // Tailwind class active:bg-blue-700
      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)', // Tailwind class active:shadow-inner
      transform: 'scale(0.95)', // Tailwind class active:scale-95
    },
  },
  emailMainText2: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  emailMainSeparator: {
    flexGrow: 1,
  },
  emailMainText3: {
    marginBottom: '0.25rem',
  },
  emailMainText4: {},
  emailFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '3rem',
    color: '#6b7280', // Tailwind class text-gray-500
    fontSize: '0.875rem', // Tailwind class text-sm
  },
  emailFooterText: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  emailFooterTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailFooterLink: {
    marginLeft: '0.25rem',
    textDecoration: 'underline',
    color: '#6b7280', // Tailwind class hover:text-gray-600
    ':hover': {
      textDecoration: 'underline',
      color: '#4b5563', // Tailwind class hover:text-gray-600
    },
  },
  emailFooterSocials: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '480px',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  emailFooterSocialsLink: {
    textDecoration: 'underline',
    color: '#6b7280', // Tailwind class hover:text-gray-600
    ':hover': {
      textDecoration: 'underline',
      color: '#4b5563', // Tailwind class hover:text-gray-600
    },
  },
  emailFooterSocialsSeparator: {},
}
