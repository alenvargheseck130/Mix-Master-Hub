// StAuth10244: I Alen Varghese Cheruvally Kunjumon, 000837873 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.


import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput, FlatList  } from 'react-native';

export default function App() {

  let [imageLink,setImageLink] = useState("")
  let [drinkName,setDrinkName] = useState("")
  let [userName,setUserName] = useState("")
  let [cocktailInstructions,setCocktailInstructions] = useState("")
  let [ingredients,setIngredients] = useState("");



  async function fetchData(buttonParameter){
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+buttonParameter)
    const json = await response.json();
    setImageLink(json.drinks[Math.floor(Math.random()*(json.drinks.length))].strDrinkThumb)
    //console.log(Math.floor(Math.random()*(json.drinks.length)))
    let newIngredients = [];
    newIngredients.push(json.drinks[Math.floor(Math.random()*(json.drinks.length))].strIngredient1)
    newIngredients.push(json.drinks[Math.floor(Math.random()*(json.drinks.length))].strIngredient2)
    newIngredients.push(json.drinks[Math.floor(Math.random()*(json.drinks.length))].strIngredient3)
    setIngredients(newIngredients)
    setCocktailInstructions(json.drinks[Math.floor(Math.random()*(json.drinks.length))].strInstructions)
    setDrinkName(json.drinks[Math.floor(Math.random()*(json.drinks.length))].strDrink)
    //console.log(ingredients)
    //console.log(json.drinks[0].strIngredient1)
    //console.log(imageLink)
    //console.log(json.drinks[Math.floor(Math.random()*(json.drinks.length))].strDrink)
    //console.log(json.drinks[0].strInstructions)
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MixMasterHub</Text>
      </View>

      <View style={styles.contentRowStyle}>
        <View style={styles.contentColumnStyle}>
          <Text style={styles.drinkName}>{drinkName}</Text>
          <Image
              style={styles.image}
              source={{
                uri: imageLink,
              }}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={()=>fetchData('cocktail')} style={styles.button}>
                <Text>Cocktail</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>fetchData('shot')} style={styles.button}>
                <Text>Shot</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>fetchData('coffee')} style={styles.button}>
                <Text>Coffee</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>fetchData('tea')} style={styles.button}>
                <Text>Tea</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>fetchData('wine')} style={styles.button}>
                <Text>Wines</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>fetchData('punch')} style={styles.button}>
                <Text>Punch/Party Drink</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={styles.contentColumnStyle}>
          <Text style={styles.columnTwoHeading}>Ingredient list: {"\n"}{"\n"}</Text>
          <FlatList
            data={ingredients}
            renderItem={({ item }) => <Text style={styles.ingredient}>{`\u2022 ${item}`}</Text>}
            keyExtractor={(item,index) => index}
          />
          <Text style={styles.cocktailPreperation}>Preperation: {"\n"}{"\n"} {cocktailInstructions}</Text>
        </View>
      </View>

      <View style={styles.thirdRow}>
        <TextInput
          style={styles.inputText}
          placeholder="and your name is......"
          onChangeText={(text) => setUserName(text)}
        />
        <Text>{`Hope you had a good time ${userName} :) `}</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db', 
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  contentRowStyle: {
    flex: 4, //
    flexDirection: 'row',
  },
  contentColumnStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#ddd', 
  },
  inputText: {
    height: 40,
    borderColor: 'aliceblue',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius:10
  },
  ingredient: {
    marginBottom: 5,
  },
  thirdRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 150, 
    height: 150,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  drinkName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  columnTwoHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 100,
  },
  cocktailPreperation:{
    fontWeight: 'bold',
    bottom:100,
    alignItems: 'center'
  }
});