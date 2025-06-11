import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h3>Welkom bij mijn Kaban applicatie</h3>
      <p>Selecteer een project om de taken te zien te krijgen.</p>
    </div>
  );
}
