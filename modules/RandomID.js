const RandomID = (prefix, length) => {
  return `${prefix}_${Math.floor(Math.random() * (101 * length))}`
}

export default RandomID
