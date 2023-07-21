import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";

const DetailInfo = (props) => {
  const [ratingV, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [reviewDate, setReviewDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [recommendation, setRecommendation] = useState(true);
  const [hashtags, setHashtags] = useState([""]);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorComment, setErrorComment] = useState(false);
  const [errorHashtag, setErrorHashtag] = useState(false);
  const [comments, setComments] = useState([]);

  const { name, description, price, rating, image } = props.propInfo;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleRating = (value) => {
    setRating(value);
  };

  const putRating = () => {
    alert(`Score ${ratingV} has been set successfully`);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleTitleChange = (text) => {
    setTitle(text);
    setErrorTitle(false);
  };

  const handleCommentChange = (text) => {
    setComment(text);
    setErrorComment(false);
  };

  const handleRecommendationChange = () => {
    setRecommendation((prevRecommendation) => !prevRecommendation);
  };

  const isValidHashtag = (text) => {
    // Expresión regular para validar el hashtag
    const hashtagRegex = /^#[A-Za-z]+$/;
    return hashtagRegex.test(text);
  };

  const handleHashtagChange = (index, text) => {
    if (text === "" || /^#[A-Za-z]*$/.test(text)) {
      setHashtags((prevHashtags) => {
        const updatedHashtags = [...prevHashtags];
        updatedHashtags[index] = text;
        return updatedHashtags;
      });
      setErrorHashtag(false);
    } else {
      setErrorHashtag(true);
    }
  };

  const addHashtagInput = () => {
    setHashtags([...hashtags, ""]);
  };

  const removeHashtagInput = (index) => {
    setHashtags((prevHashtags) => {
      const updatedHashtags = [...prevHashtags];
      updatedHashtags.splice(index, 1);
      return updatedHashtags;
    });
    setErrorHashtag(false);
  };

  const validateForm = () => {
    let valid = true;
    if (!title.trim()) {
      setErrorTitle(true);
      valid = false;
    }
    if (!comment.trim()) {
      setErrorComment(true);
      valid = false;
    }
    return valid;
  };

  const submitComment = () => {
    if (validateForm() && !errorHashtag) {
      // Generate a random playtime between 1 and 3000 hours
      const randomPlaytime = Math.floor(Math.random() * 3000) + 1;

      // Modify this line to remove double hashtags
      const formattedHashtags = hashtags
        .filter((tag) => tag.trim().startsWith("#"))
        .map((tag) => tag.trim());

      // Create the new comment object
      const newComment = {
        id: comments.length + 1,
        title: title, // Add title to the comment
        rating: ratingV, // Add rating to the comment
        comment: comment, // Add the comment text to the comment
        reviewDate: reviewDate, // Add the current date as the review date
        recommendation: recommendation, // Add recommendation to the comment
        hashtags: formattedHashtags, // Use the formatted hashtags
        playtime: randomPlaytime, // Add the random playtime to the comment
      };

      // Update the comments array with the new comment
      setComments([...comments, newComment]);

      // Reset the rating, title, comment, and hashtags state for the next comment
      setRating(0);
      setTitle("");
      setComment("");
      setReviewDate(new Date().toISOString().slice(0, 10));
      setRecommendation(true);
      setHashtags([""]);
      setErrorTitle(false);
      setErrorComment(false);
      setErrorHashtag(false);
    } else {
      setErrorHashtag(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.gameName}>{name}</Text>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            defaultRating={ratingV}
            size={20}
            showRating={false}
            selectedColor="gold"
            onFinishRating={handleRating}
          />
          <Text style={styles.textRating} onPress={putRating}>
            Add your rating
          </Text>
          <Text> Score: {ratingV}</Text>
        </View>
        <Text style={[styles.gamePrice, { color: "#1B063E" }]}>$ {price}</Text>
        <TouchableOpacity onPress={() => console.log("Añadir al carrito")}>
          <View style={[styles.button, { backgroundColor: "#622EDA" }]}>
            <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
              Add to Cart
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.gameDescription}>
          {showFullDescription
            ? description
            : `${description.substring(0, 300)}...`}
        </Text>
        {!showFullDescription && (
          <TouchableOpacity onPress={toggleDescription}>
            <View style={[styles.button, { backgroundColor: "#622EDA" }]}>
              <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
                Read More
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {showFullDescription && (
          <TouchableOpacity onPress={toggleDescription}>
            <View style={[styles.button, { backgroundColor: "#622EDA" }]}>
              <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
                Retract
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Comentarios */}
        <View style={styles.commentsContainer}>
        <Text style={styles.commentsHeaderText}>Comments</Text>
        <View style={styles.commentsListContainer}>
        {comments.map((comment) => (
            <View
              key={comment.id}
              style={[styles.comment, styles.commentContainer]}
            >
                <View style={styles.commentTitleContainer}>
                  <Text style={styles.commentTitle}>{comment.title}</Text>
                  <Text style={styles.commentDate}>{comment.reviewDate}</Text>
                </View>
                <Text style={styles.commentText}>{comment.comment}</Text>
                <Text style={styles.commentDetails}>
                  <Text style={styles.commentDetailsBold}>Playtime:</Text> {comment.playtime} hours - 
                  <Text style={styles.commentDetailsBold}> Recommendation:</Text> {comment.recommendation ? "👍" : "👎"}
                </Text>
                <Text style={styles.commentDetails}>
                  <Text style={styles.commentDetailsBold}>Rating:</Text> {comment.rating}
                </Text>
                <Text style={styles.commentDetails}>
                  <Text style={styles.commentDetailsBold}>Hashtags:</Text> {comment.hashtags.map((tag) => `${tag}`).join(", ")}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.recommendationContainer}>
            <Text style={styles.recommendationText}>
              ¿Do you recommend this game?
            </Text>
            <TouchableOpacity onPress={handleRecommendationChange}>
              <Text style={styles.recommendationIcon}>
                {recommendation ? "👍" : "👎"}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.commentInput, errorTitle ? styles.errorInput : null]}
            placeholder="*Title"
            value={title}
            onChangeText={handleTitleChange}
          />
          {errorTitle && (
            <Text style={styles.errorText}>Complete the title</Text>
          )}
          <TextInput
            style={[
              styles.commentInput,
              styles.wideInput,
              errorComment ? styles.errorInput : null,
            ]}
            placeholder="*Comment"
            value={comment}
            onChangeText={handleCommentChange}
            multiline={true}
          />
          {errorComment && (
            <Text style={styles.errorText}>Complete the comment</Text>
          )}
          {hashtags.map((tag, index) => (
        <View key={index} style={styles.hashtagContainer}>
          <TextInput
            style={[styles.hashtagInput, errorHashtag ? styles.errorInput : null]}
            placeholder="Add a hashtag"
            value={tag}
            onChangeText={(text) => handleHashtagChange(index, text)}
          />
          
          <TouchableOpacity onPress={() => removeHashtagInput(index)}>
            <View style={[styles.button, styles.removeHashtagButton]}>
              <Text style={[styles.buttonText, { color: "red" }]}>Remove</Text>
            </View>
          </TouchableOpacity>
          
        </View>
        
      ))}
      {errorHashtag && (
  <Text style={styles.errorText}>
    Hashtag is not valid. It should start with # and contain only letters (A/a-Z/z).
  </Text>
)}
      <TouchableOpacity onPress={addHashtagInput}>
        <View style={[styles.button, styles.addHashtagButton]}>
          <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>Add</Text>
        </View>
          </TouchableOpacity>
          
          <Button title="Submit" onPress={submitComment} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    width: "90%",
    alignContent: "center",
  },
  image: {
    width: 375,
    height: 361,
    marginLeft: -7,
    position: "relative",
    alignContent: "center",
    resizeMode: "cover",
    alignSelf: "center",
  },
  gameName: {
    color: "#1B063E",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 48,
    marginBottom: 10,
    alignSelf: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 5,
    padding: 5,
  },
  gamePrice: {
    color: "#1B063E",
    fontStyle: "normal",
    fontSize: 32,
    fontWeight: 400,
    marginBottom: 10,
  },
  gameDescription: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "justify",
    marginBottom: 10,
  },
  comment: {
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderTopWidth: 2, // Añadimos el borde superior
    borderBottomWidth: 2, // Añadimos el borde inferior
    borderColor: "#987BDC", // Color del borde
  },
  commentsContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFF", // Cambia el fondo blanco por el color deseado
    borderTopColor: "#987BDC",
    borderTopWidth: 2,
  },
  commentsListContainer: {
    marginTop: 15, // Agregamos un margen superior para separar el primer comentario del borde superior
  },
  commentTitleContainer: {
    flexDirection: "row", // Alineamos el título y la fecha en una fila
    justifyContent: "space-between", // Espacio entre los elementos de la fila
    alignItems: "center", // Alineamos verticalmente los elementos en el centro
    marginBottom: 5,
  },
  commentTitle: {
    color: "#1B063E",
    fontWeight: "bold",
    fontSize: 16,
  },
  commentDate: {
    color: "#1B063E",
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentDetails: {
    fontSize: 14,
    marginBottom: 2,
  },
  commentDetailsBold: {
    fontWeight: "bold",
  },
  textRating: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#496BFF",
    paddingLeft: 20,
  },
  button: {
    width: "100%", // Cambia el ancho fijo a ancho completo
    height: 41.945,
    alignSelf: "stretch",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  comment: {
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentTitle: {
    color: "#1B063E",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  recommendationContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
    alignItems: "center",
  },
  recommendationText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recommendationIcon: {
    fontSize: 24,
  },
  hashtagContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Alineación horizontal con espacio entre los elementos
  },
  hashtagInput: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    flex: 1,
  },
  removeHashtagText: {
    color: "red",
    textAlign: "center",
  },
  removeHashtagButton: {
    color: "red",
    textAlign: "center",
  },
  addHashtagButton: {
    backgroundColor: "#622EDA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  wideInput: {
    width: "100%",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  commentsContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFF", // Fondo blanco para el contenedor de comentarios
    borderTopColor: "#987BDC", // Color de la línea superior
    borderTopWidth: 2, // Grosor de la línea superior
  },
  commentsHeaderText: {
    fontSize: 24, // Tamaño de fuente aumentado
    fontWeight: "bold", // Texto en negrita
    color: "#1B063E", // Color de texto de los comentarios
    paddingLeft: 5, // Espaciado izquierdo para el texto "Comments"
  },
});

export default DetailInfo;