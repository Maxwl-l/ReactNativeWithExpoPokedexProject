import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Details() {
    const params = useLocalSearchParams()

    console.log(params.name)

    useEffect(() => {}, [])

    async function fetchPokemonDetails(name: string) {
        // try{
        // // fetch
        // } catch
    }
  return (
    <ScrollView
    contentContainerStyle={{
      gap: 20,
      padding: 20,
    }}>
    </ScrollView>  
  );
}

const styles = StyleSheet.create({});
