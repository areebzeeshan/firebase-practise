import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  auth,
  db,
  loginUser,
  logout,
  signupUser,
} from "../../firebase/firebase";

const Navbar = () => {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openCreateGuides, setOpenCreateGuides] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const handleClose = () => {
    setOpenSignup((prev) => !prev);
  };
  const handleLoginClose = () => {
    setOpenLogin((prev) => !prev);
  };
  const handleAccountCLose = () => {
    setOpenAccount((prev) => !prev);
  };
  const handleCreateGuidesClose = () => {
    setOpenCreateGuides((prev) => !prev);
  };

  useEffect(() => {
    const unsubscribAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc) {
            setUsername(userDoc.data().username);
          } else {
            console.log("No such documents");
          }
        } catch (error) {
          console.log("Error fetching username: ", error);
        }
        setIsUser(true);
        setUser(user);
      } else {
        setIsUser(false);
      }
    });

    return () => unsubscribAuth();
  }, []);

  return (
    <>
      <nav className="shadow-lg p-3">
        <div className="flex justify-between items-center w-[90%] mx-auto">
          <div>
            <h1 className="text-3xl font-bold">Logo</h1>
          </div>
          <div className="flex justify-between items-center gap-4">
            {isUser ? (
              <>
                <Button
                  sx={{ color: "black" }}
                  onClick={() => setOpenAccount(true)}
                >
                  Accounts
                </Button>
                <Button sx={{ color: "black" }} onClick={logout}>
                  Logout
                </Button>
                <Button
                  sx={{ color: "black" }}
                  onClick={() => setOpenCreateGuides(true)}
                >
                  Create Guides
                </Button>
              </>
            ) : (
              <>
                <Button
                  sx={{ color: "black" }}
                  onClick={() => setOpenLogin(true)}
                >
                  Login
                </Button>
                <Button
                  sx={{ color: "black" }}
                  onClick={() => setOpenSignup(true)}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* signup dialog */}
      <Dialog
        open={openSignup}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const username = formJson.username;
            const email = formJson.email;
            const password = formJson.password;

            signupUser(email, password, username);
            // console.log("Email : ", email, "Password : ", password);
            handleClose();
          },
        }}
      >
        <DialogContent>
          <DialogContentText>Signup</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="pass"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <Button
          type="submit"
          sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}
          variant="contained"
        >
          Sign up
        </Button>
      </Dialog>

      {/* signin dialog */}
      <Dialog
        open={openLogin}
        onClose={handleLoginClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            const password = formJson.password;

            loginUser(email, password);
            // console.log("Email : ", email, "Password : ", password);
            handleLoginClose();
          },
        }}
      >
        <DialogContent>
          <DialogContentText>Sign in</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="pass"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <Button
          type="submit"
          sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}
          variant="contained"
        >
          Sign in
        </Button>
      </Dialog>

      {/* create guides */}
      <Dialog
        open={openCreateGuides}
        onClose={handleCreateGuidesClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const title = formJson.title;
            const description = formJson.desc;

            try {
              const data = await addDoc(collection(db, "dummy"), {
                title: title,
                description: description,
              });
              console.log("Doc added successfully!", data.id);
            } catch (error) {
              console.log("Error adding Doc: ", error);
            }
            handleCreateGuidesClose();
          },
        }}
      >
        <DialogContent>
          <DialogContentText>Create Guides</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="desc"
            name="desc"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <Button
          type="submit"
          sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}
          variant="contained"
        >
          Submit
        </Button>
      </Dialog>

      {/* account dialog */}
      <Dialog
        open={openAccount}
        onClose={handleAccountCLose}
        PaperProps={{
          component: "form",
        }}
      >
        <DialogContent>
          <h1 className="text-3xl font-semibold">Account Details</h1>
          <p>Logged in as {user?.email}</p>
          <p>Username: {username}</p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
