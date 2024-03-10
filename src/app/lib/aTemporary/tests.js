export async function waitForTwoSeconds() {
  await new Promise((resolve) => setTimeout(() => resolve(), 2000))
}
