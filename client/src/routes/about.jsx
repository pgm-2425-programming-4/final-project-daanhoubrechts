import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div>
      <h1>Over deze applicatie</h1>
      <p>
        Dit is een applicatie dit gemaakt moest worden als opdracht voor het vak
        PGM-4 van de opleiding Programmeren op Arteveldehogeschool.
      </p>
      <p>&copy; Daan Houbrechts</p>
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/daan-houbrechts-245517331/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
        </li>
        <li>
          <a
            href="https://github.com/daanhoubrechts"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
      </ul>
    </div>
  );
}
