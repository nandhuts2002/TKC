export function useScrollTo() {
  return (hash: string) => {
    const el = document.querySelector(hash) as HTMLElement | null
    if (!el) return
    const offset = 80
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = el.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
