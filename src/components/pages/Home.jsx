import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useEffect, useState } from "react";
import { auth, db, onUserStateChange } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [docs, setDocs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true); 
        try {
          const snapshot = await getDocs(collection(db, "dummy"));
          setDocs(snapshot.docs);
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
      } else {
        setIsLoggedIn(false); 
        setDocs([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
     {isLoggedIn ? (
        docs.length > 0 ? (
          docs.map((doc) => {
            const content = doc.data();
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
