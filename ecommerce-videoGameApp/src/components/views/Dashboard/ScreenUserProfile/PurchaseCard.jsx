import { React, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

// Función para generar un número de orden aleatorio entre 0 y 9999
// Tiene un useState para que no se genere un número nuevo cada vez que se renderiza el componente (modo para la demo)
const generateOrderNumber = () => {
  return Math.floor(Math.random() * 10000);
};

const PurchaseCard = ({ videoG }) => {
  const videoGames = useSelector((state) => state.videogamesState.videoGames);
  const [orderNumber] = useState(generateOrderNumber());

  const totalQuantity = videoG.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Función para formatear la fecha en formato "dia-mes-año"
  const formatDate = (dateString) => {
    // nativa de JS
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const formattedDate = formatDate(videoG.date);

  if (!videoG) {
    return (
      <View style={styles.cardContainer}>
        <Text>No data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: videoG.items[0].image }} style={styles.image} />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.boldText}>N° Order:</Text> {orderNumber}
        </Text>
        <Text style={styles.infoText}>Quantity Items: {totalQuantity}</Text>
        <Text style={styles.infoText}>
          Videogames:{" "}
          {videoG.items
            .map((item) => {
              const game = videoGames.find(
                (game) => game.id === item.videogameId
              );
              return game.name;
            })
            .join(", ")}
        </Text>
        <Text style={styles.infoText}>Date: {formattedDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF", // Color de fondo BLANCO
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000", // sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  leftContainer: {
    marginRight: 16,
  },
  rightContainer: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
  },
  infoText: {
    fontFamily: "Roboto", // Font family
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 14.52,
    marginBottom: 8,
    color: "#606060", // Color gris
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default PurchaseCard;
