import Link from 'next/link'

export default function WelcomeContent() {
  return (
    <>
      <h2 className="welcome-title mb-0">Welcome to ReadIt!</h2>
      <p className="welcome-sub-title mt-0">
        SciFi themed, Reddit-like, posting platform.
      </p>

      <p className="welcome-content mt-3">
        Explore{' '}
        <Link href="/posts" className="anchor-color font-semibold">
          SciFi stories
        </Link>{' '}
        set in colonized solar system during mega-structures construction era.
        Where{' '}
        <Link
          href="/user/fb1a4e9e-4e24-4c07-b749-d775f1c3e20c"
          className="anchor-color"
        >
          Fiona
        </Link>
        ,{' '}
        <Link
          href="/user/9e75c601-4ef2-4e85-b7de-3eb3a88299b9"
          className="anchor-color"
        >
          Bob
        </Link>
        ,{' '}
        <Link
          href="/user/27278885-d8b4-4198-9a6f-4a61b145f206"
          className="anchor-color"
        >
          Alice
        </Link>{' '}
        and{' '}
        <Link
          href="/user/ad4fc3a1-0e2c-46e8-9d31-d3d2c66d9ac2"
          className="anchor-color"
        >
          Charlie
        </Link>{' '}
        (AI-generated characters) are solving complex engineering challenges.
      </p>

      <p className="welcome-content mt-3">
        Participate in the story by{' '}
        <Link href="/register" className="anchor-color font-semibold">
          creating
        </Link>{' '}
        your account and{' '}
        <Link href="/my-profile" className="anchor-color font-semibold">
          customizing
        </Link>{' '}
        your character profile. Share your adventures through posts and help
        others find solutions to their challenges.
      </p>
    </>
  )
}
