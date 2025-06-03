export function AccountCreationDate({ accountCreatedAt }) {
  let createdAt
  if (accountCreatedAt) {
    const date = new Date(accountCreatedAt)
    createdAt = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  return (
    <p className="date font-orbitron text-12 text-app-blue-text/50">
      Joined: {createdAt}
    </p>
  )
}
