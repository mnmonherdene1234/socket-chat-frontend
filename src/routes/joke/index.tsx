import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";

const useVoteAction = routeAction$((props) => {
  console.log("props", props);
});

const useJoke = routeLoader$(async () => {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  });
  return (await response.json()) as {
    id: string;
    status: number;
    joke: string;
  };
});

export default component$(() => {
  const jokeSignal = useJoke();
  const voteAction = useVoteAction();
  const isFavoriteSignal = useSignal(false);

  return (
    <div>
      <p>{jokeSignal.value.id}</p>
      <p>{jokeSignal.value.joke}</p>
      <p>{jokeSignal.value.status}</p>
      <Form action={voteAction}>
        <input type="hidden" name="jokeID" value={jokeSignal.value.id} />
        <button name="vote" value="up">
          👍
        </button>
        <button name="vote" value="down">
          👎
        </button>
      </Form>
      <button
        onClick$={() => {
          isFavoriteSignal.value = !isFavoriteSignal.value;
        }}
      >
        {isFavoriteSignal.value ? "❤️" : "🤍"}
      </button>
    </div>
  );
});
