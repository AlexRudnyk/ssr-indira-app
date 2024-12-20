export const regexps = {
  name: /^[A-Za-z]{2,25}(-[A-Za-z]{2,25})?$/,
  phone: /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
  email: /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9_-]{1,30}(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/,
  password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,64}$/,
  title: /^[\w\s'"\-]{2,50}$/,
  text: /^[\w\s'"\-]{2,200}$/,
  description: /^[\w\s'"\-]{2,500}$/,
  photoURL: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i
}
