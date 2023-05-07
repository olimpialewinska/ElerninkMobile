import React, {
  Key,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ICourse, IParticipant } from "../../../../../../types";
import {
  Alert,
  Modal,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { windowContext } from "../../..";
import { Participant } from "./Participant";

interface MyModalProps {
  handleShow: () => void;
  hide: () => void;
  visible: boolean;
  course: ICourse;
}
export function UserModal(props: MyModalProps) {
  const [courseCode, setCourseCode] = useState(props.course.code);
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [buttonText, setButtonText] = useState("Save");

  const getParticipants = useCallback(async () => {
    const data = await fetch(
      "https://elernink.vercel.app/api/courses/courseParticipants",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: props.course.id,
        }),
      }
    );

    if (data.status === 200) {
      const response = await data.json();
      setParticipants(response);
    }
  }, [props]);

  const handleDelete = useCallback(
    (id: string) => {
      const newParticipants = participants.filter(
        (participant) => participant.userId !== id
      );
      setParticipants(newParticipants);
    },
    [participants]
  );

  const handleSave = useCallback(async () => {
    const data = await fetch(
      "https://elernink.vercel.app/api/courses/updateCourseCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: props.course.id,
          courseCode: courseCode,
        }),
      }
    );

    if (data.status !== 200) {
      return;
    }

    setButtonText("Saved");
  }, [courseCode, props.course.id]);

  useEffect(() => {
    getParticipants();
  }, [getParticipants]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          props.hide();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Course Code</Text>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={courseCode}
              onChangeText={(text) => {
                setCourseCode(text);
              }}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleSave}
            >
              <Text style={styles.textStyle}>{buttonText}</Text>
            </Pressable>

            <Text
              style={[
                styles.modalText,
                {
                  marginTop: 30,
                },
              ]}
            >
              Participants
            </Text>

            {participants.map((participant) => {
              return (
                <Participant
                  key={participant.userId}
                  user={participant}
                  handleDelete={handleDelete}
                  course={props.course}
                />
              );
            })}
            <Pressable
              style={[styles.button, styles.buttonClose, { marginTop: 40 }]}
              onPress={props.hide}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0, 0.6)",
  },
  modalView: {
    backgroundColor: "rgba(255,255,255, 1)",
    width: "90%",
    margin: 20,
    borderRadius: 20,
    paddingVertical: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 10,
  },
});
