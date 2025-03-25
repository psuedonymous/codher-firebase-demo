import React, { useState, useEffect } from "react";
import { signInWithGoogle, logOut } from "./hooks/useAuth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "./config/firebase";
import { Note } from "./types";
import { useFeatureFlag } from "./hooks/useRemoteConfig";
import styles from "./styles/App.module.css";

function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const bannerEnabled = useFeatureFlag("showBanner");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);

    const fetchNotes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "notes"));
        setNotes(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Note))
        );
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();

    return () => unsubscribe();
  }, []);

  const handleAddNote = async () => {
    if (!newNote || !user) return;

    try {
      // Create a new note object locally
      const newNoteObj: Note = {
        id: Math.random().toString(36).substring(2, 15),
        text: newNote,
        user: user.displayName || "Anonymous",
        createdAt: new Date(),
      };

      setNotes((prevNotes) => [...prevNotes, newNoteObj]);

      // Add to Firestore
      const docRef = await addDoc(collection(db, "notes"), {
        text: newNote,
        user: user.displayName || "Anonymous",
        createdAt: new Date(),
      });

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === newNoteObj.id ? { ...note, id: docRef.id } : note
        )
      );

      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Banner */}
      {bannerEnabled && (
        <div className={styles.banner}>🚀 Welcome to Codher Firebase Demo!</div>
      )}

      {/* Authentication */}
      {!user ? (
        <button onClick={signInWithGoogle} className={styles.authButton}>
          Sign in with Google
        </button>
      ) : (
        <>
          <button
            onClick={logOut}
            className={`${styles.authButton} ${styles.logoutButton}`}
          >
            Log out
          </button>
          <h2>Welcome, {user.displayName || "Guest"} 👋</h2>

          {/* Note Input */}
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note..."
            className={styles.input}
          />
          <button onClick={handleAddNote} className={styles.addButton}>
            ➕ Add Note
          </button>

          {/* Notes List */}
          <ul className={styles.noteList}>
            {notes.map((note) => (
              <li key={note.id} className={styles.noteItem}>
                {note.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
