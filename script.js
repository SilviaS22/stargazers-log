const list = document.querySelector("#starred");
const status = document.querySelector("#status");
const count = document.querySelector("#repository-count");

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load events: ${response.status}`);
    }
    return response.json();
  })
  .then((events) => {
    count.textContent = `${events.length} ${events.length === 1 ? "repository" : "repositories"}`;
    status.remove();

    events.forEach((event) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const description = document.createElement("p");
      const date = document.createElement("time");
      const [owner, repository] = event.name.split("/");

      link.href = `https://github.com/${event.name}`;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = repository ? `${owner} / ${repository}` : event.name;

      description.className = "description";
      description.textContent = event.description;
      date.dateTime = event.starred;
      date.textContent = `Starred ${new Date(`${event.starred}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })}`;

      item.append(link, description, date);
      list.appendChild(item);
    });
  })
  .catch(() => {
    status.textContent = "The repository log could not be loaded. Please try again later.";
    status.classList.add("error");
  });
