import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
 
interface Pokemon {
  name: string;
  image: string;
  backImage: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  bug: '#A8B820',
  normal: '#A8A878',
  poison: '#A040A0',
  electric: '#F8D030',
  ground: '#E0C068',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
}

export default function Index() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]); // sets the data from api into a state variable called pokemons. The setter is setPokemons


  useEffect(() => {
    //fetch pokemon
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try
    {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20"); // Fetch lets us hit the api
      const data = await response.json();

      const detailedPokemons = await Promise.all( // fetches the detailed data for each pokemon in parallel
        data.results.map(async (pokemon: any) => { 
          const response = await fetch(pokemon.url); 
          const detailedData = await response.json();
          return { name: pokemon.name, 
            image: detailedData.sprites.front_default,
            backImage: detailedData.sprites.back_default,
            types: detailedData.types }; // returns the name and image of the pokemon
        }
      )
    );

      setPokemons(detailedPokemons); // calls the setter
    }
    catch (e)
    {
      console.log(e);
    }
  }


  return (
    <ScrollView
    contentContainerStyle={{
      gap: 20,
      padding: 20,
    }}>
      {pokemons.map((pokemon) => (
        <Link key={pokemon.name} 
          href = {{pathname: "/details", params: {name: pokemon.name} }}
        >
        <View style={styles.container}
        // @ts-ignore
        style = {{
          // @ts-ignore
          backgroundColor: colorsByType[pokemon.types[0].type.name] + 50,
          padding: 20,
          borderRadius: 20,
        }}>
          <Text style={{ fontSize: 32, fontWeight: '800', letterSpacing: -0.5, color: 'black',}}>{pokemon.name}</Text>
          <Text style={pokemonstyles.type}>{pokemon.types[0].type.name}</Text>

            <View style = {{ flexDirection: "row", justifyContent: "space-between" }}>
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 150, height: 150 }}
              />
              <Image
                source={{ uri: pokemon.backImage }}
                style={{ width: 150, height: 150 }}
              />
            </View>
        </View>
      </Link>  
      ))}
    </ScrollView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});


const pokemonstyles = StyleSheet.create({
  type: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'white',
  }
})
