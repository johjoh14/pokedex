const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeAbility = document.querySelector('[data-poke-ability]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#097f99',
    grass: '#03690a',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#3d7510',
    poison: '#481075',
    ground: '#D2B074',
    dragon: '#383da8',
    steel: '#1D8A99',
    fighting: '#FF3800',
    dark: '#2f2f2f',
    fairy: '#E0AFD7',
    default: 'transparent',
};

function searchPokemon(event){
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}   

function renderPokemonData(data){
    const sprite = data.sprites.front_default;
    const { stats, types,abilities} = data;
    console.log(data);

    pokeImg.setAttribute("src",sprite);
    pokeName.textContent = data.name ;
    pokeId.textContent = `Nº ${data.id}`;
    renderTypes(types);
    setCardColor(types);
    renderStats(stats);
    renderAbilities(abilities);
    
    

}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `linear-gradient(to left top, ${colorTwo}, ${colorOne} )`;
   
}

function renderTypes(types){
    
    pokeTypes.innerHTML="";

    types.forEach(type => {
        const typeElement = document.createElement("div");
        typeElement.style.background= typeColors[type.type.name];
        typeElement.style.color="white";
        typeElement.textContent = type.type.name;
        pokeTypes.appendChild(typeElement);

       
    
    });

}
function renderAbilities (abilities){
    pokeAbility.innerHTML="";

    abilities.forEach(ability => {
        const abilityElement = document.createElement("div");
        const abilityNameElement = document.createElement("div");
        const hiddenElement = document.createElement("div");
        abilityNameElement.textContent = ability.ability.name;
        if (ability.is_hidden){ 
            hiddenElement.textContent ="hidden ability:"
        }
        else hiddenElement.textContent="ability:"
        abilityElement.appendChild(hiddenElement);
        abilityElement.appendChild(abilityNameElement);
        pokeAbility.appendChild(abilityElement);

    });
}

function renderStats(stats){

    pokeStats.innerHTML ="";
    stats.forEach(stat => {
        
        const statElement = document.createElement("div");
        const statAmount = document.createElement("div");
        const statName = document.createElement("div");
        statName.textContent = stat.stat.name;
        statAmount.textContent= stat.base_stat;
        statElement.appendChild(statName);
        statElement.appendChild(statAmount);
        pokeStats.appendChild(statElement);

        
    });




}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'BbdPOFU.png');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}
