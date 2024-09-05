import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, loginUser, logout, signupUser } from "../../firebase/firebase";

const Navbar = () => {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleClose = () => {
    setOpenSignup((prev) => !prev);
  };
  const handleLoginClose = () => {
    setOpenLogin((prev) => !prev);
  };

  return (
    <>
      <nav className="shadow-lg p-3">
        <div className="flex justify-between items-center w-[90%] mx-auto">
          <div>
            <h1 className="text-3xl font-bold">Logo</h1>
          </div>
          <div className="flex justify-between items-center gap-4">
            <Button sx={{ color: "black" }}>Accounts</Button>
            <Button sx={{ color: "black" }} onClick={logout}>
              Logout
            </Button>
            <Button sx={{ color: "black" }}>Create Guides</Button>
            <Button sx={{ color: "black" }} onClick={() => setOpenLogin(true)}>
              Login
            </Button>
            <Button sx={{ color: "black" }} onClick={() => setOpenSignup(true)}>
              Sign up
            </Button>
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

            signupUser(email, password);
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
    </>
  );
};

export default Navbar;
