<template>
  <div class="container" id="app">
    <div class="note note--down">
      <p>{{ note }}</p>
    </div>
    <div class="login">
      <header class="login--header">
        <span>Log In</span>
      </header>
      <section class="login--section">
        <form class="login--form" @submit.prevent="makeAuth">
          <fieldset>
            <input
              type="text"
              v-model="auth.username"
              placeholder="username"
              required
              @focus="inputFocus"
            />
            <svg viewBox="0 0 100 1" class="line">
              <path class="line--default" d="M0 0 L100 0" />
            </svg>
          </fieldset>
          <fieldset>
            <input
              type="password"
              v-model="auth.password"
              placeholder="password"
              @focus="inputFocus"
              required
            />
            <svg viewBox="0 0 100 1" class="line">
              <path class="line--default" d="M0 0 L100 0" />
            </svg>
          </fieldset>
          <fieldset>
            <button type="submit" class="btn">Login</button>
          </fieldset>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { API } from "../../constant";

export default {
  data: () => ({
    auth: {
      username: "",
      password: ""
    },
    note: ""
  }),
  methods: {
    makeAuth(e) {
      if (this.auth.username.length == 0 || this.auth.password.length == 0) {
        this.this.note = "Login failed";
      }
      Axios.post(API + "/auth/login", {
        ...this.auth
      })
        .then(({ data, status }) => {
          if (status === 201) {
            const token = data["token"];
            this.note = "Login successful";
            window.sessionStorage.setItem("auth", token);
            this.$router.push("/intent");
          } else {
            alert("Authentication Fail");
          }
        })
        .catch(err => {
          console.log(err.response.data);
          this.this.note = "Login failed!";
        });
    },
    inputFocus() {
      this.note = "";
    }
  },
  watch: {
    note() {
      const note = document.querySelector(".note");
      if (this.note.length) {
        note.classList.add("note--up");
      } else {
        note.classList.remove("note--up");
        note.classList.add("note--down");
      }
    }
  }
};
</script>

<style scoped>
body {
  background: #607d8b;
}

body,
input,
button {
  font-size: 1.2rem;
}

fieldset {
  border: none;
}

.container {
  background: none;
  width: 400px;
  margin: 8rem auto 0;
  text-align: center;
  box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.15);
  position: relative;
}

.note {
  /* background: #ff9e80; */
  padding: 0.75rem 1.5rem;
  box-sizing: border-box;
  position: absolute;
  bottom: 100%;
  width: 100%;
  z-index: 0;
  transition: all 0.2s ease-out;
}

.note--down {
  transform: translateY(100%);
}

.note--up {
  transform: translateY(0);
}

.login {
  z-index: 1;
  position: relative;
  background: white;
  padding: 0.75rem 1.5rem 1.5rem;
  box-sizing: border-box;
}

.login--header {
  margin-bottom: 1rem;
}

.login--header span {
  font-size: 2rem;
}

.btn {
  background: white;
  box-shadow: inset 0 0 2px 0 #eeeeee;
  outline: none;
  border: 1px solid #3f51b5;
  padding: 0.3rem 1rem 0.4rem;
  cursor: pointer;
  border-radius: 0.25rem;
  margin-top: 1rem;
  color: #3f51b5;
}

.btn:active {
  box-shadow: inset 2px 2px 2px 0 #e0e0e0;
}

input {
  width: 100%;
  border: none;
  text-align: center;
  outline: none;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  background: none;
}

.line {
  transform: translate(0, -1rem);
  stroke-width: 1;
}

.line--default {
  stroke: #ccc;
  transition: all 0.2s ease-out;
}

input:focus + svg > .line--default {
  stroke: #3f51b5;
}

input:focus:invalid + svg > .line--default {
  stroke: #ff5722;
}
</style>
