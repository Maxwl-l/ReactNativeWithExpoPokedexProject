import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Details() {
    const params = useLocalSearchParams()
    const [pokemon, setPokemon] = useState<Pokemon | null>(null); // sets the data from api into a state variable called pokemon. The setter is setPokemon

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

    interface Pokemon { // defines the structure of a Pokemon object
        name: string;
        weight: number;
        base_experience: number;
        height: number;
        types: PokemonType[];
    }

    interface PokemonType {
        type: {
            name: string;
            url: string;
        };
    }

    console.log(params.name)

    useEffect(() => {

        fetchPokemonDetails(params.name as string)
    }, []);

    async function fetchPokemonDetails(name: string) {
    try
    {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); // Fetch lets us hit the api ! from a specific pokemon by name
      const data = await response.json();

      console.log(data)
      
      setPokemon({
            name: data.name,
            weight: data.weight,
            base_experience: data.base_experience,
            height: data.height,
            types: data.types,
        });
    }

    catch (e)
    {
      console.log(e);
    }
  }
  return (
    <ScrollView contentContainerStyle={{ gap: 20, padding: 20 }}>
      {pokemon && (
        <View
            style = {{
                // @ts-ignore
                backgroundColor: colorsByType[pokemon.types[0].type.name] + 50,
                padding: 20,
                borderRadius: 20,
                gap: 20,
            }}>
            <Text style = {{ fontSize: 24, fontWeight: "bold", textAlign: "center", textTransform: "capitalize" }}>{pokemon.name}</Text>
                <View style = {{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style = {styles.details}>Weight: {pokemon.weight} kg</Text>
                    <Text style = {styles.details}>Height: {pokemon.height} m</Text>
                    <Text style = {styles.details}>Base Experience: {pokemon.base_experience}</Text>
                </View>

        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    details: {
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: "bold",
        color: "black",
        letterSpacing: -1.1,
    }
});
