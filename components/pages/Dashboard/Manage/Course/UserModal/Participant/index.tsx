import { useCallback } from "react";
import { ICourse, IParticipant } from "../../../../../../../types";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

interface ParticipantProps {
  user: IParticipant;
  handleDelete: (id: string) => void;
  course: ICourse;
}

export function Participant(props: ParticipantProps) {
  const onClick = useCallback(async () => {
    const data = await fetch(
      "https://elernink.vercel.app/api/courses/deleteParticipant",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.user.userId,
          courseId: props.course.id,
        }),
      }
    );

    if (data.status !== 200) {
      return;
    }

    props.handleDelete(props.user.userId);
  }, [props]);

  return (
    <View style={styles.participant}>
      <Text style={styles.participantName}>{props.user.user_name}</Text>
      <TouchableOpacity onPress={onClick}>
        <Image
          source={require("../../../../../../../assets/delete.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  participant: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
    padding: 10,
  },
  participantName: {
    fontSize: 16,
  },

  icon: {
    width: 20,
    height: 20,
  },
});
