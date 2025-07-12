const input = document.getElementById("search-input");
const searchbtn = document.getElementById("search-button");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const specialName = document.getElementById("special-name");
const specialDescription = document.getElementById("special-description");
const url = "https://rpg-creature-api.freecodecamp.rocks/api/creature";

const fetchData = async () => {
  try {
    // Clear previous results first
    resetValues();

    const creatureNameorid = input.value.toLowerCase().trim();
    if (!creatureNameorid) {
      alert("Please enter a creature name or ID");
      return;
    }

    const response = await fetch(`${url}/${creatureNameorid}`);
    const data = await response.json();
    console.log(data);

    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    specialName.textContent = data.special.name;
    specialDescription.textContent = data.special.description;

    //stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;
    //types
    types.innerHTML = data.types
      .map((type) => {
        return `<span class="type-item">${type.name}</span>`;
      })
      .join("");
  } catch (error) {
    resetValues();
    alert("Creature not found");
    console.log("error in fetching data", error);
  }
};

function resetValues() {
  creatureName.textContent = "";
  creatureId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  specialName.textContent = "";
  specialDescription.textContent = "";
  types.innerHTML = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
}

searchbtn.addEventListener("click", fetchData);

// Add Enter key support for the input field
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});

// Clear input field when page loads
window.addEventListener("load", () => {
  input.value = "";
  resetValues();
});
