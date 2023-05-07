export interface TopicInterface {
  topic: string;
  lesson: string;
  order: number;
  listOfFiles: File[];
  id: number;
}
export interface ICourse {
  id: string;
  name: string;
  description: string;
  code: string;
  image: string;
}

export interface FileInterface {
  id: string;
  name: string;
  url: string;
}

export interface NoteInterface {
  id: string;
  name: string;
  value: string;
  userId: string;
}

export interface IParticipant {
  userId: string;
  user_name: string;
}
