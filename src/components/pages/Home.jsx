import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useEffect, useState } from "react";
import { auth, db, onUserStateChange } from "../../firebase/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [docs, setDocs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);

        const unSubscribeSnapshot = onSnapshot(
          collection(db, "dummy"),
          (snapshot) => {
            const updatedDocs = snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));
            setDocs(updatedDocs); 
          },
          (error) => {
            console.error("Error fetching documents:", error);
          }
        );

        return () => unSubscribeSnapshot(); 
      } else {
        setIsLoggedIn(false);
        setDocs([]); 
      }
    });

    return () => unSubscribeAuth(); 
  }, []);

  return (
    <>
      {isLoggedIn ? (
        docs ? (
          docs.map((doc) => {
            const content = doc.data;
            return (
              <Accordion key={doc.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="font-semibold"
                >
                  {content.title}
                </AccordionSummary>
                <AccordionDetails>{content.description}</AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <h1>No data available</h1>
        )
      ) : (
        <h1>Login to view details</h1>
      )}
    </>
  );
};

export default Home;
