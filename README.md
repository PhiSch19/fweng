# fweng

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Milestone 1 Checklist

### pages

- [x] Home Page
- [x] Imprint Page
- [x] Help Page

### forms

- [x] register
- [x] login

### components

- [x] NavigationBar
- [x] ErrorModal

### Styling Decision

- [X] Bootstrap vs. Tailwind

### Dummy Data

- [X] display dummy data

### List of Resources:

- movies: ["GET", "POST", "PUT", "PATCH"]
- rooms: ["GET", "POST", "PUT", "PATCH"]
- shows: ["GET", "POST", "PUT", "PATCH"]

### Concept

3 Objects Room, Movie and Show.

The room has the attributes name, capacity and cleaning time. The movie has the attributes name and duration. The show has the attributes startTime (date+time), movie and room.

Every duration should be in minutes.

When the Show is created or updated, there should be a check for conflicting shows in the same room.


