import Book from './Book'
import ToyLayer from './ToyLayer'

export default function StoryBookSite() {
  return (
    <main className="storybook-scene">
      <ToyLayer />
      <section className="storybook-content">
        <Book />
      </section>
    </main>
  )
}
