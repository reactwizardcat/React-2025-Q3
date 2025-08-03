import Header from '../components/Header';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-2.5">
        <section className="max-w-2xl text-center text-lg">
          <h1 className="mb-5 text-2xl font-bold capitalize">About</h1>
          <p className="mb-2.5">
            Hi! My name is Hikmatullo and I went study at Rolling Scopes School.
            I’m excited about this new chapter in my life and look forward to
            gaining new knowledge and experiences.
          </p>
          <p className="mb-2.5">
            This project is part of the{' '}
            <a
              className="text-blue-400 underline-offset-5 hover:underline"
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              RS School React course
            </a>
          </p>

          <a
            href="https://github.com/reactwizardcat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline-offset-5 hover:underline"
          >
            My Github
          </a>
        </section>
      </main>
    </>
  );
}
