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
    <p className="date text-gray-500 leading-tight font-medium">
      Joined: {createdAt}
    </p>
  )
}
